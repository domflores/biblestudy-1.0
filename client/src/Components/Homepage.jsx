import UserInfo from './UserInfo.jsx'
import FavoriteMenu from './FavoriteMenu.jsx'
import {Navbar, NavItem, UserDropdownMenu, StudyPageRoute} from './Navbar.jsx'

import { useNavigate } from 'react-router-dom'

export default function Homepage(props) {
    return(
        <>
            <Navbar>
                <img className="corner-logo" src="/logo.png" alt="Bible Study"></img>
                <NavItem item="Bible">
                    <StudyPageRoute/>
                </NavItem>
                <NavItem item={props.Fname}>
                    <UserDropdownMenu logout={props.logout}/>
                </NavItem>
            </Navbar>
            <UserInfo mID={props.mID}/>
            <FavoriteMenu mID={props.mID}/>
        </>
    )
}
