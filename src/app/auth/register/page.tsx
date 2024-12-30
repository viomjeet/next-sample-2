"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
function page() {
  const [loading, setLoading] = useState(false);
  const handleRegisterUser = (event: any) => {
    debugger;

    event.preventDefault();
    const { fullname, useremail, username, userpassword } =
      event.target.elements;
    const regex = /^[a-zA-Z0-9_.+-]+[\x40][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      fullname.value.length < 3 ||
      username.value.length < 6 ||
      !regex.test(useremail.value) ||
      userpassword.value.length < 6
    ) {
      toast.error("Form must be filled out with valid values.");
    } else {
      setLoading(true);
      let request: any = {
        fullname: fullname.value,
        useremail: useremail.value,
        username: username.value,
        status: "inactive",
        userpassword: userpassword.value,
      };
      axios
        .post(`/auth/register/api`, request)
        .then((response) => {
          if (response.data.includes("Invalid")) {
            toast.error(response.data);
          } else {
            toast.success(response.data);
            setLoading(false);
            fullname.value = "";
            useremail.value = "";
            username.value = "";
            userpassword.value = "";
          }
        })
        .catch((err) => {
          if (err?.response?.data.includes("Invalid")) {
            toast.error(err?.response?.data);
          } else {
            toast.error(err?.message);
          }
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="max-w-screen-xl flex justify-center flex-1">
        <div className="flex-1 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/auth-background2.svg)` }}
          ></div>
        </div>

        <div className="bg-white lg:shadow-sm lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex-1">
              <div className="mb-5 border-b text-center">
                <div className="pb-4 leading-none text-xl inline-block text-gray-600 tracking-wide font-medium bg-white">
                  Sign up
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleRegisterUser}>
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium mb-3 bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    id="fullname"
                    required={true}
                    placeholder="Full Name"
                  />
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium mb-3 bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    id="useremail"
                    required={true}
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium mb-3 bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    id="username"
                    placeholder="User Id"
                  />
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    id="userpassword"
                    required={true}
                    placeholder="Password"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 disabled:opacity-70 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <IoMdPersonAdd />
                    <span className="ml-1">
                      {loading ? "Loading..." : "Sign Up"}
                    </span>
                  </button>
                </form>

                <p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
