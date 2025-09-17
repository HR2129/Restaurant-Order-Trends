'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [trends, setTrends] = useState([]);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [minHour, setMinHour] = useState('');
  const [maxHour, setMaxHour] = useState('');
  const [showTables, setShowTables] = useState({
    orders: false,
    revenue: false,
    avgOrder: false,
    peakHour: false,
  });

  useEffect(() => {
    fetchTrends();
  }, [id, startDate, endDate, minAmount, maxAmount, minHour, maxHour]);

  const fetchTrends = async () => {
    try {
      const res = await fetch(
        `/api/orders/trends?restaurant_id=${id}&start_date=${startDate}&end_date=${endDate}&min_amount=${minAmount || 0}&max_amount=${maxAmount || Infinity}&min_hour=${minHour || 0}&max_hour=${maxHour || 23}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTrends(data || []);
    } catch (error) {
      console.error('Error fetching trends:', error);
    }
  };

  const toggleTable = (key) => {
    setShowTables((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black font-poppins">
      <div className="relative h-48 w-full overflow-hidden">
        {/* <img
          src="https://tse2.mm.bing.net/th/id/OIP.FPzj2RXXRTHlFA4thRGkZQHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Restaurant Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50 bg-center bg-contain"
        /> */}
        {/* <Image
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7d0ff7b6-55f7-4604-88a6-0f056d1bdae8/dbeg04p-5e0192aa-b2f8-41fe-a156-3879cb47020b.jpg/v1/fill/w_800,h_447,q_75,strp/restaurant___vn_bg_commission_by_ombobon_dbeg04p-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDQ3IiwicGF0aCI6IlwvZlwvN2QwZmY3YjYtNTVmNy00NjA0LTg4YTYtMGYwNTZkMWJkYWU4XC9kYmVnMDRwLTVlMDE5MmFhLWIyZjgtNDFmZS1hMTU2LTM4NzljYjQ3MDIwYi5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.vXm5TFTK4ECq5Fbe99kkRUvtZKhACmGL1Gr_-FbB7Lc"
          alt="Restaurant Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Restaurant Analytics
          </motion.h1>
          
        </div>
        
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 p-4"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700" aria-current="page">
              Restaurant Details
            </li>
          </ol>
        </motion.nav>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Min Amount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Min Hour"
            value={minHour}
            onChange={(e) => setMinHour(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Hour"
            value={maxHour}
            onChange={(e) => setMaxHour(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Charts and Tables */}
        <div className="space-y-8">
          {/* Daily Orders Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Daily Orders Count</h2>
            <LineChart width={600} height={300} data={trends} className="mx-auto">
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders_count" stroke="#8884d8" />
            </LineChart>
            <button
              onClick={() => toggleTable('orders')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showTables.orders ? 'Hide Data' : 'Show Data'}
            </button>
            <AnimatePresence>
              {showTables.orders && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Orders Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trends.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{item._id}</td>
                          <td className="p-3">{item.orders_count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Daily Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Daily Revenue</h2>
            <LineChart width={600} height={300} data={trends} className="mx-auto">
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
            <button
              onClick={() => toggleTable('revenue')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showTables.revenue ? 'Hide Data' : 'Show Data'}
            </button>
            <AnimatePresence>
              {showTables.revenue && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trends.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{item._id}</td>
                          <td className="p-3">{item.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Average Order Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Average Order Value</h2>
            <LineChart width={600} height={300} data={trends} className="mx-auto">
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avg_order_value" stroke="#ffc658" />
            </LineChart>
            <button
              onClick={() => toggleTable('avgOrder')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showTables.avgOrder ? 'Hide Data' : 'Show Data'}
            </button>
            <AnimatePresence>
              {showTables.avgOrder && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Average Order Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trends.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{item._id}</td>
                          <td className="p-3">{item.avg_order_value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Peak Order Hour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Peak Order Hour per Day</h2>
            <BarChart width={600} height={300} data={trends} className="mx-auto">
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="peak_hour" fill="#8884d8" />
            </BarChart>
            <button
              onClick={() => toggleTable('peakHour')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showTables.peakHour ? 'Hide Data' : 'Show Data'}
            </button>
            <AnimatePresence>
              {showTables.peakHour && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Peak Hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trends.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{item._id}</td>
                          <td className="p-3">{item.peak_hour}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
