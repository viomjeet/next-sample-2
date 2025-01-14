"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { LuListTodo } from "react-icons/lu";
import { GrNodes } from "react-icons/gr";
import { Helper } from "../../../public/helper/script";
function Navbar() {
  const pathname = usePathname();
  let [activeUser, setActiveUser] = useState<any>([]);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const res: any = await Helper.userData('active');
        if (res?.data?.length > 0 && res.status === 200) {
          const data: any = res.data;
          setActiveUser(data);
        }
      } catch (e: any) {}
    };
    getActiveUser();
  }, []);

  let linkclass =
    "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100";
  let active = "text-white bg-gray-700 bg-opacity-25";

  return (
    <>
      {activeUser.length > 0 && (
        <nav className="mt-10">
          <Link
            className={`${pathname === "/" ? active : ""} ${linkclass}`}
            href="/"
          >
            <IoHomeOutline />
            <span className="mx-3">Home</span>
          </Link>

          <Link
            className={`${
              pathname === "/dashboard" ? active : ""
            } ${linkclass}`}
            href="/dashboard"
          >
            <MdDashboard />
            <span className="mx-3">Dashboard</span>
          </Link>

          <Link
            className={`${
              pathname === "/dashboard/posts" ? active : ""
            } ${linkclass}`}
            href="/dashboard/posts"
          >
            <GrNodes />
            <span className="mx-3">Posts</span>
          </Link>
          <Link
            className={`${
              pathname === "/dashboard/todos" ? active : ""
            } ${linkclass}`}
            href="/dashboard/todos"
          >
            <LuListTodo />
            <span className="mx-3">Todos</span>
          </Link>
          
        </nav>
      )}
    </>
  );
}

export default Navbar;
