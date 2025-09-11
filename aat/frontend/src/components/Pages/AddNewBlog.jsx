import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddNewBlog = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Draft');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [sliderImage, setSliderImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('status', status);
      formData.append('shortDescription', shortDescription);
      formData.append('longDescription', longDescription);
      if (coverImage) formData.append('coverImage', coverImage);
      if (sliderImage) formData.append('sliderImage', sliderImage);

      const response = await axios.post(
        'api/blogs',
        formData,
        {
          headers: {
            "Accept": "application/json", // Optional
          },
        }
      );
    
      alert('✅ Blog submitted successfully!');
      console.log('Server response:', response.data);

      /*Reset form
      setTitle('');
      setStatus('Draft');
      setShortDescription('');
      setLongDescription('');
      setCoverImage(null);
      setSliderImage(null);*/
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('❌ Failed to submit blog. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Full toolbar configuration
  const fullToolbar = [
    'heading', '|',
    'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
    'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'imageUpload', '|',
    'bulletedList', 'numberedList', 'todoList', '|',
    'outdent', 'indent', '|',
    'alignment', 'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily', '|',
    'horizontalLine', 'removeFormat', '|',
    'undo', 'redo'
  ];

  return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Blog</h2>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title + Status */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            
              {/* Short + Long Description */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                {/* Short Description */}
                <div className="md:w-1/2 flex flex-col">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden min-h-[200px]">
                    <CKEditor
                      editor={ClassicEditor}
                      data={shortDescription}
                      onChange={(event, editor) => setShortDescription(editor.getData())}
                      config={{ toolbar: fullToolbar }}
                    />
                  </div>
                </div>

                {/* Long Description */}
                <div className="md:w-1/2 flex flex-col">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Long Description</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden min-h-[200px]">
                    <CKEditor
                      editor={ClassicEditor}
                      data={longDescription}
                      onChange={(event, editor) => setLongDescription(editor.getData())}
                      config={{ toolbar: fullToolbar }}
                    />
                  </div>
                </div>
              </div>

              {/* Cover + Slider Image */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="w-full"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slider Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSliderImage(e.target.files[0])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto px-6 py-3 font-bold rounded-lg shadow-lg transition-all ${
                    loading
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default AddNewBlog;
