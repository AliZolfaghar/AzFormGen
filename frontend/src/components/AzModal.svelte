<script>
    let { 
        show = $bindable(false), 
        width = "500px", 
        // height = "500px", 
        title = "", 
        className = "",
        titleClass = ""
    } = $props();

    let isVisible = $state(false);
    let isMounted = $state(false);

    // تشخیص direction با $derived صحیح
    let direction = $derived(className.includes('rtl') ? 'rtl' : 'ltr');

    // بقیه کدها...
    $effect(() => {
        if (show) {
            isMounted = true;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isVisible = true;
                });
            });
        } else {
            isVisible = false;
            setTimeout(() => {
                isMounted = false;
            }, 300);
        }
    });

    // بستن modal با کلید ESC
    $effect(() => {
        if (!isMounted) return;

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    });

    // جلوگیری از اسکرول body وقتی modal باز است
    $effect(() => {
        if (isMounted) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }

    function handleClose() {
        show = false;
    }
</script>

{#if isMounted}
    <div 
        class="modal-backdrop"
        class:visible={isVisible}
        on:click={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
    >
        <div
            class="modal-content {className}"
            class:visible={isVisible}
            style="width: {width}; "
            on:click|stopPropagation
        >
            {#if title}
                <div class="modal-header {titleClass}" style:direction={direction}>
                    <h2 id="modal-title" class="modal-title">{title}</h2>
                    <button class="close-button" class:rtl={direction === 'rtl'} on:click={handleClose} aria-label="close modal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            {/if}

            <div class="modal-body">
                <slot />
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }

    .modal-backdrop.visible {
        opacity: 1;
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        position: relative;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease-out;
    }

    .modal-content.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .modal-header {
        padding: 18px;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* border-radius only on top corners */
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    .modal-title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        flex: 1;
    }

    .close-button {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
        color: #6b7280;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* موقعیت دکمه برای RTL */
    .close-button.rtl {
        right: auto;
        left: 16px;
    }

    .close-button:hover {
        background-color: #f3f4f6;
        color: #374151;
    }

    .modal-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
    }

    /* اگر header وجود داشته باشد، padding بالای body را کم می‌کنیم */
    .modal-content:has(.modal-header) .modal-body {
        padding-top: 16px;
    }

    /* استایل برای اسکرول بار */
    .modal-body::-webkit-scrollbar {
        width: 6px;
    }

    .modal-body::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    .modal-body::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }

    .modal-body::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
</style>