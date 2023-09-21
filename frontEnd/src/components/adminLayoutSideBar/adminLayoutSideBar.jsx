import React from "react";
import './adminLayoutSideBar.css';


import { NavLink} from "react-router-dom";
import { useState } from "react";

export default function AdminLayoutSideBar(){
    
 
    return(
    
        <div className="admin-navBar">

            <ul className="admin-navbar-ul">
                <NavLink 
                    className={({ isActive }) => isActive ? 'adminNavItem active' : 'adminNavItem'}
                    to={'/admin/dashboard/info'}
                >Admin Infos
                </NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'adminNavItem active' : 'adminNavItem'}
                    to={'/admin/dashboard/users'}>Users</NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'adminNavItem active' : 'adminNavItem'}
                    to={'/admin/dashboard/products'}>Products</NavLink>
                <NavLink  
                className={({ isActive }) => isActive ? 'adminNavItem active' : 'adminNavItem'}
                to={'/admin/dashboard/blogs'}>Blogs</NavLink>
                <NavLink  
                    className={({ isActive }) => isActive ? 'adminNavItem active' : 'adminNavItem'}
                    to={'/admin/dashboard/messages'}>Mesages</NavLink>
            </ul>
            
        </div>
        
    )
}