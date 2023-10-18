import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import FilterTodos from '../components/todosC/Filter';
// import ExpandedComponent from '../components/todosC/ExpandedComponent';
import DeleteSer from './DeleteSer';
import EnableSer from './EnableSer';
import VisibleSer from './VisibleSer';
import { Link as Link2 } from "react-router-dom";
import { Link, Diagram3 } from "react-bootstrap-icons";

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

    return (
        <div className="p-5 mt-1">

            <div className="row g-3">
                <FilterTodos />
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
                                    <Card bg={_.typeId === 3 ? 'info' : _.typeId === 5 ? 'success' : _.typeId === 8 ? 'secondary' : _.typeId === 2 ? 'danger' : 'white'} key={_.id} text={(_.typeId === 5 || _.typeId === 2 || _.typeId === 10) ? 'dark' : 'white'}>
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
                                            {_.genders && _.genders.length>0 &&
                                                <ListGroup.Item>
                                                    <Badge bg="info">
                                                    {_.genders.map((item,idx1)=>(
                                                        <span key={idx1}>{item.genderTitle}</span>
                                                    ))}
                                                    </Badge>
                                                    <Badge bg="primary">
                                                    {_.majors.map((item,idx1)=>(
                                                        <span key={idx1}>{item.titlle}</span>
                                                    ))}
                                                    </Badge>
                                                    <Badge bg="danger">
                                                    {_.grades.map((item,idx1)=>(
                                                        <span key={idx1}>{item.gradeTitle}-</span>
                                                    ))}
                                                    </Badge>
                                                    <Badge bg="warning">
                                                    {_.schoolTypes.map((item,idx1)=>(
                                                        <span key={idx1}>{item.schoolTypeTitle}-</span>
                                                    ))}
                                                    </Badge>
                                                    <Badge bg="dark">
                                                    {_.stages.map((item,idx1)=>(
                                                        <span key={idx1}>{item.stageTitle}-</span>
                                                    ))}
                                                    </Badge>
                                                    <Badge bg="secondary">
                                                    {_.timeDoreTypes.map((item,idx1)=>(
                                                        <span key={idx1}>{item.timeDoreTypeTitle}-</span>
                                                    ))}
                                                    </Badge>
                                                </ListGroup.Item>}
                                            {_.popupContent && <ListGroup.Item>پیام : {_.popupContent}</ListGroup.Item>}
                                        </ListGroup>
                                        <Card.Body>
                                            <div className='d-flex justify-content-between align-items-center fs-5'>
                                                <Link2 className="nav-link" to={`/services/edit/${_.id}`}><Link /></Link2>
                                                <Link2 className="nav-link" to={`/services/permission/${_.id}`}><Diagram3 /></Link2>
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