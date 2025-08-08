"use client";
import React, { useState, useEffect } from "react";
import CreateTodo from "../components/createtodo";
import { Helper } from "../../../../public/helper/script";
import { MdDeleteOutline } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { GrGroup } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Inactiveusers from "../components/inactiveusers";

function page() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    Helper.isLoginUser();
  }
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
  const [openModal, setModal] = useState(false);
  const [todoList, setTodoList] = useState<any>([]);
  const [dataLoad, setDataLoad] = useState<any>(false);
  const [isEditTodo, setIsEdit] = useState<any>({ isEdit: false, isId: "" });
  const [updateTodo, setUpdateTodos] = useState<any>(blankTodo);
  const [editLoad, setEditLoad] = useState<any>(false);
  const handleModal = () => {
    handleDiscardTodo();
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
      router.push("/auth/login");
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
              toast.error(data?.data, { toastId: "dashboard" });
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

  const handleEdit = async (item: any) => {
    setEditLoad(true);
    const data = await axios.get(`/dashboard/todos/api/${item.id}`);
    if (data.status === 200) {
      setModal(!openModal);
      setIsEdit({ isEdit: true, isId: item.id });
      setUpdateTodos(data?.data[0]);
      setEditLoad(false);
    } else {
      setEditLoad(false);
      toast.error(data?.data);
    }
  };

  const handleDiscardTodo = () => {
    setIsEdit({ isEdit: false, isId: "" });
    setUpdateTodos(blankTodo);
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="container lg:px-6 py-6 mx-auto">
        <div className="flex justify-between align-middle">
          <h3 className="text-3xl font-medium text-gray-700">Todos</h3>
          <button
            type="button"
            className="h-10 relative px-4 gap-x-2 text-sm font-semibold text-black bg-white"
            onClick={handleModal}
          >
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <MdPlaylistAdd className="text-2xl" />
          </button>
        </div>

        <div className="hidden mt-4">
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
        </div>

        {openModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className=" w-[33rem] bg-white shadow-lg rounded-sm">
              <div className="flex w-full px-4 py-2 mb-4 justify-between align-middle border-b border-gray-300 ">
                <h2 className="font-medium text-xl text-gray-900">
                  {isEditTodo.isEdit ? "Edit" : "Add"} Todo
                </h2>
                <button
                  type="button"
                  title="Add new todo"
                  className="text-2xl"
                  onClick={handleModal}
                >
                  &times;
                </button>
              </div>
              <div>
                <CreateTodo
                  isEdit={isEditTodo.isEdit}
                  isEditId={isEditTodo.isId}
                  editTodo={updateTodo}
                  close={handleModal}
                  loadData={getTodos}
                  discard={handleDiscardTodo}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          <div className="group md:col-span-2">
            {dataLoad ? (
              <div className="px-4 py-4 bg-white mb-4">Loading....</div>
            ) : (
              todoList.map((o: any, i: any) => {
                let isClass: any = "";
                const setClass: any = {
                  progress: "text-green-900 font-bold",
                  Completed: "text-red-900 font-bold",
                  Progress: "text-orange-900 font-bold",
                  Waiting: "text-blue-900 font-bold",
                };
                isClass = setClass[o.status] || "text-slate-900 font-bold";

                const markup = { __html: o?.body };
                return (
                  <div
                    key={o.id}
                    className={`${
                      i === todoList?.length - 1 ? "" : "mb-4"
                    } px-4 py-4 bg-white shadow-sm rounded-sm flex align-top justify-between`}
                  >
                    <div className="capitalize block w-full px-4 py-2 p-5">
                      <p className="text-xs mb-3">
                        <span className="text-slate-500">
                          {new Date(o.createdDate).toLocaleString()} {o.status}
                        </span>
                      </p>
                      <h4 className={`${isClass} font-sans text-md font-bold`}>
                        {o.title}
                      </h4>
                      <p
                        className="my-3 text-sm text-slate-700"
                        dangerouslySetInnerHTML={markup}
                      ></p>
                      <div className="flex text-sm justify-between align-baseline">
                        <div className="flex align-baseline">
                          <p className="text-xs">
                            Prority:{" "}
                            <span className="text-slate-500">{o.priority}</span>
                          </p>
                          <p className="text-xs ml-3">
                            Status: <span className={isClass}>{o.status}</span>
                          </p>
                          <p className="text-xs ml-3">
                            Created By:{" "}
                            <span className="text-slate-500">
                              {window?.localStorage.getItem("user")}
                            </span>
                          </p>
                        </div>
                        <div className="text-xs text-slate-400">
                          {o.edited === 1 && (
                            <span className="mr-2">
                              Updated on:{" "}
                              {new Date(o.updatedDate).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="max-h-10 inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        type="button"
                        disabled={isEditTodo.isId === o.id}
                        className="px-2 py-2 text-gray-900 bg-white border border-r-0 disabled:opacity-5 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-s-sm"
                        onClick={() => handleEdit(o)}
                      >
                        {editLoad ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-slate-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <CiEdit className="text-xl" />
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isEditTodo.isId === o.id}
                        className="px-2 py-2 text-gray-900 bg-white border border-l-0 disabled:opacity-5 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-e-sm"
                        onClick={() => handleDelete(o.id)}
                      >
                        <MdDeleteOutline className="text-xl" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="group bg-white">
            <div className="px-4 py-4">
              <Inactiveusers />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
