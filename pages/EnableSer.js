// import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FileCheckFill, FileCheck } from "react-bootstrap-icons";
import todoContext from "../context/TodoContext";
import { Spinner } from "react-bootstrap";



const EnanbleSer = (service) => {
    const [loading, setLoading] = useState(false);
    const { enaTodos, getTodos, errorp } = useContext(todoContext)

    const handleEna = async () => {
        setLoading(true)
        await enaTodos(service)
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
                : service.disable ?
                    <FileCheck onClick={() => { handleEna() }} role='button' color="red" title="غیرفعال می باشد" />
                    : <FileCheckFill onClick={() => { handleEna() }} role='button' color="royalblue" title="فعال می باشد" />}

        </>
    )
}


export default EnanbleSer;