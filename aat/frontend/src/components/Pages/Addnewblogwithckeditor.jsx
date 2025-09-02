import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// IMPORTANT: This component requires the CKEditor 5 Classic Build script to be loaded
// in your main HTML file for the editor to function.
// Add the following script tag to your index.html file:
// <script src="https://cdn.ckeditor.com/ckeditor5/42.0.0/classic/ckeditor.js"></script>

// The main App component that renders the blog form.
// All logic and components are contained in this single file as required.
const addnewblogwithckeditor = () => {
    // State to hold the form data
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('Draft');
    const [shortDescription, setShortDescription] = useState(''); // This will now hold HTML content
    const [longDescription, setLongDescription] = useState(''); // This will now hold HTML content
    const [coverImage, setCoverImage] = useState(null);
    const [sliderImage, setSliderImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    // Refs for the editor elements
    const shortEditorRef = useRef(null);
    const longEditorRef = useRef(null);

    // CKEditor initialization for the Short Description
    useEffect(() => {
        let editorInstance = null;
        if (shortEditorRef.current && typeof window.ClassicEditor !== 'undefined') {
            window.ClassicEditor
                .create(shortEditorRef.current, {
                    placeholder: 'Start typing your short description here...'
                })
                .then(editor => {
                    editorInstance = editor;
                    // Store the editor instance on the ref for external access
                    shortEditorRef.current.ckeditorInstance = editor; 
                    editor.setData(shortDescription);
                    editor.model.document.on('change:data', () => {
                        setShortDescription(editor.getData());
                    });
                })
                .catch(error => {
                    console.error('There was an error initializing the short description editor:', error);
                });
        }
        
        // Cleanup function to destroy the editor instance when the component unmounts
        return () => {
            if (editorInstance) {
                editorInstance.destroy().catch(error => console.error(error));
            }
        };
    }, []); // Empty dependency array to run only once.

    // CKEditor initialization for the Long Description
    useEffect(() => {
        let editorInstance = null;
        if (longEditorRef.current && typeof window.ClassicEditor !== 'undefined') {
            window.ClassicEditor
                .create(longEditorRef.current, {
                    placeholder: 'Enter the full content of your blog post here...'
                })
                .then(editor => {
                    editorInstance = editor;
                    // Store the editor instance on the ref for external access
                    longEditorRef.current.ckeditorInstance = editor; 
                    editor.setData(longDescription);
                    editor.model.document.on('change:data', () => {
                        setLongDescription(editor.getData());
                    });
                })
                .catch(error => {
                    console.error('There was an error initializing the long description editor:', error);
                });
        }
        
        // Cleanup function to destroy the editor instance when the component unmounts
        return () => {
            if (editorInstance) {
                editorInstance.destroy().catch(error => console.error(error));
            }
        };
    }, []); // Empty dependency array to run only once.

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' }); // Clear previous messages

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('status', status);
            formData.append('shortDescription', shortDescription);
            formData.append('longDescription', longDescription);
            if (coverImage) formData.append('coverImage', coverImage);
            if (sliderImage) formData.append('sliderImage', sliderImage);

            const response = await axios.post(
                'http://localhost:4001/api/blogs',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            setMessage({ text: '✅ Blog submitted successfully!', type: 'success' });
            console.log('Server response:', response.data);

            // Reset form states
            setTitle('');
            setStatus('Draft');
            setShortDescription('');
            setLongDescription('');
            setCoverImage(null);
            setSliderImage(null);

            // Reset CKEditor content directly
            if (shortEditorRef.current?.ckeditorInstance) {
                shortEditorRef.current.ckeditorInstance.setData('');
            }
            if (longEditorRef.current?.ckeditorInstance) {
                longEditorRef.current.ckeditorInstance.setData('');
            }
            
        } catch (error) {
            console.error('Error submitting blog:', error);
            setMessage({ text: '❌ Failed to submit blog. Check console for details.', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 5000); // Clear message after 5 seconds
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8 font-sans">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Add New Blog
                </h1>
                
                {/* Message Display */}
                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title + Status */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Title
                            </label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
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

                    {/* Short Description with CKEditor */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Short Description
                        </label>
                        <div 
                            ref={shortEditorRef} 
                            className="mt-1"
                            style={{ minHeight: '150px' }} 
                        ></div>
                    </div>

                    {/* Long Description with CKEditor */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Long Description
                        </label>
                        <div 
                            ref={longEditorRef} 
                            className="mt-1"
                            style={{ minHeight: '300px' }} 
                        ></div>
                    </div>

                    {/* Cover + Slider Image */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCoverImage(e.target.files[0])}
                                className="w-full"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Slider Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSliderImage(e.target.files[0])}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Submit */}
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
    );
};

// Export the main component
export default addnewblogwithckeditor;
