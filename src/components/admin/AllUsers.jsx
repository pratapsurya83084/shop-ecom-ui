import React, { useContext, useState, useEffect, memo } from "react";
import ContextProvider from "../context/ContextProvider";
import axios from "axios";
import { LogIn, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
  const [localUsers, setLocalUsers] = useState([]);
  const { Users, DeleteUserIdwise } = useContext(ContextProvider);

  useEffect(() => {
    setLocalUsers(Users); // Sync initial Users to local state
  }, [Users]);

  const handleDelete = async (Userid) => {
    if (!Userid) {
      toast.error("user id not found");
      return;
    }
    const delteUser = await DeleteUserIdwise(Userid);
    console.log(delteUser.success);

    if (delteUser.success === true) {
      toast.success("delete successfully");
    } else {
      toast.error("User delete failed");
    }
    // console.log(delteUser);

    setLocalUsers((prev) => prev.filter((user) => user._id !== Userid));
  };

  // console.log(Users);

  return (
    <div>
      <div className="overflow-x-auto">
        <Toaster position="top-right" reverseOrder={false} />
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="p-4">sr.no</th>
              <th className="p-4">UserName</th>

              <th className="p-4">email</th>

              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.length > 0 ? (
              localUsers.map((user, index) => (
                <tr key={index} className="border-t text-sm hover:bg-gray-50">
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4 text-gray-600">{user.name}</td>
                  <td className="p-4 font-semibold">${user.email}</td>

                  <td className="p-">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(AllUsers);
