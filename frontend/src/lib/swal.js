import Swal from 'sweetalert2'; 

const success = (message , title ) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "success"
    });

}


const swal = { success }
export default swal ; 

