import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import { Table } from 'react-bootstrap';
import FilterTodos from '../components/todosC/Filter';
import DeleteSer from './DeleteSer';
import EnableSer from './EnableSer';
import VisibleSer from './VisibleSer';

// import CreateTodo from '../components/todosC/Create';

const Todos = () => {
    const { todos, error,  getTodos } = useContext(TodoContext)

    useEffect(() => {
        (() => {
            getTodos()
        })()
    }, [getTodos])

    var finditem = (key) => {
        var l = todos.filter(e => (e.id === key && e.tootltip !== ''))
        return (l[0].tootltip);
    };
    // var groupBy = function(xs, key) {
    //     return xs.reduce(function(rv, x) {
    //       (rv[x[key]] = rv[x[key]] || []).push(x);
    //       return rv;
    //     }, {});
    //   }; 

    //  console.log(groupBy(todos.filter(e=>(e.urlActionType)),"id"))

    return (
        <div className="p-5 mt-1">

            <div className="row g-3">
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
                            <th>پیام popup</th>
                            <th>مقطع</th>
                            <th>پایه</th>
                            <th>رشته</th>
                            <th>تایم دوره</th>
                            <th>نوع مدرسه</th>
                            <th>ملیت</th>
                            <th>جنسیت</th>
                            <th>کاربر</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos && !error && todos.filter(e => (e.urlActionType)).map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.id}</td>
                                <td>
                                    <img src={`https://my.medu.ir/${todo.icon}`} style={{ width: '30px' }} alt={todo.title} />
                                    {todo.tootltip}
                                </td>
                                <td>{todo.usertTypeTitle}</td>
                                <td>{todo.parentId && finditem(todo.parentId)}</td>
                                <td>{todo.urlActionTypeTitle}
                                    {/* {todo.urlActionType === 1 ? "آدرس داخلی" :
                                        (todo.urlActionType === 3 || todo.urlActionType === 5) ? "متفرقه" :
                                            !todo.urlActionType ? "بدون آدرس" :
                                                todo.urlActionType === 7 ? "SSO" : todo.urlActionType
                                } */}
                                </td>
                                <td>{todo.url}</td>
                                <td>{todo.orderIndex}</td>
                                <td>{todo.popupContent}</td>
                                <td>{todo.typeId === 5 && (todo.stageId === 0 ? "همه" : todo.stageId)}</td>
                                <td>{todo.typeId === 5 && (todo.gradeId === 0 ? "همه" : todo.gradeId)}</td>
                                <td>{todo.typeId === 5 && (todo.majorId === 0 ? "همه" : todo.majorId)}</td>
                                <td>{(todo.typeId === 5 && todo.timeDoreTypeId === 0 ? "همه" : todo.timeDoreTypeId)}</td>
                                <td>{todo.typeId === 5 && (todo.schoolTypeId === 0 ? "همه" : todo.schoolTypeId)}</td>
                                <td>{(todo.typeId === 5 || todo.typeId === 2) && (todo.nationalityId === 0 ? "همه" : todo.nationalityId)}</td>
                                <td>{(todo.genderId === 0 ? "همه" : todo.genderId)}</td>
                                <td>{(todo.userId === 0 ? "همه" : todo.userId)}</td>
                                <td>
                                    <div className='d-flex justify-content-between align-items-center fs-5'>

                                        <EnableSer {...todo} />

                                        <VisibleSer {...todo} />
                                        <DeleteSer serviceId={todo.id} />
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


            </div>
        </div >
    )
}

export default Todos;