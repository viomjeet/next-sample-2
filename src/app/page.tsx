"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
function page() {
  let [activeUser, setActiveUser] = useState([]);
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
      router.push("/auth/login");
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
          toast.success(request.data);
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
      <div>
        <code>{JSON.stringify(activeUser)}</code>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default page;
