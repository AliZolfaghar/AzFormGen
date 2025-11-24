<script>
    let { isOpen, onToggle, onClose } = $props();
    
    const notifications = $state([
        {
            id: 1,
            title: 'پیام جدید دریافت شد',
            message: 'شما یک پیام جدید از مدیر سیستم دارید',
            time: '۲ ساعت پیش',
            unread: true
        },
        {
            id: 2,
            title: 'بروزرسانی سیستم',
            message: 'بروزرسانی جدید برای سیستم موجود است',
            time: 'دیروز',
            unread: false
        },
        {
            id: 3,
            title: 'تغییرات پروفایل',
            message: 'پروفایل شما با موفقیت به روز شد',
            time: '۲ روز پیش',
            unread: false
        },
        {
            id: 4,
            title: 'هشدار امنیتی',
            message: 'ورود جدید از دستگاه ناشناس شناسایی شد',
            time: '۳ روز پیش',
            unread: true
        }
    ]);
    
    function handleButtonClick(event) {
        event.stopPropagation();
        onToggle();
    }
    
    function handleMenuClick(event) {
        event.stopPropagation();
    }
    
    function markAsRead(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.unread = false;
        }
    }
    
    function markAllAsRead() {
        notifications.forEach(notification => {
            notification.unread = false;
        });
    }
    
    const unreadCount = $derived(notifications.filter(n => n.unread).length);
</script>

<div class="relative menu-container">
    <button 
        onclick={handleButtonClick}
        class="notification p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative"
        aria-label="نمایش نوتیفیکیشن‌ها"
        aria-expanded={isOpen}
    >
        <i class="fas fa-bell text-xl"></i>
        {#if unreadCount > 0}
            <div class="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
            </div>
        {/if}
    </button>
    
    <!-- منوی نوتیفیکیشن -->
    {#if isOpen}
        <div 
            class="notification-menu absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            onclick={handleMenuClick}
        >
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="font-semibold text-gray-800">نوتیفیکیشن‌ها</h3>
                {#if unreadCount > 0}
                    <button 
                        onclick={markAllAsRead}
                        class="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                    >
                        علامت‌گذاری همه как خوانده شده
                    </button>
                {/if}
            </div>
            
            <div class="max-h-80 overflow-y-auto">
                {#each notifications as notification (notification.id)}
                    <div 
                        class="notification-item p-4 border-b border-gray-100 {notification.unread ? 'bg-blue-50' : ''} cursor-pointer hover:bg-gray-50 transition-colors"
                        onclick={() => markAsRead(notification.id)}
                    >
                        <div class="flex justify-between items-start mb-2">
                            <div class="notification-title font-semibold text-gray-800">
                                {notification.title}
                            </div>
                            {#if notification.unread}
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            {/if}
                        </div>
                        <p class="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div class="notification-time text-xs text-gray-500">{notification.time}</div>
                    </div>
                {:else}
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-bell-slash text-2xl mb-2"></i>
                        <p>هیچ نوتیفیکیشنی وجود ندارد</p>
                    </div>
                {/each}
            </div>
            
            <div class="p-3 border-t border-gray-200 text-center">
                <a href="/notifications" class="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
                    مشاهده همه نوتیفیکیشن‌ها
                </a>
            </div>
        </div>
    {/if}
</div>

<style>
    .notification-menu {
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