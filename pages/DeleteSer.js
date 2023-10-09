// import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { Trash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import { Toast, ToastContainer } from "react-bootstrap";


const DeleteSer = ({ serviceId }) => {
    const { deleteTodos,getTodos } = useContext(todoContext)
    const [show, setShow] = useState(false);

    

    const handleDelete = async (serviceId) => {
        await deleteTodos(serviceId)
        
        setShow(true)
        setTimeout(() => {
            getTodos()
          }, 1000);
        
    }
    return (
        <>
            <ToastContainer position="top-center">
                <Toast dir="rtl" bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body className="text-white ">با موفقیت حذف شد!</Toast.Body>
                </Toast>
            </ToastContainer>
            <Trash onClick={() => { handleDelete(serviceId) }} color="red" title="حذف" />
        </>
    )
}


export default DeleteSer;