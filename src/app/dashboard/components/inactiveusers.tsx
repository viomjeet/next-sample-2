import React, { useState, useEffect } from "react";
import { Helper } from "../../../../public/helper/script";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
function Inactiveusers() {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUser();
  }, []);
  const getActiveUser = async () => {
    try {
      const res: any = await axios.get(`/api?type=inactive`);
      console.log(res);
      if (res?.data?.length > 0) {
        const data: any = res.data;
        setUsers(data);
      }
    } catch (e: any) {
      toast.error(e?.message);
    }
  };

  return (
    <div>
      {users?.map((o: any, i: any) => (
        <div
          key={o.id}
          className="flex mb-2 overflow-hidden border border-gray-100 md:flex-row md:max-w-xl hover:bg-gray-100"
        >
          <img
            className="object-cover h-20 w-20"
            src={o.profilePic}
            alt=""
          />

          <div className="flex flex-col justify-between px-2 py-1 leading-normal">
            <h6 className="tracking-tight font-semibold text-sm text-gray-900">
              {o.fullname}
            </h6>
            <p className="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise...
            </p>
            <div>
              <a
                className="px-2 py-1 rounded-sm text-xs font-normal mr-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                href={`/dashboard/profile?u=${btoa(o.username)}&t=${btoa(o.status)}`}
              >
                View Profile
              </a>
              {/* <button type="button" className="px-3 py-1 rounded-sm text-xs font-medium mr-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</button> */}
              <button
                type="button"
                className="px-2 py-1 rounded-sm text-xs font-normal text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inactiveusers;
