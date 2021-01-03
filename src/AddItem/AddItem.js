import 'antd/dist/antd.css'; 
import axios from '../axios-todo';
import { Input, Button } from 'antd';
import './AddItem.css';
import { Fragment, useState } from 'react';

const AddItem = ({addNewTask}) => {
  const [inputValue, setInputValue] = useState('');
  const addTodo = async () => {
    if (inputValue === '') {
      return;
    }
    try {
      const taskData = {
        title: inputValue,
        completed: false,
      }
      const res = await axios.post('/todo.json', taskData)
      const newTask = {
        ...taskData,
        id: res.data.name
      }
      addNewTask(newTask)
      setInputValue('');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Input 
        placeholder="Add task here" 
        className="input" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button 
        className="button" 
        onClick={addTodo}
      >Add Task</Button>
    </Fragment>
  )
}

export default AddItem;