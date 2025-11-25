<script>
    import { onMount } from "svelte";
    import { replace } from "svelte-spa-router";


    onMount(() => {
        localStorage.removeItem('authToken');
        replace('/login');
    })

</script>