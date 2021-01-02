import { List } from 'antd';
import { useEffect, useState } from 'react';
import './TodoList.css'
import axios from '../axios-todo'
import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';
const TodoList = ({newTask}) => {

  const [tasks, setTasks] = useState([]);
  const fetchTodoList = async () => {
    try {
      const res = await axios.get('/todo.json')
      const fetchedTodoList = [];
      for (let key in res.data) {
        fetchedTodoList.push({
          ...res.data[key],
          id: key
        });
      }
      setTasks(fetchedTodoList)
    } catch (error) {
      console.log(error)
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete("/todo/" + id +".json?")
      const updatedTasks = tasks.filter((item) => {
        return item.id !== id;
      })
      setTasks(updatedTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (id, completeStatus) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    try {
      await axios.patch("/todo/" + id +".json?", {
        completed: !completeStatus
      })
      const updatedData = [...tasks];
      updatedData[taskIndex].completed = !completeStatus
      setTasks(updatedData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodoList();
  }, [])

  useEffect(() => {
    setTasks(tasks => [...tasks,newTask]);
  }, [newTask])
  return tasks && (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={`Completed: ${item.completed}`}
          />
          <SwapOutlined 
            onClick={() => updateTodo(item.id, item.completed)}
          />
          <DeleteOutlined 
            className="remove-button" 
            onClick={() => deleteTodo(item.id)}
            style={{paddingLeft:'50px'}}
          />
        </List.Item>
      )}
    />
  )
}

export default TodoList;