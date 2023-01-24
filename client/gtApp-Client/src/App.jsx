import { useState, useEffect } from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import SelEvents from './Components/SelEvents'
import Register from './Components/Register'
import jwtDecode from "jwt-decode";
import Postform from './Components/Postform'

// let logUser;
// if (localStorage.token) {
//   const jwt = localStorage.getItem('token')
//   logUser = jwtDecode(jwt)
// }

function App() {

  const [user, setUser] = useState(null)
  console.log(user)
    const [confirmEvent, setConfirmEvent] = useState([])
    const [selEvent, setSelEvent] = useState([])
    const [eventData, setEventData] = useState([])
    const [loginData, setLoginData] = useState({
        id: null, 
        username: null 
    })
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
        <Header confirmEvent={confirmEvent} loginData={loginData} setLoginData={setLoginData}/>
        <Routes>
          <Route path={'/'} element={<Home eventData={eventData} setEventData={setEventData} selEvent={selEvent} setSelEvent={setSelEvent}/>}/>
          <Route path={'/register'} element={<Register /> } />
          <Route path={'/login'} element={<Login loginData={loginData} setLoginData={setLoginData}/>}/> 
          <Route path={'/post'} element={<Postform />} />
          <Route path={'/selEvent'} element={<SelEvents eventData={eventData} setEventData={setEventData} selEvent={selEvent} setSelEvent={setSelEvent}/>}/>
          <Route path={'/selEvent'} element={<SelEvents confirmEvent={confirmEvent} setConfirmEvent={setConfirmEvent}selEvent={selEvent} setSelEvent={setSelEvent}/>}/>

        </Routes>
      </BrowserRouter>
      {/* {console.log(loginData)} */}
    </div>
  )
}

export default App
