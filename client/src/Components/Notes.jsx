import { useEffect, useState, version } from 'react'
import Axios from 'axios'
import '../css/Notes.css'

const server = "https://biblestudy-1-0-server.onrender.com"

export default function Notes(props) {

    const [notes, setNotes] = useState([])

    // Note input
    const [newNote, setNewNote] = useState('')
    const [alteredNote, setAlteredNote] = useState('')
    // Note Change
    const [toggleReset, setToggleReset] = useState(false)

    useEffect(() => {
        fetchNotes(props.mID, props.verseID)
    }, [props.mID, props.verseID, toggleReset])

    function fetchNotes(mID, vID) {
        fetch(`${server}/${mID}/${vID}`, {timeout: 5000})
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Something went wrong!")
        })
        .then((json) => {
            setNotes(json.notes)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const submitNote = () => {
        if(newNote != '') {
            Axios.post(`${server}/createNote`, {
                content: newNote,
                mID: props.mID,
                vID: props.verseID
            })
            .then(() => {
                setToggleReset(!toggleReset)
            })
        }
    }

    const deleteNote = (nID) => {
        Axios.post(`${server}/deleteNote`, {
            nID: nID
        })
        .then(() => {
            setToggleReset(!toggleReset)
        })
    }

    const updateNote = (nID) => {
        if (alteredNote != '') {
            Axios.post(`${server}/updateNote`, {
                content: alteredNote,
                nID: nID
            })
            setTimeout(() => {setToggleReset(!toggleReset)}, 50)
        }
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
        props.verseID ? 
        <>
            <h1 className="header">
                {props.book} {props.chapter} {props.verseNum}
            </h1>
            <div className="text-box">
                <div className="note-area">
                    <textarea className="note-input" onChange={(e) => setNewNote(e.target.value)} placeholder="Enter a new note..."></textarea>
                    <button className="note-btn" onClick={submitNote}>Post</button>
                    {notes.map((note) => (
                        <div key={note.nID}>
                            <textarea 
                            className="note-input" 
                            defaultValue={note.content}
                            onChange={(e) => setAlteredNote(e.target.value)}>
                            </textarea>
                            <button className="note-btn" onClick={() => {updateNote(note.nID)}}>Update</button>
                            <button className="note-btn" onClick={() => {deleteNote(note.nID)}}>Delete</button>
                            <button className="note-btn" onClick={() => {toggleFavoriteNote(note.nID, note.isFavorite)}}>
                            { note.isFavorite ? (<i className='bx bxs-heart' ></i>) : (<i className='bx bx-heart'></i>) }
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
        : <h1 className='note-header-default'>Click on a verse to view or create notes for the book of {props.book}...</h1>
    )
}