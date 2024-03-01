// Components
import { Login, Signup }from './Components/LoginSignup.jsx'
import StudyPage from './Components/StudyPage.jsx'
import Homepage from './Components/Homepage.jsx'

import './css/App.css'

// Hooks
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'


export default function App() {

  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(false)
  const [mID, setMID] = useState(null)
  const [userFname, setUserFname] = useState(null)

  useEffect(() => {
    navigate('/login')
  }, [])

  function login(mID, userFname) {
    setLoggedIn(true)
    setMID(mID)
    setUserFname(userFname)
    navigate('/Study-Page')
  }

  function logout() {
    setMID(null)
    setUserFname(null)
    setLoggedIn(false)
    navigate('/login')
  }

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login login={login}/>}/>
        <Route path='/signup' element={<Signup login={login}/>}/>
        <Route path='/Study-Page' element={<StudyPage Fname={userFname} mID={mID} logout={logout}/>}/>
        <Route path='/Homepage' element={<Homepage Fname={userFname} mID={mID} logout={logout}/>}/>
        <Route path='*' element={<Login login={login}/>}/>
      </Routes>
    </>
  )

}