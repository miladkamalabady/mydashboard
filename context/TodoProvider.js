
import { useReducer, useCallback } from "react"
import TodoContext from "./TodoContext";
import todoReducer from "./todoReducer";
import axios from 'axios';

const TodoProvider = ({ children }) => {
    const initialState = {
        todos: [],
        create:null,
        error:null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const getTodos = useCallback(async (limit="10") => {
        try {
            dispatch({ type: "SET_TODOS", payload: [] })
            // let url=`https://jsonplaceholder.typicode.com/todos`
            // let url=`https://my-json-server.typicode.com/miladkamalabady/mydashboard/main/db.json/icons`
            if(limit!=='All')
            url+=`?_limit=${limit}`
            const response = await axios.get(url)
            
            dispatch({ type: "SET_TODOS", payload: response.data })
            dispatch({ type: "SET_ERROR", payload:null })
        } catch (err) {
            console.log(err);
            dispatch({ type: "SET_TODOS", payload: [] })
            dispatch({ type: "SET_ERROR", payload:err.message })
        }
    }, [])
    const createTodos = useCallback(async (payload) => {
        try {
            
            let url=`https://jsonplaceholder.typicode.com/todos`
            const response = await axios.post(url,payload)
            console.log(response);
            dispatch({ type: "SET_CREATE", payload: response.data })
            dispatch({ type: "SET_ERROR", payload:null })
        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload:err.message })
        }
    }, [])
    return (
        <TodoContext.Provider value={{ ...state, getTodos,createTodos }}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoProvider;
