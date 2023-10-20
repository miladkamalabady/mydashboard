import Swal from "sweetalert2";

const todoReducer = (state, action) => {
    switch (action.type) {
        case "SET_GenderTypes":
            return {
                ...state,
                GenderTypes: action.payload
            };
        case "SET_GradeTypes":
            return {
                ...state,
                GradeTypes: action.payload
            };
        case "SET_Majors":
            return {
                ...state,
                Majors: action.payload
            };
        case "SET_StageType":
            return {
                ...state,
                StageType: action.payload
            };
        case "SET_TimeDoreType":
            return {
                ...state,
                TimeDoreType: action.payload
            };
        case "SET_SchoolModalityType":
            return {
                ...state,
                SchoolModalityType: action.payload
            };
        case "SET_Auth":
            return {
                ...state,
                User: action.payload
            };
        case "SET_TODOS":
            // let groups = []
            // if (action.payload && action.payload.length > 0) {
            //     groups = action.payload.reduce((groups, item) => {
            //         const group = (groups[item.id] || []);
            //         group.push(item);
            //         groups[item.id] = group;
            //         return groups;
            //     }, {});

            // }
            // let groups1 = []
            // Object.keys(groups).forEach(function (key, index) {
            //     // if (groups[key].length > 1)
            //     //     console.log(groups[key])
            //     // else
            //     groups1.push({...groups[key]})
            // });
            // console.log(groups1)

            return {
                ...state,
                todosAll: action.payload,
                todos: action.payload
            };
        case "SET_TODOSFilter":
            let data = []
            if (Number(action.payload) !== 0)
                data = state.todosAll.filter(e => (e.typeId === Number(action.payload)))
            else
                data = state.todosAll
            //     if (Number(action.payload) === 8)
            // console.log(data);
            return {
                ...state,
                todos: data
            };
        case "SET_ERROR":
            Swal.fire({
                icon: 'error',
                title: action.payload,
                showConfirmButton: false,
                timer: 2000
            })
            return {
                ...state,
                error: action.payload
            };
        case "SET_ERRORP":
            return {
                ...state,
                errorp: action.payload
            };
        case "SET_CREATE":
            return {
                ...state,
                todos: [action.payload, ...state.todos],
            };
        default:
            return state
    }
}

export default todoReducer;