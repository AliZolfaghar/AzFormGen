<script>
    import Card from '../lib/Card.svelte';
</script>


<div class="p-6 space-y-6">
    <!-- کارت ساده -->
    <Card title="کارت ساده">
        <p class="text-gray-600">این یک کارت ساده است که محتوای دلخواه در آن قرار می‌گیرد.</p>
    </Card>
    
    <!-- کارت با آیکون -->
    <Card 
        title="کارت با آیکون" 
        subtitle="این کارت دارای آیکون و زیرعنوان است"
        icon="user"
    >
        <p class="text-gray-600">محتوای اصلی کارت در اینجا قرار می‌گیرد.</p>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            دکمه نمونه
        </button>
    </Card>
    
    

    
    <!-- کارت بدون هدر -->
    <Card showHeader={false}>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">کارت بدون هدر پیش‌فرض</h3>
        <p class="text-gray-600">این کارت هدر پیش‌فرض ندارد و می‌توانید هدر دلخواه خود را ایجاد کنید.</p>
    </Card>
    
    <!-- کارت با استایل‌های مختلف -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
            title="کارت معمولی" 
            variant="elevated"
        >
            <p class="text-gray-600">استایل پیش‌فرض با سایه ملایم !!</p>
        </Card>
        
        <Card 
            title="کارت Elevated" 
            variant="default"
        >
            <p class="text-gray-600">استایل با سایه بیشتر</p>
        </Card>
        
        <Card 
            title="کارت Bordered" 
            variant="bordered"
        >
            <p class="text-gray-600">استایل با border ضخیم</p>
        </Card>
        
        <Card 
            title="کارت Flat" 
            variant="flat"
        >
            <p class="text-gray-600">استایل بدون سایه با background روشن</p>
        </Card>
    </div>
    
    <!-- کارت با actions -->
    <Card 
        title="کارت با Actions"
        icon="user"
        subtitle="این کارت دارای دکمه‌های action است">

        {#snippet footer()}
            <p>Footer</p>
        {/snippet}

        {#snippet actions()}            
            <div>
                <button class="text-gray-500 hover:text-gray-700 p-2 rounded" aria-label="edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-gray-500 hover:text-red-500 p-2 rounded" aria-label="delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        {/snippet}

        <p class="text-gray-600">این کارت دارای دکمه‌های action در هدر است.</p>
    </Card>
    
</div>