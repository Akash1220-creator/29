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

   // State to manage the starting index of the currently displayed group of testimonials
  const [currentIndex, setCurrentIndex] = useState(0);

  // Testimonial data array
  const testimonials = [
    {
      name: 'Jane Doe',
      title: 'Marketing Director',
      quote: 'This service exceeded all my expectations. The results were fantastic, and the process was seamless from start to finish.',
      image: 'https://placehold.co/120x120/4338CA/FFFFFF?text=JD',
    },
    {
      name: 'John Smith',
      title: 'Founder & CEO',
      quote: 'A truly game-changing solution for our business. The support team was incredibly responsive and helpful.',
      image: 'https://placehold.co/120x120/A855F7/FFFFFF?text=JS',
    },
    {
      name: 'Emily Chen',
      title: 'Lead Developer',
      quote: 'I was impressed with the level of detail and professionalism. The platform is intuitive and powerful.',
      image: 'https://placehold.co/120x120/22C55E/FFFFFF?text=EC',
    },
    {
      name: 'Michael Brown',
      title: 'Small Business Owner',
      quote: 'The value I received was outstanding. It helped me grow my business more than I thought possible.',
      image: 'https://placehold.co/120x120/F59E0B/FFFFFF?text=MB',
    },
    {
      name: 'Jessica Lee',
      title: 'Creative Designer',
      quote: 'Creative freedom combined with excellent functionality. I would highly recommend this to anyone in the field.',
      image: 'https://placehold.co/120x120/EF4444/FFFFFF?text=JL',
    },
    {
      name: 'David Wilson',
      title: 'Product Manager',
      quote: 'This product has streamlined our workflow and improved team collaboration immensely. A top-tier tool!',
      image: 'https://placehold.co/120x120/10B981/FFFFFF?text=DW',
    },
    {
      name: 'Sarah Kim',
      title: 'Customer Support Lead',
      quote: 'The customer service is unparalleled. They are always there to help with any questions or issues.',
      image: 'https://placehold.co/120x120/6366F1/FFFFFF?text=SK',
    },
    {
      name: 'Chris Evans',
      title: 'Financial Analyst',
      quote: 'An essential tool for anyone in my line of work. It provides accurate data and clear insights.',
      image: 'https://placehold.co/120x120/3B82F6/FFFFFF?text=CE',
    },
    {
      name: 'Olivia Rodriguez',
      title: 'Student',
      quote: 'As a student, this has been an incredible resource for my projects. The learning curve was minimal.',
      image: 'https://placehold.co/120x120/EC4899/FFFFFF?text=OR',
    },
    {
      name: 'Robert Davis',
      title: 'Architect',
      quote: 'The design tools are intuitive and have saved me countless hours on my projects. Highly recommended.',
      image: 'https://placehold.co/120x120/60A5FA/FFFFFF?text=RD',
    },
  ];

  // Function to handle moving to the next testimonial, wrapping around if needed
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to handle moving to the previous testimonial, wrapping around if needed
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Function to handle jumping to a specific testimonial
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
 
  
const FooterLink = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-orange-400 transform hover:translate-x-1 transition-all duration-300 ease-in-out"
    >
      {children}
    </a>
  );
};

const FooterSection = ({ title, children, icon }) => {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex items-center mb-4 text-white">
        {icon}
        <h3 className="text-lg font-bold ml-2">{title}</h3>
      </div>
      <nav className="flex flex-col space-y-2">
        {children}
      </nav>
    </div>
  );
};

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
     
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 font-sans text-gray-300 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Navigation - More stylized and centered */}
        <div className="flex flex-wrap text-center justify-center  items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0 mb-6 border-b border-gray-700 pb-6 pt-6">
          <FooterLink href="#">About us</FooterLink>
          <FooterLink href="#">Contact us</FooterLink>
          <FooterLink href="#">Terms and Conditions</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Career</FooterLink>
          <FooterLink href="#">FAQs</FooterLink>
        </div>

        {/* Main Content Grid with improved spacing and icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 sm:gap-16 lg:gap-20">
          
          {/* Section 1: Best Career Options */}
          <FooterSection 
            title="Best Career Options" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.18 0-6.22-1.28-8.585-3.585M21 13.255C18.667 15.111 15.667 16 12 16s-6.667-1.889-9-3.745M21 13.255V17m0 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V13.255a2 2 0 01.353-1.127l.142-.258a1 1 0 011.666-.089l2.843 3.127a1 1 0 001.382-.09l2.843-3.127a1 1 0 011.666-.089l.142.258A2 2 0 0121 13.255z" />
              </svg>
            }
          >
            <FooterLink href="#">Career After 12th PCM</FooterLink>
            <FooterLink href="#">Career After 12th PCB</FooterLink>
            <FooterLink href="#">Career After 12th Management</FooterLink>
            <FooterLink href="#">Career After 12th Arts and Humanities</FooterLink>
            <FooterLink href="#">Career After 12th Commerce</FooterLink>
            <FooterLink href="#">Top Paramedical Courses After 12th</FooterLink>
          </FooterSection>

          {/* Section 2: Admission Entrance Exam */}
          <FooterSection 
            title="Admission Entrance Exam" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9.75 17L7.5 15.25L9.75 13.5M14.25 17L16.5 15.25L14.25 13.5M12 11.25L12 17.25M12 17.25H9.75M12 17.25H14.25M19.5 7.5L12 3L4.5 7.5L12 12L19.5 7.5Z" />
              </svg>
            }
          >
            <FooterLink href="#">NEET-UG 2025</FooterLink>
            <FooterLink href="#">JEE Main 2025</FooterLink>
            <FooterLink href="#">JEE Advance 2025</FooterLink>
            <FooterLink href="#">UG CLAT 2025</FooterLink>
            <FooterLink href="#">CUET 2025</FooterLink>
            <FooterLink href="#">GGS IPU CET 2025</FooterLink>
          </FooterSection>
          
          {/* Section 3: MBBS Counseling Support */}
          <FooterSection 
            title="MBBS 2025 Counseling Support" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M4 12h16m-7 8h7a2 2 0 002-2v-1a2 2 0 00-2-2h-7a2 2 0 00-2 2v1a2 2 0 002 2z" />
              </svg>
            }
          >
            <FooterLink href="#">Delhi MBBS</FooterLink>
            <FooterLink href="#">Uttar Pradesh MBBS</FooterLink>
            <FooterLink href="#">Maharashtra MBBS</FooterLink>
            <FooterLink href="#">Karnataka MBBS</FooterLink>
            <FooterLink href="#">Rajasthan MBBS</FooterLink>
            <FooterLink href="#">Tamil Nadu MBBS</FooterLink>
          </FooterSection>

          {/* Section 4: Engeering Counseling Support */}
          <FooterSection 
            title="MBBS 2025 Counseling Support" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M4 12h16m-7 8h7a2 2 0 002-2v-1a2 2 0 00-2-2h-7a2 2 0 00-2 2v1a2 2 0 002 2z" />
              </svg>
            }
          >
            <FooterLink href="#">Delhi MBBS</FooterLink>
            <FooterLink href="#">Uttar Pradesh MBBS</FooterLink>
            <FooterLink href="#">Maharashtra MBBS</FooterLink>
            <FooterLink href="#">Karnataka MBBS</FooterLink>
            <FooterLink href="#">Rajasthan MBBS</FooterLink>
            <FooterLink href="#">Tamil Nadu MBBS</FooterLink>
          </FooterSection>
          
        </div>
        
        {/* Copyright Section */}
        <div className="mt-16 pt-6 border-t border-gray-700 text-center text-sm text-gray-500 w-full max-w-4xl mx-auto pb-8">
          All rights reserved &copy; Admission Any Time
        </div>
      </div>
    </footer>
            
        </div>
       
      

        
    )
}

export default SchoolWebsite