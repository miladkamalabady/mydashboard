import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import { Table } from 'react-bootstrap';
import { FileCheckFill, EyeFill, Trash, EyeSlash } from 'react-bootstrap-icons';
import FilterTodos from '../components/todosC/Filter';
import CreateTodo from '../components/todosC/Create';
import Accordion from 'react-bootstrap/Accordion';

const Todos = () => {
    const { todos, error, getTodos } = useContext(TodoContext)
    useEffect(() => {
        (() => {
            getTodos()
        })()
    }, [getTodos])

    return (
        <div className="p-5 mt-1">
            <div className="row g-3">

                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>ایجاد سرویس</Accordion.Header>
                        <Accordion.Body>
                            <CreateTodo />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>سرویس ها</Accordion.Header>
                        <Accordion.Body>
                            <FilterTodos />

                            <Table responsive="true">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>عنوان</th>
                                        <th>مخاطب</th>
                                        <th>دسته</th>
                                        <th>نوع</th>
                                        <th>آدرس</th>
                                        <th>جایگاه SORT</th>
                                        <th>مقطع</th>
                                        <th>پایه</th>
                                        <th>رشته</th>
                                        <th>ملیت</th>
                                        <th>جنسیت</th>
                                        <th>تایم دوره</th>
                                        <th>کاربر</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos && !error && todos.map(todo => (
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>
                                                <img src={`https://my.medu.ir/${todo.icon}`} style={{ width: '30px' }} alt={todo.title} />
                                                {todo.title}
                                            </td>
                                            <td>{todo.iconType === 0 ? "فرهنگی" : todo.iconType === 1 ? "دانش آموز" : "عموم مردم"}</td>
                                            <td>{todo.parentId}</td>
                                            <td>{
                                                todo.urlActionType === 1 ? "آدرس داخلی" :
                                                    (todo.urlActionType === 3 || todo.urlActionType === 5) ? "متفرقه" :
                                                        !todo.urlActionType ? "بدون آدرس" :
                                                            todo.urlActionType === 7 ? "SSO" : todo.urlActionType
                                            }</td>
                                            <td>{todo.url}</td>
                                            <td>{todo.orderIndex}</td>
                                            <td>{(todo.stageId === 0 ? "همه" : todo.stageId)}</td>
                                            <td>{(todo.gradeId === 0 ? "همه" : todo.gradeId)}</td>
                                            <td>{(todo.majorId === 0 ? "همه" : todo.majorId)}</td>
                                            <td>{(todo.nationalityId === 0 ? "همه" : todo.nationalityId)}</td>
                                            <td>{(todo.schoolTypeId === 0 ? "همه" : todo.schoolTypeId)}</td>
                                            <td>{(todo.genderId === 0 ? "همه" : todo.genderId)}</td>
                                            <td>{(todo.timeDoreTypeId === 0 ? "همه" : todo.timeDoreTypeId)}</td>
                                            <td>{(todo.userId === 0 ? "همه" : todo.userId)}</td>
                                            <td>
                                                <div className='d-flex justify-content-between align-items-center fs-5'>
                                                    {todo.disable ? <FileCheckFill color="red" title="غیرفعال می باشد" /> : <FileCheckFill color="royalblue" title="فعال می باشد" />}
                                                    {todo.visible ? <EyeFill color="royalblue" title="درحال نمایش می باشد" /> : <EyeSlash color="royalblue" title="مخفی می باشد" />}
                                                    <Trash color="red" title="حذف" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            {!todos[0] && !error &&
                                <div className="col-md-12">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            }
                            {error &&
                                <div className="col-md-12">
                                    <Alert variant='danger'>
                                        {error}
                                    </Alert>
                                </div>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>





            </div>
        </div >
    )
}

export default Todos;