"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import Link from "next/link";
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
      if (res.status === 200) {
        const data: any = await res.data;
        setTodos(data);
      } else {
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
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
      setAlart(todoType === "update" ? "Updated." : "Added.");
      setTimeout(() => {
        setAlart("");
      }, 1000);
      console.log(data?.data);
    } else {
      console.log(data?.data);
    }
  };

  const handleEdit = async (item: any) => {
    setTodo(item.title);
    setTitleError(false);
    setEditTodo(item.id);
    setTodoType("update");
  };

  const handleDelete = async (id: any) => {
    const data = await axios.delete(`/api/${id}`);
    if (data.status === 200) {
      getTodos();
      setAlart("Deleted.");
      setTimeout(() => {
        setAlart("");
      }, 1000);
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
      <span
        className={
          alert === ""
            ? "d-none"
            : "fixed rounded-sm mx-auto flex w-40 justify-center inset-x-0 top-0 bg-green-50 px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
        }
      >
        {alert}
      </span>
      <form
        className="bg-slate-300 pt-2 pb-6 shadow-sm px-4 mb-5"
        onSubmit={handlesaveTodos}
      >
        <h4 className="my-2">Experience new way to adding list in next-js.</h4>
        <div className="flex items-end flex-col justify-between">
          <textarea
            rows={3}
            className={`${
              titleError ? "border-red-500" : "border-white"
            } flex-1 border-2 w-full mb-4 p-2 outline-none rounded-sm focus:border-green-500`}
            name="title"
            value={todo}
            onChange={(event: any) => setTodo(event.target.value)}
            placeholder="Enter todo"
          />
          <button
            type="submit"
            className="bg-slate-500 border-2 border-slate-500 text-white p-2 border-radius-2 focus:ring-2 hover:bg-slate-600 hover:border-slate-700 rounded-sm"
          >
            {editTodo !== "" ? "Update" : "Add"} Todo
          </button>
        </div>
      </form>

      {todos.map((o: any) => (
        <div key={o.id}>
          <div className="bg-slate-50 p-2 mb-2 shadow-lg flex items-center justify-between">
            <span className="text-capitalize block w-100 pl-4 py-4 pr-5">
              <Link className="text-blue-500 capitalize hover:text-blue-700 border-1" href={`/${o.id}`}>{o.id}: {o.title}</Link>
            </span>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-2 py-2 text-gray-900 bg-white border border-r-0 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-s-sm"
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
                className="px-2 py-2 text-gray-900 bg-white border border-l-0 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-e-sm"
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
