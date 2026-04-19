import React from "react";

function TodoItem({ todo, index, deleteTodo }) {
  return (
    <div className="todo-item">
      <span>{todo}</span>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
}

export default TodoItem;