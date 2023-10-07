import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const A401 = () => {

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <div className="col-md-12">
          <Alert variant='danger'>
            <h3 className='text-center'>لطفا ابتدا وارد حساب کاربری خود شوید!</h3>
          </Alert>

          <Link to="/" className="btn btn-dark">صفحه اصلی</Link>
        </div>
      </div>
    </div>
  )
}

export default A401;
