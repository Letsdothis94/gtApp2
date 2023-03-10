import { useState, useEffect } from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import SelEvents from './Components/SelEvents'
import Register from './Components/Register'
import jwtDecode from "jwt-decode"
import Confirmed from './Components/Confirmed'
import Profile from './Components/Profile'
import Logout from './Components/Logout'
import Footer from './Components/Footer'
import './Styles/Register.css'
import './Styles/Profile.css'
import IntroPage from './Components/IntroPage'

let logUser;
if (localStorage.token) {
  const jwt = localStorage.getItem('token')
  logUser = jwtDecode(jwt)
  console.log(jwt.toString)
  // userData = logUser.user_data
}
  


function App() {
  const [user, setUser] = useState(logUser)
  console.log(logUser)
  // let userData = logUser.user_data
  // console.log(userData)

    const [confirmEvent, setConfirmEvent] = useState([])
    const [selEvent, setSelEvent] = useState([])
    const [eventData, setEventData] = useState([])
    const [loginData, setLoginData] = useState({
        id: null, 
        username: null 
    })
    const [qr, setQr] = useState('')
    useEffect(()=> {
        const request = async() => {
            let req = await fetch ('http://127.0.0.1:3000/users')
            let res = await req.json()
            // console.log(res)
            if (req.ok){
                setLoginData({id: res.id, username: res.username})
            }
        }
        request()
    }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} confirmEvent={confirmEvent} setConfirmEvent={setConfirmEvent} loginData={loginData} setLoginData={setLoginData}/>
        <Routes>
          <Route path='/welcome' element={<IntroPage />}  />
          <Route path={'/'} element={<Home eventData={eventData} setEventData={setEventData} selEvent={selEvent} setSelEvent={setSelEvent}/>}/>
          <Route path={'/register'} element={<Register /> } />
          <Route path={'/login'} element={<Login loginData={loginData} setLoginData={setLoginData}/>}/> 
          <Route path={'/confirmed'} element={<Confirmed user={user} qr={qr} setQr={setQr} confirmEvent={confirmEvent} setConfirmEvent={setConfirmEvent}/>} />
          <Route path={'/selEvent'} element={<SelEvents eventData={eventData} setEventData={setEventData} selEvent={selEvent} setSelEvent={setSelEvent} confirmEvent={confirmEvent} setConfirmEvent={setConfirmEvent}/>}/>

          <Route path={'/selEvent'} element={<SelEvents confirmEvent={confirmEvent} setConfirmEvent={setConfirmEvent} selEvent={selEvent} setSelEvent={setSelEvent}/>}/>
          <Route path={'/profile'} element={<Profile user={user} />} />

          <Route path={'/logout'} element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* {console.log(loginData)} */}
    </div>
  )
}

export default App
