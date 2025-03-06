import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});
    const [dateTimeInput, setDateTimeInput] = useState('');

    const handleAddTodo = () => {
        if (headingInput.trim() !== '' && dateTimeInput.trim() !== '') {
            setTodos([...todos, { heading: headingInput, dateTime: dateTimeInput, lists: [] }]);
            setHeadingInput('');
            setDateTimeInput('');
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleDeleteListItem = (todoIndex, listIndex) => {
        const newTodos = [...todos];
        newTodos[todoIndex].lists.splice(listIndex, 1);
        setTodos(newTodos);
    };

    const handleAddList = (index) => {
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos];
            newTodos[index].lists.push(listInputs[index]);
            setTodos(newTodos);
            setListInputs({ ...listInputs, [index]: '' });
        }
    };

    const handleListInputChange = (index, value) => {
        setListInputs({ ...listInputs, [index]: value });
    };

    return (
        <>
            <div className="todo-container">
                <h1 className="title">My Todo List</h1>
                <h3 className="branding">by T Raihan</h3>
                <div className="input-container">
                    <input
                        type="text"
                        className="heading-input"
                        placeholder="Enter heading"
                        value={headingInput}
                        onChange={(e) => setHeadingInput(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        className="date-time-input"
                        value={dateTimeInput}
                        onChange={(e) => setDateTimeInput(e.target.value)}
                    />
                    <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
                </div>
            </div>
            <div className="todo_main">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-card">
                        <div className="heading_todo">
                        <div className="heading-content">
                            <h3>{todo.heading}</h3>
                            <p className="date-time">{new Date(todo.dateTime).toLocaleString()}</p>
                            </div>
                             <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
                        </div>

                        {/* List Items with Delete Buttons */}
                        <ul>
                            {todo.lists.map((list, listIndex) => (
                                <li key={listIndex} className='todo_inside_list'>
                                    <p>{list}</p>
                                    <button
                                        className="delete-button-list"
                                        onClick={() => handleDeleteListItem(index, listIndex)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Add List Items */}
                        <div className='add_list'>
                            <input
                                type="text"
                                className="list-input"
                                placeholder="Add List"
                                value={listInputs[index] || ''}
                                onChange={(e) => handleListInputChange(index, e.target.value)}
                            />
                            <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="footer">
                <h4 className="footer_branding"> created by Towhid Raihan</h4>
            </div>
        </>
    );
};

export default TodoList;