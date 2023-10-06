const todoReducer = (state, action) => {
    switch (action.type) {
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