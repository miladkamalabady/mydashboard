
import { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const CreateTodo = () => {
  const { createTodos } = useContext(TodoContext)
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title) {
      setLoading(true)
      await createTodos(title)
      setLoading(false)
      setShow(true)
    }
  }
  return (
    <div className='col-md-12'>
      <ToastContainer position="top-center">
        <Toast dir="rtl" bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body className="text-white ">با موفقیت اضافه شد!</Toast.Body>
        </Toast>
      </ToastContainer>

      <h4>ایجاد:</h4>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label>متن تسک:</Form.Label> */}
          <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} className="mx-2" placeholder='متن...' />
          {!title && <Form.Text className="text-danger">
            متن را وارد کنید
          </Form.Text>}
        </Form.Group>
        <Button className="" variant="primary" type="submit" >

          {loading ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            "ثبت"
          }
        </Button>
      </Form>
      <hr />
    </div>
  );
}

export default CreateTodo;
