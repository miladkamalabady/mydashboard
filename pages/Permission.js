
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
            if (dataId && dataId.length === 0) {
                getGenderTypes()
                getGradeTypes()
                getMajors()
                getStageType()
                getTimeDoreType()
                getSchoolModalityType()

                getTodos()
            }
        })()
    }, [dataId, getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType])

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
                                <Col>تنظیمات دسترسی های سرویس: {dataId.title}</Col>

                            </Row>
                            <Row className="mb-3">
                                {mokhatab === 5 &&
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>مقطع:</Form.Label>
                                        <Typeahead
                                            id="maghta"
                                            labelKey="text"
                                            name="maghta"
                                            // defaultSelected={dataId.gradeId}
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
                                            defaultSelected={dataId.gradeid}
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
