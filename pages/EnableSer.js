// import { Link } from "react-router-dom";
import { useContext } from "react";
import { FileCheckFill, FileCheck } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";



const EnanbleSer = (service) => {

    const { enaTodos, getTodos,errorp } = useContext(todoContext)


    const handleEna = async () => {
        await enaTodos(service)
        if(!errorp)
        setTimeout(() => {
            getTodos()
        }, 3000);
    }
    return (
        <>
            {service.disable ?
                <FileCheck onClick={() => { handleEna() }} role='button' color="red" title="غیرفعال می باشد" />
                : <FileCheckFill onClick={() => { handleEna() }} role='button' color="royalblue" title="فعال می باشد" />}

        </>
    )
}


export default EnanbleSer;