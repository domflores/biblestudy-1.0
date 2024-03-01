import {CSSTransition} from 'react-transition-group'

import '../css/Navbar.css'

import { useState, useEffect, useRef } from "react"

import { useNavigate } from 'react-router-dom'

const server = "https://biblestudy-1-0-server.onrender.com"

// Code for Navbar
export function Navbar(props) {

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    )
}

export function NavItem(props) {

    const [open, setOpen] = useState(false)

    return(
        <li className="nav-item">
            <a className="nav-button" onClick={() => setOpen(!open)}>
                {props.item}
            </a>
            {open && props.children}
        </li>
    )
}

export function BibleDropdownMenu(props) {

    const nodeRef = useRef(null)

    const dropdownRef = useRef()

    const [activeMenu, setActiveMenu] = useState('books')

    const [books, setBooks] = useState([])
    const [chapters, setChapters] = useState([])

    const [navBook, setNavBook] = useState(null)

    useEffect(() => {
        fetchAllBooks()
      }, [])
      
    useEffect(() => {
        fetchAllChapters(navBook)
    }, [navBook])
    
    function fetchAllBooks() {
        fetch(`${server}/getAllBooks`,)
            .then(res => {
                return res.json()
            })
            .then((json) => {
                setBooks(json.books)
            })
    }
    
    function fetchAllChapters(book) {
        fetch(`${server}/${book}/getAllChapters`)
        .then(res => {
            return res.json()
        })
        .then((json) => {
            setChapters(json.chapters)
        })
    }

    function clicked(menuItem1, menuItem2) {
        if (menuItem1 != null) {
            setNavBook(menuItem1)
        }
        if (menuItem2 != null) {
            props.bookChange(navBook)
            props.chapterChange(menuItem2)
        }
    }

    function DropdownItem(props) {
        return(
            <a className="menu-item-bible" onClick={() => {
                clicked(props.book, props.chapterNum);
                props.goToMenu && setActiveMenu(props.goToMenu);}}>
                {props.children}
            </a>
        )
    }

    return (
        <div className="dropdown-bible">
            <CSSTransition 
            in={activeMenu === 'books'} 
            unmountOnExit 
            timeout={500}
            classNames="menu-primary"
            nodeRef={nodeRef}
            ref={dropdownRef}
            >
                <div className="menu">
                    {books.map((book) => (
                        <DropdownItem key={book.bName} goToMenu="chapters" book={book.bName}>
                            {book.bName}
                        </DropdownItem>
                    ))}
                </div>
            </CSSTransition>
            
            <CSSTransition
            in={activeMenu === 'chapters'} 
            unmountOnExit 
            timeout={500}
            classNames="menu-secondary"
            nodeRef={nodeRef}
            ref={dropdownRef}
            >
                <div className="menu">
                    <DropdownItem goToMenu="books">Back</DropdownItem>
                    <div />
                    {chapters.map((chapter) => (
                        <DropdownItem key={chapter.chapter} goToMenu="chapters" chapterNum={chapter.chapter}>
                            {chapter.chapter}
                        </DropdownItem>
                    ))}
                </div>
            </CSSTransition>
        </div>
    )
}

export function UserDropdownMenu(props) {

    const navigate = useNavigate()

    function DropdownItem(props) {

        const selectRoute = () => {
            switch(props.children) {
                case "Account":
                    navigate('/Homepage')
                    break;
                case "Settings":
                    console.log("No settings page yet")
                    break;
                case "Logout":
                    props.logout();
                    break;
                default:
                    console.log("Invalid Input")
                    break;
            }
        }

        return(
            <a className="menu-item-user" onClick={() => selectRoute()}>
                {props.children}
            </a>
        )
    }

    return(
        <>
            <div className="dropdown-user">
                <div className="menu">
                    <DropdownItem>Account</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem logout={props.logout}>Logout</DropdownItem>
                </div>
            </div>
        </>
    )
}

export function StudyPageRoute() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/Study-Page')
    }, [])
    return(
        <></>
    )
}