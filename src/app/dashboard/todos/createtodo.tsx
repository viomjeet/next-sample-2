"use client";
import axios from "axios";
import React, { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { MdPlaylistAddCheck } from "react-icons/md";
import { toast } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function CreateTodo(props: any) {
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
    priority: "High",
    status: "Started",
    createdDate: "",
    createdby: "",
    todosrc: "",
  };

  const [Todos, setTodos] = useState<any>(
    props?.isEdit ? props?.editTodo : blankTodo
  );
  const [saveLoading, setSetLoading] = useState<any>(false);

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
      setSetLoading(true);
      let activeUser = localStorage.getItem("user");
      let request = {
        title: Todos.title,
        body: Todos.body,
        priority: Todos.priority,
        status: Todos.status,
        createdDate: props?.isEdit? Todos.createdDate: new Date().toISOString(),
        createdby: activeUser !== null ? activeUser : "",
        todosrc: "",
        updatedDate: props?.isEdit ? new Date().toISOString() : Todos.updatedDate,
        edited: props?.isEdit ? 1 : 0,
      };
      try {
        debugger;
        let data: any;
        if (props?.isEdit) {
          data = await axios.put(`/dashboard/todos/api/${props?.isEditId}`, request);
        } else {
          data = await axios.post("/dashboard/todos/api", request);
        }
        if (data.status === 200) {
          toast.success(data?.data);
          setTodos(blankTodo);
          if (props?.isEdit) {
            props?.discard();
          }
          props.loadData();
          props.close();
          setSetLoading(false);
        } else {
          toast.error(data?.data);
          setSetLoading(false);
        }
      } catch (e: any) {
        setSetLoading(false);
        toast.error(e?.message);
      }
    }
  };

  const handleCancel = () => {
    if (props?.isEdit) {
      props?.discard();
    }
    props.close();
  };

  const handleUpdateTodos = (e: any, type: any) => {
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

  return (
    <div className="">
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
          onChange={(e: any) => handleUpdateTodos(e, "title")}
          placeholder="Todo Title"
        />
        <textarea
          rows={4}
          className={`${
            Todos.bodyError
              ? "border-red-600 placeholder:text-red-500"
              : "border-gray-200 placeholder:text-gray-500"
          } py-2 px-2 block w-full focus:z-10bg-white border mb-1 rounded-sm focus:outline-none  focus:bg-white
            `}
          onChange={(e: any) => handleUpdateTodos(e, "body")}
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
                      onClick={() => handleUpdateTodos(item, "priority")}
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
              className="absolute right-0 z-0 mt-1 w-56 origin-top-right rounded-xs bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {statusList.map((item: any) => (
                  <MenuItem key={item.id}>
                    <a
                      onClick={() => handleUpdateTodos(item, "status")}
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
            disabled={saveLoading}
            className="flex py-2 px-2 w-full justify-center items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {props?.isEditId ? (
              <>
                Update Todo <MdPlaylistAddCheck className="text-2xl" />
              </>
            ) : (
              <>
                Add Todo <MdPlaylistAdd className="text-2xl" />
              </>
            )}
          </button>
          <button
            title="Close"
            type="submit"
            onClick={handleCancel}
            className="flex py-2 px-2 w-20 ml-2 justify-center items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Close
            {/* <MdClear className="text-2xl" /> */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
