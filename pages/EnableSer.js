// import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { FileCheckFill,FileCheck } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import { Toast, ToastContainer } from "react-bootstrap";



const EnanbleSer = ( service ) => {
    
    const { enaTodos,getTodos } = useContext(todoContext)
    const [show, setShow] = useState(false);

    const handleEna = async () => {
        await enaTodos(service.id)
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
            {service.disable ? 
            <FileCheck onClick={() => { handleEna() }} color="red" title="غیرفعال می باشد" />
             : <FileCheckFill onClick={() => { handleEna() }} color="royalblue" title="فعال می باشد" />}

        </>
    )
}


export default EnanbleSer;