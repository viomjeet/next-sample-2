import React, { useState, useEffect } from "react";
import { Helper } from "../../../../public/helper/script";
import { toast } from "react-toastify";
import Link from "next/link";
function Inactiveusers() {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    getActiveUser();
  }, []);
  const getActiveUser = async () => {
    try {
      const res: any = await Helper.userData("inactive");
      if (res?.data?.length > 0 && res.status === 200) {
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
          className="flex h-auto mb-2 overflow-hidden border border-gray-100 md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="w-16 h-16 overflow-hidden">
            <img className="w-20" src={o.profilePic} alt="" />
          </div>

          <div className="flex flex-col justify-between px-2 py-1 leading-normal">
            <h6 className="tracking-tight text-gray-900 dark:text-white">
              {o.fullname}
            </h6>
            <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise...
            </p>
            <div>
              <Link
                className="px-3 py-1 rounded-sm text-xs font-medium mr-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                href={`/dashboard/profile?username=${o.username}&type=${o.status}`}
              >
                View Profile
              </Link>
              {/* <button type="button" className="px-3 py-1 rounded-sm text-xs font-medium mr-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</button> */}
              <button
                type="button"
                className="px-3 py-1 rounded-sm text-xs font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
