// import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { EyeFill, EyeSlash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import { Toast, ToastContainer } from "react-bootstrap";



const VisibleSer = (service) => {

    const { visibleTodos, getTodos } = useContext(todoContext)
    const [show, setShow] = useState(false);

    const handleEna = async () => {
        await visibleTodos(service.id)
        setShow(true)
        setTimeout(() => {
            getTodos()
          }, 1000);
        
    }
    return (
        <>
            <ToastContainer position="top-center">
                <Toast dir="rtl" bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body className="text-white ">با موفقیت تغییر کرد!</Toast.Body>
                </Toast>
            </ToastContainer>
            {service.visible ?
                <EyeFill onClick={() => { handleEna() }} color="royalblue" title="درحال نمایش می باشد" /> : <EyeSlash onClick={() => { handleEna() }} color="royalblue" title="مخفی می باشد" />
            }

        </>
    )
}


export default VisibleSer;