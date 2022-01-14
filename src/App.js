import React from "react";
import Form from "./components/Form/Form";
import TodoList from "./components/TodoList/TodoList";
import './App.css';
import axios from "axios";

function App() {
  
  //подрубаем axios
  React.useEffect(()=>{
    axios.get(`https://jsonplaceholder.typicode.com/todos/?_limit=10`)
      .then(res => {
        setTodos(res.data);
      })
  }, [])

  //массив с задачами
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState('');
  

  //редактирование 
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  //храние задач 
  React.useEffect(() =>{
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])
  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newTask = {
  //     id: new Date().getTime(),
  //     title: todo,
  //     completed: false
  //   }
  //   setTodos([...todos].concat(newTask));
  //   setTodo('');
  // }

  const handleSubmit = (e) => {
    if (!todo || /^\s*$/.test(todo)){
      return e.preventDefault();
    } 
    e.preventDefault();
    const newTask = {
      id: new Date().getTime(),
      title: todo,
      completed: false
    }
    setTodos([newTask, ...todos]);
    setTodo('');
  }

  //удаление задачи
  const deleteTask = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos);
  }
  //выполнение задачи
  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      } return todo
    })
    setTodos(updatedTodos);
  }
  //подтверждение редактирования
  const editTodo = (id) =>{
    if (!editText || /^\s*$/.test(editText)) {
      return;
    }
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.title = editText
      } return todo
    })
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditText('');
  }

  return (
    <div className="App">
      <Form 
      handleSubmit={handleSubmit}
      todo={todo}
      setTodo={setTodo}
      />
      <div className="todo-list">
      {
        //вывод списка задач
        todos.map((todo) => 
        <TodoList 
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          todoEditing={todoEditing}
          setEditText={setEditText}
          setTodoEditing={setTodoEditing}
          deleteTask={deleteTask}
        />)
      }
      </div>
    </div>
  );
}

export default App;