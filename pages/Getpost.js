
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom"
const Getpost = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState(null)
  const { id } = useParams()


  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          response.json()
          .then((data) => {
            setError('')
            setPost(data)
            setLoading(false)
          })
        }
        else {
          setError(response.status)
        }
      })
      
      .catch(err => {
        setError(err.message)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <h2 className='container'>

        {loading && !error && <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
        {error}
        {post && !error &&
          <div>{post.id}={post.title}</div>
        }

      </h2>
    </>
  );
}

export default Getpost;
