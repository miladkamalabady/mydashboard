import { useParams } from "react-router-dom";

const ShowPost = () => {
    const { id } = useParams();

    return (
        <h1>Show Post - {id}</h1>
    )
}

export default ShowPost;