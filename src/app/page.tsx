"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
function page() {
  let [activeUser, setActiveUser] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    let activeUser = localStorage.getItem("user");
    if (activeUser !== null) {
      setActiveUser([]);
      const getActiveUser = async () => {
        try {
          const res = await axios.get(`/api?username=${activeUser}`);
          if (res.status === 200) {
            const data: any = await res.data;
            setActiveUser(data);
          }
        } catch (e: any) {
          toast.error(e?.message);
        }
      };
      getActiveUser();
    } else {
      location.href = "/auth/login";
    }
  }, []);

  const handleLogout = async () => {
    let activeUser = localStorage.getItem("user");
    if (activeUser !== null) {
      let request: any = {
        username: activeUser,
      };
      try {
        const res = await axios.post(`/api`, request);
        if (res.status === 200) {
          toast.success(res.data);
          localStorage.removeItem("user");
          location.reload();
        }
      } catch (e: any) {
        toast.error(e?.message);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl lg:px-8">
      <ToastContainer position="bottom-right" autoClose={1500} />
      {activeUser.length > 0 && (
        <div className="flex justify-between">
          <code>{JSON.stringify(activeUser)}</code>
          <div className="flex items-center">
            <Link className="mr-2" href="/dashboard">
              Dashboard
            </Link>
            <span className="uppercase mr-2">
              Hi, {activeUser[0]?.fullname.split(" ")[0]}
            </span>{" "}
            <button
              className="flex items-center"
              title="Logout"
              onClick={handleLogout}
            >
              <MdOutlineLogout className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
