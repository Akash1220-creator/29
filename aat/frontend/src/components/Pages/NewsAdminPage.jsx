import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

// ✅ Replace with your fallback image
const fallbackImage = "/fallback.jpg";

const NewsAdminPage = () => {
  const [news, setNews] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddNews, setShowAddNews] = useState(false);

  const dummyData = [
    {
      _id: "1",
      newsTitle: "Admissions Open for 2025 Batch",
      newsImage: "https://via.placeholder.com/150",
      newsLink: "https://example.com/admission",
      createdAt: new Date().toISOString(),
      videoTitle: "Campus Tour 2025",
      videoLink: "https://youtube.com/watch?v=xyz123",
    },
    {
      _id: "2",
      newsTitle: "Annual Tech Fest Announced",
      newsImage: "https://via.placeholder.com/150",
      newsLink: "https://example.com/techfest",
      createdAt: new Date().toISOString(),
      videoTitle: "Highlights from Tech Fest",
      videoLink: "https://youtube.com/watch?v=abc456",
    },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/news");
      if (res.data.length > 0) {
        setNews(res.data);
      } else {
        setNews(dummyData);
      }
    } catch (err) {
      console.error("Error fetching news, using dummy data:", err);
      setNews(dummyData);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await axios.delete(`http://localhost:4001/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit news:", id);
  };

  const handleAddNews = () => {
    setShowAddNews(true);
  };

  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = news.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(news.length / entriesToShow);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {showAddNews ? (
        <div>
          {/* Add New News Form goes here */}
          <button
            onClick={() => setShowAddNews(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Entries For News & Updates
          </h2>

          {/* Entries per page + Add new news */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
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
              onClick={handleAddNews}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
            >
              + Add New News
            </button>
          </div>

          {/* News Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">#</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">newsTitle</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">newsImage</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">newsLink</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">Created At</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base hidden md:table-cell">videoTitle</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base hidden md:table-cell">videoLink</th>
                  <th className="px-3 sm:px-6 py-3 text-center text-sm sm:text-base">Manage</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr key={entry._id}>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">{indexOfFirstEntry + index + 1}</td>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">{entry.newsTitle}</td>
                    <td className="px-3 sm:px-6 py-4 text-center">
                      <img
                        src={entry.newsImage || fallbackImage}
                        alt={entry.newsTitle + " Cover"}
                        className="h-16 w-24 object-cover rounded-md border mx-auto"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">
                      <a
                        href={entry.newsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View News
                      </a>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap hidden md:table-cell">{entry.videoTitle}</td>
                    <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap hidden md:table-cell">
                      <a
                        href={entry.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Watch Video
                      </a>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center items-center gap-2">
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
          <div className="flex flex-wrap justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsAdminPage;
