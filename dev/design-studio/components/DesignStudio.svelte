<script>
  import TopBar from './TopBar.svelte';
  import Toolbar from './Toolbar.svelte';
  import Sidebar from './Sidebar.svelte';
  import DesignView from './DesignView.svelte';
  import MotionView from './MotionView.svelte';
  import GridView from './GridView.svelte';
  import FlexView from './FlexView.svelte';
  import Inspector from './Inspector.svelte';
  import StatusBar from './StatusBar.svelte';

  let activeView = 'design';
  let activeTool = 'move';

  $: showDesignPanels = activeView === 'design';

  function handleViewChange(e) {
    activeView = e.detail;
  }

  function handleToolChange(e) {
    activeTool = e.detail;
  }
</script>

<div class="studio-root">
  <TopBar {activeView} on:change={handleViewChange} />

  <div class="main-layout">
    {#if showDesignPanels}
      <Toolbar {activeTool} on:change={handleToolChange} />
      <Sidebar />
    {/if}

    <div class="canvas-area">
      {#if activeView === 'design'}
        <DesignView />
      {:else if activeView === 'motion'}
        <MotionView />
      {:else if activeView === 'grid'}
        <GridView />
      {:else if activeView === 'flex'}
        <FlexView />
      {/if}

      <StatusBar />
    </div>

    {#if showDesignPanels}
      <Inspector />
    {/if}
  </div>
</div>

<style lang="sass">
  @use '../styles/index'

  .studio-root
    display: flex
    flex-direction: column
    height: 100vh
    overflow: hidden

  .main-layout
    display: flex
    height: calc(100vh - var(--topbar-h))
    position: relative

  .canvas-area
    flex: 1
    display: flex
    flex-direction: column
    overflow: hidden
    position: relative
</style>
