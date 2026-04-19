

import React, { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, completed: false }]);
    }

    setInput("");
  };

  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const deleteSelected = () => {
    const newTodos = todos.filter((_, i) => !selected.includes(i));
    setTodos(newTodos);
    setSelected([]);
  };

  const startEdit = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="main">
      <div className="todo-container">

        <div className="header">
          <h1>TaskFlow Pro</h1>
          <p>Manage everything like a pro 🚀</p>
        </div>

        <div className="input-box">
          <input
            type="text"
            value={input}
            placeholder="Type your task..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task Stats */}
        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Done: {completedCount}</span>
          <span>Left: {todos.length - completedCount}</span>
        </div>

        {/* List */}
        <div className="list">
          {todos.map((todo, index) => (
            <div
              className={`item ${selected.includes(index) ? "selected" : ""}`}
              key={index}
            >
              <div className="left">
                <input
                  type="checkbox"
                  onChange={() => toggleSelect(index)}
                />

                <span
                  onClick={() => toggleComplete(index)}
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>
              </div>

              <div className="actions">
                <button onClick={() => startEdit(index)}>✏️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Delete */}
        {selected.length > 0 && (
          <button className="delete-all" onClick={deleteSelected}>
            Delete Selected ({selected.length})
          </button>
        )}

      </div>
    </div>
  );
}

export default App;