// Components
import Bible from './Bible.jsx'
import {Navbar, NavItem, BibleDropdownMenu, UserDropdownMenu} from './Navbar.jsx'
import Notes from './Notes.jsx'

import '../css/StudyPage.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudyPage(props) {

  const [version, setVersion] = useState('niv')
  const [book, setBook] = useState('Genesis')
  const [chapter, setChapter] = useState(1)

  // For notes
  const [currentVerseID, setCurrentVerseID] = useState(null)
  const [verseNum, setVerseNum] = useState(null)

  // For popup closing
  const [popupSwitch, setPopupSwitch] = useState(false)

  const navigate = useNavigate()

  // Check if the user is logged in
  useEffect(() => {
    if (props.mID === null) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    setCurrentVerseID(null)
    setVerseNum(null)
  }, [book, chapter])

  function changeBook(bookName) {
    setBook(bookName)
  }

  function changeChapter(chapterNum) {
    setChapter(chapterNum)
  }

  function changeVerseID(vID, vNum) {
    setCurrentVerseID(vID)
    setVerseNum(": " + vNum)
  }

  return (
    <>
      <Navbar>
        <img className="corner-logo" src="/logo.png" alt="Bible Study"></img>
        <NavItem item="Bible">
          <BibleDropdownMenu bookChange={changeBook} book={book} chapterChange={changeChapter}/>
        </NavItem>
        <NavItem item={props.Fname}>
          <UserDropdownMenu logout={props.logout}/>
        </NavItem>
      </Navbar>
      <div className='content-wrap'>
        <div className="bible-wrap">
          <Bible version={version} book={book} chapter={chapter} changeVerseID={changeVerseID}/>
        </div>
        <div className="notes-wrap">
          <Notes book={book} chapter={chapter} verseID={currentVerseID} mID={props.mID} verseNum={verseNum}/>
        </div>
      </div>
    </>
  )
  
}