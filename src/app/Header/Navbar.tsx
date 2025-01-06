"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { Helper } from "../../../public/helper/script";
function Navbar() {
  const pathname = usePathname();
  let [activeUser, setActiveUser] = useState<any>([]);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const res: any = await Helper.userData();
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

          <Link className={linkclass} href="#">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>

            <span className="mx-3">Tables</span>
          </Link>

          <Link className={linkclass} href="#">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>

            <span className="mx-3">Forms</span>
          </Link>
        </nav>
      )}
    </>
  );
}

export default Navbar;
