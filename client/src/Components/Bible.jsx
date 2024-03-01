import Verses from "./Verses"
import '../css/Bible.css'

export default function Bible (props) {

    return (
        <>
            <h1 className="header">{props.book} {props.chapter}</h1>
            <div className="text-box">
                <Verses version={props.version} book={props.book} chapter={props.chapter} changeVerseID={props.changeVerseID}/>
            </div>
        </>
    )
}