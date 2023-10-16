import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import TodoContext from "../context/TodoContext";
import { Table } from 'react-bootstrap';
import FilterTodos from '../components/todosC/Filter';
// import ExpandedComponent from '../components/todosC/ExpandedComponent';
import DeleteSer from './DeleteSer';
import EnableSer from './EnableSer';
import VisibleSer from './VisibleSer';
import DataTable from 'react-data-table-component';

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

    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        console.log('state', selectedRows);
    }, [selectedRows]);

    // const handleButtonClick = () => {

    //     console.log('clicked');
    // };

    const handleChange = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

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
                    <VisibleSer {...row} />
                ,
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
                name: 'دسته',
                // cell: () => row => finditem(row.parentId, todos),
                // cell: (row) => finditem(row.parentId),
                // cell: (row) =>
                //     finditem(row.parentId)
                // ,
                selector: row => row.parentId,
                sortable: true,
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
            // {
            //     name: 'محدودیت ها',
            //     cell: () => <button onClick={handleButtonClick}>محدودیت ها</button>,
            // },
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
            when: row => row.typeId ===3,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
            },
        },
        {
            when: row => row.typeId ===8,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.5)',
                color: 'black',
            },
        },
        {
            when: row => row.typeId ===5,
            style: {
                backgroundColor: 'rgba(0, 50, 100, 0.4)',
                color: 'black',
            },
        },
        {
            when: row => row.typeId ===2,
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
                <DataTable
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
                    onSelectedRowsChange={handleChange}
                />

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