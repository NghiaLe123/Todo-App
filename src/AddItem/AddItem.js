import 'antd/dist/antd.css'; 
import axios from '../axios-todo';
import { Input, Button } from 'antd';
import './AddItem.css';
import { Fragment, useEffect, useState } from 'react';

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
      const res = await axios.post('/todo.json?', taskData)
      const newTask = {
        ...taskData,
        id: res.data.name
      }
      addNewTask(newTask)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    // deleteTodo()
  }, [])
  return (
    <Fragment>
      <Input 
        placeholder="Add task here" 
        className="input" 
        onChange={handleInputChange}
      />
      <Button 
        className="button" 
        onClick={addTodo}
      >Add Task</Button>
    </Fragment>
  )
}

export default AddItem;