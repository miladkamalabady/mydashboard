// import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { EyeFill, EyeSlash } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import { Spinner } from "react-bootstrap";



const VisibleSer = (service) => {
    const [loading, setLoading] = useState(false);
    const { visibleTodos, getTodos, errorp } = useContext(todoContext)

    const handleEna = async () => {
        setLoading(true)
        await visibleTodos(service)
        if (!errorp)
            setTimeout(() => {
                getTodos()
                setLoading(false)
            }, 3000);
    }
    return (
        <>
            {loading ? <div className="col-md-12">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
                :  service.visible ?
                    <EyeFill role='button' onClick={() => { handleEna() }} color="white" title="درحال نمایش می باشد" /> :
                    <EyeSlash role='button' onClick={() => { handleEna() }} color="yellow" title="مخفی می باشد" />
            }

        </>
    )
}


export default VisibleSer;