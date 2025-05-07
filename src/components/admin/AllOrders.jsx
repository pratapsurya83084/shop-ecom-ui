import React, { useContext, useEffect, useState } from 'react'
import ContextProvider from '../context/ContextProvider'



const AllOrders = () => {
const [Orders,Setorders]=useState()
 const {GetUserOrders}=useContext(ContextProvider);

const  getALLorders=async()=> {
  const orders =  await GetUserOrders();
    console.log(orders);
    Setorders(orders.orderDetails)
}
useEffect(()=>{
    getALLorders();
},[]);
 
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
        <tr>
          <th className="p-4">Image</th>
          <th className="p-4">Name</th>
          <th className="p-4">Description</th>
          <th className="p-4">Price</th>
          <th className="p-4">Status</th>
          <th className="p-4">Edit</th>
          <th className="p-4">Delete</th>
        </tr>
      </thead>
      <tbody>
        {Orders?.length > 0 ? (
          Orders?.map((product) => (
            <tr key={product.id} className="border-t text-sm hover:bg-gray-50">
              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4 font-medium">{product.name}</td>
              <td className="p-4 text-gray-600">{product.description}</td>
              <td className="p-4 font-semibold">${product.price}</td>
              <td className="p-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="p-4">
                <Link
                  to={`/edit-product/${product.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(product.id)}
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
  )
}

export default AllOrders
