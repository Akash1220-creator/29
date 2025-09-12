import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNewBlog from "../Pages/AddNewBlog";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const AdminPanel = () => {
  const [news, setNews] = useState([]);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Pagination & entries
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = news.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalEntries = news.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const handleAddBlog = () => {
    setShowAddBlog(true);
  };

  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    const entryToEdit = news.find((n) => n._id === id);
    setEditingEntry(entryToEdit);
    setShowEditBlog(true);
  };

  const handleNewBlogSubmit = (newEntry) => {
    setNews([newEntry, ...news]);
    setShowAddBlog(false);
  };

  const handleEditBlogSubmit = async (updatedEntry) => {
    try {
      // Update in backend
      await axios.put(`/api/news/${updatedEntry._id}`, updatedEntry);

      // Update local state
      setNews(news.map((n) => (n._id === updatedEntry._id ? updatedEntry : n)));

      // Close edit form
      setShowEditBlog(false);
      setEditingEntry(null);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handlenewsDelete = async (id) => {
    try {
      await axios.delete(`/api/news/${id}`);
      setNews(news.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Show Add or Edit Form */}
      {showAddBlog ? (
        <AddNewBlog
          onBack={() => setShowAddBlog(false)}
          onSubmit={handleNewBlogSubmit}
        />
      ) : showEditBlog ? (
        <AddNewBlog
          editingEntry={editingEntry} // Pass current entry for editing
          onBack={() => setShowEditBlog(false)}
          onSubmit={handleEditBlogSubmit}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
            >
              + Add New Blog
            </button>
          </div>

          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-center">#</th>
                  <th className="px-6 py-3 text-left">newsTitle</th>
                  <th className="px-6 py-3 text-center">newsImage</th>
                  <th className="px-6 py-3 text-left">newsLink</th>
                  <th className="px-6 py-3 text-center">Created At</th>
                  <th className="px-6 py-3 text-left">videoTitle</th>
                  <th className="px-6 py-3 text-left">videoLink</th>
                  <th className="px-6 py-3 text-center rounded-tr-lg">Manage</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr key={entry._id}>
                    <td className="px-4 py-4 text-center">
                      {indexOfFirstEntry + index + 1}
                    </td>
                    <td className="px4 py-4 break-words font-medium">
                      {entry.newsTitle}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <img
                        src={`http://localhost:4001/Uploads/${entry.newsImage}`}
                        alt={entry.newsTitle}
                        className="w-20 h-20 sm:w-16 sm:h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-center break-all">
                      {entry.newsLink}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 break-words">{entry.videoTitle}</td>
                    <td className="px-4 py-4 break-words">{entry.videoLink}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(entry._id)}
                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handlenewsDelete(entry._id)}
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
          <div className="mt-6 flex flex-col items-center justify-between sm:flex-row space-y-4 sm:space-y-0 ">
            <div className="text-sm text-gray-700 font-medium text-center sm:text-left">
              Showing <b>{indexOfFirstEntry + 1}</b> to <b>{indexOfFirstEntry + currentEntries.length}</b> of <b>{totalEntries}</b> entries
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-l-md"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-100" : "bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-r-md"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
