import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import '../css/UserInfo.css'

const server = "https://biblestudy-1-0-server.onrender.com"

export default function UserInfo(props) {

    const [info, setInfo] = useState([])

    const [updatedFname, setUpdatedFname] = useState(null)
    const [updatedLname, setUpdatedLname] = useState(null)
    const [updatedUname, setUpdatedUname] = useState(null)
    const [updatedPW, setUpdatedPW] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        fetchInfo(props.mID)
    }, [updatedFname, updatedLname, updatedUname, updatedPW])

    function fetchInfo(mID) {
        fetch(`${server}/${mID}`, {timeout: 5000})
        .then(res => {
            return res.json()
        })
        .then((json) => {
            setInfo(json.info)
        })
    }

    function updateInfo(fName, lName, uName, PW) {
        if (fName == null || lName == null || uName == null || PW == null) {
            console.log("At least one field is empty")
            console.log(PW)
        }
        else {
            Axios.post(`${server}/updateInfo`, {
                fName: fName,
                lName: lName,
                uName: uName,
                PW: PW,
                mID: props.mID
            })
            .then(() => {
                fetchInfo(props.mID)
            })
        }
    }

    function deleteAccount() {
        Axios.post(`${server}/deleteMember`, {
            mID: props.mID
        })
        .then(() => {
            navigate("/login")
        })
    }

    return(
        <>
            {info.map((info) => (
                <div className="acct-form-box" key={info.mID}>
                    <h1 className='title'>Account Info</h1>
                    <div className="input-box">
                        <input type="text" placeholder={info.Fname} onChange={(e) => setUpdatedFname(e.target.value)} required/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder={info.Lname} onChange={(e) => setUpdatedLname(e.target.value)} required/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder={info.Uname} onChange={(e) => setUpdatedUname(e.target.value)} required/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder={info.PW} onChange={(e) => setUpdatedPW(e.target.value)} required/>
                    </div>
                    <button className="update-btn" 
                    onClick={() => {updateInfo(updatedFname, updatedLname, updatedUname, updatedPW)}}>
                        Update
                    </button>
                    <button className='delete-btn' onClick={() => {deleteAccount()}}>Delete Account?</button>
                </div> 
            ))}
        </>
    )
}