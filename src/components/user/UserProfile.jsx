import React from "react";
import Outlet from "../Outlet";

const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  location: "New York, USA",
  bio: "Frontend developer with a passion for beautiful user experiences.",
  avatar: "https://via.placeholder.com/150",
};

const UserProfile = () => {
  return (
    <Outlet>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-4 h-fit">
            <div className="flex flex-col items-center text-center">
              <img
                src={user.avatar}
                alt="User"
                className="w-24 h-24 rounded-full mb-2 object-cover"
              />
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                <li>
                  <ol className="w-full text-left hover:text-blue-600">My Orders : total order(count) </ol>
                </li>
                
                <li>
                  <ol className="w-full text-left hover:text-blue-600">Saved Cards</ol>
                </li>
                <li>
                  <ol className="w-full text-left hover:text-blue-600">Account Settings</ol>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Profile Information</h3>
                  <p className="text-sm text-gray-600">View and edit your personal details</p>
                </div>
                <button className="text-blue-600 hover:underline">Logout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-800">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Location</label>
                  <p className="text-gray-800">{user.location}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
                  <p className="text-gray-800">January 1, 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Bio</h3>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </Outlet>
  );
};

export default UserProfile;
