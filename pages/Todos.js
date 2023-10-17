import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import {  useContext, useEffect, useMemo } from "react";
import TodoContext from "../context/TodoContext";
import { Badge, Card, Col, ListGroup,  Row, Table } from 'react-bootstrap';
import FilterTodos from '../components/todosC/Filter';
// import ExpandedComponent from '../components/todosC/ExpandedComponent';
import DeleteSer from './DeleteSer';
import EnableSer from './EnableSer';
import VisibleSer from './VisibleSer';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";

// import CreateTodo from '../components/todosC/Create';



const Todos = () => {
    const { todos, error, getTodos, filterTodos } = useContext(TodoContext)

    var finditem = (key) => {
        if (todos) {
            var l = todos.filter(e => (e.id === key && e.title !== ''))
            if (l[0]?.title !== undefined)
                return (l[0].title);
        }
    };

    useEffect(() => {
        (() => {
            getTodos()
        })()
    }, [getTodos, filterTodos])


    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: row => row.id,
                sortable: true,
                reorder: true
            },
            {
                name: 'عنوان',
                cell: (row) =>
                    <div className=''>
                        {row.icon && <div><img src={`https://my.medu.ir/${row.icon}`} style={{ width: '30px' }} alt='' /></div>}
                        {row.title}
                    </div>
                ,
                sortable: true,
                reorder: true
            },
            {
                name: 'مخاطب',
                selector: row => row.usertTypeTitle,
                sortable: true,
                reorder: true
            },
            {
                name: 'جایگاه SORT',
                selector: row => row.orderIndex,
                sortable: true,
                reorder: true

            },
            {
                name: 'عملیات',
                cell: (row) =>
                    <VisibleSer {...row} />,
                reorder: true
            },
        ],
        [],
    );
    const columnsCom = useMemo(
        () => [
            {
                name: '#',
                selector: row => row.id,
                sortable: true,
            }, {
                name: 'تصویر',
                cell: (row) =>
                    <div className='' style={{ backgroundColor: '#fff' }}>
                        {row.icon && <div><img src={`https://my.medu.ir/${row.icon}`} style={{ width: '30px' }} alt='' /></div>}
                    </div>
                ,
            },
            {
                name: 'عنوان',
                cell: (row) =>
                    <div className=''>
                        {row.title && <Link className="nav-link" to={`/services/create:${row.id}`}>{row.title}</Link>}
                        {/* {row.title && <div>{row.title}</div>} */}
                    </div>
                ,
                selector: row => row.title,
                sortable: true,
                reorder: true
            },
            {
                name: 'مخاطب',
                selector: row => row.usertTypeTitle,
                reorder: true
            },
            {
                name: 'نوع',
                selector: row => row.urlActionTypeTitle,
                reorder: true
            },
            {
                name: 'آدرس',
                selector: row => row.url,
                sortable: true,
                reorder: true

            },
            {
                name: 'جایگاه SORT',
                selector: row => row.orderIndex,
                sortable: true,
                reorder: true

            },
            {
                name: 'پیام popup',
                selector: row => row.popupContent,
                reorder: true

            },
            {
                name: 'محدودیت ها',
                cell: (row) =>
                    <div>
                        {/* <button onClick={handleButtonClick}>محدودیت ها</button>, */}
                        {(row.userId !== 0 && <Badge bg="primary">کاربر:{row.userId}</Badge>)}
                        {row.typeId === 2 ?
                            <div>
                                <Badge bg="primary">وضعیت فرزند:</Badge>
                            </div>
                            : (row.typeId === 3 || row.typeId === 8) ?
                                <div>
                                    {(row.schoolTypeId !== 0 && <Badge bg="primary">نوع مدرسه:{row.schoolTypeId}</Badge>)}
                                    
                                    <Badge bg="primary">پست سازمانی </Badge>
                                </div>
                                :
                                <div>
                                    {(row.stageId !== 0 && <Badge bg="primary">مقطع:{row.stageId}</Badge>)}
                                    {(row.gradeId !== 0 && <Badge bg="primary">پایه:{row.gradeId}</Badge>)}
                                    {(row.majorId !== 0 && <Badge bg="primary">رشته:{row.majorId}</Badge>)}
                                    {(row.timeDoreTypeId && row.timeDoreTypeId !== 0 && <Badge bg="primary">تایم دوره:{row.timeDoreTypeId}</Badge>)}
                                    {(row.schoolTypeId !== 0 && <Badge bg="primary">نوع مدرسه:{row.schoolTypeId}</Badge>)}
                                    {(row.nationalityId !== 0 && <Badge bg="primary">ملیت:{row.nationalityId}</Badge>)}
                                    {(row.genderId !== 0 && <Badge bg="primary">جنسیت{row.genderId}</Badge>)}
                                </div>
                        }
                        {/* <Badge bg="primary">{row.usertTypeTitle}</Badge> */}
                        {/* <td>{todo.typeId === 5 && (todo.stageId === 0 ? "همه" : todo.stageId)}</td>
                            <td>{todo.typeId === 5 && (todo.gradeId === 0 ? "همه" : todo.gradeId)}</td>
                            <td>{todo.typeId === 5 && (todo.majorId === 0 ? "همه" : todo.majorId)}</td>
                            <td>{(todo.typeId === 5 && todo.timeDoreTypeId === 0 ? "همه" : todo.timeDoreTypeId)}</td>
                            <td>{todo.typeId === 5 && (todo.schoolTypeId === 0 ? "همه" : todo.schoolTypeId)}</td>
                            <td>{(todo.typeId === 5 || todo.typeId === 2) && (todo.nationalityId === 0 ? "همه" : todo.nationalityId)}</td>
                            <td>{(todo.genderId === 0 ? "همه" : todo.genderId)}</td>
                            <td>{(todo.userId === 0 ? "همه" : todo.userId)}</td> */}

                    </div>
            },
            {
                name: 'عملیات',
                cell: (row) =>
                    <div className='d-flex justify-content-between align-items-center fs-5'>
                        <EnableSer {...row} />
                        <VisibleSer {...row} />
                        <DeleteSer serviceId={row.id} />
                    </div>
                ,
                reorder: true

            },
        ],
        [],
    );
    // var groupBy = function(xs, key) {
    //     return xs.reduce(function(rv, x) {
    //       (rv[x[key]] = rv[x[key]] || []).push(x);
    //       return rv;
    //     }, {});
    //   }; 

    //  console.log(groupBy(todos.filter(e=>(e.urlActionType)),"id"))
    const ExpandedComponent1 = ({ data }) => {
        return (
            <div className="row">
                <div className='col-md-12'>
                    {/* <h6>{data.parentId}</h6> */}
                    <DataTable
                        title={`سرویس های دسته ${data.title}`}
                        data={todos.filter(e => (e.parentId === data.id))}
                        columns={columnsCom}
                        theme="dark"
                        // conditionalRowStyles={conditionalRowStyles}
                        highlightOnHover={true}
                        // striped={true}
                        defaultSortFieldId='id'
                        dense
                        pagination
                    />
                </div>
            </div>
        )
    };
    const conditionalRowStyles = [
        {
            when: row => row.typeId === 3,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
            },
        },
        {
            when: row => row.typeId === 8,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.5)',
                color: 'black',
            },
        },
        {
            when: row => row.typeId === 5,
            style: {
                backgroundColor: 'rgba(0, 50, 100, 0.4)',
                color: 'black',
            },
        },
        {
            when: row => row.typeId === 2,
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.3)',
                color: 'black',
            },
        },
    ];

    return (
        <div className="p-5 mt-1">

            <div className="row g-3">
                <FilterTodos />
                {true && <DataTable
                    title="سرویس ها"
                    data={todos.filter(e => (e.parentId === null))}
                    columns={columns}
                    highlightOnHover={true}
                    striped={true}
                    defaultSortFieldId='usertTypeTitle'
                    conditionalRowStyles={conditionalRowStyles}
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent1}
                    dense
                    pagination
                />}
                {todos &&
                    <div className="container mt-5">
                        <div className="row text-center">
                            <div className="col-md-12">
                                <h2>لیست سرویس ها</h2>
                            </div>
                        </div>
                        <Row xs={2} md={4} className="g-4">
                            {todos.map((_, idx) => (
                                <Col key={idx}>
                                    <Card bg={_.typeId === 3 ? 'info' : _.typeId === 5 ? 'warning' : _.typeId === 8 ? 'secondary' : _.typeId === 2 ? 'danger' : 'white'} key={_.id} text={(_.typeId === 5 || _.typeId === 2) ? 'dark' : 'white'}>
                                        {_.icon && <Card.Img variant="center" style={{ width: '50px', margin: 'auto' }} src={`https://my.medu.ir/${_.icon}`} />}
                                        <Card.Body>
                                            <Card.Title className='text-center'>{_.title}</Card.Title>
                                            <Card.Text>
                                                <Badge bg="primary">{_.usertTypeTitle}</Badge>
                                                {_.parentId && <Badge bg="primary">{finditem(_.parentId)}</Badge>}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            {_.urlActionTypeTitle && <ListGroup.Item>نوع: {_.urlActionTypeTitle}</ListGroup.Item>}
                                            {_.url && <ListGroup.Item>آدرس: {_.url}</ListGroup.Item>}
                                            <ListGroup.Item> ترتیب: {_.orderIndex}</ListGroup.Item>
                                            {_.popupContent && <ListGroup.Item>پیام : {_.popupContent}</ListGroup.Item>}
                                        </ListGroup>
                                        <Card.Body>
                                            <div className='d-flex justify-content-between align-items-center fs-5'>
                                                {_.parentId && <EnableSer {..._} />}
                                                <VisibleSer {..._} />
                                                {_.parentId && <DeleteSer serviceId={_.id} />}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div >
                }
                {false &&
                    <Table responsive >
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
                            {todos && todos.filter(e => (e.urlActionType)).map((todo, index) => (
                                <tr key={index}>
                                    <td>{todo.id}</td>
                                    <td>
                                        <img src={`https://my.medu.ir/${todo.icon}`} style={{ width: '30px' }} alt={todo.title} />
                                        {todo.title}
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
                }
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