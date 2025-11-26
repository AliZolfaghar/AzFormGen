<script>
    import AzModal from '../components/AzModal.svelte';
    import AzInput from '../components/AzInput.svelte';
  import Card from '../components/Card.svelte';
  import Table from '../components/Table.svelte';


    let showModal = $state(false);

    let sampleData = $state([
        { id: 1, name: 'admin',  email: 'admin@local'},
        { id: 2, name: 'tester', email: 'tester@local'},
        { id: 3, name: 'tester', email: 'tester@local'},
        { id: 4, name: 'tester', email: 'tester@local'},
        { id: 5, name: 'tester', email: 'tester@local'},
        { id: 6, name: 'tester', email: 'tester@local'},
    ]);

    let columns = $state([
        { key: 'name', title: 'نام' },
        { key: 'email', title: 'ایمیل' }
    ]);



</script>

<h1>AzModal </h1>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer"
    onclick={()=>{showModal = true}}
    >
    Show AzModal
</button>

<AzModal bind:show={showModal} title="عنوان مدال" width="600px" height="400px" className="rtl" titleClass="text-center bg-gray-200">

    {#each [1,2,3,4,5,6,7,8,9] as num }
        <p class="mb-3">این یک محتوای نمونه برای مدال است.</p>
        <AzInput label="این یک محتوای نمونه برای مدال است." className="mb-3 rtl" dir="rtl"/>
    {/each}
    


    <hr class="mb-3">
    <button 
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded pointer"
    onclick={() => {
        showModal = false ;
    }}> بستن مدال </button>
</AzModal>


<AzInput label="این یک محتوای نمونه برای مدال است." className="mb-3" dir="ltr"/>

<!-- a grid like row and column col-md in bootstrap but with tailwind -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="col-span-1">
        <AzInput label="ستون 1" className="mb-3" dir="ltr"/>
    </div>
    <div class="col-span-1 ">
        <AzInput label="ستون 2" className="mb-3" dir="ltr"/>
    </div>
    <div class="col-span-1">
        <AzInput label="ستون 2" className="mb-3" dir="ltr"/>
    </div>
    <div class="col-span-1">
        <AzInput label="ستون 2" className="mb-3" dir="ltr"/>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="col-span-1">
        <Card 
            title="کارت نمونه" 
            subtitle="این یک کارت است."
            variant="elevated"
            icon="fa-light fa-user fa-2x text-red-600 "
        > 
            {#snippet footer()}
                This id footer
            {/snippet}

            {#snippet actions()}
                <i class="fa fa-save m-1 pointer hover:text-blue-600 text-blue-400"></i>
                <i class="fa fa-trash m-1 pointer hover:text-red-600 text-red-400"></i>
            {/snippet}

            Card Sample
            <hr>
            <button class="btn-primary" > save </button>
        </Card>
    </div>
    <div class="col-span-1 ">
        
    </div>
</div>


<Table 
    data={sampleData} 
    columns={columns} 
    pageSize={3} 
    onAdd={()=>{showModal = true}} 
    onEdit={(data)=>{
        console.log('edit' , data);
        alert('edit')
    }} 
    
    />
