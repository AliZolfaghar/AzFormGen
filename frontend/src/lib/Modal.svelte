<script>
    let {
        isOpen = $bindable(false),
        children,
        title,
        width = 'max-w-md',
        backdropOpacity = 0.5
    } = $props();

    let isVisible = $state(false);
    let isMounted = $state(false);

    // مدیریت انیمیشن‌ها
    $effect(() => {
        if (isOpen) {
            isMounted = true;
            // تاخیر کوچک برای شروع انیمیشن
            setTimeout(() => {
                isVisible = true;
            }, 10);
        } else {
            isVisible = false;
            // منتظر می‌مانیم تا انیمیشن خروج تمام شود
            setTimeout(() => {
                isMounted = false;
            }, 300);
        }
    });

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            isOpen = false;
        }
    }

    function handleModalClick(event) {
        event.stopPropagation();
    }

    function handleClose() {
        isOpen = false;
    }
</script>

{#if isMounted}
    <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
        class:fade-in={isVisible}
        class:fade-out={!isVisible}
        style="background-color: rgba(0, 0, 0, {backdropOpacity});"
        onclick={handleBackdropClick}
    >
        <div 
            class="bg-white rounded-lg shadow-xl w-full {width} max-h-[90vh] overflow-hidden modal-content"
            class:fade-in-down={isVisible}
            class:fade-out-up={!isVisible}
            onclick={handleModalClick}
        >
            <!-- هدر مودال -->
            {#if title}
                <div class="flex items-center justify-between p-4 border-b border-gray-200">
                    <div class="text-lg font-semibold text-gray-900">
                        {title}
                    </div>
                    <button
                        onclick={handleClose}
                        class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                    >
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>
            {/if}

            <!-- محتوای اصلی -->
            <div class="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                {@render children()}
            </div>
        </div>
    </div>
{/if}

<style>
    /* انیمیشن‌های backdrop */
    .modal-backdrop {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .modal-backdrop.fade-in {
        opacity: 1;
    }

    .modal-backdrop.fade-out {
        opacity: 0;
    }

    /* انیمیشن‌های محتوای مودال */
    .modal-content {
        opacity: 0;
        transform: translateY(-50px);
        transition: all 0.3s ease-in-out;
    }

    /* fadeInDown - ورود از بالا با opacity */
    .modal-content.fade-in-down {
        opacity: 1;
        transform: translateY(0);
    }

    /* fadeOutUp - خروج به بالا با opacity */
    .modal-content.fade-out-up {
        opacity: 0;
        transform: translateY(-50px);
    }
</style>