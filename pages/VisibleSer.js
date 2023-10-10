// import { Link } from "react-router-dom";
import { useContext } from "react";
import { EyeFill, EyeSlash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";



const VisibleSer = (service) => {

    const { visibleTodos, getTodos,errorp } = useContext(todoContext)

    const handleEna = async () => {
        await visibleTodos(service)
        if(!errorp)
        setTimeout(() => {
            getTodos()
        }, 3000);
        
    }
    return (
        <>
            {service.visible ?
                <EyeFill role='button' onClick={() => { handleEna() }} color="royalblue" title="درحال نمایش می باشد" /> :
                 <EyeSlash role='button' onClick={() => { handleEna() }} color="royalblue" title="مخفی می باشد" />
            }

        </>
    )
}


export default VisibleSer;