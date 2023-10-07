
import { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Row, Col } from "react-bootstrap";
const CreateTodo = () => {
  const { createTodos } = useContext(TodoContext)
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity() === false) {

      e.stopPropagation(); setValidated(true);
    }
    else {
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

      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationTitle">
            <Form.Label>عنوان سرویس:</Form.Label>
            <Form.Control required type="text" onChange={(e) => setTitle(e.target.value)} className="mx-2" placeholder='عنوان...' />
            <Form.Control.Feedback type="invalid">
              عنوان را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>نوع مخاطب:</Form.Label>
            <Form.Select required aria-label="Default select example">
              <option value="">یک مخاطب را انتخاب کنید:</option>
              <option value="3">فرهنگی رسمی</option>
              <option value="8">فرهنگی غیررسمی</option>
              <option value="5">دانش آموز</option>
              <option value="2">عموم مردم</option>
              <option value="6">نونهال</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              مخاطب را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>آدرس آیکن سرویس:</Form.Label>
            <Form.Control required type="text" onChange={(e) => setTitle(e.target.value)} className="mx-2" placeholder='آیکن...' />
            <Form.Control.Feedback type="invalid">
              آدرس را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="mt-4" variant="primary" type="submit" >
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
