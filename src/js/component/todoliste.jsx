import React, { useState,useEffect } from "react";

export function TodoList() {
  const [todos, setTodos] = useState([
  ]);
  const [task, setTask] = useState("");
  const getTodos=async ()=>{
    await fetch("https://playground.4geeks.com/todo/users/BinahDaath", {method: "POST",})
    let a=(await (await fetch("https://playground.4geeks.com/todo/users/BinahDaath")).json()).todos;
    a.reverse()
    setTodos(a)
  }
  useEffect(()=>{getTodos()},[])
  //useEffect(getTodos)
  const handleChangeTask = (ev) => {
    setTask(ev.target.value);
  };

  const handleEnter = async (ev) => {
    if (ev.key === "Enter" && task.trim() !== "") {
      
      let t=task.trim()
      //fetch https://playground.4geeks.com/todo/todos/BinahDaath {"label":string,is_done:false}
      let b={label:t,is_done:false};
      let a=await (await fetch("https://playground.4geeks.com/todo/todos/BinahDaath",{method: "POST",headers:{'Content-type': 'application/json'},body:JSON.stringify(b)})).json();
      console.log(a)
      setTodos([a, ...todos]);
      setTask("");
    }
  };

  const handleDelete = async (index,id) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
    await fetch("https://playground.4geeks.com/todo/todos/"+id,{method: "DELETE"});
  };

  return (
    <div >
      <div className="text-9xl text-center text-red-400">todos</div>
      <div className="flex flex-row justify-center">
    <div className="size-2/3">
      <input
        className="border size-full"
        value={task}
        onChange={handleChangeTask}
        onKeyDown={handleEnter}
      />

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className="flex items-center justify-between">
            {todo.label}{" "}
            <button
              onClick={() => handleDelete(index,todo.id)}
              className="px-1 bg-red-400 hover:bg-red-700 text-white text-xs rounded-lg"
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <div>
        {todos.length > 0 ? (
          <span>{todos.length} items left</span>
        ) : (
          <span>No tasks, add a task</span>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}