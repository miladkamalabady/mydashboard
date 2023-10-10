
import { useReducer, useCallback } from "react"
import TodoContext from "./TodoContext";
import todoReducer from "./todoReducer";
import axios from 'axios';
import Swal from "sweetalert2";

const TodoProvider = ({ children }) => {
    const initialState = {
        todos: [],
        create: null,
        error: null,
        errorp: null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const getTodos = useCallback(async (limit = "10") => {
        try {
            dispatch({ type: "SET_TODOS", payload: [] })
            let url = `https://myssl.medu.ir/api/service/GetServices`
            // let url=`https://my-json-server.typicode.com/miladkamalabady/mydashboard/main/db.json/icons`
            if (limit !== 'All')
                url += `?_limit=${limit}`
            const response = await axios.get(url)

            dispatch({ type: "SET_TODOS", payload: response.data.data })
            dispatch({ type: "SET_ERROR", payload: null })
        } catch (err) {
            dispatch({ type: "SET_TODOS", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const createTodos = useCallback(async (payload) => {
        try {

            let url = `https://jsonplaceholder.typicode.com/todos`
            const response = await axios.post(url, payload)
            dispatch({ type: "SET_CREATE", payload: response.data })
            dispatch({ type: "SET_ERROR", payload: null })
            Swal.fire({
                icon: 'success',
                title: 'اطلاعات با موفقیت ایجاد شد',
                showConfirmButton: false,
                timer: 2000
            })
        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const deleteTodos = useCallback(async (payload) => {
        try {

            let url = `https://myssl.medu.ir/api/service/delete?id=${payload}`
            const response = await axios.delete(url)
            if (response.data.resultCode === 200) {
                dispatch({ type: "SET_ERROR", payload: null })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }else{
                dispatch({ type: "SET_ERRORP", payload: response.data.data })
                Swal.fire({
                    icon: 'error',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }

        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const enaTodos = useCallback(async (payload) => {
        try {
            // let url=`https://jsonplaceholder.typicode.com/todos/${payload}`
            let url = `https://myssl.medu.ir/api/service/SetEnabled?id=${payload.id}&enabled=${payload.disable}`
            const response = await axios.get(url, { ...payload })

            if (response.data.resultCode === 200) {
                // dispatch({ type: "SET_ERRORP", payload: null })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            else {
                dispatch({ type: "SET_ERRORP", payload: response.data.data })
                Swal.fire({
                    icon: 'error',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const visibleTodos = useCallback(async (payload) => {
        try {
            let url = `https://myssl.medu.ir/api/service/SetVisible?id=${payload.id}&enabled=${payload.visible}`
            const response = await axios.get(url, { ...payload })
            if (response.data.resultCode === 200) {
                // dispatch({ type: "SET_ERRORP", payload: null })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            else {
                dispatch({ type: "SET_ERRORP", payload: response.data.data })
                Swal.fire({
                    icon: 'error',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])

    return (
        <TodoContext.Provider value={{ ...state, getTodos, createTodos, deleteTodos, visibleTodos, enaTodos }}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoProvider;
