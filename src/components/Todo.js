import React, {useState} from 'react';

export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);

    const [newName, setNewName] = useState('');

    function handleChange(e) {
      setNewName(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

    const viewTemplate = (
        <div className="stack-small">  
         <div className="c-cb">
            <input id={props.id} onChange={() => props.toggleTaskCompleted(props.id)} type="checkbox" defaultChecked={props.completed} />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button onClick={() => setEditing(true)} type="button" className="btn">
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button onClick={() => props.deleteTask(props.id)} type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </div>
    );

    const editTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
                New name for {props.name}
            </label>
            <input id={props.id} value={newName} onChange={handleChange} className="todo-text" type="text" />
            </div>
            <div className="btn-group">
            <button type="button" onClick={() => setEditing(false)} className="btn todo-cancel">
                Cancel
                <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
                Save
                <span className="visually-hidden">new name for {props.name}</span>
            </button>
            </div>
        </form>
    );

    
    return (
        <li className="todo">
          {isEditing ? editTemplate : viewTemplate}
        </li>
    )
}