import { Routes, Route } from "react-router-dom"
import IndexPost from "./Index";
import ShowPost from "./Show";
import CreatePost from "./Create";

const RouterPost = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/:id" element={<ShowPost />} />
        </Routes>
    )
}

export default RouterPost;