import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { gettodo,deleteTodo,addTodo} from './slice/todoSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(gettodo())
  },[dispatch])
  const todos = useSelector((state) => state.todos.todos);
  const handledel =(id)=>{
    dispatch(deleteTodo(id));
  }
  return (
    <div className="App">
      <header className="App-header">
         <ul>
            {todos.map((t)=>{
              return <li key={t.id}>{t.title} <button onClick={()=>{handledel(t.id)}}>delete</button> </li>;
            })}
         </ul>
      </header>
    </div>
  );
}

export default App;
