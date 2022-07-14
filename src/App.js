import React, {useState} from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {nanoid} from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name) {
    const newTask = { id: "todo-"+nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map(task=>{
      if(id === task.id) {
        return {...task, completed: !task.completed};
      } 
      return task;
    })
    setTasks(updatedTask);
  }

  function deleteTask(id) {
    console.log('deleteTask');
    const activeTasks = tasks.filter(task => task.id !== id);
    setTasks(activeTasks);
  }

  function editTask(id, name) {
    const editTasks = tasks.map(task=>{
      if(task.id === id) {
        return {...task, name:name}
      }
      return task;
    })
    setTasks(editTasks);
  }

  const taskList2 = tasks.filter(FILTER_MAP[filter]);
  console.log(taskList2);

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task, key)=> (
    <Todo 
       name={task.name} 
       completed={task.completed} 
       id={task.id}
       key={key}
       toggleTaskCompleted={toggleTaskCompleted}
       deleteTask={deleteTask}
       editTask={editTask}
     />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton name={name} key={name} isPressed={name===filter} setFilter={setFilter}  />
  ));

  const headingNoun = (taskList.length !==1) ? 'tasks' : 'task';
  const taskHeading = `${taskList.length} ${headingNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {taskHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      
      </ul>
    </div>
  );
}

export default App;
