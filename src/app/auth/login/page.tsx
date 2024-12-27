"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
function page() {
  const [loading, setLoading] = useState(false);
  const handleLoginUser = (event: any) => {
    event.preventDefault();
    const { useremail, userpassword } = event.target.elements;
    const regex = /^[a-zA-Z0-9_.+-]+[\x40][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(useremail.value) || userpassword.value.length < 6) {
      toast.error("Form must be filled out with valid values.");
    } else {
      setLoading(true);
      let request: any = {
        useremail: useremail.value,
        userpassword: userpassword.value,
      };
      axios
        .post(`/auth/login/api`, request)
        .then((response) => {
          console.log(response)
          if (response.data.includes("Invalid")) {
            toast.error(response.data);
          } else {
            useremail.value = "";
            userpassword.value = "";
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 10);
            localStorage.setItem("user", response.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err?.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
      if (localStorage.getItem("user") !== null) {
          location.replace('/');
      }
  })
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="max-w-screen-xl flex justify-center flex-1">
        <div className="flex-1 rounded-l-lg text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/auth-background.svg)` }}
          ></div>
        </div>

        <div className="bg-white lg:shadow-sm lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex-1">
              <div className="mb-5 border-b text-center">
                <div className="pb-4 leading-none text-xl inline-block text-gray-600 tracking-wide font-medium bg-white">
                  Sign in
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleLoginUser}>
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium mb-3 bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    id="useremail"
                    required={true}
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-2 py-2 rounded-sm font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    id="userpassword"
                    required={true}
                    placeholder="Password"
                  />

                  <div className="flex mt-5 items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 select-none dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    disabled={loading}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <MdOutlineLogin />
                    <span className="ml-1">
                      {loading ? "Loading..." : "Sign In"}
                    </span>
                  </button>
                </form>
                <p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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
