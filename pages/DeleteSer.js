// import { Link } from "react-router-dom";
import { useContext } from "react";
import { Trash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import Swal from "sweetalert2";


const DeleteSer = ({ serviceId }) => {
    const { deleteTodos, getTodos, error } = useContext(todoContext)



    const handleDelete = (serviceId) => {
        Swal.fire({
            title: 'آیا نسبت به حذف آیکن اطمینان دارید؟',
            text: "در صورت اشتباه عمل بازگردانی تنها از طریق دیتابیس مقدور خواهد بود!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله!',
            cancelButtonText: 'لغو',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteTodos(serviceId)
                if (error === null) {
                    setTimeout(() => {
                        getTodos()
                    }, 3000);
                }
            }
        })




    }
    return (
        <>
            <Trash role='button' onClick={() => { handleDelete(serviceId) }} color="red" title="حذف" />
        </>
    )
}


export default DeleteSer;