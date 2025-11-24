<script>
    import { link } from 'svelte-spa-router';
    
    let { isOpen, onToggle, onClose } = $props();
    
    const user = $state({
        name: 'جان دو',
        email: 'john.doe@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff',
        role: 'مدیر سیستم'
    });
    
    const menuItems = $state([
        {
            id: 'profile',
            label: 'پروفایل کاربری',
            icon: 'user',
            route: '/profile',
            type: 'link'
        },
        {
            id: 'settings',
            label: 'تنظیمات حساب',
            icon: 'cog',
            route: '/settings',
            type: 'link'
        },
        {
            id: 'messages',
            label: 'پیام‌ها',
            icon: 'envelope',
            route: '/messages',
            type: 'link',
            badge: 3
        },
        {
            id: 'help',
            label: 'راهنما',
            icon: 'question-circle',
            route: '/help',
            type: 'link'
        },
        {
            id: 'divider',
            type: 'divider'
        },
        {
            id: 'logout',
            label: 'خروج از سیستم',
            icon: 'sign-out-alt',
            route: '/logout',
            type: 'link',
            color: 'text-red-500 hover:bg-red-50'
        }
    ]);
    
    function handleButtonClick(event) {
        event.stopPropagation();
        onToggle();
    }
    
    function handleMenuClick(event) {
        event.stopPropagation();
    }
    
    function handleMenuItemClick(item) {
        if (item.id === 'logout') {
            // منطق خروج از سیستم
            console.log('Logging out...');
        }
        onClose();
    }
</script>

<div class="relative menu-container">
    <button 
        onclick={handleButtonClick}
        class="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="نمایش منوی کاربر"
        aria-expanded={isOpen}
    >
        <img 
            src={user.avatar} 
            alt={user.name} 
            class="w-8 h-8 rounded-full"
        >
        <div class="flex items-center space-x-2 space-x-reverse">
            <span class="text-sm font-medium text-gray-700">{user.name}</span>
            <i class="fas fa-chevron-down text-xs text-gray-500 {isOpen ? 'rotate-180' : ''} transition-transform"></i>
        </div>
    </button>
    
    <!-- منوی کاربر -->
    {#if isOpen}
        <div 
            class="user-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            onclick={handleMenuClick}
        >
            <!-- هدر منو -->
            <div class="p-4 border-b border-gray-200">
                <div class="flex items-center space-x-3 space-x-reverse">
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        class="w-12 h-12 rounded-full"
                    >
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p class="text-sm text-gray-500 truncate">{user.email}</p>
                        <p class="text-xs text-gray-400 mt-1">{user.role}</p>
                    </div>
                </div>
            </div>
            
            <!-- آیتم‌های منو -->
            <div class="py-2">
                {#each menuItems as item (item.id)}
                    {#if item.type === 'divider'}
                        <div class="border-t border-gray-100 my-2"></div>
                    {:else}
                        <a 
                            use:link
                            href={item.route}
                            onclick={() => handleMenuItemClick(item)}
                            class="menu-item flex items-center justify-between p-3 hover:bg-gray-50 transition-colors {item.color || 'text-gray-700'}"
                        >
                            <div class="flex items-center">
                                <i class="fas fa-{item.icon} ml-3 {item.color?.includes('red') ? 'text-red-500' : 'text-gray-400'}"></i>
                                <span class="text-sm">{item.label}</span>
                            </div>
                            {#if item.badge}
                                <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    {item.badge}
                                </span>
                            {/if}
                        </a>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .user-menu {
        animation: fadeIn 0.2s ease-out;
    }
    
    @keyframes fadeIn {
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