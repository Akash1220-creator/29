import React from 'react'
import MainPage from './components/MainPage'
import { Routes, Route } from 'react-router-dom'
import SchoolWebsite from './components/SchoolWebsite'
import AboutUs from './components/Pages/AboutUs'
import Courses from './components/Navbar/Courses'
import CooperateTrainingProgram from './components/Navbar/CooperateTrainingProgram'
import News from './components/Navbar/News'
import RegistrationForm from './components/Pages/RegistrationForm'
import ImsLoginPage from './components/Pages/ImsLoginPage'
import ApplyNow from './components/Pages/ApplyNow'
import AdminPanel from './components/Panel/AdminPanel'
import Layout from './components/Layout'
import SignUpandLogin from './components/Pages/SignUpandLogin'

const App = () => {
  return (
    <div>

      <Routes>

        <Route path='' element={<Layout />} >
          <Route path='' element={<SchoolWebsite />} >
            <Route path='' element={<MainPage />} >
            </Route>
            <Route path='Aboutus' element={<AboutUs />} />
            <Route path='Courses' element={<Courses />} />
            <Route path='CorporateTraining' element={<CooperateTrainingProgram />} />
            <Route path='News&Updates' element={<News />} />
            <Route path='apply-now' element={<ApplyNow />}>
              <Route path='registration-form' element={<RegistrationForm />} />
            </Route>
          </Route>
        </Route>

        <Route path='panel' element={<SignUpandLogin />} />
        
        {/* <Route path='panel' element={<AdminPanel />} /> */}



      </Routes>



    </div>
  )
}

export default App