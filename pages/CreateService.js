
import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CreateService = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const { updateTodos, getTodos, todos } = useContext(TodoContext)
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [mokhatab, setmokhatab] = useState(0);
    const [dataId, setdataId] = useState(null);
    const [parentId, setParentId] = useState('');
    const [fileName, setFileName] = useState(null);
    const [data, setData] = useState(null)


    useEffect(() => {
        (() => {
            getTodos()
        })()
    }, [getTodos])
    useEffect(() => {
        (() => {
            setdataId(...todos.filter(e => (e?.id === Number(id))))
            if (dataId) {
                setmokhatab(dataId.typeId)
                setParentId(dataId.parentId)
                if (dataId.popupContent)
                    setData({
                        ...dataId,
                    })
                else
                    setData({
                        ...dataId,
                        popupContent: ""
                    })
            }
        })()
    }, [todos, id, dataId])


    const updateData = e => {
        if (e.target.files && e.target.files[0]) {
            setFileName(readURL(e.target))
        }
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

            await updateTodos({
                "Id": data.id,
                "parentId": data.parentId,
                "title": data.title,
                "url": data.url,
                "icon": data.icon,
                "visible": false,
                "disable": false,
                "orderIndex": data.orderIndex,
                "tootltip": data.title,
                "urlActionType": data.urlActionType,
                "iconType": data.iconType,
                "popupContent": data.popupContent
            })
            setLoading(false)
            // setTimeout(() => {
            //     navigate("/services");
            // }, 2000);
        }
    }
    function readURL(input) {
        if (input.files && input.files[0]) {

            if (input.files[0].type === "image/png" || input.files[0].type === "image/gif" || input.files[0].type === "image/jpg") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    setFileName(e.target.result)
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    }
    return (
        <div className="p-5 mt-1 row">
            <div className='col-md-12'>
                {id && data && dataId ?
                    <div>
                        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>عنوان سرویس:</Form.Label>
                                    <Form.Control required type="text" name="title" onChange={updateData} value={data.title} className="mx-2" placeholder='عنوان...' />
                                    <Form.Control.Feedback type="invalid">
                                        عنوان را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>نوع مخاطب:</Form.Label>
                                    <Form.Select value={data.typeId} onChange={(e) => {
                                        setmokhatab(Number(e.currentTarget.value))
                                        updateData(e)
                                    }
                                    } required name="typeId" size="1"   >
                                        <option value="">یک مخاطب را انتخاب کنید:</option>
                                        <option value="3">فرهنگی رسمی</option>
                                        <option value="8">فرهنگی غیررسمی</option>
                                        <option value="5">دانش آموز</option>
                                        <option value="2">عموم مردم</option>
                                        <option value="10">نونهال</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        مخاطب را انتخاب کنید
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>آدرس آیکن سرویس:</Form.Label>
                                    {/* <Form.Control defaultValue={dataId.icon} required name="icon" type="text" className="mx-2" placeholder='/assets/img/pages/student/icons/kart shenasai.png' /> */}
                                    <Form.Control name="icon" onChange={updateData} accept=".jpg,.png,.gif" type="file" size="sm" />

                                    {fileName ?
                                        <Image src={`${fileName}`} thumbnail style={{ width: '100px', maxWidth: '100px' }} />
                                        :
                                        <Image src={`https://my.medu.ir/${dataId.icon}`} thumbnail style={{ width: '100px', maxWidth: '100px' }} />
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        آدرس را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" >
                                    <Form.Label>نوع آیکن:</Form.Label>
                                    <Form.Select onChange={updateData} value={data.urlActionType} required name="urlActionType" aria-label="Default select ">
                                        <option value="">نوع آیکن را انتخاب کنید:</option>
                                        <option value="3">آدرس داخلی</option>
                                        <option value="5">فایل PDF</option>
                                        <option value="8">آدرس خارجی</option>
                                        <option value="7">SSO</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        نوع آیکن را انتخاب کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>URL سرویس/SSO:</Form.Label>
                                    <Form.Control onChange={updateData} value={data.url} required type="text" name="url" className="mx-2" placeholder='card' />
                                    <Form.Control.Feedback type="invalid">
                                        آدرس URL را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>دسته بندی:</Form.Label>
                                    <Form.Select onChange={e => {
                                        setParentId(e.target.value)
                                        updateData(e)
                                    }
                                    }
                                        value={parentId}
                                        required name="parentId" aria-label="Default select ">
                                        <option value="">دسته بندی را انتخاب کنید:</option>
                                        {
                                            todos.filter(e => (e?.typeId === mokhatab && !e.parentId)).map(function (todo, index) {
                                                return <option key={`cate${index}`} value={todo.id}>{todo.title}</option>
                                            })
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        دسته را انتخاب کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>اندیس مرتب سازی:</Form.Label>
                                    <Form.Control onChange={updateData} value={data.orderIndex} type="number" name="orderIndex" className="mx-2" placeholder='12' />
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>محتوی popup:</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={updateData} value={data.popupContent} name="popupContent" className="mx-2" />
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
                    </div>
                    : id && !dataId ?
                        <div>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                        :
                        <div>خطای دسترسی</div>
                }
                <hr />
            </div>
        </div>
    );
}

export default CreateService;
