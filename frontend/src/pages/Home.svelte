<script>
    import { onMount } from 'svelte';
//   import Card from '../lib/Card.svelte';
    import CardStory from '../samples/Card.stories.svelte'
    import ModalStory from '../samples/Modal.stories.svelte'
    import Modal from '../lib/Modal.svelte';
  import Table from '../components/Table.svelte';
  import AzModal from '../components/AzModal.svelte';
    
    let chart;
    
    onMount(() => {
        // اینجا می‌توانید chart.js را initialize کنید
        console.log('Home component mounted');
    });



    let showTestModal = $state(false);
    const showModal = () =>{
        console.log('show modal');
        showTestModal = true;
    }

    




      
    // داده‌های نمونه
    let sampleData = $state([
        { id: 1, name: 'علی محمدی', email: 'ali@example.com', age: 28, status: 'فعال', createdAt: '2024-01-15' },
        { id: 2, name: 'فاطمه احمدی', email: 'fatemeh@example.com', age: 32, status: 'غیرفعال', createdAt: '2024-01-14' },
        { id: 3, name: 'محمد رضایی', email: 'mohammad@example.com', age: 25, status: 'فعال', createdAt: '2024-01-13' },
        { id: 4, name: 'زهرا کریمی', email: 'zahra@example.com', age: 29, status: 'فعال', createdAt: '2024-01-12' },
        { id: 5, name: 'حسین نجفی', email: 'hossein@example.com', age: 35, status: 'غیرفعال', createdAt: '2024-01-11' },
        { id: 6, name: 'مریم قربانی', email: 'maryam@example.com', age: 27, status: 'فعال', createdAt: '2024-01-10' },
        { id: 7, name: 'رضا موسوی', email: 'reza@example.com', age: 31, status: 'فعال', createdAt: '2024-01-09' },
        { id: 8, name: 'سارا امینی', email: 'sara@example.com', age: 26, status: 'غیرفعال', createdAt: '2024-01-08' },
        { id: 9, name: 'امیر حسینی', email: 'amir@example.com', age: 33, status: 'فعال', createdAt: '2024-01-07' },
        { id: 10, name: 'نازنین محمودی', email: 'nazanin@example.com', age: 30, status: 'فعال', createdAt: '2024-01-06' },
        { id: 11, name: 'کامران یزدانی', email: 'kamran@example.com', age: 29, status: 'غیرفعال', createdAt: '2024-01-05' },
        { id: 12, name: 'لیلا جعفری', email: 'leila@example.com', age: 24, status: 'فعال', createdAt: '2024-01-04' }
    ]);

    // تعریف ستون‌ها
    const columns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'نام کامل' },
        { key: 'email', title: 'ایمیل' },
        { key: 'age', title: 'سن' },
        
        { key: 'createdAt', title: 'تاریخ ایجاد' }
    ];

    // توابع عملیات
    function handleAdd() {
        alert('افزودن آیتم جدید');
    }

    function handleEdit(item) {
        alert(`ویرایش آیتم: ${item.name}`);
    }

    function handleDelete(item) {
        alert(`حذف آیتم: ${item.name}`);
        // در حالت واقعی اینجا داده را از آرایه حذف می‌کنید
        // sampleData = sampleData.filter(i => i.id !== item.id);
    }



    let _showAzModal = $state(false);
    const showAzModal = () => {
        _showAzModal = true;
    }

</script>


<!--  -->
<button
    onclick={showModal}    
class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"> show modal </button>



<button
    onclick={showAzModal}    
class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"> show AzModal </button>
{_showAzModal}


<AzModal 
    bind:show={_showAzModal} 
    title="test"
    className="rtl"
    titleClass="text-center "
    
    
    
    >
    <br /> 

    test

    <br /><br /><br />
    <button onclick={() => {
        _showAzModal = false ; 
    }}> close </button>
</AzModal>





<Modal bind:isOpen={showTestModal} title="نمونه مدال" width="max-w-2xl">

    {#each [1,2,3,4,5,6,7,8,9] as num}
        <div class="p-4 bg-gray-100 rounded-lg mb-2">
            <p class="text-gray-700">محتوای نمونه {num}</p>
        </div>
        
    {/each}

    <button
    onclick={()=>{
        showTestModal = false ; 
    }}
    class="bg-green-100 hover:bg-green-300 py-3 px-3 rounded-lg">close</button>
</Modal>


<div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">جدول داده‌ها با قابلیت‌های کامل</h1>

    <Table
        data={sampleData}
        columns={columns}
        pageSize={3}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
    />

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="font-semibold text-blue-800 mb-2">ویژگی‌های این کامپوننت:</h3>
        <ul class="list-disc list-inside text-blue-700 space-y-1">
            <li>جستجوی سریع در تمام ستون‌ها</li>
            <li>مرتب‌سازی با کلیک روی هدر ستون‌ها</li>
            <li>صفحه‌بندی client-side</li>
            <li>قابلیت سفارشی‌سازی رندر سلول‌ها</li>
            <li>دکمه‌های عملیات (افزودن، ویرایش، حذف)</li>
            <li>طراحی واکنش‌گرا</li>
        </ul>
    </div>
</div>



<!-- <ModalStory></ModalStory> -->



<div class="p-6">
    <!-- کارت اصلی وسط صفحه -->
    <div class="flex justify-center items-center min-h-[70vh]">
        <div class="bg-white rounded-xl shadow-sm p-8 max-w-2xl w-full text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-check text-green-500 text-3xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800 mb-4">به داشبورد Suite Admin خوش آمدید</h1>
            <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                این یک قالب ادمین دشبورد مدرن و واکنش‌گرا است که با Tailwind CSS طراحی شده است. 
                شما می‌توانید از منوی سایدبار برای دسترسی به بخش‌های مختلف سیستم استفاده کنید.
            </p>
            <div class="bg-blue-50 border-r-4 border-blue-500 p-4 mb-6 text-right rounded">
                <p class="text-blue-700">
                    <strong>توجه:</strong> سایدبار سمت راست قابل جمع‌شدن است و منوها به صورت آکاردئونی کار می‌کنند.
                    همچنین می‌توانید از منوهای کاربر و نوتیفیکیشن در هدر استفاده کنید.
                </p>
            </div>
            <div class="flex justify-center space-x-4 ">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-sm">
                    شروع کار
                </button>
                <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    مشاهده مستندات
                </button>
            </div>
        </div>
    </div>
</div>


<CardStory></CardStory>




<style>
    :global(.card) {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
</style>