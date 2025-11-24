<script>
    import { replace } from 'svelte-spa-router';
    
    let formData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    let isLoading = false;
    
    function handleRegister(event) {
        event.preventDefault();
        isLoading = true;
        
        // شبیه‌سازی ثبت‌نام
        setTimeout(() => {
            isLoading = false;
            replace('/login');
        }, 1500);
    }
    
    function goToLogin() {
        replace('/login');
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
        <div class="text-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                <i class="fas fa-user-plus text-white text-xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">ثبت‌نام</h2>
            <p class="text-gray-600">حساب کاربری جدید ایجاد کنید</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8">
            <form on:submit={handleRegister} class="space-y-4">
                <!-- فیلدها -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        نام کامل
                    </label>
                    <input
                        type="text"
                        bind:value={formData.name}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="نام و نام خانوادگی"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل
                    </label>
                    <input
                        type="email"
                        bind:value={formData.email}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="example@domain.com"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        رمز عبور
                    </label>
                    <input
                        type="password"
                        bind:value={formData.password}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        تکرار رمز عبور
                    </label>
                    <input
                        type="password"
                        bind:value={formData.confirmPassword}
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {#if isLoading}
                        <i class="fas fa-spinner fa-spin ml-2"></i>
                        در حال ثبت‌نام...
                    {:else}
                        ثبت‌نام
                    {/if}
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    قبلا ثبت‌نام کرده‌اید؟
                    <button on:click={goToLogin} class="text-blue-600 hover:text-blue-800 font-medium mr-1">
                        وارد شوید
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>