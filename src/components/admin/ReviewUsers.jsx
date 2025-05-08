import React from "react";

// Dummy data for reviews
const reviews = [
  {
    id: 1,
    adminUserName: "Admin01",
    userName: "John Doe",
    userProfile: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "johndoe@example.com",
    productId: "P001",
    productImage: "https://via.placeholder.com/100",
    productName: "Wireless Headphones",
    rating: 5,
    reviewTitle: "Amazing Sound Quality!",
    reviewText: "These headphones offer crystal-clear sound and great noise cancellation. Worth every penny!",
    reviewDate: "2025-02-01",
    userId: "U123",
  },
  {
    id: 2,
    adminUserName: "Admin01",
    userName: "Jane Smith",
    userProfile: "https://randomuser.me/api/portraits/women/51.jpg",
    email: "janesmith@example.com",
    productId: "P002",
    productImage: "https://via.placeholder.com/100",
    productName: "Smartwatch",
    rating: 4,
    reviewTitle: "Good, but could be better",
    reviewText: "The smartwatch is great for tracking fitness, but the battery life could be improved.",
    reviewDate: "2025-01-29",
    userId: "U124",
  },
];

// ReviewRow Component
const ReviewRow = ({ review }) => (
  <tr>
    <td className="px-4 py-3">{review.adminUserName}</td>
    <td className="px-4 py-3 flex items-center">
      <img src={review.userProfile} alt={review.userName} className="w-8 h-8 rounded-full mr-3" />
      {review.userName}
    </td>
    <td className="px-4 py-3 flex items-center">
      <img src={review.productImage} alt={review.productName} className="w-12 h-12 object-cover mr-3" />
      {review.productName}
    </td>
    <td className="px-4 py-3">{"⭐".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</td>
    <td className="px-4 py-3">{review.reviewTitle}</td>
    <td className="px-4 py-3">{review.reviewText}</td>
    <td className="px-4 py-3">{review.email}</td>
    <td className="px-4 py-3">{review.productId}</td>
    <td className="px-4 py-3">{review.userId}</td>
    <td className="px-4 py-3">{review.reviewDate}</td>
    <td className="px-4 py-3 flex space-x-2">
      <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">Approve</button>
      <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">Delete</button>
    </td>
  </tr>
);

const ReviewUsers = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-200 text-sm text-gray-600">
            <th className="px-4 py-2">Admin</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Review Title</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Review Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <ReviewRow key={review.id} review={review} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReviewUsers;
