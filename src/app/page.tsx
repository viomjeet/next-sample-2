"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdClear } from "react-icons/md";
function page() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [todoType, setTodoType] = useState("new");
  const [titleError, setTitleError] = useState(false);
  const [alert, setAlart] = useState("");

  const getTodos = async () => {
    try {
      const res = await axios("/api");
      const data: any = await res.data;
      setTodos(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handlesaveTodos = (event: any) => {
    event.preventDefault();
    setTitleError(todo == "");
    if (todo !== "") {
      saveTodos();
    }
  };

  const saveTodos = async () => {
    let request: any = { title: todo };
    let data: any;
    if (todoType === "new") {
      data = await axios.post("/api", request);
    } else if (todoType === "update") {
      data = await axios.put(`/api/${editTodo}`, request);
    }
    if (data.status === 200) {
      getTodos();
      setTodoType("new");
      setTodo("");
      setEditTodo("");
      console.log(data?.data);
    } else {
      console.log(data?.data);
    }
  };

  const handleEdit = async (item: any) => {
    setTodo(item.title);
    setEditTodo(item.id);
    setTodoType("update");
  };

  const handleDelete = async (id: any) => {
    const data = await axios.delete(`/api/${id}`);
    if (data.status === 200) {
      getTodos();
      console.log(data?.data);
    } else {
      console.log(data?.data);
    }
  };

  const handleClear = () => {
    setTodoType("new");
    setTodo("");
    setEditTodo("");
  };

  return (
    <div className="mx-auto w-full max-w-7xl lg:px-8">
      <form
        className="bg-slate-300 p-2 mb-1 flex items-center justify-between"
        onSubmit={handlesaveTodos}
      >
        <input
          type="text"
          className={`${
            titleError ? "border-red-700" : ""
          } flex-1 border-2 mr-2 p-2 outline-none focus:border-green-500`}
          name="title"
          value={todo}
          onChange={(event: any) => setTodo(event.target.value)}
          placeholder="Enter todo"
        />
        <button
          type="submit"
          className="bg-red-400 p-2 border-radius-2 focus:ring-4 hover:bg-red-600"
        >
          {editTodo !== "" ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      {todos.map((o: any) => (
        <div key={o.id}>
          <div className="bg-slate-300 p-2 mb-1 flex items-center justify-between">
            <span className="text-capitalize block w-100">
              {o.id}: {o.title}
            </span>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() =>
                  editTodo !== "" && editTodo === o.id
                    ? handleClear()
                    : handleEdit(o)
                }
              >
                {editTodo !== "" && editTodo === o.id ? (
                  <MdClear />
                ) : (
                  <CiEdit />
                )}
              </button>

              <button
                type="button"
                className="px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleDelete(o.id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
