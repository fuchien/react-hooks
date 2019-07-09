export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return { ...state, todos: action.payload };
    case 'TOGGLE_TODO':
      const toggleTodos = state.todos.map(t =>
        t.id === action.payload.id
          ? action.payload
          : t
      );
      return { ...state, todos: toggleTodos };
    case 'SET_CURRENT_TODO':
      return { ...state, currentTodo: action.payload };
    case 'ADD_TODO':
      // if (!action.payload) {
      //   return state;
      // }
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state;
      // }
      return { ...state, todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      // if (!action.payload) {
      //   return state;
      // }
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state;
      // }
      const updatedTodo = {
        ...action.payload
      };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return { ...state, todos: updatedTodos, currentTodo: {} };
    case 'REMOVE_TODO':
      const removeTodos = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return { ...state, todos: removeTodos, currentTodo: isRemovedTodo };
    default:
      return state;
  }
}
