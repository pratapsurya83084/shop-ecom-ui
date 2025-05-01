import React from "react";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "22 Jul", income: 1000 },
  { date: "23 Jul", income: 5000 },
  { date: "24 Jul", income: 2000 },
  { date: "25 Jul", income: 8000 },
  { date: "26 Jul", income: 10000 },
  { date: "27 Jul", income: 6000 },
  { date: "28 Jul", income: 9000 },
];

const products = [
  {
    name: "Air Jordan 8",
    sold: "752 Pcs",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Air Jordan 5",
    sold: "752 Pcs",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Air Jordan 13",
    sold: "752 Pcs",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Nike Air Max",
    sold: "752 Pcs",
    image: "https://via.placeholder.com/100",
  },
];

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
    <div className={`p-3 rounded-full text-white ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Sales"
          value="$45,230"
          icon={DollarSign}
          color="bg-green-500"
        />
        <Card
          title="Orders"
          value="1,209"
          icon={ShoppingCart}
          color="bg-orange-500"
        />
        <Card
          title="Customers"
          value="892"
          icon={Users}
          color="bg-blue-500"
        />
        <Card
          title="Products"
          value="123"
          icon={Package}
          color="bg-purple-500"
        />
      </div>

      {/* Chart + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Analytic */}
        <div className="bg-white rounded-xl p-5 shadow col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sales Analytic</h2>
            <select className="border px-2 py-1 rounded">
              <option>Jul 2023</option>
              <option>Aug 2023</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <p className="text-gray-500">Income</p>
              <h3 className="text-lg font-bold">23,262.00</h3>
              <p className="text-green-500 text-sm">+0.05%</p>
            </div>
            <div>
              <p className="text-gray-500">Expenses</p>
              <h3 className="text-lg font-bold">11,135.00</h3>
              <p className="text-red-500 text-sm">-0.05%</p>
            </div>
            <div>
              <p className="text-gray-500">Balance</p>
              <h3 className="text-lg font-bold">48,135.00</h3>
              <p className="text-green-500 text-sm">+0.05%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#34D399"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li>Order #1234 - $120.00 - Completed</li>
            <li>Order #1235 - $90.50 - Pending</li>
            <li>Order #1236 - $45.99 - Cancelled</li>
          </ul>
        </div>
      </div>

      {/* Sales Target */}
      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-bold mb-4">Sales Target</h2>
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <p className="text-gray-500">Daily Target</p>
            <p className="text-red-500 text-lg">↓ 650</p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Target</p>
            <p className="text-green-500 text-lg">↑ 145,00</p>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto mb-2 w-20 h-20 object-cover rounded"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.sold}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
