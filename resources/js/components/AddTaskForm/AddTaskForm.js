
import React from 'react';
import './AddTaskForm.css';

const addTaskForm = (props) => {
  
  return (
    <div className="formContainer">
      <div>
        <form className="form-inline" onSubmit={(event) => props.submitted(event)}>
          <div className="form-group">
            <input type="text" className="form-control" id="title" placeholder="Title..." onChange={(event) => props.changed(event)} required value={props.title} />
            <input type="date" className="form-control" id="due_date" name="due_date" onChange={(event) => props.changed(event)} required value={props.due_date || ''}  />
          </div>
          <button type="submit" className="btn btn-primary submit-button">Add</button>
        </form>
      </div>
    </div>
  
  );
  
}

export default addTaskForm;