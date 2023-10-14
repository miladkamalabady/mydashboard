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
        case "SET_TODOS":
            return {
                ...state,
                todos: action.payload
            };
        case "SET_ERROR":
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