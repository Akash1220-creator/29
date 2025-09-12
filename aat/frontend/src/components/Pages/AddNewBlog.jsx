import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddNewBlog = ({ editingEntry, onBack, onSubmit }) => {
  // Initialize state with editingEntry values or empty for new blog
  const [newsTitle, setNewsTitle] = useState(editingEntry?.newsTitle || "");
  const [newsContent, setNewsContent] = useState(editingEntry?.newsContent || "");
  const [newsLink, setNewsLink] = useState(editingEntry?.newsLink || "");
  const [videoTitle, setVideoTitle] = useState(editingEntry?.videoTitle || "");
  const [videoLink, setVideoLink] = useState(editingEntry?.videoLink || "");
  const [newsImage, setNewsImage] = useState(null); // file input

  // If editingEntry changes (e.g., user clicks edit on another entry), update form
  useEffect(() => {
    setNewsTitle(editingEntry?.newsTitle || "");
    setNewsContent(editingEntry?.newsContent || "");
    setNewsLink(editingEntry?.newsLink || "");
    setVideoTitle(editingEntry?.videoTitle || "");
    setVideoLink(editingEntry?.videoLink || "");
    setNewsImage(null); // Reset file input
  }, [editingEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare object to submit
    const blogData = {
      ...editingEntry, // keeps _id if editing
      newsTitle,
      newsContent,
      newsLink,
      videoTitle,
      videoLink,
      newsImage, // optional, can handle separately in backend
    };

    onSubmit(blogData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingEntry ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">News Title</label>
          <input
            type="text"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">News Short Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={newsContent}
            onChange={(event, editor) => setNewsContent(editor.getData())}
          />
        </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">Full News Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={newsContent}
            onChange={(event, editor) => setNewsContent(editor.getData())}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">News Link</label>
          <input
            type="text"
            value={newsLink}
            onChange={(e) => setNewsLink(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video Link</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">News Image</label>
          <input
            type="file"
            onChange={(e) => setNewsImage(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingEntry ? "Update Blog" : "Add Blog"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBlog;
