import React, { useState } from 'react'
import MainPage from './MainPage'
import AboutUs from './Pages/AboutUs'
import CooperateTrainingProgram from './Navbar/CooperateTrainingProgram'
import News from './Navbar/News'
import Courses from './Navbar/Courses'
import logo_image from '../assets/img/Logo.jpg'
import { Building, Mail, MapPin, Menu, Phone } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Navbar/Header'


const SchoolWebsite = () => {

    return (

        <div className='min-h-screen bg-white font-sans'>

            {/* Header */}
            <Header />

            <Outlet />

            {/* <MainPage /> */}

            {/* <AboutUs /> */}

            {/* <CooperateTrainingProgram /> */}

            {/* <News /> */}

            {/* <Courses /> */}

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Building className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Aayush Institute of Professional Studies</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Dedicated to providing quality education and nurturing future leaders through innovative teaching methods and comprehensive programs.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><NavLink to="AboutUs" className="hover:text-white transition-colors">About Us</NavLink></li>
                                <li><a href="#" className="hover:text-white transition-colors">Academic Programs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Faculty</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Alumni</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Student Life</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Campus Facilities</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Student Activities</a></li>
                                <li><NavLink to="/panel" className="hover:text-white transition-colors">Website Panel</NavLink></li>
                                <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cafeteria</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Plot No. 14, DLF Dilshad Extn. II (Near DLF Toll Plaza) Ghaziabad, Uttar Pradesh – 201011
                                </li>
                                <li className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    +91 0120 2611111
                                </li>
                                <li className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    aayush.aips@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Aayush Institute of Professional Studies. All rights reserved.</p>
                    </div>
                </div>
            </footer>


        </div>
    )
}

export default SchoolWebsite