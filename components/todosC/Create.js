
import {  useState } from "react";
// import TodoContext from "../../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Row, Col } from "react-bootstrap";
const CreateTodo = () => { 
  // const { createTodos } = useContext(TodoContext)
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
      // await createTodos(title)
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
          <Form.Group as={Col} md="3" controlId="validationTitle">
            <Form.Label>عنوان سرویس:</Form.Label>
            <Form.Control required type="text" className="mx-2" placeholder='عنوان...' />
            <Form.Control.Feedback type="invalid">
              عنوان را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>نوع مخاطب:</Form.Label>
            <Form.Select required aria-label="Default select ">
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
          <Form.Group as={Col} md="3" >
            <Form.Label>آدرس آیکن سرویس:</Form.Label>
            <Form.Control required type="text" className="mx-2" placeholder='آیکن...' />
            <Form.Control.Feedback type="invalid">
              آدرس را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationTitle">
            <Form.Label>URL سرویس/SSO:</Form.Label>
            <Form.Control required type="text" className="mx-2" placeholder='آدرس...' />
            <Form.Control.Feedback type="invalid">
              آدرس URL را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" >
            <Form.Label>دسته بندی:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="">دسته بندی را انتخاب کنید:</option>
              <option value="3">اداری</option>
              <option value="8">آموزشی</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              دسته را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>نوع آیکن:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="">نوع آیکن را انتخاب کنید:</option>
              <option value="3">آدرس داخلی</option>
              <option value="8">آدرس خارجی</option>
              <option value="8">SSO</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              دسته را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationTitle">
            <Form.Label>اندیس مرتب سازی:</Form.Label>
            <Form.Control required type="text" className="mx-2" placeholder='12' />
            <Form.Control.Feedback type="invalid">
              آدرس URL را وارد کنید
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" >
            <Form.Label>دوره:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="3">ابتدایی</option>
              <option value="8">متوسطه اول</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              دوره را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>پایه:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="3">اول</option>
              <option value="8">دوم</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              پایه را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>رشته:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="3">تجربی</option>
              <option value="8">ریاضی</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              رشته را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>ملیت:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="3">ایرانی</option>
              <option value="8">اتباع</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              ملیت را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" >
            <Form.Label>جنسیت:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="3">آقا</option>
              <option value="8">خانم</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
            جنسیت را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>تایم دوره:</Form.Label>
            <Form.Select required aria-label="Default select ">
              <option value="NULL">همه</option>
              <option value="ضمن سال">ضمن سال</option>
              <option value="تابستان">تابستان</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              تایم دوره را انتخاب کنید
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="3" controlId="validationTitle">
            <Form.Label>محدودیت کاربر:</Form.Label>
            <Form.Control required type="text" className="mx-2" placeholder='کاربر' />
            <Form.Control.Feedback type="invalid">
              کاربر را وارد کنید
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
