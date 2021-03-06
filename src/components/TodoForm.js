import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
  }, [currentTodo.id, currentTodo.text]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
        const response = await Axios.patch(`https://hooks-api.fuchienhsu12.now.sh/todos/${currentTodo.id}`, {
            text: todo
        })
        dispatch({ type: 'UPDATE_TODO', payload: response.data });
    } else {
        const response = await Axios.post('https://hooks-api.fuchienhsu12.now.sh/todos', {
            id: new Date().getTime(),
            text: todo,
            complete: false
        })
        dispatch({ type: 'ADD_TODO', payload: response.data });
    }
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
}
