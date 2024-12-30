"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import { MdPlaylistAdd } from "react-icons/md";
import { MdPlaylistAddCheck } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function page() {
  const priorityList = [
    { id: 1, value: "High" },
    { id: 2, value: "Medium" },
    { id: 3, value: "Low" },
    { id: 4, value: "Critical" },
  ];
  const statusList = [
    { id: 1, value: "Started" },
    { id: 2, value: "Completed" },
    { id: 3, value: "Progress" },
    { id: 4, value: "Waiting" },
  ];

  const blankTodo = {
    title: "",
    titleError: false,
    body: "",
    bodyError: false,
    priority: "Started",
    status: "High",
    createdDate: "",
    createdby: "",
    todosrc: "",
  };

  const [Todos, setTodos] = useState<any>(blankTodo);
  const [todoList, setTodoList] = useState<any>([]);
  const [dataLoad, setDataLoad] = useState<any>(false);
  const [editTodo, setEditTodo] = useState<any>({ isEdit: false, isId: "" });

  const getTodos = async () => {
    try {
      let activeUser = localStorage.getItem("user");
      const res = await axios(
        `/dashboard/todos/api?createdby=${
          activeUser === null ? "" : activeUser
        }`
      );
      if (res.status === 200) {
        const data: any = await res.data;
        setTodoList(data);
        setDataLoad(false);
      } else {
        toast.error(res.data);
        setDataLoad(false);
      }
    } catch (err: any) {
      toast.error(err);
      setDataLoad(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleCreateTodo = async (event: any) => {
    event.preventDefault();
    setTodos({
      title: Todos.title,
      titleError: Todos.title.length < 3,
      body: Todos.body,
      bodyError: Todos.body.length < 10,
      priority: Todos.priority,
      status: Todos.status,
      createdDate: Todos.createdDate,
      createdby: Todos.createdby,
      todosrc: Todos.todosrc,
    });
    if (Todos.title.length < 3 || Todos.body.length < 10) {
      toast.error("Fields can't be blank.");
    } else {
      let activeUser = localStorage.getItem("user");
      let request = {
        title: Todos.title,
        body: Todos.body,
        priority: Todos.priority,
        status: Todos.status,
        createdDate: new Date().toISOString(),
        createdby: activeUser !== null ? activeUser : "",
        todosrc: "",
      };
      try {
        let data: any;
        if (editTodo.isEdit) {
          data = await axios.put(
            `/dashboard/todos/api/${editTodo.isId}`,
            request
          );
        } else {
          data = await axios.post("/dashboard/todos/api", request);
        }
        if (data.status === 200) {
          toast.success(data?.data);
          setTodos(blankTodo);
          setEditTodo({ isEdit: false, isId: "" });
          getTodos();
        } else {
          toast.error(data?.data);
        }
      } catch (e: any) {
        toast.error(e?.message);
      }
    }
  };

  const handleTodos = (e: any, type: any) => {
    setTodos({
      title: type === "title" ? e.target.value : Todos.title,
      titleError:
        type === "title" ? e.target.value.length < 3 : Todos.titleError,
      body: type === "body" ? e.target.value : Todos.body,
      bodyError: type === "body" ? e.target.value.length < 10 : Todos.bodyError,
      priority: type === "priority" ? e.value : Todos.priority,
      status: type === "status" ? e.value : Todos.status,
      createdDate: Todos.createdDate,
      createdby: Todos.createdby,
      todosrc: Todos.todosrc,
    });
  };

  const handleDelete = async (id: any) => {
    confirmAlert({
      title: "Alert!",
      message: `Are you sure you want to delete?`,
      buttons: [
        {
          label: "Confirm",
          onClick: async () => {
            const data = await axios.delete(`/dashboard/todos/api/${id}`);
            if (data.status === 200) {
              getTodos();
              toast.success("Deleted successfully!");
            } else {
              toast.error(data?.data);
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };

  const handleEdit = (item: any) => {
    setEditTodo({ isEdit: true, isId: item.id });
    setTodos({
      title: item.title,
      titleError: item.title.length < 3,
      body: item.body,
      bodyError: item.body.length < 10,
      priority: item.priority,
      status: item.status,
      createdDate: item.createdDate,
      createdby: item.createdby,
      todosrc: item.todosrc,
    });
  };

  const handleDiscardTodo=()=>{
    setEditTodo({ isEdit: false, isId: '' });
    setTodos(blankTodo)
  }

  return (
    <div className="">
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="w-full sm:w-1/2 xl:w-1/3">
        <div className="px-5 py-6 bg-white rounded-md shadow-sm">
          <h4 className="my-2 text-slate-800 [text-shadow:_0_2px_2px_rgb(0_0_0_/_10%)]">
            Experience new way to adding list in next-js.
          </h4>
          <form onSubmit={handleCreateTodo}>
            <input
              className={`${
                Todos.titleError
                  ? "border-red-600 placeholder:text-red-500"
                  : "border-gray-200 placeholder:text-gray-500"
              } py-2 px-2 block w-full focus:z-10bg-white border mb-1 rounded-sm focus:outline-none  focus:bg-white
            `}
              type="text"
              value={Todos.title}
              onChange={(e: any) => handleTodos(e, "title")}
              placeholder="Todo Title"
            />
            {/* {JSON.stringify(Todos)} */}
            <textarea
              rows={2}
              className={`${
                Todos.bodyError
                  ? "border-red-600 placeholder:text-red-500"
                  : "border-gray-200 placeholder:text-gray-500"
              } py-2 px-2 block w-full focus:z-10bg-white border mb-1 rounded-sm focus:outline-none  focus:bg-white
            `}
              onChange={(e: any) => handleTodos(e, "body")}
              value={Todos.body}
              placeholder="Todo discription"
            />

            <div className="mb-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-xs bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Priority: {Todos.priority}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-1 w-56 origin-top-left rounded-xs bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {priorityList.map((item: any) => (
                      <MenuItem key={item.id}>
                        <a
                          onClick={() => handleTodos(item, "priority")}
                          href="#"
                          id={`id_${item.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                          {item.value}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <Menu as="div" className="relative inline-block text-left ml-2">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-xs bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Status: {Todos.status}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-xs bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {statusList.map((item: any) => (
                      <MenuItem key={item.id}>
                        <a
                          onClick={() => handleTodos(item, "status")}
                          href="#"
                          id={`id_${item.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                          {item.value}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>

            <div className="flex justify-between">
              <button
                title="Add Todo"
                type="submit"
                className="flex py-2 px-2 w-full justify-center items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {editTodo.isEdit ? (
                  <>
                    Update Todo <MdPlaylistAddCheck className="text-2xl" />
                  </>
                ) : (
                  <>
                    Add Todo <MdPlaylistAdd className="text-2xl" />
                  </>
                )}
              </button>
              {editTodo.isEdit && (
                <button
                  title="Discard"
                  type="submit"
                  onClick={handleDiscardTodo}
                  className="flex py-2 px-2 w-20 ml-2 justify-center items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <MdClear className="text-2xl" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="my-3">
        {dataLoad
          ? "Loading..."
          : todoList.map((o: any) => {
              let statusClass = o.status;
              return (
                <div key={o.id}>
                  <div className="bg-slate-50 p-1 mb-2 pr-4 shadow-lg flex items-center justify-between">
                    <div className="capitalize block w-full px-4 py-2 p-5">
                      {/* <Link className="text-black capitalize" href={`/dashboard/todos/${o.id}`}> */}
                      <h4 className="text-sm font-bold">{o.title}</h4>
                      <p className="my-3 text-sm text-slate-700">{o.body}</p>
                      <div className="flex text-sm justify-between align-baseline">
                        <div className="flex align-baseline">
                          <p>
                            Prority:{" "}
                            <span className="text-slate-500">{o.priority}</span>
                          </p>
                          <p className="ml-3">
                            Status:{" "}
                            <span className="text-slate-500">{o.status}</span>
                          </p>
                        </div>
                        <div className="text-slate-400">
                          Created on: {new Date(o.createdDate).toLocaleString()}
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>

                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        type="button"
                        disabled={editTodo.isId === o.id}
                        className="px-2 py-2 text-gray-900 bg-white border border-r-0 disabled:opacity-5 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-s-sm"
                        onClick={() => handleEdit(o)}
                      >
                        <CiEdit />
                      </button>

                      <button
                        type="button"
                        disabled={editTodo.isId === o.id}
                        className="px-2 py-2 text-gray-900 bg-white border border-l-0 disabled:opacity-5 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-e-sm"
                        onClick={() => handleDelete(o.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default page;
