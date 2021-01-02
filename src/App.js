import './App.css';
import TodoList from './TodoList/TodoList';
import AddItem from './AddItem/AddItem';
import { useState } from 'react';

const App = (props) => {
  const [newTask, setNewTask] = useState({});
  return (
    <div className="app">
      <h1 className="title">To Do App</h1>
      <AddItem addNewTask={(task) => setNewTask(task)}/>
      <TodoList newTask={newTask} />
    </div>
  );
}

export default App;
