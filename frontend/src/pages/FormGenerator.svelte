<script>
    import { onMount } from "svelte";
    import axiosInstance from "../lib/axios";
    import swal from "../lib/swal";
    import toast from "../lib/toast";

    import alerts from '../lib/swalmix'


    let list = $state([]);
    const loadList = async () => {
        try {
            let response = await axiosInstance.get('/v1/forms')
            list = response.data ; 
            // swal.success('load ok ' , ' foo bar')
            // toast.success('lalalalala')
            // showModal('load ok ', 'foo bar');

// alerts.success("عملیات موفق بود", "موفقیت");
// alerts.warning("این یک هشدار است", "هشدار");
// alerts.info("اطلاعات جدید موجود است", "اطلاع رسانی");
// alerts.error("خطایی رخ داد", "خطا");

// alerts.toastSuccess("ذخیره شد");
// alerts.toastWarning("مراقب باشید");
// alerts.toastInfo("به‌روزرسانی انجام شد");
// alerts.toastError("خطا در ذخیره‌سازی");

const result = await alerts.prompt("اطلاعات کاربر", [
    { name: "username", placeholder: "نام کاربری" },
    { name: "email", placeholder: "ایمیل", type: "email" },
    { name: "age", placeholder: "سن", type: "number" } ,
    //  check box list
    { name: "gender", placeholder: "جنسیت", type: "select", options: ["مرد", "زن"] }
  ]);

  if (result.isConfirmed) {
    console.log("مقادیر:", result.values); // آرایه‌ای از مقادیر inputها
    alerts.toastSuccess("ذخیره شد");
  } else {
    console.log("کاربر انصراف داد");
    alerts.toastError("عملیات لغو شد");
  }


        } catch (error) {
            console.log(error)
            // swal.success('foo')
        }
    }; 

    onMount(()=>{
        loadList();
    })

</script>
form generator