<script>
    import { link } from "svelte-spa-router";
    
    let { collapsed = $bindable(false) } = $props();
    
    let activeMenu = $state('dashboard');
    let openSubmenus = $state(new Set(['dashboard']));
    
    const menuItems = $state([
        {
            id: 'dashboard',
            name: 'داشبورد',
            icon: 'tachometer-alt',
            route: '/'
        },
        {
            id: 'ui',
            name: 'عناصر UI',
            icon: 'cube',
            submenu: [
                { name: 'کامپوننت‌ها', route: '/components' },
                { name: 'آیکون‌ها', route: '/icons' },
                { name: 'دکمه‌ها', route: '/buttons' },
                { name: 'کارت‌ها', route: '/cards' },
                { name: 'جداول', route: '/tables' },
                { name: 'فرم‌ها', route: '/forms' }
            ]
        },
        {
            id: 'koms',
            name: 'KOMS',
            icon: 'chart-bar',
            submenu: [
                { name: 'کامس', route: '/koms' },
                { name: 'ویجت‌ها', route: '/widgets' },
                { name: 'آمارها', route: '/stats' },
                { name: 'نمودارها', route: '/charts' },
                { name: 'گزارش‌ها', route: '/reports' }
            ]
        },
        {
            id: 'cnafs',
            name: 'CNAFS',
            icon: 'map',
            submenu: [
                { name: 'نقشه گوگل', route: '/google-maps' },
                { name: 'نقشه برداری', route: '/mapping' },
                { name: 'موقعیت‌یابی', route: '/location' },
                { name: 'جغرافیا', route: '/geography' }
            ]
        },
        {
            id: 'pages',
            name: 'صفحات اضافی',
            icon: 'file',
            submenu: [
                { name: 'صفحه ورود', route: '/login' },
                { name: 'صفحه ثبت‌نام', route: '/register' },
                { name: 'صفحه پروفایل', route: '/profile' },
                { name: 'صفحه تنظیمات', route: '/settings' },
                { name: 'صفحه خطا 404', route: '/404' }
            ]
        },
        {
            id: 'settings',
            name: 'تنظیمات',
            icon: 'cog',
            submenu: [
                { name: 'تنظیمات عمومی', route: '/general-settings' },
                { name: 'تنظیمات امنیتی', route: '/security-settings' },
                { name: 'تنظیمات حریم خصوصی', route: '/privacy-settings' },
                { name: 'پشتیبان‌گیری', route: '/backup' }
            ]
        }
    ]);

    function toggleSubmenu(menuId) {
        if (openSubmenus.has(menuId)) {
            openSubmenus.delete(menuId);
        } else {
            openSubmenus.add(menuId);
        }
        openSubmenus = new Set(openSubmenus);
    }

    function handleMenuButtonClick(menuId) {
        const menuItem = menuItems.find(item => item.id === menuId);
        if (menuItem?.submenu) {
            toggleSubmenu(menuId);
        } else {
            activeMenu = menuId;
        }
    }

    function handleSubmenuClick(parentMenuId) {
        activeMenu = parentMenuId;
    }

    function toggleSidebar() {
        collapsed = !collapsed;
    }
</script>

<div class="sidebar h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col"
     class:collapsed="{collapsed}"
     class:w-64="{!collapsed}"
     class:w-16="{collapsed}">
    
    <!-- هدر سایدبار -->
    <div class="p-4 border-b border-gray-700 flex justify-between items-center">
        {#if !collapsed}
            <h1 class="text-xl font-bold">Suite Admin</h1>
        {/if}
        <button onclick={toggleSidebar} aria-label="toggleSidebar" style="width: 35px;"
                class="text-white p-1 rounded hover:bg-gray-700 transition-colors">
            <i class="fas fa-chevron-right {collapsed ? 'rotate-180' : ''} transition-transform duration-300"></i>
        </button>
    </div>
    
    <!-- منوها -->
    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {#each menuItems as item (item.id)}
            <div class="sidebar-item rounded-lg overflow-hidden">
                {#if item.submenu}
                    <!-- منو با زیرمنو -->
                    <button 
                        onclick={() => handleMenuButtonClick(item.id)}
                        class="w-full flex items-center justify-between p-3 hover:bg-gray-700 transition-colors rounded-lg 
                        {activeMenu === item.id ? 'bg-green-600' : ''}"
                    >
                        <div class="flex items-center">
                            <i class="fas fa-{item.icon} {collapsed ? '' : 'ml-3'}"></i>
                            {#if !collapsed}
                                <span class="mr-2">{item.name}</span>
                            {/if}
                        </div>
                        {#if !collapsed}
                            <i class="fas fa-chevron-down text-xs transition-transform {openSubmenus.has(item.id) ? 'rotate-180' : ''}"></i>
                        {/if}
                    </button>
                    
                    <!-- زیرمنوها -->
                    {#if !collapsed && openSubmenus.has(item.id)}
                        <div class="submenu mr-6 space-y-1 py-1">
                            {#each item.submenu as subitem (subitem.name)}
                                <a 
                                    use:link
                                    href="{subitem.route}" 
                                    onclick={() => handleSubmenuClick(item.id)}
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors {activeMenu === item.id ? 'text-white' : ''}"
                                >
                                    {subitem.name}
                                </a>
                            {/each}
                        </div>
                    {/if}
                {:else}
                    <!-- منوی ساده -->
                    <a 
                        use:link
                        href="{item.route}" 
                        onclick={() => handleMenuButtonClick(item.id)}
                        class="flex items-center p-3 hover:bg-gray-700 transition-colors rounded-lg {activeMenu === item.id ? 'bg-green-600' : ''}"
                    >
                        <i class="fas fa-{item.icon} {collapsed ? '' : 'ml-3'}"></i>
                        {#if !collapsed}
                            <span class="mr-2">{item.name}</span>
                        {/if}
                    </a>
                {/if}
            </div>
        {/each}
    </nav>
    
    <!-- دکمه خروج -->
    <div class="logout-btn p-4 border-t border-gray-700">
        <a 
            use:link 
            href="/logout" 
            class="flex items-center p-3 text-red-400 hover:bg-red-500 hover:text-white hover:bg-opacity-10 rounded transition-colors"
        >
            <i class="fas fa-sign-out-alt {collapsed ? '' : 'ml-3'}"></i>
            {#if !collapsed}
                <span class="mr-2">خروج از سامانه</span>
            {/if}
        </a>
    </div>
</div>

<style>
    .sidebar {
        background: linear-gradient(135deg, #303641 0%, #1a1d23 100%);
    }
    
    .sidebar.collapsed {
        width: 4rem;
    }
    
    .sidebar:not(.collapsed) {
        width: 16rem;
    }
    
    .submenu {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>