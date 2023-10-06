import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import { Card } from 'react-bootstrap';
import { Check2All, Check, Trash } from 'react-bootstrap-icons';
import FilterTodos from '../components/todosC/Filter';
import CreateTodo from '../components/todosC/Create';



const Todos = () => {
    const { todos, error, getTodos } = useContext(TodoContext)
    useEffect(() => {
        (() => {
            getTodos()
        })()
    }, [getTodos])

    return (
        <div className="container mt-5">
            <div className="row g-3">


                <CreateTodo />

                <FilterTodos />
                {todos && !error && todos.map(todo => (
                    <div key={todo.id} className='col-md-4'>
                        <Card bg={todo.completed && "success"} text={todo.completed && "white"}>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div >
                                    {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
                                </div>
                                <div className='d-flex justify-content-between align-items-center fs-6'>
                                    {todo.completed ? <Check2All /> : <Check />}
                                    <Trash />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}

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