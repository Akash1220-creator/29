import React, { useState } from 'react';
import AddNewBlog from './AddNewBlog';

const BlogEntriesPage = () => {
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogEntries, setBlogEntries] = useState([
    {
      id: 1,
      title: 'First Blog Post',
      coverPage: 'cover1.jpg',
      sliderImage: 'slider1.jpg',
      status: 'Published',
      createdAt: '2025-08-01',
    },
    {
      id: 2,
      title: 'Second Blog Post',
      coverPage: 'cover2.jpg',
      sliderImage: 'slider2.jpg',
      status: 'Draft',
      createdAt: '2025-08-05',
    },
    // ... rest of your initial blogs
  ]);

  const [showAddBlog, setShowAddBlog] = useState(false);

  const fallbackImage =
    'https://media.istockphoto.com/id/1453843862/photo/business-meeting.jpg?s=612x612&w=0&k=20&c=4k9H7agmpn92B7bkUywvkK5Ckwm9Y8f8QrGs4DRDWpE=';

  // Pagination
  const totalPages = Math.ceil(blogEntries.length / entriesToShow);
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = blogEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalEntries = blogEntries.length;

  // Handlers
  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Editing blog entry with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setBlogEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleAddBlog = () => {
    setShowAddBlog(true);
  };

  const handleNewBlogSubmit = (newBlog) => {
    setBlogEntries((prev) => [newBlog, ...prev]); // add on top
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {showAddBlog ? (
        <AddNewBlog
          onBack={() => setShowAddBlog(false)}
          onSubmit={handleNewBlogSubmit}
        />
      ) : (
        <>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-left">
            Blog Entries
          </h1>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cover Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slider Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manage</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEntries.map((entry, index) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4">{indexOfFirstEntry + index + 1}</td>
                    <td className="px-6 py-4">{entry.title}</td>
                    <td className="px-6 py-4">
                      <img
                        src={entry.coverPage ? fallbackImage : fallbackImage}
                        alt={entry.title + ' Cover'}
                        className="h-16 w-24 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={entry.sliderImage ? fallbackImage : fallbackImage}
                        alt={entry.title + ' Slider'}
                        className="h-16 w-24 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          entry.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{entry.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
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
              Showing <b>{indexOfFirstEntry + 1}</b> to{' '}
              <b>{indexOfFirstEntry + currentEntries.length}</b> of{' '}
              <b>{totalEntries}</b> entries
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
                  className={`px-3 py-1 border ${
                    currentPage === i + 1 ? 'bg-blue-100' : 'bg-white'
                  }`}
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

export default BlogEntriesPage;
