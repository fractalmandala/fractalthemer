#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import {
	cp,
	mkdtemp,
	mkdir,
	readFile,
	rename,
	rm,
	stat,
	writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDir = dirname(fileURLToPath(import.meta.url)); // scripts/
const repoRoot = resolve(dataDir, '..');
const dataOutDir = join(repoRoot, 'src', 'lib', 'data');
const registryPath = join(dataOutDir, 'registry.json');
const apiPath = join(dataOutDir, 'registry.api.md');
const iconPath = join(repoRoot, 'static', 'images', 'fractalthemer-intellisense-icon.png');
const defaultVersion = '0.2.1';
const languages = [
	'html',
	'svelte',
	'vue',
	'astro',
	'javascript',
	'javascriptreact',
	'typescript',
	'typescriptreact',
	'css',
	'sass',
	'scss'
];

async function assertFile(path) {
	const metadata = await stat(path).catch(() => null);
	if (!metadata?.isFile()) throw new Error(`Missing required file: ${path}`);
}

function apiDescriptions(markdown) {
	const descriptions = new Map();
	for (const line of markdown.split(/\r?\n/)) {
		const match = line.match(/^\| `([^`]+)` \| (.*?) \|\s*$/);
		if (!match) continue;
		const name = match[1].startsWith('.') ? match[1].slice(1) : match[1];
		descriptions.set(name, match[2].replaceAll('\\|', '|'));
	}
	return descriptions;
}

function classCatalogue(registry, descriptions) {
	const classes = [];
	for (const layer of registry.layers) {
		for (const item of layer.items) {
			if (item.kind !== 'class') continue;
			const name = item.name.startsWith('.') ? item.name.slice(1) : item.name;
			classes.push({
				name,
				layer: layer.label,
				group: item.group ?? null,
				source: layer.file,
				description:
					descriptions.get(name) ??
					`Canonical fractalthemer class from the ${layer.label} layer.`
			});
		}
	}

	classes.sort((a, b) => a.name.localeCompare(b.name));
	const names = new Set(classes.map((entry) => entry.name));
	if (names.size !== classes.length) throw new Error('Registry contains duplicate class names');
	if (classes.length !== registry.totals.class) {
		throw new Error(
			`Registry total says ${registry.totals.class} classes, but ${classes.length} were collected`
		);
	}
	return classes;
}

function packageJson(version) {
	return {
		name: 'fractalthemer-intellisense',
		displayName: 'fractalthemer IntelliSense',
		description: 'Autocomplete and hover reference for canonical fractalthemer CSS classes.',
		version,
		publisher: 'fractalmandala',
		license: 'MIT',
		icon: 'icon.png',
		engines: { vscode: '^1.85.0' },
		categories: ['Programming Languages', 'Snippets'],
		keywords: ['css', 'sass', 'svelte', 'fractalthemer', 'design system', 'autocomplete'],
		activationEvents: languages.map((language) => `onLanguage:${language}`),
		main: './extension.js',
		contributes: {
			configuration: {
				title: 'fractalthemer IntelliSense',
				properties: {
					'fractalthemerIntellisense.enabled': {
						type: 'boolean',
						default: true,
						description: 'Enable canonical fractalthemer class completions and hovers.'
					},
					'fractalthemerIntellisense.includeLanguages': {
						type: 'array',
						items: { type: 'string' },
						default: languages,
						description: 'Language identifiers where fractalthemer completions are offered.'
					}
				}
			}
		}
	};
}

const extensionSource = String.raw`'use strict';

const vscode = require('vscode');
const classes = require('./data/classes.json');
const byName = new Map(classes.map((entry) => [entry.name, entry]));
const languages = ['html', 'svelte', 'vue', 'astro', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'css', 'sass', 'scss'];

function contextAt(document, position) {
	const line = document.lineAt(position.line).text.slice(0, position.character);
	if (['css', 'sass', 'scss'].includes(document.languageId)) {
		const selector = line.match(/\.([\w-]*)$/);
		return selector ? { prefix: selector[1], start: position.character - selector[1].length } : null;
	}
	const directive = line.match(/class:([\w-]*)$/);
	if (directive) return { prefix: directive[1], start: position.character - directive[1].length };
	const attribute = line.match(/(?:\bclass|\bclassName)\s*=\s*(?:["'\x60]|\{\s*["'\x60])([^"'\x60]*)$/);
	if (!attribute) return null;
	const prefix = (attribute[1].match(/(?:^|\s)([^\s]*)$/) || [])[1] || '';
	return { prefix, start: position.character - prefix.length };
}

function documentation(entry) {
	const markdown = new vscode.MarkdownString();
	markdown.appendMarkdown('**.' + entry.name + '**\n\n' + entry.description + '\n\n');
	markdown.appendMarkdown('Layer: \x60' + entry.layer + '\x60');
	if (entry.group) markdown.appendMarkdown(' · Group: \x60' + entry.group + '\x60');
	markdown.appendMarkdown('\n\nSource: \x60' + entry.source + '\x60');
	return markdown;
}

function activate(context) {
	const selector = languages.map((language) => ({ language }));
	const completionProvider = vscode.languages.registerCompletionItemProvider(selector, {
		provideCompletionItems(document, position) {
			const config = vscode.workspace.getConfiguration('fractalthemerIntellisense');
			if (!config.get('enabled', true) || !config.get('includeLanguages', languages).includes(document.languageId)) return;
			const match = contextAt(document, position);
			if (!match) return;
			const range = new vscode.Range(position.line, match.start, position.line, position.character);
			return classes.map((entry) => {
				const item = new vscode.CompletionItem(entry.name, vscode.CompletionItemKind.Value);
				item.insertText = entry.name;
				item.filterText = entry.name;
				item.detail = [entry.layer, entry.group].filter(Boolean).join(' · ');
				item.documentation = documentation(entry);
				item.range = range;
				item.sortText = entry.name;
				return item;
			});
		}
	}, '"', "'", '\x60', ' ', ':', '-');

	const hoverProvider = vscode.languages.registerHoverProvider(selector, {
		provideHover(document, position) {
			const range = document.getWordRangeAtPosition(position, /[\w-]+/);
			if (!range) return;
			const entry = byName.get(document.getText(range));
			return entry ? new vscode.Hover(documentation(entry), range) : undefined;
		}
	});
	context.subscriptions.push(completionProvider, hoverProvider);
}

function deactivate() {}
module.exports = { activate, deactivate };
`;

function manifest(version) {
	return `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011">
	<Metadata>
		<Identity Language="en-US" Id="fractalthemer-intellisense" Version="${version}" Publisher="fractalmandala" />
		<DisplayName>fractalthemer IntelliSense</DisplayName>
		<Description xml:space="preserve">Autocomplete and hover reference for canonical fractalthemer CSS classes.</Description>
		<Tags>css,sass,svelte,fractalthemer,design system,autocomplete</Tags>
		<Categories>Programming Languages,Snippets</Categories>
		<Icon>extension/icon.png</Icon>
		<Properties><Property Id="Microsoft.VisualStudio.Code.Engine" Value="^1.85.0" /></Properties>
	</Metadata>
	<Installation><InstallationTarget Id="Microsoft.VisualStudio.Code" /></Installation>
	<Dependencies />
	<Assets>
		<Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
		<Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
		<Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/CHANGELOG.md" Addressable="true" />
		<Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE" Addressable="true" />
		<Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true" />
	</Assets>
</PackageManifest>
`;
}

const contentTypes = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
	<Default Extension="json" ContentType="application/json" />
	<Default Extension="js" ContentType="application/javascript" />
	<Default Extension="md" ContentType="text/markdown" />
	<Default Extension="png" ContentType="image/png" />
	<Default Extension="txt" ContentType="text/plain" />
	<Default Extension="vsixmanifest" ContentType="text/xml" />
</Types>
`;

async function build() {
	const version = process.argv[2] ?? defaultVersion;
	if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
		throw new Error('Version must be a semantic version such as 0.2.1');
	}

	const licensePath = join(repoRoot, 'LICENSE');
	await Promise.all([registryPath, apiPath, iconPath, licensePath].map(assertFile));
	const [registrySource, apiSource] = await Promise.all([
		readFile(registryPath, 'utf8'),
		readFile(apiPath, 'utf8')
	]);
	const registry = JSON.parse(registrySource);
	const classes = classCatalogue(registry, apiDescriptions(apiSource));
	const filename = `fractalthemer-intellisense-${version}.vsix`;
	const output = join(dataOutDir, filename);
	const temporaryOutput = join(dataOutDir, `.${filename}.tmp.zip`);
	const staging = await mkdtemp(join(tmpdir(), 'fractalthemer-intellisense-'));

	try {
		const extension = join(staging, 'extension');
		const data = join(extension, 'data');
		await mkdir(data, { recursive: true });
		await Promise.all([
			writeFile(join(staging, '[Content_Types].xml'), contentTypes),
			writeFile(join(staging, 'extension.vsixmanifest'), manifest(version)),
			writeFile(join(extension, 'package.json'), `${JSON.stringify(packageJson(version), null, '\t')}\n`),
			writeFile(join(extension, 'extension.js'), extensionSource),
			writeFile(
				join(extension, 'README.md'),
				[
					'# fractalthemer IntelliSense',
					'',
					"Local VS Code autocomplete and hover documentation for the canonical classes in fractalthemer's generated registry.",
					'',
					'## Coverage',
					'',
					`- ${classes.length} canonical classes from \`src/lib/data/registry.json\``,
					'- Descriptions generated from `src/lib/data/registry.api.md`',
					'- HTML, Svelte, Vue, Astro, JSX/TSX, CSS, Sass, and SCSS',
					'- Svelte `class:` directives',
					'',
					'Install with **Extensions: Install from VSIX...**, then reload VS Code.',
					''
				].join('\n')
			),
			writeFile(
				join(extension, 'CHANGELOG.md'),
				[
					'# Changelog',
					'',
					`## ${version}`,
					'',
					"- Rebuilt from fractalthemer's current canonical registry and generated class API.",
					`- Bundled ${classes.length} canonical class completions.`,
					'- Preserved the fractalthemer motif icon and API-derived hover documentation.',
					''
				].join('\n')
			),
			cp(licensePath, join(extension, 'LICENSE')),
			cp(iconPath, join(extension, 'icon.png')),
			cp(registryPath, join(data, 'registry.json')),
			cp(apiPath, join(data, 'registry.api.md')),
			writeFile(join(data, 'classes.json'), `${JSON.stringify(classes, null, '\t')}\n`)
		]);

		await rm(temporaryOutput, { force: true });
		const zip = spawnSync(
			'zip',
			['-qr', temporaryOutput, '[Content_Types].xml', 'extension.vsixmanifest', 'extension'],
			{ cwd: staging, stdio: 'inherit' }
		);
		if (zip.error) throw zip.error;
		if (zip.status !== 0) throw new Error(`zip failed with exit code ${zip.status}`);
		await rm(output, { force: true });
		await rename(temporaryOutput, output);
		console.log(`Built ${output} with ${classes.length} canonical classes.`);
	} finally {
		await rm(staging, { recursive: true, force: true });
		await rm(temporaryOutput, { force: true });
	}
}

await build();
