<script>
    let { 
        title, 
        subtitle, 
        icon, 
        padding = 'p-6', 
        headerClass = '', 
        bodyClass = '',
        variant = 'default',
        showHeader = true,
        children,
        actions,
        footer
    } = $props();
    
    // کلاس‌های پیش‌فرض برای استایل‌های مختلف
    const variantClasses = {
        default: 'bg-white border border-gray-200 rounded-lg shadow-sm',
        elevated: 'bg-white border border-gray-200 rounded-lg shadow-lg',
        bordered: 'bg-white border-2 border-gray-300 rounded-lg',
        flat: 'bg-gray-50 border border-gray-100 rounded-lg'
    };
</script>

<div class="card {variantClasses[variant]} {padding}">
    {#if showHeader && (title || icon || subtitle || actions)}
        <div class="card-header mb-4 {headerClass}">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3 ">
                    {#if icon}
                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-{icon} text-blue-600"></i>
                        </div>
                    {/if}
                    <div>
                        {#if title}
                            <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
                        {/if}
                        {#if subtitle}
                            <p class="text-sm text-gray-500 mt-1">{subtitle}</p>
                        {/if}
                    </div>
                </div>
                
                <!-- actions -->
                {#if actions}
                    <div class="flex items-center space-x-2 space-x-reverse">
                        {@render actions()}
                    </div>
                {/if}
            </div>
        </div>
    {/if}
    
    <!-- محتوای اصلی -->
    <div class="card-body {bodyClass}">
        {@render children()}
    </div>
    
    <!-- فوتر -->
    {#if footer}
        <div class="card-footer mt-6 pt-6 border-t border-gray-200">
            {@render footer()}
        </div>
    {/if}
</div>

<style>
    .card {
        transition: all 0.2s ease-in-out;
    }
    
    .card:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
</style>