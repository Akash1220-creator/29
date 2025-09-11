import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const fallbackImage = "/fallback.jpg"; // ✅ replace with your fallback image

const BlogAdminPage = () => {
  // Dummy data
  const dummyData = [
    {
      _id: "1",
      title: "First Blog",
      coverPage: "",
      status: "Published",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Second Blog",
      coverPage: "",
      status: "Draft",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: "Third Blog",
      coverPage: "",
      status: "Published",
      createdAt: new Date().toISOString(),
    },
  ];

  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState(dummyData);

  const totalEntries = blogs.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = blogs.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleAddBlog = () => {
    alert("Add New Blog clicked!");
  };

  const handleEdit = (id) => {
    alert("Edit blog with ID: " + id);
  };

  const handleDelete = (id) => {
    alert("Delete blog with ID: " + id);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="entries-dropdown"
              className="text-gray-700 font-medium"
            >
              Show entries:
            </label>
            <select
              id="entries-dropdown"
              className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={entriesToShow}
              onChange={handleDropdownChange}
            >
              {[5, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddBlog}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
          >
            + Add New Blog
          </button>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center">#</th>
                <th className="px-6 py-3 text-center">Title</th>
                <th className="px-6 py-3 text-center">Cover Image</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Created At</th>
                <th className="px-6 py-3 text-center">Manage</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((entry, index) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">
                    {indexOfFirstEntry + index + 1}
                  </td>
                  <td className="px-6 py-4 text-center">{entry.title}</td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={entry.coverPage || fallbackImage}
                      alt={entry.title + " Cover"}
                      className="h-16 w-24 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        entry.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(entry._id)}
                        className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700 font-medium">
            Showing <b>{indexOfFirstEntry + 1}</b> to{" "}
            <b>{indexOfFirstEntry + currentEntries.length}</b> of{" "}
            <b>{totalEntries}</b> entries
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-l-md disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border ${
                  currentPage === i + 1 ? "bg-blue-100" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-r-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdminPage;
