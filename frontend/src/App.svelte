<script>
    import { location } from "svelte-spa-router";
    // import svelteLogo from "./assets/svelte.svg";
    // import viteLogo from "/vite.svg";
    // import Counter from "./lib/Counter.svelte";

    import Router from "svelte-spa-router";
    import Sidebar from './lib/Sidebar.svelte';
    import Header from './lib/Header.svelte';


    import routes from './routes';

    
    let sidebarCollapsed = false;
    
    function toggleSidebar() {
        sidebarCollapsed = !sidebarCollapsed;
    }

    let noHeaderRoutes = ['/login' , '/register'];

</script>


<div class="flex h-screen bg-gray-50">
    {#if !noHeaderRoutes.includes($location.toLowerCase())}
        <Sidebar bind:collapsed={sidebarCollapsed} />
    {/if}

    
    <div class="flex-1 flex flex-col overflow-hidden">
        {#if !noHeaderRoutes.includes($location.toLowerCase())}
            <Header onToggleSidebar={toggleSidebar} />
        {/if}
        
        <main class="flex-1 overflow-auto px-4 py-4">
            <Router {routes} />
        </main>
        
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Vazirmatn', sans-serif;
    }
</style>
