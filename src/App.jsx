import './App.css'
import React, { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CoursePage from './components/CoursePage'
import LoginPage from './components/LoginPage'
import LoginSuccess from './components/LoginSuccess'
import FloatBarBL from './components/FloatBarBL'
import AddResource from './components/AddResource'
import About from './components/About'
import ErrorPage from './components/ErrorPage'
import { Toaster } from 'react-hot-toast'
import { Flubber } from './contexts/Auth'

// edited the app names
// all the elements that you want to have access to 'context', should be enclosed in varname.Provider tags. 
// now any enclosed cpn will have access to the value above
export default function App() {

  // create a new state var called value, along wtih its setter fxn, and a def value of 'hellow from app.jsx' 
  // these are passed as values in our authcontext.provider


  return (
    <div>
      <Flubber>
      <Header />
      <FloatBarBL />
      <Toaster />
      <Routes>
        <Route path='/success' element={<LoginSuccess />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/addresource' element={<AddResource />} />
        <Route path='/:id' element={<CoursePage />} />
        <Route path='/' element={<Home />} />
      </Routes>
      </Flubber>
    </div>
  )
}

