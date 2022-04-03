import React, { Component, useState, useEffect } from "react";
import BlogList from "./BlogList";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    // if no task, do nothing
    if (!task) return;

    // create a new task
    const new_task = {
      id: tasks.length + 1,
      task,
      done: false,
    };

    // set task to tasks state
    setTasks((prev) => [new_task, ...prev]);
    setTask("");
  };

  // mark a task as done
  // this function is here because our single source of truth (tasks state)
  // is here too
  // if it's an API, I'll just handle the delete inside the Task component
  const handleMarkDone = (id) => {
    // find the task with the id above
    const task = tasks.find((a, b) => a.id === id);

    // get other tasks, without the id
    const rest_tasks = tasks.filter((task) => task.id !== id);

    if (task.done) {
      task.done = false;
      setTasks([task, ...rest_tasks]);
      return;
    }

    // if you want the modified task to be at the top, start it in the array
    // else let it be at the end
    task.done = true;
    setTasks([...rest_tasks, task]);

    return;
  };

  // delete a task from source of truth
  const handleDelete = (id) => {
    const new_tasks = tasks.filter((task) => task.id !== id);
    setTasks([...new_tasks]);
    return;
  };

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  return (
    <div className="p-2">
      <div className="shadow max-w-xl mx-auto my-5">
        <article className="p-4 border bg-pink-600">
          <h1 className="font-bold text-xl text-white">TICK TACK</h1>
        </article>

        <form
          onSubmit={handleCreate}
          className="border p-4 pb-10 bg-gray-900 text-white"
        >
          <div className="mb-2">
            <label htmlFor="" className="mb-2">
              New To-Do
            </label>
            <Input
              value={task || ""}
              onChange={(e) => setTask(e.target.value)}
              placeholder="I want to..."
            />
          </div>

          <button className="py-2 px-4 rounded bg-pink-600 hover:bg-pink-700 transition text-white font-medium mt-4">
            <span className="text-xl font-bold">+</span> Create
          </button>
        </form>

        <ul className=" text-white">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                task={task}
                key={task.id}
                handleMarkDone={handleMarkDone}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <li>You've added no task yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Task({ task, handleDelete, handleMarkDone, ...rest }) {
  const [showActions, setShowActions] = useState(false);

  const markTaskAsDone = () => {
    handleMarkDone(task.id);
    setShowActions(false);
    return;
  };

  return (
    <li
      {...rest}
      className={`border p-4 ${
        task.done ? "bg-green-200 text-green-800 font-medium" : "bg-gray-900"
      } flex justify-between`}
    >
      <span className={`text-sm pr-4 ${task.done && "line-through"}`}>
        {task.task}
      </span>

      <div className="relative">
        <button
          onClick={() => setShowActions((prev) => !prev)}
          className="bg-pink-100 rounded text-pink-600 px-4 py-1 font-medium text-sm hover:text-pink-700 hover:bg-pink-200 transition"
        >
          {showActions ? "Close" : "Action"}
        </button>

        {showActions && (
          <ul className="text-sm text-center absolute bg-pink-600 mt-1 w-28 p-2 transition-all z-50 right-0 shadow-2xl">
            <li>
              <button
                onClick={markTaskAsDone}
                className="p-1 bg-white rounded text-pink-600 font-medium w-full hover:bg-pink-200 hover:text-pink-700"
              >
                {task.done ? "Mark Undone" : "Mark Done"}
              </button>
            </li>

            <li>
              <button
                onClick={() => handleDelete(task.id)}
                className="p-1 bg-white rounded text-pink-600 w-full mt-2 font-medium hover:bg-pink-200 hover:text-pink-700"
              >
                Delete
              </button>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

function Input({ ...rest }) {
  return (
    <input
      {...rest}
      type="text"
      className="border w-full rounded px-2 py-1 focus:border-blue-500 text-gray-700"
    />
  );
}

export default Home;
