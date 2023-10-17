
import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CreateService = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { createTodos, getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType,
        GenderTypes, Majors, StageType, TimeDoreType, SchoolModalityType, GradeTypes, getTodos, todos } = useContext(TodoContext)
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [mokhatab, setmokhatab] = useState(0);
    const [dataId, setdataId] = useState([]);
    const [multiSelectionsMaghta, setMultiSelectionsMaghta] = useState([]);
    const [multiSelectionsPaye, setMultiSelectionsPaye] = useState([]);
    const [multiSelectionsMajor, setMultiSelectionsMajor] = useState([]);
    const [multiSelectionsTime, setMultiSelectionsTime] = useState([]);
    const [multiSelectionsSchool, setMultiSelectionsSchool] = useState([]);
    useEffect(() => {
        (() => {
            getGenderTypes()
            getGradeTypes()
            getMajors()
            getStageType()
            getTimeDoreType()
            getSchoolModalityType()
            getTodos()
        })()
    }, [getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType, getTodos])
    useEffect(() => {
        (() => {
            setdataId(...todos.filter(e => (e.id === Number(id))))
            if (dataId)
                setmokhatab(dataId.typeId)
        })()
    }, [todos, id, dataId])
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation(); setValidated(true);
        }
        else {
            setLoading(true)
            await createTodos(form)
            setLoading(false)
            setTimeout(() => {
                navigate("/services");
            }, 2000);
        }
    }

    return (
        <div className="p-5 mt-1 row">
            <div className='col-md-12'>
                {id && dataId ?
                    <div>
                        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>عنوان سرویس:</Form.Label>
                                    <Form.Control required type="text" name="title" defaultValue={dataId.title} className="mx-2" placeholder='عنوان...' />
                                    <Form.Control.Feedback type="invalid">
                                        عنوان را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>نوع مخاطب:</Form.Label>
                                    <Form.Select defaultValue={dataId.typeId} onChange={(e) => setmokhatab(Number(e.currentTarget.value))} required name="typeId" size="1"   >
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
                                    <Form.Control defaultValue={dataId.icon} required name="icon" type="text" className="mx-2" placeholder='/assets/img/pages/student/icons/kart shenasai.png' />
                                    <Form.Control.Feedback type="invalid">
                                        آدرس را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" >
                                    <Form.Label>نوع آیکن:</Form.Label>
                                    <Form.Select defaultValue={dataId.urlActionType} required name="urlActionType" aria-label="Default select ">
                                        <option value="">نوع آیکن را انتخاب کنید:</option>
                                        <option value="3">آدرس داخلی</option>
                                        <option value="8">آدرس خارجی</option>
                                        <option value="7">SSO</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        نوع آیکن را انتخاب کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>URL سرویس/SSO:</Form.Label>
                                    <Form.Control defaultValue={dataId.url} required type="text" name="url" className="mx-2" placeholder='card' />
                                    <Form.Control.Feedback type="invalid">
                                        آدرس URL را وارد کنید
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>دسته بندی:</Form.Label>
                                    <Form.Select defaultValue={dataId.parentId} required name="parentId" aria-label="Default select ">
                                        <option value="">دسته بندی را انتخاب کنید:</option>
                                        {
                                            todos.filter(e => (e.typeId === mokhatab && !e.parentId)).map(function (todo, index) {
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
                                    <Form.Control defaultValue={dataId.orderIndex} type="number" name="orderIndex" className="mx-2" placeholder='12' />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                {mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>مقطع:</Form.Label>
                                        <Typeahead
                                            id="maghta"
                                            labelKey="text"
                                            name="maghta"
                                            multiple
                                            onChange={setMultiSelectionsMaghta}
                                            options={StageType}
                                            placeholder="مقطع/مقاطع را انتخاب کنید"
                                            selected={multiSelectionsMaghta}
                                        />
                                        {/* <Form.Select required name="maghta" aria-label="Default select ">
                                    <option value="">همه</option>
                                    {
                                        StageType.map(function (Stage) {
                                            return <option key={Stage.value} value={Stage.value}>{Stage.text}</option>
                                        })
                                    }
                                </Form.Select> */}
                                        <Form.Control.Feedback type="invalid">
                                            مقطع را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }{mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>پایه:</Form.Label>
                                        <Typeahead
                                            id="payeh"
                                            labelKey="text"
                                            name="payeh"
                                            multiple
                                            onChange={setMultiSelectionsPaye}
                                            options={GradeTypes}
                                            placeholder="پایه/پایه ها را انتخاب کنید"
                                            selected={multiSelectionsPaye}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            پایه را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }{mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>رشته:</Form.Label>
                                        <Typeahead
                                            id="Major"
                                            labelKey="title"
                                            name="Major"
                                            multiple
                                            onChange={setMultiSelectionsMajor}
                                            options={Majors}
                                            placeholder="رشته/رشته ها را انتخاب کنید"
                                            selected={multiSelectionsMajor}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            رشته را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }{mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>ملیت:</Form.Label>
                                        <Form.Select aria-label="Default select ">
                                            <option value="">همه</option>
                                            <option value="3">ایرانی</option>
                                            <option value="8">اتباع</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            ملیت را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }{mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>تایم دوره:</Form.Label>
                                        <Typeahead
                                            id="TimeDoreType"
                                            labelKey="text"
                                            name="TimeDoreType"
                                            multiple
                                            onChange={setMultiSelectionsTime}
                                            options={TimeDoreType}
                                            placeholder="تایم دوره را انتخاب کنید"
                                            selected={multiSelectionsTime}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            تایم دوره را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }{mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>نوع مدرسه:</Form.Label>
                                        <Typeahead
                                            id="SchoolModalityType"
                                            labelKey="text"
                                            name="SchoolModalityType"
                                            multiple
                                            onChange={setMultiSelectionsSchool}
                                            options={SchoolModalityType}
                                            placeholder="نوع مدرسه را انتخاب کنید"
                                            selected={multiSelectionsSchool}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            نوع مدرسه را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }
                            </Row>
                            <Row className="mb-3">
                                {(mokhatab === 3 || mokhatab === 8) &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>پست سازمانی:</Form.Label>
                                        <Form.Select required aria-label="Default select ">
                                            <option value="">همه</option>
                                            <option value="1">به زودی...</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            پست سازمانی را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }
                                {mokhatab === 2 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>وضعیت فرزند:</Form.Label>
                                        <Form.Select required aria-label="Default select ">
                                            <option value="">همه</option>
                                            <option value="1">دارد</option>
                                            <option value="2">ندارد</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            وضعیت فرزند را انتخاب کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>جنسیت:</Form.Label>
                                    <Form.Select aria-label="Default select ">
                                        <option value="">همه</option>
                                        {
                                            GenderTypes.map(function (gender) {
                                                return <option key={gender.value} value={gender.value}>{gender.text}</option>
                                            })
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        جنسیت را انتخاب کنید
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="validationTitle">
                                    <Form.Label>محدودیت کاربر:</Form.Label>
                                    <Form.Control type="text" className="mx-2" placeholder='کاربر' />
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
