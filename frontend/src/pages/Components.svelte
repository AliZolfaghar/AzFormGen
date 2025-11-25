<script>
    import AzModal from '../components/AzModal.svelte';
    import AzInput from '../components/AzInput.svelte';


    let showModal = $state(false);



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
