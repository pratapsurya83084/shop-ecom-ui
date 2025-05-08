// import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const salesData = [
//   { date: "Mon", revenue: 1200 },
//   { date: "Tue", revenue: 2100 },
//   { date: "Wed", revenue: 800 },
//   { date: "Thu", revenue: 1600 },
//   { date: "Fri", revenue: 900 },
//   { date: "Sat", revenue: 2500 },
//   { date: "Sun", revenue: 1800 },
// ];

// const topProducts = [
//   { name: "Wireless Headphones", sales: 320 },
//   { name: "Bluetooth Speaker", sales: 280 },
//   { name: "Smartwatch", sales: 200 },
// ];

// const AnalyticsPage = () => {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-sm text-gray-500">Total Sales</h2>
//           <p className="text-xl font-semibold">$8,200</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-sm text-gray-500">Orders</h2>
//           <p className="text-xl font-semibold">420</p>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4">
//           <h2 className="text-sm text-gray-500">Conversion Rate</h2>
//           <p className="text-xl font-semibold">3.2%</p>
//         </div>
//       </div>

//       {/* Sales Chart */}
//       <div className="bg-white shadow rounded-xl p-6 mb-6">
//         <h2 className="text-lg font-medium mb-4">Weekly Revenue</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={salesData}>
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Top Products */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-lg font-medium mb-4">Top Selling Products</h2>
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="text-gray-600 text-sm border-b">
//               <th className="pb-2">Product</th>
//               <th className="pb-2">Units Sold</th>
//             </tr>
//           </thead>
//           <tbody>
//             {topProducts.map((product, index) => (
//               <tr key={index} className="border-b">
//                 <td className="py-2">{product.name}</td>
//                 <td className="py-2">{product.sales}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;



import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const topRatedProducts = [
  { name: "Noise Cancelling Headphones", rating: 4.9 },
  { name: "4K Smart LED TV", rating: 4.8 },
  { name: "Leather Jacket - Mens", rating: 4.7 },
];

const bestSellingProducts = [
  { name: "Wireless Mouse", unitsSold: 1200 },
  { name: "Bluetooth Speaker", unitsSold: 980 },
  { name: "Kids Hoodie", unitsSold: 750 },
];

const trendingProducts = [
  { name: "Smart Watch", category: "Electronics" },
  { name: "Oversized T-Shirt - Womens", category: "Womens" },
  { name: "Casual Sneakers - Mens", category: "Mens" },
];

const categorySales = [
  { name: "Kids Wear", value: 300 },
  { name: "Mens", value: 500 },
  { name: "Electronics", value: 800 },
  { name: "Womens", value: 600 },
];

const COLORS = ["#60a5fa", "#f472b6", "#34d399", "#f59e0b"];

const CategoryPieChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Best Selling Products */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Best Selling Products</h3>
        <ul className="space-y-2">
          {bestSellingProducts.map((product, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span>{product.name}</span>
              <span className="text-blue-600 font-medium">{product.unitsSold} sold</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trending Products */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Trending Now</h3>
        <ul className="space-y-2">
          {trendingProducts.map((product, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span>{product.name}</span>
              <span className="text-gray-500 italic">{product.category}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded-xl p-6 col-span-1 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categorySales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
