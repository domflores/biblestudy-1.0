import { useEffect, useState } from 'react'

const server = "https://biblestudy-1-0-server.onrender.com"

export default function Verses(props) {

    const [verses, setVerses] = useState([])

    useEffect(() => {
        fetchVerseData(props.version, props.book, props.chapter)
      }, [props.version, props.book, props.chapter])
    
    function fetchVerseData(version, book, chapter) {
        fetch(`${server}/${version}/${book}/${chapter}`)
        .then(res => {
            return res.json()
        })
        .then((json) => {
            setVerses(json.verses)
        })
    }

    function verseClicked(vID, vNum) {
        props.changeVerseID(vID, vNum)
    }

    return (
        <>
            {verses.map((verse) => (
                <a key={verse.vID} onClick={() => {
                    verseClicked(verse.vID, verse.verseNum)
                }}>
                    <p>{verse.verseNum} {verse.verse} {" "}</p>
                </a>
            ))}
        </>
    )
}