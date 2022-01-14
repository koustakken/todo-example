import React from 'react'
import './TodoList.css'

function TodoList(props) {
    return (
        <div className='wrapper'>
          <div className='item'>
          <input 
            type='checkbox'
            onChange={() => props.toggleComplete(props.todo.id)}
            checked={props.todo.completed}
          />
          {props.todoEditing === props.todo.id
          ? (<input type='text' onChange={(e) => props.setEditText(e.target.value)} value={props.editText}/>)
          : (<div className={props.todo.completed ? 'text complete': 'text'}>{props.todo.title}</div>)}
         
          {props.todoEditing === props.todo.id
          ?(<button className='submit' onClick={() => props.editTodo(props.todo.id)}>Submit Edit</button>)
          :(<button className='edit' onClick={() => props.setTodoEditing(props.todo.id)}>Edit</button>)
          }
          
          
          <button className='delete' onClick={() => props.deleteTask(props.todo.id)}>Delete</button>
          </div>
        </div>
    )
}

export default TodoList
