
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const Getposts = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [posts, setPosts] = useState(null)
  
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => {
    setError('')
    setPosts(data)
    setLoading(false)
  })
  .catch(err=>{
    setError(err.message)
  });
},[])

  return (
    <>
    
      <h2 className='container'>

       { loading && !error && <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
{error}
       {posts && !error && posts.map((post,index)=>(
        <Link key={index} className="nav-link" to={`/post/${post.id}`}>
        <Button variant="primary">{post.id}</Button><br />
        </Link>
       ))}
       
      </h2>
    </>
  );
}

export default Getposts;
