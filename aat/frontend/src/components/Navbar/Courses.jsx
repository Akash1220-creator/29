import React, { useState } from 'react';
import {
    Clock,
    Award,
    BookOpen,
    GraduationCap,
    Monitor,
    Palette,
    Calculator,
    Globe,
    Shield,
    Code,
    Smartphone,
    Settings,
    Users,
    ChevronRight,
    Star,
    Calendar,
    X,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const Courses = () => {
    const [activeCategory, setActiveCategory] = useState('professional');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const professionalCourses = [
        {
            title: "Term Certificate Courses",
            duration: "1–2 Months",
            description: "Quick skill-building courses for immediate career enhancement",
            color: "bg-blue-50 ",
            courses: [
                {
                    name: "MS Office Basics",
                    icon: <Monitor className="w-5 h-5" />,
                    popular: true,
                    details: "Master Microsoft Office suite including Word, Excel, and PowerPoint. Learn document formatting, spreadsheet calculations, data analysis, and professional presentation creation. Perfect for office professionals and students.",
                    features: ["Word Processing", "Excel Formulas", "PowerPoint Design", "Data Management"],
                    duration: "4-6 weeks",
                    certification: "Microsoft Office Specialist Preparation"
                },
                {
                    name: "Tally Prime Basics",
                    icon: <Calculator className="w-5 h-5" />,
                    details: "Learn accounting fundamentals with Tally Prime software. Cover voucher entry, ledger management, financial statements, and GST compliance. Essential for accounting and finance roles.",
                    features: ["Voucher Entry", "Ledger Management", "GST Returns", "Financial Reports"],
                    duration: "3-4 weeks",
                    certification: "Tally Certified Professional"
                },
                {
                    name: "Typing & Data Entry",
                    icon: <BookOpen className="w-5 h-5" />,
                    details: "Develop fast and accurate typing skills with proper finger positioning. Learn data entry techniques, accuracy improvement methods, and professional formatting standards.",
                    features: ["Touch Typing", "Speed Building", "Accuracy Training", "Professional Formatting"],
                    duration: "2-3 weeks",
                    certification: "Data Entry Specialist Certificate"
                },
                {
                    name: "Photoshop for Beginners",
                    icon: <Palette className="w-5 h-5" />,
                    popular: true,
                    details: "Introduction to Adobe Photoshop for image editing and graphic design. Learn layers, filters, color correction, and basic design principles for creating professional graphics.",
                    features: ["Image Editing", "Layer Management", "Color Correction", "Basic Design"],
                    duration: "4-5 weeks",
                    certification: "Adobe Certified Associate Preparation"
                },
                {
                    name: "Basic Video Editing",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Learn video editing fundamentals using industry-standard software. Cover cutting, transitions, audio editing, and basic effects to create professional video content.",
                    features: ["Video Cutting", "Transitions", "Audio Editing", "Basic Effects"],
                    duration: "3-4 weeks",
                    certification: "Video Editing Fundamentals"
                },
                {
                    name: "Social Media for Business",
                    icon: <Globe className="w-5 h-5" />,
                    details: "Master social media marketing strategies for business growth. Learn content creation, audience engagement, analytics, and platform-specific best practices.",
                    features: ["Content Strategy", "Audience Engagement", "Analytics", "Platform Management"],
                    duration: "2-3 weeks",
                    certification: "Social Media Marketing Certificate"
                },
                {
                    name: "HTML & CSS Basics",
                    icon: <Code className="w-5 h-5" />,
                    details: "Foundation course in web development covering HTML structure and CSS styling. Learn to create responsive web pages with modern design principles.",
                    features: ["HTML Structure", "CSS Styling", "Responsive Design", "Web Standards"],
                    duration: "4-5 weeks",
                    certification: "Web Development Fundamentals"
                },
                {
                    name: "Soft Skills & Interview Preparation",
                    icon: <Users className="w-5 h-5" />,
                    details: "Develop essential soft skills including communication, teamwork, and leadership. Comprehensive interview preparation with mock sessions and feedback.",
                    features: ["Communication Skills", "Interview Techniques", "Resume Writing", "Confidence Building"],
                    duration: "3-4 weeks",
                    certification: "Professional Skills Certificate"
                },
                {
                    name: "Internet & Email Handling",
                    icon: <Globe className="w-5 h-5" />,
                    details: "Master internet navigation, email management, and online safety. Learn efficient browsing techniques, email etiquette, and digital security practices.",
                    features: ["Internet Navigation", "Email Management", "Online Safety", "Digital Etiquette"],
                    duration: "2-3 weeks",
                    certification: "Digital Literacy Certificate"
                },
                {
                    name: "Basic Computer Fundamentals",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Complete introduction to computer systems, operating systems, and basic software applications. Perfect for beginners starting their digital journey.",
                    features: ["Computer Basics", "Operating Systems", "File Management", "Software Applications"],
                    duration: "3-4 weeks",
                    certification: "Computer Fundamentals Certificate"
                }
            ]
        },
        {
            title: "Certificate Courses",
            duration: "6 Months",
            description: "Comprehensive programs for professional skill development",
            color: "bg-emerald-50  ",
            courses: [
                {
                    name: "Advanced Office Management (with Tally)",
                    icon: <Monitor className="w-5 h-5" />,
                    popular: true,
                    details: "Comprehensive office management training combining administrative skills with Tally accounting. Learn office procedures, communication, and financial management for modern workplaces.",
                    features: ["Office Administration", "Tally Integration", "Communication Skills", "Financial Management"],
                    duration: "24 weeks",
                    certification: "Advanced Office Management Professional"
                },
                {
                    name: "Advanced Graphic Designing",
                    icon: <Palette className="w-5 h-5" />,
                    details: "Professional graphic design course covering Adobe Creative Suite, design principles, branding, and portfolio development. Create stunning visual communications for print and digital media.",
                    features: ["Adobe Creative Suite", "Design Principles", "Branding", "Portfolio Development"],
                    duration: "24 weeks",
                    certification: "Professional Graphic Designer"
                },
                {
                    name: "Advanced Tally & GST Accounting",
                    icon: <Calculator className="w-5 h-5" />,
                    details: "Master advanced Tally features including inventory management, payroll, GST compliance, and financial reporting. Become proficient in complete business accounting solutions.",
                    features: ["Inventory Management", "Payroll Processing", "GST Compliance", "Financial Reporting"],
                    duration: "24 weeks",
                    certification: "Tally Expert Professional"
                },
                {
                    name: "Web Designing Fundamentals",
                    icon: <Code className="w-5 h-5" />,
                    popular: true,
                    details: "Complete web design course covering HTML, CSS, JavaScript, and responsive design. Learn to create modern, user-friendly websites with industry best practices.",
                    features: ["HTML/CSS/JavaScript", "Responsive Design", "UI/UX Principles", "Modern Frameworks"],
                    duration: "24 weeks",
                    certification: "Professional Web Designer"
                },
                {
                    name: "E-Commerce Website Management",
                    icon: <Globe className="w-5 h-5" />,
                    details: "Learn to manage and optimize e-commerce platforms. Cover product management, payment gateways, inventory systems, and digital marketing for online stores.",
                    features: ["Platform Management", "Payment Integration", "Inventory Systems", "Digital Marketing"],
                    duration: "24 weeks",
                    certification: "E-Commerce Management Specialist"
                },
                {
                    name: "Computer Hardware & Networking (Basic)",
                    icon: <Settings className="w-5 h-5" />,
                    details: "Fundamental course in computer hardware assembly, troubleshooting, and basic networking. Learn system maintenance, component identification, and network setup.",
                    features: ["Hardware Assembly", "Troubleshooting", "Network Setup", "System Maintenance"],
                    duration: "24 weeks",
                    certification: "Hardware & Networking Technician"
                },
                {
                    name: "Cyber Security Fundamentals",
                    icon: <Shield className="w-5 h-5" />,
                    details: "Introduction to cybersecurity concepts, threat identification, and protection strategies. Learn security protocols, risk assessment, and incident response procedures.",
                    features: ["Threat Identification", "Security Protocols", "Risk Assessment", "Incident Response"],
                    duration: "24 weeks",
                    certification: "Cybersecurity Fundamentals"
                },
                {
                    name: "Computerized Financial Accounting (Tally + GST)",
                    icon: <Calculator className="w-5 h-5" />,
                    details: "Comprehensive accounting course combining traditional principles with modern Tally software and GST compliance. Perfect for accounting professionals and business owners.",
                    features: ["Accounting Principles", "Tally Mastery", "GST Compliance", "Financial Analysis"],
                    duration: "24 weeks",
                    certification: "Computerized Accounting Professional"
                },
                {
                    name: "Professional Data Entry & Typing Mastery",
                    icon: <BookOpen className="w-5 h-5" />,
                    details: "Advanced data entry and typing course focusing on speed, accuracy, and professional standards. Learn specialized software and industry-specific data handling techniques.",
                    features: ["Advanced Typing", "Data Accuracy", "Specialized Software", "Quality Control"],
                    duration: "24 weeks",
                    certification: "Professional Data Entry Specialist"
                }
            ]
        },
        {
            title: "Advanced Diploma Courses",
            duration: "1 Year",
            description: "Intensive programs for career specialization and advancement",
            color: "bg-orange-50 ",
            courses: [
                {
                    name: "Advanced Diploma in Office Management",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Comprehensive office management program covering administrative excellence, team leadership, project management, and modern office technologies. Prepare for senior administrative roles.",
                    features: ["Administrative Excellence", "Team Leadership", "Project Management", "Office Technologies"],
                    duration: "52 weeks",
                    certification: "Advanced Office Management Diploma"
                },
                {
                    name: "Advanced Diploma in Web Designing & Development",
                    icon: <Code className="w-5 h-5" />,
                    popular: true,
                    details: "Complete web development program covering front-end and back-end technologies. Master modern frameworks, databases, and deployment strategies for professional web development.",
                    features: ["Full-Stack Development", "Modern Frameworks", "Database Management", "Deployment Strategies"],
                    duration: "52 weeks",
                    certification: "Advanced Web Development Diploma"
                },
                {
                    name: "Advanced Diploma in Digital Marketing",
                    icon: <Globe className="w-5 h-5" />,
                    popular: true,
                    details: "Comprehensive digital marketing program covering SEO, SEM, social media marketing, content strategy, and analytics. Become a certified digital marketing professional.",
                    features: ["SEO/SEM", "Social Media Marketing", "Content Strategy", "Analytics & ROI"],
                    duration: "52 weeks",
                    certification: "Advanced Digital Marketing Diploma"
                },
                {
                    name: "Advanced Diploma in Full Stack Web Development",
                    icon: <Code className="w-5 h-5" />,
                    details: "Intensive full-stack development program covering modern JavaScript frameworks, server technologies, databases, and cloud deployment. Build complete web applications.",
                    features: ["JavaScript Frameworks", "Server Technologies", "Database Design", "Cloud Deployment"],
                    duration: "52 weeks",
                    certification: "Full Stack Developer Diploma"
                },
                {
                    name: "Advanced Diploma in Video Editing & Motion Graphics (Pro)",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Professional video editing and motion graphics course using industry-standard software. Learn advanced techniques for film, television, and digital media production.",
                    features: ["Professional Editing", "Motion Graphics", "Color Grading", "Audio Post-Production"],
                    duration: "52 weeks",
                    certification: "Professional Video Editor Diploma"
                },
                {
                    name: "Advanced Diploma in Industrial Designing",
                    icon: <Palette className="w-5 h-5" />,
                    details: "Comprehensive industrial design program covering product design, 3D modeling, prototyping, and manufacturing processes. Develop skills for modern product development.",
                    features: ["Product Design", "3D Modeling", "Prototyping", "Manufacturing Processes"],
                    duration: "52 weeks",
                    certification: "Industrial Design Professional Diploma"
                },
                {
                    name: "Advanced Diploma in Mobile App UI (Figma & Flutter)",
                    icon: <Smartphone className="w-5 h-5" />,
                    details: "Specialized mobile app design and development course focusing on UI/UX design with Figma and app development with Flutter. Create professional mobile applications.",
                    features: ["UI/UX Design", "Figma Mastery", "Flutter Development", "App Store Deployment"],
                    duration: "52 weeks",
                    certification: "Mobile App Development Diploma"
                },
                {
                    name: "Advanced Diploma in Computer Hardware & Networking (Advanced)",
                    icon: <Settings className="w-5 h-5" />,
                    details: "Advanced hardware and networking program covering server management, network security, cloud infrastructure, and enterprise-level system administration.",
                    features: ["Server Management", "Network Security", "Cloud Infrastructure", "System Administration"],
                    duration: "52 weeks",
                    certification: "Advanced Hardware & Networking Diploma"
                },
                {
                    name: "Advanced Diploma in UI/UX Design & Prototyping",
                    icon: <Palette className="w-5 h-5" />,
                    details: "Comprehensive UI/UX design program covering user research, wireframing, prototyping, and usability testing. Master modern design tools and methodologies.",
                    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
                    duration: "52 weeks",
                    certification: "UI/UX Design Professional Diploma"
                },
                {
                    name: "Professional Diploma in Digital Office Administration",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Modern office administration program integrating digital tools, cloud technologies, and advanced communication systems. Prepare for digital-first office environments.",
                    features: ["Digital Tools", "Cloud Technologies", "Advanced Communication", "Process Automation"],
                    duration: "52 weeks",
                    certification: "Digital Office Administration Diploma"
                }
            ]
        }
    ];

    const universityCourses = [
        {
            title: "Distance Learning Courses",
            duration: "2-3 Years",
            description: "Flexible university degrees with distance learning support",
            color: "bg-purple-50  ",
            courses: [
                {
                    name: "BCA / MCA",
                    icon: <GraduationCap className="w-5 h-5" />,
                    popular: true,
                    details: "Bachelor's and Master's in Computer Applications with comprehensive programming and software development curriculum. Includes hands-on experience with latest technologies and industry projects.",
                    features: ["Programming Languages", "Software Development", "Database Management", "Web Technologies"],
                    duration: "3-5 years",
                    certification: "University Degree"
                },
                {
                    name: "BBA / MBA",
                    icon: <GraduationCap className="w-5 h-5" />,
                    popular: true,
                    details: "Business Administration programs focusing on management, leadership, and entrepreneurship skills. Covers finance, marketing, operations, and strategic management.",
                    features: ["Management Principles", "Leadership Skills", "Strategic Planning", "Business Analytics"],
                    duration: "3-5 years",
                    certification: "University Degree"
                },
                {
                    name: "BA / MA",
                    icon: <GraduationCap className="w-5 h-5" />,
                    details: "Liberal arts education with specializations in various subjects including literature, history, psychology, and social sciences. Develops critical thinking and analytical skills.",
                    features: ["Liberal Arts", "Critical Thinking", "Research Methods", "Communication Skills"],
                    duration: "3-5 years",
                    certification: "University Degree"
                },
                {
                    name: "B.Com / M.Com",
                    icon: <GraduationCap className="w-5 h-5" />,
                    details: "Commerce programs covering accounting, finance, taxation, and business law. Prepares students for careers in banking, finance, and corporate sectors.",
                    features: ["Accounting Principles", "Financial Management", "Taxation", "Business Law"],
                    duration: "3-5 years",
                    certification: "University Degree"
                }
            ]
        },
        {
            title: "Online Regular Courses",
            duration: "3-4 Years",
            description: "Regular university programs delivered online",
            color: "bg-indigo-50  ",
            courses: [
                {
                    name: "Online B.A. / B.Com / BBA",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Fully online degree programs with interactive virtual classrooms, digital resources, and flexible scheduling. Same curriculum as on-campus programs.",
                    features: ["Virtual Classrooms", "Digital Resources", "Flexible Scheduling", "Interactive Learning"],
                    duration: "3-4 years",
                    certification: "University Degree"
                },
                {
                    name: "Online Diploma in IT / HR / Marketing",
                    icon: <Award className="w-5 h-5" />,
                    details: "Specialized diploma courses in high-demand fields with practical training and industry-relevant curriculum. Includes internship opportunities.",
                    features: ["Practical Training", "Industry Curriculum", "Internship Opportunities", "Career Support"],
                    duration: "1-2 years",
                    certification: "University Diploma"
                },
                {
                    name: "Certificate Courses via LMS Access",
                    icon: <BookOpen className="w-5 h-5" />,
                    details: "Short-term certificate programs delivered through Learning Management System with 24/7 access to course materials and expert faculty support.",
                    features: ["24/7 Access", "Expert Faculty", "Interactive Content", "Progress Tracking"],
                    duration: "3-12 months",
                    certification: "University Certificate"
                }
            ]
        },
        {
            title: "B.Voc Courses (NSQF-Aligned)",
            duration: "3 Years",
            description: "Skill-based vocational courses with industry alignment",
            color: "bg-teal-50  ",
            courses: [
                {
                    name: "Retail Management",
                    icon: <Users className="w-5 h-5" />,
                    details: "Comprehensive retail operations training including customer service, inventory management, sales strategies, and retail technology systems.",
                    features: ["Customer Service", "Inventory Management", "Sales Strategies", "Retail Technology"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "Hospitality & Hotel Management",
                    icon: <Users className="w-5 h-5" />,
                    popular: true,
                    details: "Hotel operations, food service management, event planning, and customer relations in the hospitality industry with practical internships.",
                    features: ["Hotel Operations", "Food Service", "Event Planning", "Customer Relations"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "Beauty & Wellness",
                    icon: <Palette className="w-5 h-5" />,
                    details: "Beauty therapy, wellness treatments, salon management, and entrepreneurship in the beauty industry with hands-on training.",
                    features: ["Beauty Therapy", "Wellness Treatments", "Salon Management", "Entrepreneurship"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "Electrical / Technician Courses",
                    icon: <Settings className="w-5 h-5" />,
                    details: "Electrical installations, maintenance, safety protocols, and modern electrical systems with practical workshop sessions.",
                    features: ["Electrical Installations", "Maintenance", "Safety Protocols", "Modern Systems"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "COPA (Computer Operator & Programming Assistant)",
                    icon: <Monitor className="w-5 h-5" />,
                    details: "Computer operations, basic programming, data entry, and office automation with certification preparation.",
                    features: ["Computer Operations", "Basic Programming", "Data Entry", "Office Automation"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "Fashion Designing",
                    icon: <Palette className="w-5 h-5" />,
                    details: "Fashion design principles, garment construction, textile knowledge, and fashion business with portfolio development.",
                    features: ["Design Principles", "Garment Construction", "Textile Knowledge", "Fashion Business"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                },
                {
                    name: "Mobile Repairing",
                    icon: <Smartphone className="w-5 h-5" />,
                    details: "Mobile device troubleshooting, hardware repairs, software solutions, and entrepreneurship in mobile repair business.",
                    features: ["Device Troubleshooting", "Hardware Repairs", "Software Solutions", "Business Skills"],
                    duration: "3 years",
                    certification: "B.Voc Degree"
                }
            ]
        }
    ];

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const CourseCard = ({ course, sectionColor }) => (
        <div className={`${sectionColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                        {course.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {course.name}
                    </h4>
                </div>
                {course.popular && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                    </span>
                )}
            </div>

            <div className="flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.details}
                </p>
                {course.features && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {course.features.slice(0, 2).map((feature, index) => (
                                <span key={index} className="px-2 py-1   bg-opacity-100 text-xs text-gray-600 rounded-full">
                                    {feature}
                                </span>
                            ))}
                            {course.features.length > 2 && (
                                <span className="px-2 py-1  bg-opacity-60 text-xs text-gray-600 rounded-full">
                                    +{course.features.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => openModal(course)}
                className="flex items-center justify-between w-full pt-4 border-t border-gray-200 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
                <span>Read More</span>
                <div className="flex items-center space-x-1">
                    <ChevronRight className="w-4 h-4" />
                </div>
            </button>
        </div>
    );

    const SectionCard = ({ section, sectionIndex }) => (
        <div className="mb-12">
            {/* Section Header */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-medium">{section.duration}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-lg">{section.description}</p>


            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.courses.map((course, courseIndex) => (
                    <CourseCard
                        key={courseIndex}
                        course={course}
                        sectionColor={section.color}
                    />
                ))}
            </div>
        </div>
    );

    // Modal Component
    const CourseModal = () => {
        if (!isModalOpen || !selectedCourse) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="text-blue-600">
                                    {selectedCourse.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h3>
                                {selectedCourse.popular && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center">
                                        <Star className="w-3 h-3 mr-1" />
                                        Popular
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Course Overview</h4>
                            <p className="text-gray-600 leading-relaxed">{selectedCourse.details}</p>
                        </div>

                        {selectedCourse.features && (
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedCourse.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {selectedCourse.duration && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        <h5 className="font-semibold text-gray-900">Duration</h5>
                                    </div>
                                    <p className="text-gray-700">{selectedCourse.duration}</p>
                                </div>
                            )}

                            {selectedCourse.certification && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Award className="w-5 h-5 text-green-600" />
                                        <h5 className="font-semibold text-gray-900">Certification</h5>
                                    </div>
                                    <p className="text-gray-700">{selectedCourse.certification}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Enroll Now
                            </button>
                            <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Download Syllabus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Transform Your Career with Our
                            <span className="block text-blue-300">
                                Professional Courses
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Choose from our comprehensive range of professional and university courses
                            designed to enhance your skills and advance your career in today's competitive market.
                        </p>
                        <div className="flex items-center justify-center space-x-8 text-sm">
                            <div className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-yellow-400" />
                                <span>Industry-Recognized Certificates</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-green-400" />
                                <span>Expert Instructors</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <span>Flexible Scheduling</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setActiveCategory('professional')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === 'professional'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Professional Courses
                        </button>
                        <button
                            onClick={() => setActiveCategory('university')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === 'university'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            University Courses
                        </button>
                    </div>
                </div>

                {/* Course Sections */}
                <div className="grid gap-8 lg:gap-12">
                    {activeCategory === 'professional' && (
                        <div className="space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Courses</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Build practical skills with our hands-on professional courses, from basic computer skills to advanced specializations.
                                </p>
                            </div>
                            {professionalCourses.map((section, index) => (
                                <SectionCard key={index} section={section} sectionIndex={index} />
                            ))}
                        </div>
                    )}

                    {activeCategory === 'university' && (
                        <div className="space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">University Courses</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Pursue higher education with our flexible university programs, available through distance learning and online platforms.
                                </p>
                            </div>
                            {universityCourses.map((section, index) => (
                                <SectionCard key={index} section={section} sectionIndex={index} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Join thousands of students who have transformed their careers with our comprehensive courses.
                        Get personalized guidance and flexible learning options.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                            Get Free Consultation
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <CourseModal />
        </div>
    );
};

export default Courses;





























// import React, { useState } from 'react';
// import {
//     Clock,
//     Award,
//     BookOpen,
//     GraduationCap,
//     Monitor,
//     Palette,
//     Calculator,
//     Globe,
//     Shield,
//     Code,
//     Smartphone,
//     Settings,
//     Users,
//     ChevronRight,
//     Star,
//     Calendar
// } from 'lucide-react';

// const Courses = () => {
//     const [activeCategory, setActiveCategory] = useState('professional');

//     const professionalCourses = [
//         {
//             title: "Term Certificate Courses",
//             duration: "1–2 Months",
//             description: "Quick skill-building courses for immediate career enhancement",
//             color: "bg-blue-50 border-blue-200",
//             courses: [
//                 { name: "MS Office Basics", icon: <Monitor className="w-5 h-5" />, popular: true },
//                 { name: "Tally Prime Basics", icon: <Calculator className="w-5 h-5" /> },
//                 { name: "Typing & Data Entry", icon: <BookOpen className="w-5 h-5" /> },
//                 { name: "Photoshop for Beginners", icon: <Palette className="w-5 h-5" />, popular: true },
//                 { name: "Basic Video Editing", icon: <Monitor className="w-5 h-5" /> },
//                 { name: "Social Media for Business", icon: <Globe className="w-5 h-5" /> },
//                 { name: "HTML & CSS Basics", icon: <Code className="w-5 h-5" /> },
//                 { name: "Soft Skills & Interview Preparation", icon: <Users className="w-5 h-5" /> },
//                 { name: "Internet & Email Handling", icon: <Globe className="w-5 h-5" /> },
//                 { name: "Basic Computer Fundamentals", icon: <Monitor className="w-5 h-5" /> }
//             ]
//         },
//         {
//             title: "Certificate Courses",
//             duration: "6 Months",
//             description: "Comprehensive programs for professional skill development",
//             color: "bg-emerald-50 border-emerald-200",
//             courses: [
//                 { name: "Advanced Office Management (with Tally)", icon: <Monitor className="w-5 h-5" />, popular: true },
//                 { name: "Advanced Graphic Designing", icon: <Palette className="w-5 h-5" /> },
//                 { name: "Advanced Tally & GST Accounting", icon: <Calculator className="w-5 h-5" /> },
//                 { name: "Web Designing Fundamentals", icon: <Code className="w-5 h-5" />, popular: true },
//                 { name: "E-Commerce Website Management", icon: <Globe className="w-5 h-5" /> },
//                 { name: "Computer Hardware & Networking (Basic)", icon: <Settings className="w-5 h-5" /> },
//                 { name: "Cyber Security Fundamentals", icon: <Shield className="w-5 h-5" /> },
//                 { name: "Computerized Financial Accounting (Tally + GST)", icon: <Calculator className="w-5 h-5" /> },
//                 { name: "Professional Data Entry & Typing Mastery", icon: <BookOpen className="w-5 h-5" /> }
//             ]
//         },
//         {
//             title: "Advanced Diploma Courses",
//             duration: "1 Year",
//             description: "Intensive programs for career specialization and advancement",
//             color: "bg-orange-50 border-orange-200",
//             courses: [
//                 { name: "Advanced Diploma in Office Management", icon: <Monitor className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in Web Designing & Development", icon: <Code className="w-5 h-5" />, popular: true },
//                 { name: "Advanced Diploma in Digital Marketing", icon: <Globe className="w-5 h-5" />, popular: true },
//                 { name: "Advanced Diploma in Full Stack Web Development", icon: <Code className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in Video Editing & Motion Graphics (Pro)", icon: <Monitor className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in Industrial Designing", icon: <Palette className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in Mobile App UI (Figma & Flutter)", icon: <Smartphone className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in Computer Hardware & Networking (Advanced)", icon: <Settings className="w-5 h-5" /> },
//                 { name: "Advanced Diploma in UI/UX Design & Prototyping", icon: <Palette className="w-5 h-5" /> },
//                 { name: "Professional Diploma in Digital Office Administration", icon: <Monitor className="w-5 h-5" /> }
//             ]
//         }
//     ];

//     const universityCourses = [
//         {
//             title: "Distance Learning Courses",
//             duration: "2-3 Years",
//             description: "Flexible university degrees with distance learning support",
//             color: "bg-purple-50 border-purple-200",
//             courses: [
//                 { name: "BCA / MCA", icon: <GraduationCap className="w-5 h-5" />, popular: true },
//                 { name: "BBA / MBA", icon: <GraduationCap className="w-5 h-5" />, popular: true },
//                 { name: "BA / MA", icon: <GraduationCap className="w-5 h-5" /> },
//                 { name: "B.Com / M.Com", icon: <GraduationCap className="w-5 h-5" /> }
//             ]
//         },
//         {
//             title: "Online Regular Courses",
//             duration: "3-4 Years",
//             description: "Regular university programs delivered online",
//             color: "bg-indigo-50 border-indigo-200",
//             courses: [
//                 { name: "Online B.A. / B.Com / BBA", icon: <Monitor className="w-5 h-5" /> },
//                 { name: "Online Diploma in IT / HR / Marketing", icon: <Award className="w-5 h-5" /> },
//                 { name: "Certificate Courses via LMS Access", icon: <BookOpen className="w-5 h-5" /> }
//             ]
//         },
//         {
//             title: "B.Voc Courses (NSQF-Aligned)",
//             duration: "3 Years",
//             description: "Skill-based vocational courses with industry alignment",
//             color: "bg-teal-50 border-teal-200",
//             courses: [
//                 { name: "Retail Management", icon: <Users className="w-5 h-5" /> },
//                 { name: "Hospitality & Hotel Management", icon: <Users className="w-5 h-5" />, popular: true },
//                 { name: "Beauty & Wellness", icon: <Palette className="w-5 h-5" /> },
//                 { name: "Electrical / Technician Courses", icon: <Settings className="w-5 h-5" /> },
//                 { name: "COPA (Computer Operator & Programming Assistant)", icon: <Monitor className="w-5 h-5" /> },
//                 { name: "Fashion Designing", icon: <Palette className="w-5 h-5" /> },
//                 { name: "Mobile Repairing", icon: <Smartphone className="w-5 h-5" /> }
//             ]
//         }
//     ];

//     const CourseCard = ({ course, sectionColor }) => (
//         <div className={`${sectionColor} p-4 rounded-lg border-2 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group`}>
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                     <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
//                         {course.icon}
//                     </div>
//                     <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
//                         {course.name}
//                     </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     {course.popular && (
//                         <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center">
//                             <Star className="w-3 h-3 mr-1" />
//                             Popular
//                         </span>
//                     )}
//                     <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
//                 </div>
//             </div>
//         </div>
//     );

//     const SectionCard = ({ section }) => (
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
//             <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
//                     <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
//                         <Clock className="w-4 h-4" />
//                         <span className="text-sm font-medium">{section.duration}</span>
//                     </div>
//                 </div>
//                 <p className="text-gray-600 text-sm">{section.description}</p>
//             </div>
//             <div className="p-6">
//                 <div className="grid gap-3">
//                     {section.courses.map((course, index) => (
//                         <CourseCard key={index} course={course} sectionColor={section.color} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//             {/* Hero Section */}
//             <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//                     <div className="text-center">
//                         <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//                             Transform Your Career with Our
//                             <span className="block text-blue-300" >
//                                 Professional Courses
//                             </span>
//                         </h1>
//                         <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
//                             Choose from our comprehensive range of professional and university courses
//                             designed to enhance your skills and advance your career in today's competitive market.
//                         </p>
//                         <div className="flex items-center justify-center space-x-8 text-sm">
//                             <div className="flex items-center space-x-2">
//                                 <Award className="w-5 h-5 text-yellow-400" />
//                                 <span>Industry-Recognized Certificates</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Users className="w-5 h-5 text-green-400" />
//                                 <span>Expert Instructors</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Calendar className="w-5 h-5 text-blue-400" />
//                                 <span>Flexible Scheduling</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Category Tabs */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="flex justify-center mb-8">
//                     <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
//                         <button
//                             onClick={() => setActiveCategory('professional')}
//                             className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === 'professional'
//                                 ? 'bg-blue-600 text-white shadow-md'
//                                 : 'text-gray-600 hover:text-blue-600'
//                                 }`}
//                         >
//                             Professional Courses
//                         </button>
//                         <button
//                             onClick={() => setActiveCategory('university')}
//                             className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === 'university'
//                                 ? 'bg-blue-600 text-white shadow-md'
//                                 : 'text-gray-600 hover:text-blue-600'
//                                 }`}
//                         >
//                             University Courses
//                         </button>
//                     </div>
//                 </div>

//                 {/* Course Sections */}
//                 <div className="grid gap-8 lg:gap-12">
//                     {activeCategory === 'professional' && (
//                         <div className="space-y-8">
//                             <div className="text-center mb-12">
//                                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Courses</h2>
//                                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                                     Build practical skills with our hands-on professional courses, from basic computer skills to advanced specializations.
//                                 </p>
//                             </div>
//                             {professionalCourses.map((section, index) => (
//                                 <SectionCard key={index} section={section} />
//                             ))}
//                         </div>
//                     )}

//                     {activeCategory === 'university' && (
//                         <div className="space-y-8">
//                             <div className="text-center mb-12">
//                                 <h2 className="text-3xl font-bold text-gray-900 mb-4">University Courses</h2>
//                                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                                     Pursue higher education with our flexible university programs, available through distance learning and online platforms.
//                                 </p>
//                             </div>
//                             {universityCourses.map((section, index) => (
//                                 <SectionCard key={index} section={section} />
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Call to Action */}
//                 <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
//                     <h3 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
//                     <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
//                         Join thousands of students who have transformed their careers with our comprehensive courses.
//                         Get personalized guidance and flexible learning options.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
//                             Get Free Consultation
//                         </button>
//                         <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
//                             Download Brochure
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Courses;