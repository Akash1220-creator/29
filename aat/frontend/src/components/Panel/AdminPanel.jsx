import React, { useState, useEffect } from 'react';
import { Settings, Home, Users, BookOpen, Building2, Phone, Calendar, Trophy, Save, Plus, Trash2, FileText, Clock, FolderOpen, Folder, GripVertical, GraduationCap, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddNewBlog from '../Pages/AddNewBlog';
import Institute from '../../../../Backend/models/Institute';
import { PencilSquareIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const AdminPanel = () => {

  //logo preview institue information 
  const [instituteName, setInstituteName] = useState("");
  const [aboutInstitute, setAboutInstitute] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isInstituteEditing, setIsInstituteEditing] = useState(false);



  // Fetch existing institute information on mount

  const fetchInstitute = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/institute/");
      console.log("Fetched institute data adminpanel.jsx:", res.data);

      if (res.data) {
        // If API returns single object
        const institute = Array.isArray(res.data) ? res.data[0] : res.data;

        setInstituteName(institute.name || "");
        setAboutInstitute(institute.about || "");
        if (institute.logo) {
          setLogoPreview(`http://localhost:4001/Uploads/${institute.logo}`);
        }

        setIsInstituteEditing(true);
      } else {
        setIsInstituteEditing(false);
      }
    } catch (err) {
      console.error("Error fetching institute info:", err);
    }
  };
  useEffect(() => {
    fetchInstitute();

  }, []);




  // Handle add/update institute info
  const handleInstituteInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("name", instituteName);
      formData.append("about", aboutInstitute);
      if (logoFile) formData.append("logo", logoFile);

      let res;
      if (isInstituteEditing) {
        res = await axios.put("http://localhost:4001/api/institute/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Institute info updated successfully!");
      } else {
        res = await axios.post("http://localhost:4001/api/institute/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Institute info added successfully!");
        setIsInstituteEditing(true);
      }

      // Sync state with DB after save
      if (res.data) {
        setInstituteName(res.data.name || "");
        setAboutInstitute(res.data.about || "");
        setLogoPreview(res.data.logo || "");
      }
      // Re-fetch updated data
      fetchInstitute();
    } catch (err) {
      console.error("Error saving institute info:", err);
    }
  };




  //slider or carousal data 
  const [carouselItems, setCarouselItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    imagename: "",
    title: "",
    description: "",
    visible: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  // Fetch carousel items from backend and assign to state carouselData
  useEffect(() => {
    const fetchCarousel = () => {
      axios
        .get("http://localhost:4001/api/carousel")
        .then(res => setCarouselItems(res.data))
        .catch(err => console.error("Error fetching carousel:", err));
    };

    fetchCarousel(); // initial fetch
    const interval = setInterval(fetchCarousel, 5000); // fetch every 2 sec see up changes  without reloading.

    return () => clearInterval(interval); // cleanup
  }, []);


  // Open Add Form
  const openAddForm = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      imagename: "",
      title: "",
      description: "",
      visible: true,
    });
    setPreviewUrl(null);
    setShowForm(true);
  };

  // Open Edit Form
  const openEditForm = (item) => {
    setIsEditing(true);
    setFormData({ ...item, id: item._id });
    setPreviewUrl(null);
    setShowForm(true);
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormData({
      id: null,
      imagename: "",
      title: "",
      description: "",
      visible: true,
    });
    setPreviewUrl(null);
  };

  // Handle Add or Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || (!selectedFile && !isEditing)) {
      alert("Please upload an image and add a title.");
      return;
    }

    const data = new FormData();
    if (selectedFile) {
      data.append("image", selectedFile); // ✅ use state instead of DOM query
    }
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("visible", formData.visible);

    try {
      let res;
      if (isEditing) {
        res = await axios.put(
          `http://localhost:4001/api/carousel/${formData.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setCarouselItems(
          carouselItems.map((item) =>
            item._id === formData.id ? res.data : item
          )
        );
        // ✅ update state with latest data from backend
        setCarouselItems((prevItems) =>
          prevItems.map((item) =>
            item._id === formData.id ? res.data : item
          )
        );
      } else {
        res = await axios.post(
          "http://localhost:4001/api/carousel",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setCarouselItems([...carouselItems, res.data]);
      }

      handleCancel();
    } catch (err) {
      console.error(err);
      alert("Error saving item. Check console for details.");
    }
  };


  // Delete item
  const handlecarouselDelete = async (id) => {
    const res = await axios.delete(`http://localhost:4001/api/carousel/${id}`);
    console.log("Delete Button response:", res.data);  // just check delete button response
    setCarouselItems(carouselItems.filter((item) => item._id !== id));// Functional update ensures latest state is used
  };

  // Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:4001/api/carousel/${id}/toggle`
      );
      setCarouselItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  //About Section of Home Page
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [statistics, setStatistics] = useState([]);

  // ✅ Fetch data on load

  const fetchAbout = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/about");
      console.log("Fetched about data adminpanel.jsx:", res.data);
      if (res.data) {
        setHeading(res.data.heading || "");
        setDescription(res.data.description || "");
        setStatistics(res.data.statistics || []);
      }
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  };
  useEffect(() => {
    fetchAbout();
  }, []);

  // ✅ Handle stat change
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...statistics];
    updatedStats[index][field] = value;
    setStatistics(updatedStats);
  };

  // ✅ Save handler
  const SendandSave = async () => {
    try {
      await axios.put("http://localhost:4001/api/about", {
        heading,
        description,
        statistics,
      });
      alert("Saved successfully!");
      fetchAbout(); // Refresh data from backend
    } catch (err) {
      console.error("Error saving:", err);
    }
  };




  //Action Tab
  const [activeTab, setActiveTab] = useState('institute');
  // Institute Information
  // const [instituteName, setInstituteName] = useState('Give Institute Name Here'); // Removed duplicate
  // const [aboutInstitute, setAboutInstitute] = useState('Explain about institute here...'); // Removed duplicate



  // Statistics
  const [stats, setStats] = useState([
    { value: '10,000+', label: 'Students Enrolled' },
    { value: '100+', label: 'Qualified Teachers' },
    { value: '95%', label: 'Success Rate' },
    { value: '22+', label: 'Years of Excellence' }
  ]);


  // News & Events
  /*const [news, setNews] = useState([
    {
      id: 1,
      title: "Annual Science Fair 2025",
      date: "2025-03-15",
      summary: "Students showcase innovative projects in our biggest science fair yet.",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
      id: 2,
      title: "New AI & Machine Learning Course Launch",
      date: "2025-02-20",
      summary: "Introducing cutting-edge AI curriculum designed for industry readiness.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    }
  ]);*/
  const [showAddNews, setShowAddNews] = useState(false);

  // ✅ Dummy data (for development if backend is down)
  const dummyData = [
    {
      _id: "1",
      newsTitle: "Admissions Open for 2025 Batch",
      newsImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1via.placeholder.com/150",
      newsLink: "https://example.com/admission",
      createdAt: new Date().toISOString(),
      videoTitle: "Campus Tour 2025",
      videoLink: "https://youtube.com/watch?v=xyz123",
    },
    {
      _id: "2",
      newsTitle: "Annual Tech Fest Announced",
      newsImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1.placeholder.com/150",
      newsLink: "https://example.com/techfest",
      createdAt: new Date().toISOString(),
      videoTitle: "Highlights from Tech Fest",
      videoLink: "https://youtube.com/watch?v=abc456",
    },
  ];


  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    address: '123 Education Street, Knowledge City, KC 12345',
    phone: '+91 9876543210',
    email: 'info@excellencecoaching.com',
    socialMedia: {
      facebook: 'https://facebook.com/excellencecoaching',
      instagram: 'https://instagram.com/excellencecoaching',
      linkedin: 'https://linkedin.com/company/excellencecoaching',
      youtube: 'https://youtube.com/@excellencecoaching'
    }
  });


  // Corporate Training
  const [corporateTraining, setCorporateTraining] = useState([
    {
      id: 1,
      title: "Office Productivity & Business Automation",
      description: "Boost your team's efficiency through essential digital office tools.",
      courses: [
        "MS Office Mastery (Basic to Advanced)",
        "Advanced Excel & Dashboard Reporting",
        "Digital Office Administration Tools (Google Workspace / MS365)",
        "Tally Prime with GST for Business Accounting",
        "CRM Training (Zoho, Salesforce Basics)"
      ]
    },
    {
      id: 2,
      title: "Graphic Design, UI/UX & Creative Tools",
      description: "Design-focused training for branding, web, and user experience.",
      courses: [
        "Professional Graphic Designing (Photoshop, Illustrator, CorelDRAW)",
        "UI/UX Design & Prototyping (Figma, Adobe XD)",
        "Video Editing & Motion Graphics (Premiere Pro, After Effects)",
        "AutoCAD & Industrial Design Fundamentals"
      ]
    },
    {
      id: 3,
      title: "Web & App Development Programs",
      description: "Develop complete websites and mobile applications from scratch.",
      courses: [
        "Full Stack Web Development (MERN / Django Stack)",
        "Front-End Development (HTML, CSS, JavaScript, React)",
        "WordPress Development for Business Sites",
        "Mobile App UI Design with Figma + Flutter",
        "Android App Development (Using Java)"
      ]
    }
  ]);
  // Add new training program
  const addProgram = () => {
    const newProgram = {
      id: Date.now(),
      title: "",
      description: "",
      courses: [],
    };
    setCorporateTraining([...corporateTraining, newProgram]);
  };

  // Remove training program
  const removeProgram = (id) => {
    setCorporateTraining(corporateTraining.filter((program) => program.id !== id));
  };

  // Add course to specific program
  const addCourse = (programId) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? { ...program, courses: [...program.courses, ""] }
        : program
    );
    setCorporateTraining(updated);
  };

  // Update course text
  const updateCourse = (programId, index, value) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? {
          ...program,
          courses: program.courses.map((course, i) =>
            i === index ? value : course
          ),
        }
        : program
    );
    setCorporateTraining(updated);
  };

  // Remove specific course
  const removeCourse = (programId, index) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? {
          ...program,
          courses: program.courses.filter((_, i) => i !== index),
        }
        : program
    );
    setCorporateTraining(updated);
  };



  // Courses
  const [courseSections, setCourseSections] = useState([
    {
      id: 1,
      category: "Professional Courses",
      subcategories: [
        {
          id: 1,
          title: "Term Certificate Courses",
          duration: "1–2 Months",
          items: [
            {
              name: "MS Office Basics",
              description: "Covers Word, Excel, and PowerPoint fundamentals for everyday office tasks."
            },
            {
              name: "Tally Prime Basics",
              description: "Introduces Tally Prime for basic accounting, billing, and inventory management."
            },
            {
              name: "Typing & Data Entry",
              description: "Improves typing speed and accuracy for professional data entry tasks."
            },
            {
              name: "Photoshop for Beginners",
              description: "Teaches basic photo editing, retouching, and design creation using Adobe Photoshop."
            },
            {
              name: "Basic Video Editing",
              description: "Covers simple video cutting, transitions, and audio syncing using common tools."
            },
            {
              name: "Social Media for Business",
              description: "Shows how to create, manage, and promote business pages on popular social platforms."
            },
            {
              name: "HTML & CSS Basics",
              description: "Introduces basic web structure and styling concepts to create simple websites."
            },
            {
              name: "Soft Skills & Interview Preparation",
              description: "Focuses on communication, teamwork, and techniques for job interview success."
            }
          ]
        },
        {
          id: 2,
          title: "Certificate Courses",
          duration: "6 Months",
          items: [
            {
              name: "Advanced Office Management (with Tally)",
              description: "Combines MS Office, Tally Prime, and workflow management for office operations."
            },
            {
              name: "Advanced Graphic Designing",
              description: "Covers advanced tools in Photoshop, Illustrator, and CorelDRAW for creative design."
            },
            {
              name: "Advanced Tally & GST Accounting",
              description: "Focuses on taxation, GST filing, payroll, and advanced accounting reports in Tally."
            },
            {
              name: "Web Designing Fundamentals",
              description: "Teaches HTML, CSS, basic JavaScript, and responsive design for beginner web developers."
            },
            {
              name: "E-Commerce Website Management",
              description: "Covers creating and managing online stores, product listings, and order processing."
            }
          ]
        }
      ]
    },
    {
      id: 2,
      category: "University Courses",
      subcategories: [
        {
          id: 1,
          title: "Distance Learning Courses",
          items: [
            {
              name: "BCA / MCA / BBA / MBA",
              description: "Undergraduate and postgraduate programs in computer applications, business administration, and management."
            },
            {
              name: "BA / MA / B.Com / M.Com Etc",
              description: "Arts and commerce degrees available for distance learning to suit various career paths."
            }
          ]
        },
        {
          id: 2,
          title: "Online Regular Courses",
          items: [
            {
              name: "Online B.A. / B.Com / BBA",
              description: "Fully online undergraduate programs with flexible schedules."
            },
            {
              name: "Online Diploma in IT / HR / Marketing",
              description: "Specialized online diploma courses in technology, human resources, and marketing."
            },
            {
              name: "Certificate Courses via LMS Access",
              description: "Short-term online certifications delivered via a Learning Management System."
            }
          ]
        },
        {
          id: 3,
          title: "B.Voc Courses (NSQF-Aligned)",
          items: [
            {
              name: "Retail Management",
              description: "Covers store operations, sales strategies, and customer service."
            },
            {
              name: "Hospitality & Hotel Management",
              description: "Prepares students for careers in hospitality, tourism, and hotel services."
            },
            {
              name: "Beauty & Wellness",
              description: "Trains in cosmetology, skincare, and holistic wellness practices."
            },
            {
              name: "Electrical / Technician Courses",
              description: "Practical training for electrical systems, maintenance, and safety."
            },
            {
              name: "COPA (Computer Operator & Programming Assistant)",
              description: "Basic computer operation, programming fundamentals, and IT tools."
            },
            {
              name: "Fashion Designing",
              description: "Covers clothing design, textile knowledge, and fashion trends."
            },
            {
              name: "Mobile Repairing",
              description: "Hands-on training for diagnosing and repairing mobile devices."
            }
          ]
        }
      ]
    }
  ]);


  // Add Category
  const addCategory = () => {
    setCourseSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: "New Category",
        subcategories: []
      }
    ]);
  };

  // Remove Category
  const removeCategory = (categoryId) => {
    setCourseSections((prev) =>
      prev.filter((section) => section.id !== categoryId)
    );
  };

  // Add Subcategory
  const addSubcategory = (categoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
            ...section,
            subcategories: [
              ...section.subcategories,
              {
                id: Date.now(),
                title: "New Subcategory",
                duration: "",
                items: []
              }
            ]
          }
          : section
      )
    );
  };

  // Remove Subcategory
  const removeSubcategory = (categoryId, subcategoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
            ...section,
            subcategories: section.subcategories.filter(
              (sub) => sub.id !== subcategoryId
            )
          }
          : section
      )
    );
  };

  // Add Item
  const addItem = (categoryId, subcategoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
            ...section,
            subcategories: section.subcategories.map((sub) =>
              sub.id === subcategoryId
                ? {
                  ...sub,
                  items: [
                    ...sub.items,
                    { id: Date.now(), name: "New Item", description: "" }
                  ]
                }
                : sub
            )
          }
          : section
      )
    );
  };

  // Remove Item
  const removeItem = (categoryId, subcategoryId, itemId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
            ...section,
            subcategories: section.subcategories.map((sub) =>
              sub.id === subcategoryId
                ? {
                  ...sub,
                  items: sub.items.filter((item) => item.id !== itemId)
                }
                : sub
            )
          }
          : section
      )
    );
  };

  // Update field
  const updateField = (categoryId, subcategoryId, itemId, field, value) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
            ...section,
            subcategories: section.subcategories.map((sub) =>
              sub.id === subcategoryId
                ? {
                  ...sub,
                  items: sub.items.map((item) =>
                    item.id === itemId
                      ? { ...item, [field]: value }
                      : item
                  )
                }
                : sub
            )
          }
          : section
      )
    );
  };




  const handleSave = () => {
    alert('Changes saved successfully!');
  };


  const addNews = () => {
    const newItem = {
      id: Date.now(),
      title: "New Event",
      date: new Date().toISOString().split('T')[0],
      summary: "Event description",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    };
    setNews([...news, newItem]);
  };


  const removeNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  const updateNews = (id, field, value) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const tabs = [
    { id: 'institute', label: 'Institute Info', icon: Building2 },
    { id: 'home', label: 'Home Page Slider', icon: Home },
    { id: 'stats', label: 'Statistics', icon: Trophy },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'news', label: 'News & Updates', icon: Calendar },
    { id: 'corporate', label: 'Corporate Training', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'about', label: 'about section', icon: Info },

  ];



  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogEntries, setBlogEntries] = useState([]); // initially empty
  const [loading, setLoading] = useState(true);
  const [showAddBlog, setShowAddBlog] = useState(false);

  const fallbackImage =
    "https://media.istockphoto.com/id/1453843862/photo/business-meeting.jpg?s=612x612&w=0&k=20&c=4k9H7agmpn92B7bkUywvkK5Ckwm9Y8f8QrGs4DRDWpE=";

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/blogs");
        setBlogEntries(response.data); // backend should return array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/blogs/${id}`);
      setBlogEntries((prev) => prev.filter((entry) => entry._id !== id)); // backend uses _id
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const handleAddBlog = () => {
    setShowAddBlog(true);
  };

  const handleNewBlogSubmit = (newBlog) => {
    setBlogEntries((prev) => [newBlog, ...prev]); // add on top
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading blogs...</p>;
  }


  /* Only render if active tab is 'institute'
if (activeTab !== "institute") return null;*/


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg font-medium transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border-gray-200 border">
              <div className="p-8">
                {/* Home Page Slider Tab*/}
                {activeTab === 'home' && (

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Slider Data</h2>
                    </div>
                    <div className="space-y-6">
                      {/* Add Button */}
                      {!showForm && (
                        <button
                          onClick={openAddForm}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          + Add New Slider Data
                        </button>
                      )}

                      {/* Form (Add/Edit) */}
                      {showForm && (
                        <div className="bg-white shadow rounded-lg p-6 mb-8">
                          <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? "Edit Slider Data" : "Add New Slider Data"}
                          </h2>
                          <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            {/* File Upload */}
                            <div className="col-span-1 md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    setSelectedFile(file); // ✅ store file in state
                                    setFormData({
                                      ...formData,
                                      imagename: file.name, // only for showing file name in UI
                                    });
                                    setPreviewUrl(URL.createObjectURL(file));
                                  }
                                }}
                                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                              />

                              {formData.imagename && (
                                <p className="mt-2 text-sm text-gray-600">
                                  Selected file:{" "}
                                  <span className="font-medium">{formData.imagename}</span>
                                </p>
                              )}
                              {previewUrl && (
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="mt-2 w-40 h-24 object-cover rounded border"
                                />
                              )}
                            </div>

                            <input
                              type="text"
                              placeholder="Image Caption or Title"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                              className="border p-2 rounded w-full"
                            />
                            <textarea
                              placeholder="Description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                              className="border p-2 rounded w-full col-span-1 md:col-span-2"
                            />
                            <div className="col-span-1 md:col-span-2 flex gap-4">
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                              >
                                {isEditing ? "Save Changes" : "Save Item"}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Table */}
                      <h2 className="text-2xl font-semibold mb-4">Slider Items</h2>
                      {carouselItems.length === 0 ? (
                        <p className="text-gray-600">No items found. Add some sliders above.</p>
                      ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
                                <th className="p-3">Image </th>
                                <th className="p-3">Image Caption</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Visiblility</th>
                                <th className="p-3">Managae</th>
                              </tr>
                            </thead>
                            <tbody>
                              {carouselItems.map((item) => (
                                <tr key={item._id} className="">

                                  {/*{item.imagename}</td> same as DB Schema "itemname"*/}
                                  <td className="p-3">
                                    {item.imagename ? (
                                      <img
                                        src={`http://localhost:4001/Uploads/${item.imagename}`}
                                        alt={item.title}
                                        className="w-20 h-12 object-cover rounded border"
                                      />
                                    ) : (
                                      <span className="text-gray-500 italic">No image</span>
                                    )}
                                  </td>
                                  <td className="p-3">{item.title}</td>
                                  <td className="p-3">{item.description}</td>
                                  <td className="p-3">
                                    <button
                                      onClick={() => toggleVisibility(item._id)}
                                      className={`flex items-center justify-center mx-auto px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors duration-300 shadow-sm
                              ${item.visible ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}
                            `}
                                    >
                                      {item.visible ? (
                                        <>
                                          <EyeIcon className="h-4 w-4 mr-1" /> On
                                        </>
                                      ) : (
                                        <>
                                          <EyeSlashIcon className="h-4 w-4 mr-1" /> Off
                                        </>
                                      )}
                                    </button>
                                  </td>
                                  <td className="flex p-3 space-x-2">
                                    <button
                                      onClick={() => openEditForm(item)}
                                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                                    >
                                      <PencilSquareIcon className="h-4 w-4 mr-1" />
                                    </button>
                                    <button
                                      onClick={() => handlecarouselDelete(item._id)}
                                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                                    >
                                      <TrashIcon className="h-4 w-4 mr-1" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                )}
                {/* Institute Info Tab */}
                {activeTab === 'institute' && (

                  <div className="space-y-6">


                    <div >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Institute Information</h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Institute Name
                          </label>
                          <input
                            type="text"
                            value={instituteName}
                            onChange={(e) => setInstituteName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          />

                        </div>

                        <div >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            About the Institute
                          </label>
                          <textarea
                            value={aboutInstitute}
                            onChange={(e) => setAboutInstitute(e.target.value)}
                            rows={4}
                            className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          />

                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files.length > 0) {
                                const file = e.target.files[0];
                                setLogoFile(file); // store file in state
                                setLogoPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="block w-auto bg-blue-600 text-bg-blue-600 text-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                          {/* Show preview if available */}
                          {logoPreview && (
                            <div className="mt-3">
                              <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="h-24 w-24 object-cover rounded-md border"
                              />
                            </div>
                          )}

                        </div>
                        {/* Add / Update Button */}
                        <button
                          onClick={handleInstituteInfo}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          {isInstituteEditing ? "Save Updated Info" : "Add Info"}
                        </button>

                      </div>
                    </div>


                  </div>
                )}

                {/* Statistics Tab */}
                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="p-6 border border-gray-200 rounded-lg">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Value
                              </label>
                              <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => updateStat(index, 'value', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                              </label>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => updateStat(index, 'label', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News & Updates Tab */}
                {activeTab === 'news' && (
                  <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    {showAddBlog ? (
                      <AddNewBlog
                        onBack={() => setShowAddBlog(false)}
                        onSubmit={handleNewBlogSubmit}
                      />
                    ) : (
                      <>

                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                          Entries For News & Upadtes
                        </h2>

                        {/* Entries per page + Add new blog */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
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
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
                          >
                            + Add New Blog
                          </button>
                        </div>

                        {/* Blog Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-6 py-3 text-center">#</th>
                                <th className="px-6 py-3 text-center">newsTitle</th>
                                <th className="px-6 py-3 text-center">newsImage</th>
                                <th className="px-6 py-3 text-center">newsLink</th>
                                <th className="px-6 py-3 text-center">Created At</th>
                                <th className="px-6 py-3 text-center">videoTitle</th>
                                <th className="px-6 py-3 text-center">videoLink</th>
                                <th className="px-6 py-3 text-center">Manage</th>
                              </tr>
                            </thead>
                            <tbody>

                            
                                {dummyData.map((entry, index) => (
                                  <tr key={entry._id}>
                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4 text-center">{entry.newsTitle}</td>
                                    <td className="px-6 py-4 text-center">
                                      <img
                                        src={entry.newsImage}
                                        alt={entry.newsTitle}
                                        className="w-20 h-20 sm:w-16 sm:h-16  object-cover mx-auto rounded"
                                      />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <a
                                        href={entry.newsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                      >
                                        {entry.newsLink}
                                      </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      {new Date(entry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">{entry.videoTitle}</td>
                                    <td className="px-6 py-4 text-center">
                                      <a
                                        href={entry.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                      >
                                        {entry.videoLink}
                                      </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                      <div className="flex items-center space-x-3">
                                        {/*  Edit Button with Green Pen */}
                                        <button
                                          onClick={() => handleEdit(entry._id)}
                                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                                        >
                                          <PencilSquareIcon className="h-5 w-5" />
                                        </button>

                                        {/* Delete Button with Red Dustbin */}
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
                        <div className="mt-6 flex justify-between items-center">
                          <div className="text-sm text-gray-700 font-medium">
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
                                className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-100" : "bg-white"
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

                )}

                {/* Contact Info Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <textarea
                            value={contactInfo.address}
                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.facebook}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              socialMedia: { ...contactInfo.socialMedia, facebook: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.instagram}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.linkedin}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            YouTube
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.youtube}
                            onChange={(e) => setContactInfo({
                              ...contactInfo,
                              socialMedia: { ...contactInfo.socialMedia, youtube: e.target.value }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Corporate Training Tab */}
                {activeTab === 'corporate' && (
                  <div className="min-h-screen  ">
                    <div className="max-w-6xl mx-auto">
                      {/* Header Section */}
                      <div className="  ">

                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                          Corporate Training Programs
                        </h1>

                      </div>



                      {/* Training Programs Grid */}
                      <div className="grid gap-8 md:grid-cols-1 mb-12 ">
                        {corporateTraining.map((category, categoryIndex) => (
                          <div
                            key={category.id}
                            className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                          >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                              <div className="flex items-center space-x-4">

                                <span className=" text-white text-2xl opacity-90">  {categoryIndex + 1}</span>
                                <input
                                  type="text"
                                  value={category.title}
                                  onChange={(e) => {
                                    const updated = corporateTraining.map((cat) =>
                                      cat.id === category.id
                                        ? { ...cat, title: e.target.value }
                                        : cat
                                    );
                                    setCorporateTraining(updated);
                                  }}
                                  // className="relative w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-white placeholder-opacity-70 text-white"
                                  className="flex-1 bg-white/20 text-white placeholder-indigo-200 border border-white/30 rounded-lg px-4 py-2 text-xl font-semibold focus:outline-none focus:bg-white/30 focus:border-white transition-all"

                                  placeholder="Program Title"
                                />
                                <button
                                  onClick={() => removeProgram(category.id)}
                                  className="p-2 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                                  title="Remove Category"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 space-y-6">
                              {/* Description */}
                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">

                                  Program Description
                                </label>
                                <textarea
                                  value={category.description}
                                  onChange={(e) => {
                                    const updated = corporateTraining.map((cat) =>
                                      cat.id === category.id
                                        ? { ...cat, description: e.target.value }
                                        : cat
                                    );
                                    setCorporateTraining(updated);
                                  }}
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                                  placeholder="Describe the program objectives and outcomes..."
                                />
                              </div>

                              {/* Courses Section */}
                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                                  <GraduationCap className="w-4 h-4" />
                                  Modules ({category.courses.length})
                                </label>

                                <div className="space-y-3">
                                  {category.courses.map((course, index) => (
                                    <div
                                      key={index}
                                      className="group/course flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-200"
                                    >
                                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/course:bg-blue-200 transition-colors duration-200">
                                        <span className="text-sm font-semibold text-blue-700">{index + 1}</span>
                                      </div>
                                      <input
                                        type="text"
                                        value={course}
                                        onChange={(e) => updateCourse(category.id, index, e.target.value)}
                                        className="flex-1 px-4 py-2 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 bg-transparent hover:bg-white focus:bg-white"
                                        placeholder="Course title..."
                                      />
                                      <button
                                        onClick={() => removeCourse(category.id, index)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover/course:opacity-100"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>

                                <button
                                  onClick={() => addCourse(category.id)}
                                  className="mt-4 w-full py-3 px-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium flex items-center justify-center gap-2 group/add"
                                >
                                  <Plus className="w-4 h-4 group-hover/add:rotate-180 transition-transform duration-300" />
                                  Add Module
                                </button>
                              </div>

                              {/* Remove Program Button */}
                              {/* <div className="pt-4 border-t border-gray-100">
                                                                <button
                                                                    onClick={() => removeProgram(category.id)}
                                                                    className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium flex items-center justify-center gap-2 group/delete"
                                                                >
                                                                    <Trash2 className="w-4 h-4 group-hover/delete:animate-pulse" />
                                                                    Remove Training Program
                                                                </button>
                                                            </div> */}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Empty State */}
                      {
                        corporateTraining.length === 0 && (
                          <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                              <Building2 className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Training Programs Yet</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first corporate training program.</p>
                            <button
                              onClick={addProgram}
                              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
                            >
                              Create First Program
                            </button>
                          </div>
                        )
                      }

                      {/* Add Program Button */}
                      < div className="flex justify-center mb-10 " >
                        <button
                          onClick={addProgram}
                          className="w-full border-2 border-dashed border-blue-300 rounded-xl p-6 text-blue-600 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3 group/add"
                        >
                          <Plus className="w-8 h-8 font-bold  group-hover/add:rotate-180 transition-transform duration-300" />
                          <span className='font-bold text-xl'>  Add Training Program</span>

                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                  <div className="min-h-screen    ">
                    <div className="container max-w-6xl mx-auto ">
                      {/* Header */}
                      <div className="mb-6 text-center">
                        <div className="flex items-center    ">

                          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
                        </div>

                      </div>

                      {/* Course Sections */}
                      <div className="space-y-8 max-w-6xl mx-auto">
                        {courseSections.map((section, sectionIndex) => (
                          <div
                            key={section.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                          >
                            {/* Category Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                              <div className="flex items-center space-x-4">
                                <GripVertical className="w-5 h-5 text-indigo-200" />
                                {/* <Folder className="w-6 h-6 text-white" /> */}
                                <input
                                  type="text"
                                  value={section.category}
                                  onChange={(e) =>
                                    setCourseSections((prev) =>
                                      prev.map((sec) =>
                                        sec.id === section.id
                                          ? { ...sec, category: e.target.value }
                                          : sec
                                      )
                                    )
                                  }
                                  className="flex-1 bg-white/20 text-white placeholder-indigo-200 border border-white/30 rounded-lg px-4 py-2 text-xl font-semibold focus:outline-none focus:bg-white/30 focus:border-white transition-all"
                                  placeholder="Category Name"
                                />
                                <button
                                  onClick={() => removeCategory(section.id)}
                                  className="p-2 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                                  title="Remove Category"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {/* Subcategories */}
                            <div className="p-6 space-y-6">
                              {section.subcategories.map((sub, subIndex) => (
                                <div
                                  key={sub.id}
                                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all duration-200"
                                >
                                  {/* Subcategory Header */}
                                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <FolderOpen className="w-5 h-5 text-indigo-500" />
                                      <input
                                        type="text"
                                        value={sub.title}
                                        onChange={(e) =>
                                          setCourseSections((prev) =>
                                            prev.map((sec) =>
                                              sec.id === section.id
                                                ? {
                                                  ...sec,
                                                  subcategories: sec.subcategories.map((s) =>
                                                    s.id === sub.id
                                                      ? { ...s, title: e.target.value }
                                                      : s
                                                  )
                                                }
                                                : sec
                                            )
                                          )
                                        }
                                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Subcategory Title"
                                      />
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <input
                                          type="text"
                                          placeholder="Duration (e.g., 4 weeks)"
                                          value={sub.duration}
                                          onChange={(e) =>
                                            setCourseSections((prev) =>
                                              prev.map((sec) =>
                                                sec.id === section.id
                                                  ? {
                                                    ...sec,
                                                    subcategories: sec.subcategories.map((s) =>
                                                      s.id === sub.id
                                                        ? { ...s, duration: e.target.value }
                                                        : s
                                                    )
                                                  }
                                                  : sec
                                              )
                                            )
                                          }
                                          className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                      </div>
                                      <button
                                        onClick={() => removeSubcategory(section.id, sub.id)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                        title="Remove Subcategory"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Items */}
                                  <div className="p-4 space-y-3">
                                    {sub.items.map((item, itemIndex) => (
                                      <div
                                        key={item.id}
                                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                                      >
                                        <div className="flex items-start space-x-3">
                                          <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                          <div className="flex-1 space-y-3">
                                            <input
                                              type="text"
                                              placeholder="Item Name"
                                              value={item.name}
                                              onChange={(e) =>
                                                updateField(
                                                  section.id,
                                                  sub.id,
                                                  item.id,
                                                  "name",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                            <textarea
                                              placeholder="Item Description"
                                              value={item.description}
                                              onChange={(e) =>
                                                updateField(
                                                  section.id,
                                                  sub.id,
                                                  item.id,
                                                  "description",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                              rows={2}
                                            />
                                          </div>
                                          <button
                                            onClick={() => removeItem(section.id, sub.id, item.id)}
                                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                                            title="Remove Item"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}

                                    {/* Add Item Button */}
                                    <button
                                      onClick={() => addItem(section.id, sub.id)}
                                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                      <Plus className="w-5 h-5" />
                                      <span className="font-medium">Add Course Item</span>
                                    </button>
                                  </div>
                                </div>
                              ))}

                              {/* Add Subcategory Button */}
                              <button
                                onClick={() => addSubcategory(section.id)}
                                className="w-full border-2 border-dashed border-blue-300 rounded-xl p-6 text-blue-600 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3"
                              >
                                <Plus className="w-6 h-6" />
                                <span className="font-semibold text-lg">Add Subcategory</span>
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add Category Button */}
                        <button
                          onClick={addCategory}
                          className="w-full border-2 border-dashed border-purple-300 rounded-xl p-8 text-purple-600 hover:text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                        >
                          <Plus className="w-8 h-8" />
                          <span className="font-bold text-xl">Add New Category</span>
                        </button>
                      </div>
                    </div>
                  </div>

                )}

                {/* About Section Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit About Section</h2>

                    {/* Title */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Section Title
                      </label>
                      <input
                        className="border rounded-lg p-2 w-full"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="Enter section title"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        className="border rounded-lg p-2 w-full"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                      />
                    </div>

                    {/* Statistics Section */}

                    <div className="space-y-6">

                      <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>

                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-left">#</th>
                            <th className="border border-gray-300 p-2 text-left">Icon</th>
                            <th className="border border-gray-300 p-2 text-left">Number</th>
                            <th className="border border-gray-300 p-2 text-left">Label</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statistics.map((stat, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-2 font-bold">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.icon}
                                  onChange={(e) =>
                                    handleStatChange(index, "icon", e.target.value)
                                  }
                                  placeholder="Icon (Users, GraduationCap, Award, Star)"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.number}
                                  onChange={(e) =>
                                    handleStatChange(index, "number", e.target.value)
                                  }
                                  placeholder="Number (e.g. 10,000+)"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.label}
                                  onChange={(e) =>
                                    handleStatChange(index, "label", e.target.value)
                                  }
                                  placeholder="Label (e.g. Students Enrolled)"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Save Button */}
                    <div>
                      <button
                        onClick={SendandSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
                      >
                        Send & Save
                      </button>
                    </div>
                  </div>




                )}






              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}

export default AdminPanel;

