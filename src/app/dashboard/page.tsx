"use client";
import React, { useState, useEffect } from "react";
import TodoComponent from "./todos/page";
import { Helper } from "../../../public/helper/script";
import Navbar from "../Header/Navbar";
import Header from "../Header/Header";
import { MdDeleteOutline } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

function page() {
  Helper.isLoginUser();

  const [openModal, setModal] = useState(false);
  const [todoList, setTodoList] = useState<any>([]);
  const [dataLoad, setDataLoad] = useState<any>(false);
  const [editTodo, setEditTodo] = useState<any>({ isEdit: false, isId: "" });
  const handleModal = () => {
    setModal(!openModal);
  };

  const getTodos = async () => {
    let activeUser = localStorage.getItem("user");
    if (activeUser !== null) {
      try {
        setDataLoad(true);
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
          setTodoList([]);
          toast.error(res.data);
          setDataLoad(false);
        }
      } catch (err: any) {
        toast.error(err);
        setDataLoad(false);
      }
    } else {
      location.href = "/auth/login";
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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

  // const handleEdit = (item: any) => {
  //   setEditTodo({ isEdit: true, isId: item.id });
  //   setTodos({
  //     title: item.title,
  //     titleError: item.title.length < 3,
  //     body: item.body,
  //     bodyError: item.body.length < 10,
  //     priority: item.priority,
  //     status: item.status,
  //     createdDate: item.createdDate,
  //     createdby: item.createdby,
  //     todosrc: item.todosrc,
  //   });
  // };

  const handleDiscardTodo = () => {
    setEditTodo({ isEdit: false, isId: "" });
    // setTodos(blankTodo);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
      <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <svg
              className="w-12 h-12"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                fill="white"
              ></path>
            </svg>

            <span className="mx-2 text-2xl font-semibold text-white">
              Dashboard
            </span>
          </div>
        </div>

        <Navbar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container px-6 py-8 mx-auto">
            <div className="flex justify-between align-middle">
              <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
              <button
                type="button"
                className="h-10 px-4 gap-x-2 text-sm font-semibold text-white bg-gray-900"
                onClick={handleModal}
              >
                <MdPlaylistAdd className="text-2xl" />
              </button>
            </div>
            {/* <div className="hidden mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                      <GrGroup className="text-3xl text-white" />
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">
                        8,282
                      </h4>
                      <div className="text-gray-500">New Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {openModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className=" w-[33rem] bg-white shadow-lg rounded-sm">
                  <div className="flex w-full px-4 py-2 mb-2 justify-between align-middle border-b border-gray-300 ">
                    <h2 className="font-medium text-xl text-gray-900">
                      Add Todo
                    </h2>
                    <button
                      type="button"
                      className="text-2xl"
                      onClick={handleModal}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <TodoComponent />
                  </div>
                  <div className="border-t border-gray-300 flex justify-between items-center px-4 py-4">
                    <div className="text-sm font-medium text-gray-700"></div>
                    <button
                      type="button"
                      className="h-8 px-2 text-sm rounded-md bg-gray-700 text-white"
                      onClick={handleModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col">
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
                              <p className="my-3 text-sm text-slate-700">
                                {o.body}
                              </p>
                              <div className="flex text-sm justify-between align-baseline">
                                <div className="flex align-baseline">
                                  <p>
                                    Prority:{" "}
                                    <span className="text-slate-500">
                                      {o.priority}
                                    </span>
                                  </p>
                                  <p className="ml-3">
                                    Status:{" "}
                                    <span className="text-slate-500">
                                      {o.status}
                                    </span>
                                  </p>
                                  <p className="ml-3">
                                    Created By:{" "}
                                    <span className="text-slate-500">
                                      {localStorage.getItem("user")}
                                    </span>
                                  </p>
                                </div>
                                <div className="text-slate-400">
                                  Created on:{" "}
                                  {new Date(o.createdDate).toLocaleString()}
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
                                // onClick={() => handleEdit(o)}
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
