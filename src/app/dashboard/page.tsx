"use client";
import React, { useEffect, useState } from "react";
import { Helper } from "../../../public/helper/script";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    Helper.isLoginUser();
  }
  const [todoList, setTodoList] = useState<any>([]);

  const getTodos = async () => {
    let activeUser = localStorage.getItem("user");
    if (activeUser !== null) {
      try {
        const res = await axios(
          `/dashboard/todos/api?createdby=${
            activeUser === null ? "" : activeUser
          }`
        );
        if (res.status === 200) {
          const data: any = await res.data;
          setTodoList(data);
        } else {
          setTodoList([]);
        }
      } catch (err: any) {}
    } else {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* <ToastContainer position="bottom-right" autoClose={1500} /> */}
      <div className="container lg:px-6 py-6 mx-auto">
        <div className="flex justify-between align-middle">
          <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="group mt-4 bg-white">
            <div className="px-4 py-4 text-2xl">Todos: {todoList.length}</div>
          </div>
        </main>

        {/* Main */}
      </div>
    </main>
  );
}

export default page;
