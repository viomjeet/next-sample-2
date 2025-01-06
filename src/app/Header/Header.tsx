"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiOutlineBell } from "react-icons/hi2";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdOutlineLogout } from "react-icons/md";
import { Helper } from "../../../public/helper/script";
import { toast } from "react-toastify";
import Link from "next/link";

function Header() {
  let [activeUser, setActiveUser] = useState<any>([]);

  useEffect(() => {
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
    getActiveUser();
  }, []);
  return (
    <>
      {activeUser.length > 0 && (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none lg:hidden"></button>

            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center">
            <React.Fragment>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex mx-4 text-gray-600 focus:outline-none">
                    <HiOutlineBell className="text-2xl" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="flex w-full items-centerpx-4 py-4 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        <img
                          className="object-cover w-8 h-8 mx-1 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                          alt="avatar"
                        />
                        <p className="mx-2 text-sm">
                          <span className="font-bold">Sara Salah</span> replied
                          on the{" "}
                          <span className="font-bold text-indigo-400">
                            {" "}
                            Upload Image{" "}
                          </span>{" "}
                          artical . 2m
                        </p>
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex justify-center items-center">
                  <span className="uppercase mr-2">
                    Hi, {activeUser[0]?.fullname.split(" ")[0]}
                  </span>
                  <MenuButton className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                    <img
                      className="object-cover w-full h-full"
                      src={activeUser[0]?.profilePic}
                      alt="Your avatar"
                    />
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <form action="#" method="POST">
                      <MenuItem>
                        <button
                          className="flex justify-start items-center w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                          title="Logout"
                          onClick={() => Helper.logout()}
                        >
                          <MdOutlineLogout className="mr-1 text-xl" />
                          Logout
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </React.Fragment>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
