import React, { useContext, useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// const username = 'Chien';
import TodosContext from './context';
import TodosReducer from './reducer';

// COMPONENTS
import TodosList from './components/TodosList';
import TodoForm from './components/TodoForm';
import Axios from 'axios';

export const UserContext = React.createContext();

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await Axios.get(endpoint);
    setData(response.data);
  };

  return data
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  const savedTodos = useAPI('https://hooks-api.fuchienhsu12.now.sh/todos')

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
  }, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodosList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  // <UserContext.Provider value={username}>
  <App />,
  // </UserContext.Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
