import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon, ClipboardIcon } from "@heroicons/react/24/solid";

const AdminPanel = () => {
  // Subscribers State
  const [subscribers, setSubscribers] = useState([]);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [subscriberData, setSubscriberData] = useState({
    whatsapp: "",
    email: ""
  });
  const [showSubscriberForm, setShowSubscriberForm] = useState(false);

  // Fetch subscribers on mount
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      console.log("Fetching subscribers...");
      const res = await axios.get("api/subscribers");
      console.log("Data received:", res.data);
      setSubscribers(res.data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
  };

  // Delete subscriber
  const deleteSubscriber = async (id) => {
    try {
      await axios.delete(`api/subscribers/${id}`);
      setSubscribers(subscribers.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  // Open edit form
  const openSubscriberEditForm = (subscriber) => {
    setEditingSubscriber(subscriber);
    setSubscriberData({
      whatsapp: subscriber.whatsapp,
      email: subscriber.email
    });
    setShowSubscriberForm(true);
  };

  // Handle input change
  const handleSubscriberChange = (e) => {
    const { name, value } = e.target;
    setSubscriberData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Cancel form
  const handleSubscriberCancel = () => {
    setShowSubscriberForm(false);
    setEditingSubscriber(null);
    setSubscriberData({ whatsapp: "", email: "" });
  };

  // Submit form
  const handleSubscriberSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscriber) {
        // Update subscriber
        await axios.put(
          `api/subscribers/${editingSubscriber._id}`,
          subscriberData
        );
        setSubscribers((prev) =>
          prev.map((s) =>
            s._id === editingSubscriber._id ? { ...s, ...subscriberData } : s
          )
        );
      } else {
        // Add new subscriber
        const res = await axios.post("api/subscribers", subscriberData);
        setSubscribers((prev) => [...prev, res.data]);
      }
      // Reset form
      handleSubscriberCancel();
    } catch (err) {
      console.error("Error saving subscriber:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subscribers List</h2>

      {/* Add / Edit Subscriber Form */}
      {showSubscriberForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingSubscriber ? "Edit Subscriber" : "Add New Subscriber"}
          </h3>
          <form onSubmit={handleSubscriberSubmit} className="space-y-4">
            <input
              type="text"
              name="whatsapp"
              value={subscriberData.whatsapp}
              onChange={handleSubscriberChange}
              placeholder="WhatsApp Number"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={subscriberData.email}
              onChange={handleSubscriberChange}
              placeholder="Email Address"
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingSubscriber ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={handleSubscriberCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Show Subscribers Table */}
      {subscribers.length === 0 ? (
        <p className="text-gray-600">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold uppercase tracking-wider">
                <th className="p-3">#</th>
                <th className="p-3">WhatsApp</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subscribed At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>

                  {/* WhatsApp */}
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span>{subscriber.whatsapp}</span>
                      <button
                        onClick={() => handleCopy(subscriber.whatsapp)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                        title="Copy WhatsApp"
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span>{subscriber.email}</span>
                      <button
                        onClick={() => handleCopy(subscriber.email)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                        title="Copy Email"
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>

                  {/* Subscribed At */}
                  <td className="p-3">
                    {new Date(subscriber.createdAt).toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openSubscriberEditForm(subscriber)}
                        className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        title="Edit Subscriber"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSubscriber(subscriber._id)}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        title="Delete Subscriber"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
