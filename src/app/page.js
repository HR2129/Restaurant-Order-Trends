'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const limit = 7; // Set limit to 7

  useEffect(() => {
    fetchRestaurants();
  }, [search, location, cuisine, page, sort, sortOrder]);

  const fetchRestaurants = async () => {
    try {
      setError(null);
      const res = await fetch(
        `/api/restaurants?search=${encodeURIComponent(search)}&location=${encodeURIComponent(
          location
        )}&cuisine=${encodeURIComponent(cuisine)}&page=${page}&sort=${
          sortOrder === 'desc' ? '-' : ''
        }${sort}&limit=${limit}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.message || 'API error');
      }
      setRestaurants(data.restaurants || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError(error.message);
    }
  };

  const handleSort = (field) => {
    if (sort === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins text-black">
      {/* Hero Section with Background Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src="/images/restaurant-bg.jpg"
          alt="Restaurant Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Restaurant Analytics Dashboard
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-4"
          >
            Error: {error}
          </motion.p>
        )}

        {/* Restaurants Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-blue-700"
                  onClick={() => handleSort('name')}
                >
                  Name {sort === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-blue-700"
                  onClick={() => handleSort('location')}
                >
                  Location {sort === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-blue-700"
                  onClick={() => handleSort('cuisine')}
                >
                  Cuisine {sort === 'cuisine' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <motion.tr
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">{restaurant.name}</td>
                      <td className="p-4">{restaurant.location}</td>
                      <td className="p-4">{restaurant.cuisine}</td>
                      <td className="p-4">
                        <Link
                          href={`/restaurant/${restaurant.id}`}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <td colSpan="4" className="p-4 text-gray-500">
                      No restaurants found.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex justify-center gap-4"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            Next
          </button>
        </motion.div>
      </div>
    </div>
  );
}