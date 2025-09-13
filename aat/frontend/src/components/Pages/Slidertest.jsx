import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const fallbackImage = "/fallback.jpg"; // ✅ Fallback profile image

// ✅ Reusable Form for Add & Edit
const TestimonialForm = ({ testimonial = {}, onCancel, onSubmit }) => {
  const [inputData, setInputData] = useState({
    name: testimonial.name || "",
    designation: testimonial.designation || "",
    message: testimonial.message || "",
    profileImage: testimonial.profileImage || null,
  });

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setInputData({ ...inputData, [name]: files[0] });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(inputData).forEach((key) => {
      if (inputData[key]) data.append(key, inputData[key]);
    });

    await onSubmit(data);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        {testimonial._id ? "Edit Testimonial" : "Add Testimonial"}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputData.name}
          onChange={handleFormChange}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={inputData.designation}
          onChange={handleFormChange}
          className="w-full border rounded-md p-2"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={inputData.message}
          onChange={handleFormChange}
          className="w-full border rounded-md p-2"
          rows="4"
          required
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFormChange}
          className="w-full"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {testimonial._id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const TestimonialsAdminPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(5);

  // ✅ Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await axios.get("http://localhost:4001/api/testimonials");
      setTestimonials(res.data);
    };
    fetchTestimonials();
  }, []);

  // ✅ Pagination
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = testimonials.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalEntries = testimonials.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);

  // ✅ Handlers
  const handleAddClick = () => setShowAddForm(true);

  const handleAddSubmit = async (data) => {
    const res = await axios.post("http://localhost:4001/api/testimonials", data);
    setTestimonials([res.data, ...testimonials]);
    setShowAddForm(false);
  };

  const handleEditClick = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowEditForm(true);
  };

  const handleEditSubmit = async (data) => {
    const res = await axios.put(
      `http://localhost:4001/api/testimonials/${editingTestimonial._id}`,
      data
    );
    setTestimonials(
      testimonials.map((t) =>
        t._id === editingTestimonial._id ? res.data : t
      )
    );
    setShowEditForm(false);
    setEditingTestimonial(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/api/testimonials/${id}`);
    setTestimonials(testimonials.filter((t) => t._id !== id));
  };

  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ Conditional Rendering
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {showAddForm ? (
        // Add Form
        <TestimonialForm
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddSubmit}
        />
      ) : showEditForm ? (
        // Edit Form
        <TestimonialForm
          testimonial={editingTestimonial}
          onCancel={() => {
            setShowEditForm(false);
            setEditingTestimonial(null);
          }}
          onSubmit={handleEditSubmit}
        />
      ) : (
        // Dashboard (table + pagination)
        <>
          {/* Header */}
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
              onClick={handleAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
            >
              + Add Testimonial
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-center">#</th>
                  <th className="px-6 py-3 text-left">Profile</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Designation</th>
                  <th className="px-6 py-3 text-left">Message</th>
                  <th className="px-6 py-3 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((t, idx) => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-center">
                      {indexOfFirstEntry + idx + 1}
                    </td>
                    <td className="px-4 py-4">
                      <img
                        src={
                          t.profileImage
                            ? `http://localhost:4001/Uploads/${t.profileImage}`
                            : fallbackImage
                        }
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-4">{t.name}</td>
                    <td className="px-4 py-4">{t.designation}</td>
                    <td className="px-4 py-4 max-w-xs truncate">
                      {t.message}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
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
          <div className="mt-6 flex flex-col items-center justify-between sm:flex-row space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-700 font-medium text-center sm:text-left">
              Showing <b>{indexOfFirstEntry + 1}</b> to{" "}
              <b>{indexOfFirstEntry + currentEntries.length}</b> of{" "}
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
                    currentPage === i + 1 ? "bg-blue-100" : "bg-white"
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

export default TestimonialsAdminPage;
