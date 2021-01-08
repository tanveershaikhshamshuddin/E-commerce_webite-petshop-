import React from 'react'
import "./Sidebar.css";
import {Home,Info,AccountCircle,
    ImportContacts,Settings,ExitToApp,
    Queue,HighlightOff,
    Facebook,Twitter,Instagram} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/userActions';

function Sidebar() {
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    const dispatch=useDispatch();

    const closeMenu=()=>{
        document.querySelector(".sidebar").classList.remove("open");
      }
      const logoutHandler=()=>{
        dispatch(logout())
      }
    return (
        <aside className="sidebar">
            <h3>{userInfo?userInfo.name:"pleaze Login"}</h3>
            <button className="menu_close_btn" onClick={closeMenu}><HighlightOff className="sidebar_icon"/></button>
            <div>
                <ul>
                    <li><Link to="/"><Home className="sidebar_icon"/>Home</Link></li>
                    <li><Link to="/user/profile"><AccountCircle className="sidebar_icon"/>Profile</Link></li>
                    <li><Link to="/"><Info className="sidebar_icon"/>About</Link></li>
                    <li><Link to="/"><ImportContacts className="sidebar_icon"/>Contacts</Link></li>
                    <li><Link to="/"><Settings className="sidebar_icon"/>Setting</Link></li>
                    <li><div style={{cursor:"pointer"}}onClick={logoutHandler}><ExitToApp className="sidebar_icon"/>Log out</div></li>
                    <li><Link to="/register"><Queue className="sidebar_icon"/>Register</Link></li>
                </ul>
            </div>
            
            <div className="social_media">  
                <Link to="/"><Facebook className="social_app_icon"/></Link>
                <Link to="/"><Twitter className="social_app_icon"/></Link>
                <Link  id="insta" to="/"><Instagram className="social_app_icon"/></Link>
            </div>
        </aside>
        
    )
}

export default Sidebar
