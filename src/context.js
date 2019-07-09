import React from 'react';

const TodosContext = React.createContext({
  todos: [
    { id: 1, text: 'Eat break fast', complete: false },
    { id: 2, text: 'Do laundry', complete: false },
    { id: 3, text: 'Finish project', complete: false }
  ],
  currentTodo: {}
});

export default TodosContext;
