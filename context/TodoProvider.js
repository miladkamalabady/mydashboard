
import { useReducer, useCallback, useContext } from "react"
import TodoContext from "./TodoContext";
import todoReducer from "./todoReducer";
import axios from '../axiosConfig';
import Swal from "sweetalert2";
import { AuthContext } from "./auth/AuthContext";


const TodoProvider = ({ children }) => {

    const [authState, setAuthState] = useContext(AuthContext);
    const initialState = {
        User: null,
        GenderTypes: [],
        GradeTypes: [],
        Majors: [],
        StageType: [],
        TimeDoreType: [],
        SchoolModalityType: [],
        todos: [],
        todosAll: [],
        create: null,
        error: null,
        errorp: null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const getGenderTypes = useCallback(async () => {
        try {
            dispatch({ type: "SET_GenderTypes", payload: [] })
            let url = `/general/GetGenderTypes`
            const response = await axios.get(url)
            dispatch({ type: "SET_GenderTypes", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_GenderTypes", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const getGradeTypes = useCallback(async () => {
        try {
            dispatch({ type: "SET_GradeTypes", payload: [] })
            let url = `/general/GetGradeTypes`
            const response = await axios.get(url)
            dispatch({ type: "SET_GradeTypes", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_GradeTypes", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const getMajors = useCallback(async () => {
        try {
            dispatch({ type: "SET_Majors", payload: [] })
            let url = `/general/GetMajors`
            const response = await axios.get(url)
            dispatch({ type: "SET_Majors", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_Majors", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const getStageType = useCallback(async () => {
        try {
            dispatch({ type: "SET_StageType", payload: [] })
            let url = `/general/GetStageType`
            const response = await axios.get(url)
            dispatch({ type: "SET_StageType", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_StageType", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const getTimeDoreType = useCallback(async () => {
        try {
            dispatch({ type: "SET_TimeDoreType", payload: [] })
            let url = `/general/GetTimeDoreType`
            const response = await axios.get(url)
            dispatch({ type: "SET_TimeDoreType", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_TimeDoreType", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const getSchoolModalityType = useCallback(async () => {
        try {
            dispatch({ type: "SET_SchoolModalityType", payload: [] })
            let url = `/general/GetSchoolModalityType`
            const response = await axios.get(url)
            dispatch({ type: "SET_SchoolModalityType", payload: response.data.data })
        } catch (err) {
            dispatch({ type: "SET_SchoolModalityType", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])

    const checkAuth = useCallback(async (payload) => {
        try {
            dispatch({ type: "SET_Auth", payload: [] })
            let url = `/service/Auth`
            const response = await axios.post(url, payload)

            dispatch({ type: "SET_Auth", payload: response.data.data })
        } catch (err) {
            setAuthState({
                userIsLoggedin: true,
                fName: "test fname",
                lName: "test lname",
                userName: "testname"
            });
            console.log(authState);
            dispatch({
                type: "SET_Auth", payload: {
                    userIsLoggedin: true,
                    fName: "test fname",
                    lName: "test lname",
                    userName: "testname"
                }
            })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])

    const getTodos = useCallback(async () => {
        try {
            dispatch({ type: "SET_TODOS", payload: [] })
            let url = `/service/GetServices`
            // let url=`https://my-json-server.typicode.com/miladkamalabady/mydashboard/main/db.json/icons`
            const response = await axios.get(url)

            dispatch({ type: "SET_TODOS", payload: response.data.data })
            // dispatch({ type: "SET_ERROR", payload: null })
        } catch (err) {
            dispatch({ type: "SET_TODOS", payload: [] })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])

    const filterTodos = useCallback((filter) => {
        try {
            // let payData=state.todos.filter(e=>(e.typeId===Number(filter)))

            dispatch({ type: "SET_TODOSFilter", payload: filter })
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
                title: 'اطلاعات با موفقیت بروز شد',
                showConfirmButton: false,
                timer: 2000
            })
        } catch (err) {
            dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceNationalityMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceNationalityMapping`
            const response = await axios.post(url, payload)
            dispatch({ type: "SET_CREATE", payload: response.data })
            Swal.fire({
                icon: 'success',
                title: response.data.data,
                showConfirmButton: false,
                timer: 2000
            })
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceGenderMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceGenderMapping`
            const response = await axios.post(url, payload)
            dispatch({ type: "SET_CREATE", payload: response.data })
            Swal.fire({
                icon: 'success',
                title: response.data.data,
                showConfirmButton: false,
                timer: 2000
            })
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])

    const SetServiceMajorMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceMajorMapping`
            if (payload && payload.majorId?.length > 0) {
                const t = []
                payload.majorId.forEach(element => {
                    t.push({ majorId: element.id, serviceId: payload.serviceId })
                });
                const response = await axios.post(url, t)
                dispatch({ type: "SET_CREATE", payload: response.data })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceTimeDoreTypeMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceTimeDoreTypeMapping`
            if (payload && payload.timeDoreTypeId?.length > 0) {
                const t = []
                payload.timeDoreTypeId.forEach(element => {
                    t.push({ timeDoreTypeId: element.value, serviceId: payload.serviceId })
                });
                const response = await axios.post(url, t)
                dispatch({ type: "SET_CREATE", payload: response.data })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceSchoolTypeMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceSchoolTypeMapping`
            if (payload && payload.schoolTypeId?.length > 0) {
                const t = []
                payload.schoolTypeId.forEach(element => {
                    t.push({ schoolTypeId: element.value, serviceId: payload.serviceId })
                });
                const response = await axios.post(url, t)
                dispatch({ type: "SET_CREATE", payload: response.data })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceStageMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceStageMapping`
            if (payload && payload.stageId?.length > 0) {
                const t = []
                payload.stageId.forEach(element => {
                    t.push({ stageId: element.value, serviceId: payload.serviceId })
                });
                const response = await axios.post(url, t)
                dispatch({ type: "SET_CREATE", payload: response.data })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const SetServiceGradeMapping = useCallback(async (payload) => {
        try {
            let url = `/Permission/SetServiceGradeMapping`
            if (payload && payload.gradeId?.length > 0) {
                const t = []
                payload.gradeId.forEach(element => {

                    t.push({ gradeId: element.value, serviceId: payload.serviceId })
                });
                const response = await axios.post(url, t)
                dispatch({ type: "SET_CREATE", payload: response.data })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (err) {
            dispatch({ type: "SET_ERROR", payload: err.message })
        }
    }, [])
    const updateTodos = useCallback(async (payload) => {
        try {
            // let url = `https://jsonplaceholder.typicode.com/todos`
            let url = `/service/update`
            const response = await axios.post(url, payload)
            dispatch({ type: "SET_CREATE", payload: response.data })
            Swal.fire({
                icon: 'success',
                title: response.data.data,
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
            let url = `/service/delete?id=${payload}`
            const response = await axios.get(url)
            if (response.data.resultCode === 200) {
                dispatch({ type: "SET_ERROR", payload: null })
                Swal.fire({
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                dispatch({ type: "SET_ERROR", payload: response.data.data })
                Swal.fire({
                    icon: 'error',
                    title: response.data.data,
                    showConfirmButton: false,
                    timer: 3000
                })
            }

        } catch (err) {
            // dispatch({ type: "SET_CREATE", payload: null })
            dispatch({ type: "SET_ERROR", payload: err.message })
            Swal.fire({
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }, [])
    const enaTodos = useCallback(async (payload) => {
        try {
            // let url=`https://jsonplaceholder.typicode.com/todos/${payload}`
            let url = `/service/SetEnabled?id=${payload.id}&enabled=${payload.disable}`
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
            let url = `/service/SetVisible?id=${payload.id}&visible=${!payload.visible}`
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
        <TodoContext.Provider value={{
            ...state,
            checkAuth,
            SetServiceGenderMapping, SetServiceNationalityMapping, SetServiceGradeMapping, SetServiceMajorMapping, SetServiceStageMapping, SetServiceTimeDoreTypeMapping, SetServiceSchoolTypeMapping,
            updateTodos, filterTodos, getTodos, createTodos, deleteTodos, visibleTodos, enaTodos, getGenderTypes, getGradeTypes, getMajors, getStageType, getTimeDoreType, getSchoolModalityType
        }}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoProvider;
