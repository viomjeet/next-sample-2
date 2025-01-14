'use client';
import React from "react";
import { Helper } from "../../public/helper/script";
function page() {
  if (typeof window !== 'undefined') {
    Helper.isLoginUser();
  }
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container py-6 mx-auto">
        <div className="flex justify-between align-middle">
          <h3 className="text-3xl font-medium text-gray-700">Home</h3>
        </div>

        {/* Main Body */}
      </div>
    </main>
  );
}

export default page;
