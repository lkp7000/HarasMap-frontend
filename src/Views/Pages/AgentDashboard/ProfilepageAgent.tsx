

import React from "react";
import Footer from "../../Component/Layout/Footer";
import { useState } from "react";
import Agentheader from "../AdminPage/Agentheader";

export const ProfilepageAgent = () => {
  const links = [
    {
      label: "Welcome Admin",
      path: "profileinfo",
    },
  ];
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe123",
    phone: "123-456-7890",
    password: "",

    // Add more user details if needed
  };



  return (
    <> <Agentheader/>
    
      <div className="flex md:pt-28">
        <div
          id="default-sidebar"
          className="left-0 z-40 max-md:hidden  h-screen w-[20%] transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full bg-gradient-to-r from-yellow-300 to-pink-200 px-3 py-4 overflow-y-auto dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className="font-bold text-2xl   flex items-center text-black">
                {" "}
                User <span className="font-bold text-2xl   items-center text-white">Profile</span> 
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div
            className=" ml-5 "
            style={{ maxHeight: "600px", overflow: "auto" }}
          >
            <h5 className="bg-[#fa9859] text-center font-oswald tracking-wide hover:tracking-widest  text-2xl">
              Agent Details
            </h5>
          </div>
          <div className="">
            <div className="bg-gray-100p-8">
              <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">User Information </h1>
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Full Name - {user.name}
                    </h2>
                    <p className="text-gray-600">Email - {user.email}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Details:</h3>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <br />
                    <strong>Current Password</strong>
                  </p>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <p>
                    {" "}
                    <br />
                    <strong>Change Password</strong>
                
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    id="password"
                    name="password"
                  />
               
                  </p>
                  <p>
                    {" "}
                    <br />
                    <strong>Confirm Password</strong>
                  </p>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>

                <div className="flex space-x-2 mt-6">
                  <a href="/home">
                    <button
                      type="submit"
                      className="w-[190px] text-black bg-[#91cedb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 max-md:w-[109px]"
                    >
                      Submit
                    </button>
                  </a>
                  <a href="/home">
                    <button
                      type="button"
                      className="w-[190px] text-black border border-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-dark dark:text-white dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-primary-800 max-md:w-[109px]"
                    
                    >
                      Cancel
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
