
import React from 'react';
import './TaskList.css';
import Task from './Task/Task';
import { format } from "date-fns"

const taskList = (props) => {

  let tasks = props.tasks.map((task, index) => {

    return <Task title={task.title.charAt(0).toUpperCase() + task.title.slice(1)} id={task.id} done={task.done} key={index} clicked={props.marker} deleteTask={props.delete} due_date={format(new Date(task.due_date), "MMMM do, yyyy")}/>

  });
  
  return (
  
    <div className="taskListContainer">
    
      {props.tasks ? tasks : <div className="noTask"><p>No tasks yet.</p></div>}
  
    </div>
  
  );
  
}

export default taskList;