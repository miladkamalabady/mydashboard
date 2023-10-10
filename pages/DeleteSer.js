// import { Link } from "react-router-dom";
import { useContext } from "react";
import { Trash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";


const DeleteSer = ({ serviceId }) => {
    const { deleteTodos,getTodos } = useContext(todoContext)
 
    

    const handleDelete = async (serviceId) => {
        await deleteTodos(serviceId)
        
        setTimeout(() => {
            getTodos()
          }, 3000);
        
    }
    return (
        <>
            <Trash role='button' onClick={() => { handleDelete(serviceId) }} color="red" title="حذف" />
        </>
    )
}


export default DeleteSer;