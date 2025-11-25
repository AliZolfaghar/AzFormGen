<script>
    import { replace } from 'svelte-spa-router';
    
    let email = $state('');
    let password = $state('');
    let rememberMe = $state(false);
    let isLoading = $state(false);
    let errorMessage = $state('');
    
    async function handleLogin(event) {
        event?.preventDefault();
        isLoading = true;
        errorMessage = '';
        
        try {
            // شبیه‌سازی لاگین
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // در حالت واقعی اینجا API call می‌زنید
            if (email === 'admin@example.com' && password === 'password') {
                replace('/');
            } else {
                errorMessage = 'ایمیل یا رمز عبور اشتباه است';
            }
        } catch (error) {
            errorMessage = 'خطا در ارتباط با سرور';
        } finally {
            isLoading = false;
        }
    }
    
    function goToHome() {
        replace('/');
    }
    
    function goToRegister() {
        replace('/register');
    }
    
    function goToForgotPassword() {
        replace('/forgot-password');
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
        <!-- هدر -->
        <div class="text-center mb-8">
            <div class="flex items-center justify-center mb-4 cursor-pointer" onclick={goToHome}>
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <i class="fas fa-shield-alt text-white text-xl"></i>
                </div>
                <h1 class="text-2xl font-bold text-gray-800 mr-3">Suite Admin</h1>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">ورود به سیستم</h2>
        </div>

        <!-- کارت لاگین -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
            <div class="space-y-6">
                <!-- پیغام خطا -->
                {#if errorMessage}
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-500 ml-2"></i>
                            <span class="text-red-700 text-sm">{errorMessage}</span>
                        </div>
                    </div>
                {/if}
                
                <!-- فیلد ایمیل -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-envelope ml-2 text-gray-400"></i>
                        آدرس ایمیل
                    </label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="example@domain.com"
                        disabled={isLoading}
                    />
                </div>
                
                <!-- فیلد رمز عبور -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-lock ml-2 text-gray-400"></i>
                        رمز عبور
                    </label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
                </div>
                
                <!-- Remember me و فراموشی رمز -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input
                            type="checkbox"
                            bind:checked={rememberMe}
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ml-2"
                            disabled={isLoading}
                        />
                        <span class="text-sm text-gray-600">مرا به خاطر بسپار</span>
                    </label>
                
                    <button 
                        type="button"
                        onclick={goToForgotPassword}
                        class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        disabled={isLoading}
                    >
                        رمز عبور را فراموش کرده‌اید؟
                    </button>
                </div>
                
                <!-- دکمه ورود -->
                <button
                    type="button"
                    onclick={handleLogin}
                    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {#if isLoading}
                        <i class="fas fa-spinner fa-spin ml-2"></i>
                        در حال ورود...
                    {:else}
                        <i class="fas fa-sign-in-alt ml-2"></i>
                        ورود به سیستم
                    {/if}
                </button>
            </div>
            
            <!-- جداکننده -->
            <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">یا ثبت نام</span>
                    </div>
                </div>

                <!-- دکمه‌های ورود با شبکه‌های اجتماعی -->
                <div class="mt-4 grid grid-cols-2 gap-3 hidden">
                    <button
                        type="button"
                        class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        <i class="fab fa-google text-red-500 ml-2"></i>
                        Google
                    </button>
                    <button
                        type="button"
                        class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isLoading}
                    >
                        <i class="fab fa-microsoft text-blue-500 ml-2"></i>
                        Microsoft
                    </button>
                </div>
            </div>

            <!-- لینک ثبت‌نام -->
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    حساب کاربری ندارید؟
                    <button 
                        onclick={goToRegister}
                        class="text-blue-600 hover:text-blue-800 font-medium transition-colors mr-1"
                        disabled={isLoading}
                    >
                        ثبت‌نام کنید
                    </button>
                </p>
            </div>
        </div>

        <!-- فوتر -->
        <div class="mt-8 text-center">
            <p class="text-xs text-gray-500">
                © 2024 Suite Admin. تمامی حقوق محفوظ است.
            </p>
        </div>
    </div>
</div>

<style>
    :global(.login-page) {
        font-family: 'Vazirmatn', sans-serif;
    }
    
    input:focus {
        outline: none;
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>