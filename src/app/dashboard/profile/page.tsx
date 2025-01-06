"use client";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Helper } from "../../../../public/helper/script";
import axios from "axios";

function page() {
  if (typeof window !== "undefined") {
    Helper.isLoginUser();
  }
  const fileInput = useRef<HTMLInputElement>(null);
  let [activeUser, setActiveUser] = useState<any>([]);

  useEffect(() => {
    getActiveUser();
  }, []);

  const getActiveUser = async () => {
    try {
      const res: any = await Helper.userData();
      if (res?.data?.length > 0 && res.status === 200) {
        const data: any = res.data;
        setActiveUser(data);
      }
    } catch (e: any) {
      toast.error(e?.message);
    }
  };

  async function uploadFile(e: any) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", fileInput?.current?.files?.[0]!);
      let request: any = {};
      request.username = activeUser[0]?.username;
      formData.append("formField", activeUser[0]?.username);
      const result = await axios.post("/dashboard/profile/api", formData);
      if (result.status === 200) {
        toast.success(result?.data);
        getActiveUser();
      } else {
        toast.error(result?.data);
      }
    } catch (e: any) {
      toast.error(e?.message);
    }
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex justify-between align-middle">
          <h3 className="text-3xl font-medium text-gray-700 mb-4">Hi, {activeUser[0]?.fullname}</h3>
        </div>
        <img
          src={activeUser[0]?.profilePic}
          alt={activeUser[0]?.profilePic}
          className=" w-96"
        />
        Email: {activeUser[0]?.useremail}
        <br />
        UserId: {activeUser[0]?.username}
        <br />
        Status: {activeUser[0]?.status}
        <br />
        {!activeUser[0]?.profilePic && (
          <form onSubmit={uploadFile} className="flex flex-col gap-4">
            <label>
              <span>Upload a file</span>
              <input type="file" name="file" ref={fileInput} />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </main>
  );
}

export default page;
