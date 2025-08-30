import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Users,
    Award,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Star,
    GraduationCap,
    Building,
    Microscope
} from 'lucide-react'




const heroImages = [
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

]


const heroContent = [
    {
        title: "Nurturing Tomorrow's Leaders",
        subtitle: "Providing quality education with modern facilities and experienced faculty"
    },
    {
        title: "Excellence in Professional Education",
        subtitle: "Empowering students with industry-relevant skills and knowledge for successful careers"
    },
    {
        title: "Building Bright Futures Together",
        subtitle: "Creating an environment where innovation meets tradition in professional learning"
    }
]


const newsItems = [
    {
        id: 1,
        title: "Annual Science Fair 2025",
        date: "March 15, 2025",
        summary: "Students showcase innovative projects in our biggest science fair yet.",
        image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
        id: 2,
        title: "New Computer Lab Opening",
        date: "February 28, 2025",
        summary: "State-of-the-art computer lab with latest technology now available.",
        image: "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
        id: 3,
        title: "Sports Day Championship",
        date: "April 10, 2025",
        summary: "Inter-house sports competition featuring various athletic events.",
        image: "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    }
]


const programs = [
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Primary Education",
        description: "Grades 1-5 with focus on foundational learning and creativity",
        features: ["Interactive Learning", "Creative Arts", "Basic Sciences"]
    },
    {
        icon: <Microscope className="w-8 h-8" />,
        title: "Secondary Education",
        description: "Grades 6-10 with comprehensive curriculum and skill development",
        features: ["Advanced Sciences", "Mathematics", "Language Arts"]
    },
    {
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Senior Secondary",
        description: "Grades 11-12 with specialized streams and career preparation",
        features: ["Science Stream", "Commerce Stream", "Arts Stream"]
    }
]


export default function MainPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }

    return (
        <div className="min-h-screen bg-white font-sans">



            {/* Hero Section with Image Slider */}
            <section id="home" className="relative">
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`School campus ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                    ))}

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                {heroContent[currentSlide].title}
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 opacity-90">
                                {heroContent[currentSlide].subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                                    Explore Programs
                                </button>
                                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full font-semibold transition-colors">
                                    Schedule Visit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Institute</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            For over 40 years, Aayush Institute of Professional Studies has been committed to providing exceptional education that prepares students for success in an ever-changing world.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
                            <p className="text-gray-600">Students Enrolled</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">100+</h3>
                            <p className="text-gray-600">Qualified Teachers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">22+</h3>
                            <p className="text-gray-600">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Academic Programs</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive educational programs designed to foster intellectual growth and personal development at every stage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {programs.map((program, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-blue-600">
                                    {program.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{program.title}</h3>
                                <p className="text-gray-600 mb-6">{program.description}</p>
                                <ul className="space-y-2">
                                    {program.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-gray-700">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News & Events Section */}
            <section id="news" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">News & Events</h2>
                        <p className="text-xl text-gray-600">Stay updated with the latest happenings at our school</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {newsItems.map((item) => (
                            <article key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center text-blue-600 text-sm mb-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {item.date}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.summary}</p>
                                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                        Read More →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                        <p className="text-xl text-gray-600">We'd love to hear from you. Contact us for admissions or any queries.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                                    <p className="text-gray-600">Plot No. 14, DLF Dilshad Extn. II (Near DLF Toll Plaza) Ghaziabad, Uttar Pradesh – 201011</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                                    <p className="text-gray-600">+91 0120 2611111</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                                    <p className="text-gray-600">aayush.aips@gmail.com</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-sky-500 p-3 rounded-full text-white hover:bg-sky-600 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-pink-600 p-3 rounded-full text-white hover:bg-pink-700 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}