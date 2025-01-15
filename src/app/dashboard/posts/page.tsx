"use client";
import React from "react";
import { Helper } from "../../../../public/helper/script";
import Inactiveusers from "../components/inactiveusers";

function page() {
  if (typeof window !== "undefined") {
    Helper.isLoginUser();
  }
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* <ToastContainer position="bottom-right" autoClose={1500} /> */}
      <div className="container lg:px-6 py-6 mx-auto">
        <div className="flex justify-between align-middle">
          <h3 className="text-3xl font-medium text-gray-700">Posts</h3>
        </div>

        <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          <div className="group bg-white md:col-span-2">
            <div className="px-4 py-4">Panel 1</div>
          </div>
          <div className="group bg-white">
            <div className="px-4 py-4">
              <Inactiveusers />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
