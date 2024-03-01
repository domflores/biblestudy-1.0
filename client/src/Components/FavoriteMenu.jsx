import Axios from 'axios'
import { useEffect, useState } from 'react'
import '../css/FavoriteMenu.css'

const server = "https://biblestudy-1-0-server.onrender.com"

export default function FavoriteMenu(props) {

    const [favNotes, setFavNotes] = useState([])
    const [toggleReset, setToggleReset] = useState(false)

    useEffect(() => {
        fetchFavNotes(props.mID)
    }, [toggleReset])

    function fetchFavNotes(mID) {
        fetch(`${server}/${mID}/favNotes`)
        .then(res => {
            return res.json()
        })
        .then((json) => {
            setFavNotes(json.favNotes)
        })
    }
    
    const deleteNote = (nID) => {
        Axios.post(`${server}/deleteNote`, {
            nID: nID
        })
        .then(() => {
            setToggleReset(!toggleReset)
        })
    }

    const toggleFavoriteNote = (nID, isFavorite) => {
        let toggle = !isFavorite
        Axios.post(`${server}/favoriteNote`, {
            isFavorite: toggle,
            nID: nID
        })
        .then(() => {
            setToggleReset(!toggleReset)
        })
    }
    return(
        <>
            <div className="fav-wrap">
                <h1 className="header">
                    Favorite Notes
                </h1>
                <div className="text-box">
                    {favNotes?.map((favNote) => (
                        <div key={favNote.nID}>
                            <textarea className='note-input' defaultValue={favNote.content} key={favNote.nID} readOnly/>
                            <button className="note-btn" onClick={() => {deleteNote(favNote.nID)}}>Delete</button>
                            <button className="note-btn" onClick={() => {toggleFavoriteNote(favNote.nID, favNote.isFavorite)}}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}