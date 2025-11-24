<script>
    import { push, replace } from 'svelte-spa-router';
    
    let countdown = 8;
    
    // تایمر برای هدایت خودکار به صفحه اصلی
    function startCountdown() {
        const timer = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(timer);
                replace('/');
            }
        }, 1000);
    }
    
    startCountdown();
    
    function goToHome() {
        replace('/');
    }
    
    function goToDashboard() {
        replace('/dashboard');
    }
    
    function goBack() {
        window.history.back();
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full text-center">
        <!-- انیمیشن و تصویر -->
        <div class="relative mb-8">
            <div class="w-48 h-48 mx-auto mb-6 relative">
                <!-- دایره‌های متحرک -->
                <div class="absolute inset-0 rounded-full bg-blue-200 animate-ping opacity-20"></div>
                <div class="absolute inset-4 rounded-full bg-blue-300 animate-pulse opacity-30"></div>
                
                <!-- آیکون مرکزی -->
                <div class="absolute inset-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <i class="fas fa-exclamation-triangle text-6xl text-yellow-500"></i>
                </div>
            </div>
            
            <!-- عناصر تزئینی -->
            <div class="absolute -top-4 -left-4 w-8 h-8 bg-red-400 rounded-full opacity-70 animate-bounce"></div>
            <div class="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400 rounded-full opacity-70 animate-bounce" style="animation-delay: 0.2s;"></div>
            <div class="absolute top-1/2 -right-8 w-4 h-4 bg-green-400 rounded-full opacity-70 animate-bounce" style="animation-delay: 0.4s;"></div>
        </div>

        <!-- محتوای اصلی -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-6 transform transition-all duration-300 hover:shadow-2xl">
            <!-- کد خطا -->
            <div class="mb-6">
                <span class="text-8xl font-bold text-gray-800 tracking-wider">404</span>
            </div>

            <!-- عنوان و توضیحات -->
            <h1 class="text-3xl font-bold text-gray-800 mb-4">صفحه مورد نظر یافت نشد!</h1>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است.
            </p>

            <!-- راهنمایی‌ها -->
            <div class="bg-blue-50 border-r-4 border-blue-500 p-4 mb-6 text-right rounded-lg">
                <div class="flex items-start">
                    <i class="fas fa-lightbulb text-yellow-500 text-xl ml-3 mt-1"></i>
                    <div>
                        <h3 class="font-semibold text-blue-800 mb-2">راهنمایی:</h3>
                        <ul class="text-blue-700 text-sm space-y-1 list-disc pr-4">
                            <li>آدرس صفحه را بررسی کنید</li>
                            <li>از نوار جستجو استفاده کنید</li>
                            <li>به صفحه اصلی بازگردید</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- تایمر هدایت خودکار -->
            <div class="mb-6 p-4 bg-gray-100 rounded-lg">
                <p class="text-gray-700">
                    در <span class="font-bold text-blue-600">{countdown}</span> ثانیه دیگر به صورت خودکار به صفحه اصلی هدایت می‌شوید...
                </p>
            </div>

            <!-- دکمه‌های اقدام -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    on:click={goBack}
                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                    <i class="fas fa-arrow-right ml-2"></i>
                    بازگشت به صفحه قبل
                </button>
                
                <button
                    on:click={goToHome}
                    class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                    <i class="fas fa-home ml-2"></i>
                    صفحه اصلی
                </button>
            </div>
        </div>

        <!-- جستجو -->
        <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">صفحه مورد نظر خود را جستجو کنید</h3>
            <div class="flex">
                <input
                    type="text"
                    placeholder="چه چیزی را جستجو می‌کنید؟"
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-lg transition-colors">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>

        <!-- لینک‌های سریع -->
        <div class="bg-white rounded-2xl shadow-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">صفحات پرکاربرد</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button on:click={() => replace('/')} class="p-3 bg-gray-100 hover:bg-blue-100 rounded-lg text-center transition-colors">
                    <i class="fas fa-tachometer-alt text-blue-500 text-xl mb-2"></i>
                    <div class="text-sm font-medium text-gray-700">داشبورد</div>
                </button>
                <button on:click={() => replace('/profile')} class="p-3 bg-gray-100 hover:bg-green-100 rounded-lg text-center transition-colors">
                    <i class="fas fa-user text-green-500 text-xl mb-2"></i>
                    <div class="text-sm font-medium text-gray-700">پروفایل</div>
                </button>
                <button on:click={() => replace('/settings')} class="p-3 bg-gray-100 hover:bg-purple-100 rounded-lg text-center transition-colors">
                    <i class="fas fa-cog text-purple-500 text-xl mb-2"></i>
                    <div class="text-sm font-medium text-gray-700">تنظیمات</div>
                </button>
                <button on:click={() => replace('/help')} class="p-3 bg-gray-100 hover:bg-yellow-100 rounded-lg text-center transition-colors">
                    <i class="fas fa-question-circle text-yellow-500 text-xl mb-2"></i>
                    <div class="text-sm font-medium text-gray-700">راهنما</div>
                </button>
            </div>
        </div>

        <!-- فوتر -->
        <div class="mt-8 text-center">
            <p class="text-sm text-gray-500">
                اگر فکر می‌کنید این یک خطاست، لطفاً با 
                <button on:click={() => replace('/support')} class="text-blue-600 hover:text-blue-800 font-medium">پشتیبانی</button> 
                تماس بگیرید
            </p>
            <p class="text-xs text-gray-400 mt-2">
                © 2024 Suite Admin - خطای 404
            </p>
        </div>
    </div>
</div>

<style>
    :global(.notfound-page) {
        font-family: 'Vazirmatn', sans-serif;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
</style>