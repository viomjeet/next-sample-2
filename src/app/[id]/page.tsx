"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function page({ params }: { params: { id: string } }) {
  const [todos, setTodos] = useState<any>([]);
  const [load, setLoad] = useState(true);
  const [alert, setAlart] = useState("");
  useEffect(() => {
    const getID = async () => {
      const { id } = await params;
      const getTodos = async () => {
        try {
          const res = await axios.post(`/api/${id}`);
          if (res.status === 200) {
            const data: any = await res.data;
            setTodos(data);
            setLoad(false);
          } else {
            console.log(res.data.message);
            setLoad(false);
          }
        } catch (e: any) {
          console.log(e?.message);
          setLoad(false);
        }
      };
      getTodos();
    };
    getID();
  }, [params]);

  const handleDelete = async (id: any) => {
    const data = await axios.delete(`/api/${id}`);
    if (data.status === 200) {
      setAlart("Deleted.");
      setTimeout(() => {
        setAlart("");
        location.replace("/");
      }, 1000);
    } else {
      console.log(data?.data);
    }
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
      <div className="bg-slate-50 p-2 mb-2 shadow-lg flex items-center justify-between">
            <span className="text-capitalize block w-100 pl-4 py-4 pr-5">
          {load ? (
            "Loading..."
          ) : (
            <>
              {todos[0]?.id}: {todos[0]?.title}
            </>
          )}
        </span>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {!load && (
            <button
              type="button"
              className="px-2 py-2 text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 rounded-e-sm"
              onClick={() => handleDelete(todos[0]?.id)}
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
