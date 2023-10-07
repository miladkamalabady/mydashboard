import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-md-12">
                    <h2>خوش آمدید</h2>
                    <p className="mt-4">
                        پنل مدیریت پنجره واحد خدمات الکترونیک آموزش و پرورش
                    </p>
                    <Link to="/todos" className="btn btn-dark">مشاهده آیکن ها</Link>
                </div>
            </div>
        </div >
    )
}

export default Home;