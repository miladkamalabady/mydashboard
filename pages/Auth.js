import { useContext, useEffect, useState } from "react";
import "./Auth.css"
import { Button, Card, Form, Spinner } from "react-bootstrap";
import todoContext from "../context/TodoContext";
import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router";


const Auth = (props) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { User,checkAuth } = useContext(todoContext)

  const updateData = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation(); setValidated(true);
    }
    else {
      setLoading(true)
      await checkAuth({
        "username": data.username,
        "password": data.password,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(User);
  }, [User]);

  return (
    <div className="Auth-form-container">
      <Card className="p-4">
        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>

          <div className="Auth-form-content">
            <h3 className="Auth-form-title">ورود</h3>

            <Form.Group controlId="validationTitle">
              <Form.Label>نام کاربری:</Form.Label>
              <Form.Control required type="text" name="username" onChange={updateData} className="mx-2" placeholder='نام کاربری...' />
              <Form.Control.Feedback type="invalid">
                نام کاربری را وارد کنید
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationTitle">
              <Form.Label>رمز عبور:</Form.Label>
              <Form.Control required type="text" name="password" onChange={updateData} className="mx-2" placeholder='رمز عبور...' />
              <Form.Control.Feedback type="invalid">
                رمز عبور را وارد کنید
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit" >
              {loading ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                "ورود"
              }
            </Button>
          </div>
        </Form>
      </Card>
    </div >
  )
}
export default Auth;
