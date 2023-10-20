
import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import {  useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const CreateService = () => {
    const { id } = useParams();
    const { SetServiceGenderMapping, SetServiceGradeMapping, SetServiceStageMapping, SetServiceMajorMapping, SetServiceTimeDoreTypeMapping, SetServiceSchoolTypeMapping,
        getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType, SetServiceNationalityMapping,
        GenderTypes, Majors, StageType, TimeDoreType, SchoolModalityType, GradeTypes, getTodos, todos } = useContext(TodoContext)
    const [loading, setLoading] = useState(false);
    // const [validated, setValidated] = useState(false);
    const [mokhatab, setmokhatab] = useState(0);
    const [dataId, setdataId] = useState([]);

    const [nationality, setNationality] = useState(0);
    const [gender, setGender] = useState(0);
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
    }, [dataId, getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType,getTodos])
 
         
    useEffect(() => {
        (() => {
            setdataId(...todos.filter(e => (e.id === Number(id))))

            if (dataId) {
                // if ('text' !== 'stageTitle') {
                //     Object.defineProperty(dataId.stages, 'stageTitle',
                //         Object.getOwnPropertyDescriptor(dataId.stages, 'text'));
                //     delete dataId.stages['text'];
                // }
                // let t =[]
                // dataId.stages[0].map((_, idx) => (

                // ))
                setmokhatab(dataId.typeId)
                // setMultiSelectionsMaghta(dataId.stages)
            }
        })()
    }, [todos, id, dataId])
    const handleSubmitNationality = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (nationality?.target?.value && nationality?.target?.value !== 'همه')
            await SetServiceNationalityMapping([{ nationalityId: nationality.target.value, serviceId: id }])
        else
            await SetServiceNationalityMapping([{ nationalityId: null, serviceId: id }])
        setLoading(false)
    }
    const handleSubmitGender = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (gender?.target?.value && gender?.target?.value !== 'همه')
            await SetServiceGenderMapping([{ genderId: gender.target.value, serviceId: id }])
        else
            await SetServiceGenderMapping([{ genderId: null, serviceId: id }])
        setLoading(false)
    }
    const handleSubmitGrade = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (multiSelectionsPaye?.length > 0)
            await SetServiceGradeMapping({ gradeId: [...multiSelectionsPaye], serviceId: Number(id) })
        else
            await SetServiceGradeMapping({ gradeId: [{ value: null }], serviceId: Number(id) })
        setLoading(false)
    }
    const handleSubmitMaghta = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (multiSelectionsMaghta?.length > 0)
            await SetServiceStageMapping({ stageId: [...multiSelectionsMaghta], serviceId: Number(id) })
        else
            await SetServiceStageMapping({ stageId: [{ value: null }], serviceId: Number(id) })
        setLoading(false)
    }
    const handleSubmitTypeMapping = async (e) => {
        e.preventDefault();
        if (multiSelectionsTime?.length > 0)
            await SetServiceTimeDoreTypeMapping({ timeDoreTypeId: [...multiSelectionsTime], serviceId: Number(id) })
        else
            await SetServiceTimeDoreTypeMapping({ timeDoreTypeId: [{ value: null }], serviceId: Number(id) })
        setLoading(false)
    }
    const handleSubmitSchoolType = async (e) => {
        e.preventDefault();
        if (multiSelectionsSchool?.length > 0)
            await SetServiceSchoolTypeMapping({ schoolTypeId: [...multiSelectionsSchool], serviceId: Number(id) })
        else
            await SetServiceSchoolTypeMapping({ schoolTypeId: [{ value: null }], serviceId: Number(id) })
        setLoading(false)
    }
    const handleSubmitMajor = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (multiSelectionsMajor?.length > 0)
            await SetServiceMajorMapping({ majorId: [...multiSelectionsMajor], serviceId: Number(id) })
        else
            await SetServiceMajorMapping({ majorId: [{ value: null }], serviceId: Number(id) })
        setLoading(false)
    }
    return (
        <div className="p-5 mt-1 row">
            <div className='col-md-12'>
                {id && dataId ?
                    <div>
                        {/* <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}> */}
                        <Row className="mb-3">
                            <Col>تنظیمات دسترسی های سرویس: {dataId.title}</Col>
                        </Row>
                        <Row className="mb-3 ">
                            {mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitMaghta(e)}>
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
                                        <Form.Control.Feedback type="invalid">
                                            مقطع را انتخاب کنید
                                        </Form.Control.Feedback>
                                        <Button className="mt-4" variant="primary" type="submit" >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                "ثبت"
                                            }
                                        </Button>
                                    </Form.Group>
                                </Form>
                            }{mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitGrade(e)}>
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
                                        <Button className="mt-4" variant="primary" type="submit" >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                "ثبت"
                                            }
                                        </Button>
                                    </Form.Group>
                                </Form>
                            }{mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitMajor(e)}>
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
                            }{mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitNationality(e)}>
                                    <Form.Group as={Col} md="3" >
                                        <Form.Label>ملیت:</Form.Label>
                                        <Form.Select onChange={setNationality} aria-label="Default select ">
                                            <option value={null}>همه</option>
                                            <option value="1">ایرانی</option>
                                            <option value="2">اتباع</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            ملیت را انتخاب کنید
                                        </Form.Control.Feedback>
                                        <Button className="mt-4" variant="primary" type="submit" >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                "ثبت"
                                            }
                                        </Button>
                                    </Form.Group>
                                </Form>
                            }{mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitTypeMapping(e)}>
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
                                        <Button className="mt-4" variant="primary" type="submit" >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                "ثبت"
                                            }
                                        </Button>
                                    </Form.Group>
                                </Form>
                            }{mokhatab === 5 &&
                                <Form onSubmit={(e) => handleSubmitSchoolType(e)}>
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
                                        <Button className="mt-4" variant="primary" type="submit" >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                "ثبت"
                                            }
                                        </Button>
                                    </Form.Group>
                                </Form>
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
                            <Form onSubmit={(e) => handleSubmitGender(e)}>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>جنسیت:</Form.Label>
                                    <Form.Select onChange={setGender} aria-label="Default select ">
                                        <option value={null}>همه</option>
                                        {
                                            GenderTypes.map(function (gender) {
                                                return <option key={gender.value} value={gender.value}>{gender.text}</option>
                                            })
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        جنسیت را انتخاب کنید
                                    </Form.Control.Feedback>
                                    <Button className="mt-4" variant="primary" type="submit" >
                                        {loading ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            :
                                            "ثبت"
                                        }
                                    </Button>
                                </Form.Group>
                            </Form>
                            {false &&
                                <Form onSubmit={(e) => handleSubmitGender(e)}>
                                    <Form.Group as={Col} md="3" controlId="validationTitle">
                                        <Form.Label>محدودیت کاربر:</Form.Label>
                                        <Form.Control type="text" className="mx-2" placeholder='کاربر' />
                                        <Form.Control.Feedback type="invalid">
                                            کاربر را وارد کنید
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                            }
                        </Row>

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
