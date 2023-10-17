import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect, useMemo } from "react";
import TodoContext from "../context/TodoContext";
import { Badge } from 'react-bootstrap';
import FilterTodos from '../components/todosC/Filter';
import DeleteSer from './DeleteSer';
import EnableSer from './EnableSer';
import VisibleSer from './VisibleSer';
import DataTable from 'react-data-table-component';
import { Link as Link2 } from "react-router-dom";
import { Diagram3, Link } from "react-bootstrap-icons";


const Todos = () => {
    const { todos, error, getTodos, filterTodos } = useContext(TodoContext)

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
                        {row.title &&
                            <div>
                                <Link2 className="nav-link" to={`/services/edit/${row.id}`}>{row.title}</Link2>
                                <Link2 className="nav-link" to={`/services/permission/${row.id}`}><Diagram3 /></Link2>
                            </div>
                        }

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

                    </div>
            },
            {
                name: 'عملیات',
                cell: (row) =>
                    <div className='d-flex justify-content-between align-items-center fs-5'>
                        <Link2 className="nav-link" to={`/services/edit/${row.id}`}><Link /></Link2>
                        <Link2 className="nav-link" to={`/services/permission/${row.id}`}><Diagram3 /></Link2>
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
        {
            when: row => row.typeId === 10,
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