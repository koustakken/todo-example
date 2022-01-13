import React from 'react'
import './Form.css'

function Form(props) {
    return (
        <div className='wrapper-form'>
            <form 
            onSubmit={props.handleSubmit}
            >
                <input 
                type='text'
                onChange={(e) => props.setTodo(e.target.value)}
                value={props.todo} 
            />
                <button type='submit'>Add Task</button>
            </form>
        </div>
    )
}

export default Form
