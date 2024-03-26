import React, { useState } from 'react';

function Main() {
    const [darkMode, setDarkMode] = useState(false);
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [tasksLeftColor, setTasksLeftColor] = useState('white'); 

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
   
        setTasksLeftColor(tasksLeftColor === 'white' ? 'black' : 'white');
    }

    const handleInputChange = (e) => {
        setTodoInput(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }

    const addTodo = () => {
        if (todoInput.trim() !== '') {
            setTodos([...todos, { text: todoInput, completed: false }]);
            setTodoInput('');
        }
    }

    const deleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }

    const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    }

    const clearCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
    }

    return (
        <div className={!darkMode ? "dark-mode" : "main"}>
          <div className='inside'><div className='header'>
                <p className='p1'>T O D O</p>
                <div className={!darkMode ? "darkbtn" : "lightbtn"} onClick={toggleDarkMode}></div>
            </div>
            <br /><br />
            <input
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={todoInput}
                className='input1'
                type="text"
                placeholder='Create a new todo...'
                style={{
                  backgroundColor: darkMode ? 'white' : '#333',
                  color: darkMode ? 'black' : 'white'}}
            />
            <br /><br /><br /><br /><br />
            <div className='todo' style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                {todos.map((todo, index) => (
                    <div key={index} className="todo-item">
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(index)} />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: darkMode ? 'black' : 'white' }}>{todo.text}</span>
                        <div className='delete' onClick={() => deleteTodo(index)} style={{ color: tasksLeftColor }}>X</div>
                    </div>
                ))}
            </div>
            <br />
            <div className='footer'>
            <div style={{ color: tasksLeftColor }}>
                {todos.filter(todo => !todo.completed).length} tasks left
            </div>
            
            <div className='clearcompleted' onClick={clearCompleted} style={{ color: tasksLeftColor }}>Clear Completed</div>
            </div>
            
           
            </div>
            
        </div>
    );
}

export default Main;
