<script>
    let { 
        label = "Label", 
        value = $bindable(), 
        className = "", 
        dir = "auto", // جهت جدید برای پشتیبانی از RTL/LTR
        ...rest 
    } = $props();
</script>

<div class="input-container {className}" dir={dir}>
    <div class="input-wrapper">
        <input
            type="text"
            id={label}
            name={label}
            {...rest}
            class="custom-input peer"
            placeholder=" "
            bind:value
            dir={dir}
        />
        <label
            for={label}
            class="input-label"
            >{label}</label
        >
    </div>
</div>

<style>
    .input-container {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        width: 100%;
        /* max-width: 400px; */
    }
    
    .input-wrapper {
        position: relative;
        width: 100%;
    }
    
    .custom-input {
        width: 100%;
        height: 46px;
        padding: 16px 16px 16px 16px;
        font-size: 16px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        background-color: #ffffff;
        transition: all 0.2s ease-in-out;
        outline: none;
        box-sizing: border-box;
        text-align: start; /* برای پشتیبانی خودکار از راست به چپ و چپ به راست */
    }
    
    .custom-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .custom-input:hover:not(:focus) {
        border-color: #94a3b8;
    }
    
    .custom-input::placeholder {
        color: transparent;
    }
    
    .input-label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        font-size: 16px;
        pointer-events: none;
        transition: all 0.2s ease-in-out;
        background-color: #ffffff;
        padding: 0 4px;
        
        /* پشتیبانی از RTL و LTR */
        left: 16px;
        right: auto;
    }
    
    /* استایل برای RTL */
    .input-container[dir="rtl"] .input-label {
        left: auto;
        right: 16px;
    }
    
    .custom-input:focus + .input-label,
    .custom-input:not(:placeholder-shown) + .input-label {
        top: 0;
        font-size: 12px;
        color: #3b82f6;
        font-weight: 500;
    }
    
    .custom-input:disabled {
        background-color: #f8fafc;
        color: #94a3b8;
        cursor: not-allowed;
    }
    
    .custom-input:disabled + .input-label {
        color: #94a3b8;
    }
    
    .custom-input.error {
        border-color: #ef4444;
    }
    
    .custom-input.error:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .custom-input.error + .input-label {
        color: #ef4444;
    }
</style>