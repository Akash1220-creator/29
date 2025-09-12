import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const fallbackImage = "/fallback.jpg"; // ✅ Add a fallback image

const TestimonialsAdminPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    message: "",
    profileImage: null,
  });

  // ✅ Fetch all testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get("/api/testimonials");
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  // ✅ Handle Edit Click
  const handleEditClick = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation,
      message: testimonial.message,
      profileImage: null, // image will be updated only if user selects new one
    });
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("message", formData.message);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      const { data } = await axios.put(
        `/api/testimonials/${editingId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setTestimonials((prev) =>
        prev.map((t) => (t._id === editingId ? data : t))
      );

      setEditingId(null);
      setFormData({ name: "", designation: "", message: "", profileImage: null });
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              <th className="py-3 px-4">Profile</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id} className="border-b">
                <td className="py-3 px-4">
                  <img
                    src={testimonial.profileImage || fallbackImage}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{testimonial.name}</td>
                <td className="py-3 px-4">{testimonial.designation}</td>
                <td className="py-3 px-4 max-w-xs truncate">
                  {testimonial.message}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    onClick={() => handleEditClick(testimonial)}
                  >
                    <PencilSquareIcon className="w-5 h-5 inline" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(testimonial._id)}
                  >
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Form */}
      {editingId && (
        <form
          onSubmit={handleEditSubmit}
          className="mt-6 p-4 bg-gray-100 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Edit Testimonial</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full mb-3 p-2 border rounded"
            rows="3"
            required
          />
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            className="ml-3 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setEditingId(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default TestimonialsAdminPage;
