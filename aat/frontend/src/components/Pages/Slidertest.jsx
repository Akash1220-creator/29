import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const AddNewBlog = ({ onBack, onSubmit }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Blog Entry</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          _id: Date.now().toString(),
          title: "New Blog " + Math.floor(Math.random() * 100),
          coverPage: "https://placehold.co/100x60/8B5CF6/ffffff?text=New+Blog",
          description: "A fresh new blog post about an exciting topic.",
          createdAt: new Date().toISOString(),
        });
      }}
    >
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition-colors duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);

export default function CarouselAdminPanel() {
  const fallbackImage = "https://placehold.co/100x60/94a3b8/ffffff?text=N/A";

  const initialBlogEntries = [
    { _id: "1", title: "First Blog", coverPage: "https://placehold.co/100x60/3d5af5/ffffff?text=Blog+1", description: "Brief description of first blog", createdAt: "2023-01-15" },
    { _id: "2", title: "Second Blog", coverPage: "https://placehold.co/100x60/3d5af5/ffffff?text=Blog+2", description: "Summary of second post", createdAt: "2023-02-20" },
    { _id: "3", title: "Third Blog", coverPage: "https://placehold.co/100x60/3d5af5/ffffff?text=Blog+3", description: "In-depth tech trends", createdAt: "2023-03-25" },
    { _id: "4", title: "Fourth Blog", coverPage: "https://placehold.co/100x60/3d5af5/ffffff?text=Blog+4", description: "Tips and tricks for skills", createdAt: "2023-04-10" },
    { _id: "5", title: "Fifth Blog", coverPage: "https://placehold.co/100x60/3d5af5/ffffff?text=Blog+5", description: "Behind-the-scenes development", createdAt: "2023-05-05" },
  ];

  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogEntries, setBlogEntries] = useState(initialBlogEntries);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null); // ID of the blog being edited
  const [editFormData, setEditFormData] = useState({ title: "", description: "", coverPage: "" });

  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleAddBlog = () => setShowAddBlog(true);

  const handleNewBlogSubmit = (newBlog) => {
    setBlogEntries((prev) => [...prev, newBlog]);
    setShowAddBlog(false);
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setEditFormData({
      title: entry.title,
      description: entry.description,
      coverPage: entry.coverPage,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ title: "", description: "", coverPage: "" });
  };

  const handleSaveEdit = (id) => {
    setBlogEntries((prev) =>
      prev.map((entry) =>
        entry._id === id ? { ...entry, ...editFormData } : entry
      )
    );
    handleCancelEdit();
  };

  const handleDelete = (id) => {
    setBlogEntries((prev) => prev.filter((entry) => entry._id !== id));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const totalEntries = blogEntries.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = blogEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {showAddBlog ? (
          <AddNewBlog onBack={() => setShowAddBlog(false)} onSubmit={handleNewBlogSubmit} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Carousel Admin Panel</h2>

            {/* Entries + Add */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="entries-dropdown" className="text-gray-700 font-medium">
                  Show entries:
                </label>
                <select
                  id="entries-dropdown"
                  className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={entriesToShow}
                  onChange={handleDropdownChange}
                >
                  {[5, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddBlog}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition transform hover:scale-105"
              >
                + Add New Blog
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow-inner">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-center">#</th>
                    <th className="px-6 py-3 text-center">Title</th>
                    <th className="px-6 py-3 text-center">Image</th>
                    <th className="px-6 py-3 text-center">Description</th>
                    <th className="px-6 py-3 text-center">Manage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.map((entry, index) => (
                    <tr key={entry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-center">{indexOfFirstEntry + index + 1}</td>

                      {/* Check if this row is being edited */}
                      {editingId === entry._id ? (
                        <>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md p-1 w-full"
                              value={editFormData.title}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, title: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md p-1 w-full"
                              value={editFormData.coverPage}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, coverPage: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md p-1 w-full"
                              value={editFormData.description}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, description: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-6 py-4 text-center flex justify-center space-x-2">
                            <button
                              onClick={() => handleSaveEdit(entry._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-center">{entry.title}</td>
                          <td className="px-6 py-4 text-center">
                            <img
                              src={entry.coverPage || fallbackImage}
                              alt={entry.title + " Cover"}
                              className="h-16 w-24 object-cover rounded-md border border-gray-200"
                            />
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">{entry.description}</td>
                          <td className="px-6 py-4 text-center flex justify-center space-x-3">
                            <button
                              onClick={() => handleEditClick(entry)}
                              className="p-2 rounded-full text-green-600 hover:bg-green-50 transition transform hover:scale-110"
                            >
                              <PencilSquareIcon className="h-5 w-5" />                              <TrashIcon className="h-5 w-5" />

                            </button>
                            <button
                              onClick={() => handleDelete(entry._id)}
                              className="p-2 rounded-full text-red-600 hover:bg-red-50 transition transform hover:scale-110"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-700 font-medium mb-4 sm:mb-0">
                Showing <b>{indexOfFirstEntry + 1}</b> to <b>{indexOfFirstEntry + currentEntries.length}</b> of <b>{totalEntries}</b> entries
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 border-t border-b border-gray-300 text-gray-700 transition-colors ${
                      currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
