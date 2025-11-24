<script>
    import NotificationMenu from './NotificationMenu.svelte';
    import UserMenu from './UserMenu.svelte';
    
    let { onToggleSidebar } = $props();
    
    let activeMenu = $state(null); // 'notification' یا 'user' یا null
    
    function handleHeaderClick() {
        // بستن تمام منوها هنگام کلیک روی هدر
        activeMenu = null;
    }
    
    function handleNotificationMenuToggle() {
        if (activeMenu === 'notification') {
            activeMenu = null;
        } else {
            activeMenu = 'notification';
        }
    }
    
    function handleUserMenuToggle() {
        if (activeMenu === 'user') {
            activeMenu = null;
        } else {
            activeMenu = 'user';
        }
    }
    
    function handleMenuClose() {
        activeMenu = null;
    }
    
    // تابع برای بستن منوها هنگام کلیک خارج
    function handleDocumentClick(event) {
        // اگر کلیک خارج از منوها بود، همه منوها را ببند
        if (activeMenu && !event.target.closest('.menu-container')) {
            activeMenu = null;
        }
    }
    
    // اضافه کردن event listener به document
    $effect(() => {
        if (activeMenu) {
            document.addEventListener('click', handleDocumentClick);
            return () => document.removeEventListener('click', handleDocumentClick);
        }
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<header class="bg-white shadow-sm p-4 flex justify-between items-center relative" onclick={handleHeaderClick}>
    <!-- سمت چپ هدر -->
    <div class="flex items-center">
        <button aria-label="toggleSidebar"
            onclick={onToggleSidebar}
            class="text-gray-500 ml-4 hover:bg-gray-100 p-2 rounded transition-colors"
        >
            <i class="fas fa-bars"></i>
        </button>
        <h2 class="text-lg font-semibold text-gray-800">داشبورد</h2>
    </div>
    
    <!-- سمت راست هدر -->
    <div class="flex items-center space-x-4 menu-container">
        <NotificationMenu 
            isOpen={activeMenu === 'notification'}
            onToggle={handleNotificationMenuToggle}
            onClose={handleMenuClose}
        />
        <UserMenu 
            isOpen={activeMenu === 'user'}
            onToggle={handleUserMenuToggle}
            onClose={handleMenuClose}
        />
    </div>
</header>