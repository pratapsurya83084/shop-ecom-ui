import React, { useState } from "react";

const AdminSetting = () => {
  const [adminInfo, setAdminInfo] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    phone: "123-456-7890",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleInfoChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    alert("Info updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Admin Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Admin Info</h3>
        <form onSubmit={handleInfoSubmit} className="space-y-4">
          <input
            name="name"
            value={adminInfo.name}
            onChange={handleInfoChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={adminInfo.email}
            onChange={handleInfoChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Email"
          />
          <input
            name="phone"
            value={adminInfo.phone}
            onChange={handleInfoChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Phone"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Info
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Current Password"
          />
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Confirm New Password"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetting;
