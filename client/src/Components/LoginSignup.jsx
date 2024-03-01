import Axios from 'axios'

import '../css/LoginSignup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const server = "https://biblestudy-1-0-server.onrender.com"

export function Login(props) {

    const [uName, setUname] = useState('')
    const [pW, setPw] = useState('')

    const [notifcation, setNotifcation] = useState('')

    const navigate = useNavigate()

    const verify = () => {
        Axios.post(`${server}/verifyLogin`, {
            uName: uName, 
            pW: pW
        }).then((response) => {
            if (response.data.user.length === 1) {
                props.login( response.data.user[0].mID, response.data.user[0].Fname)
            }
            else {
                setNotifcation('Incorrect Username or Password')
            }
        })
    }

    const signupPage = () => {
        navigate('/signup')
    }

    return (
        <div>
            <div className="form-box">
                <div className="input-box">
                <input type="text" onChange={(e) => setUname(e.target.value)} placeholder="username" required/>
                </div>
                <div className="input-box">
                <input type="text" onChange={(e) => setPw(e.target.value)} placeholder="password" required/>
                </div>
                <div className="btn"><button onClick={verify}>Login</button></div>
                <div className="Login-link">Don't have an account? <a onClick={signupPage}> Sign Up Here!</a></div>
                <h1>{notifcation}</h1>
            </div>
            <img src="/logo.png" alt="Bible Study"></img>
        </div>
    )
}

export function Signup(props) {

    const navigate = useNavigate()

    const [fNameReg, setFnameReg] = useState('')
    const [lNameReg, setLnameReg] = useState('')
    const [uNameReg, setUnameReg] = useState('')
    const [pwReg, setPwReg] = useState('')

    const register = () => {
        Axios.post(`${server}/createMember`, {
            fName: fNameReg, 
            lName: lNameReg, 
            uName: uNameReg, 
            pW: pwReg
        }).then((response) => {
            verify(uNameReg, pwReg)
        })
    }
    
    const verify = (userName, password) => {
        Axios.post(`${server}/verifyLogin`, {
            uName: userName, 
            pW: password
        }).then((response) => {
            if (response.data.user.length === 1) {
                props.login( response.data.user[0].mID, response.data.user[0].Fname)
            }
        })
    }

    const loginPage = () => {
        navigate('/login')
    }

    return (
        <>
            <div className="form-box">
                <div className="input-box">
                    <input type="text" onChange={(e) => setFnameReg(e.target.value)} placeholder="first name" required/>
                </div>
                <div className="input-box">
                    <input type="text" onChange={(e) => setLnameReg(e.target.value)} placeholder="last name" required/>
                </div>
                <div className="input-box">
                    <input type="text" onChange={(e) => setUnameReg(e.target.value)} placeholder="username" required/>
                </div>
                <div className="input-box">
                    <input type="text" onChange={(e) => setPwReg(e.target.value)} placeholder="password" required/>
                </div>
                <div className="btn"><button onClick={register}>Create Account</button></div>
                <div className="Login-link">Already have an account? <a onClick={loginPage}> Log In Here!</a></div>
            </div>
            <img src="/logo.png" alt="Bible Study"></img>
        </>
    )
}