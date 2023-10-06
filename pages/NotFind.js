
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const Home = () => {

  return (
    <>
      <h2 className='container'>
      <Link className="nav-link" to="/posts">
        <Button variant="primary">NotFind</Button><br />
        </Link>
      </h2>
    </>
  );
}

export default Home;
