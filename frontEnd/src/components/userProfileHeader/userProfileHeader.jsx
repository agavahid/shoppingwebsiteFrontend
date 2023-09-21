import React from "react";
import './userProfileHeader.css';


import { NavLink} from "react-router-dom";
import { useState } from "react";

export default function UserProfHeader(){
    const[isClassActive, setIsClassActive] = useState(0);

    return(
    
        <div className="profile-header-navBar">

            <ul className="profile-navbar-ul">
                <NavLink 
                    className={({ isActive }) => isActive ? 'profPageNavItem active' : 'profPageNavItem'}
                    to={'/profile/account'}
                >
                    Profil
                </NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'profPageNavItem active' : 'profPageNavItem'}
                    to={'/profile/settings'}>Settings</NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'profPageNavItem active' : 'profPageNavItem'}
                    to={'/profile/likedList'}>Liked List</NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'profPageNavItem active' : 'profPageNavItem'}
                    to={'/profile/messages'}>Messages</NavLink>
            </ul>
            
        </div>
        
    )
}