import React from "react";
import './adminLayout.css';


import { Outlet } from "react-router-dom";
import AdminLayoutHeader from "../../components/adminLayoutHeader/adminLayoutHeader";
import AdminLayoutSideBar from "../../components/adminLayoutSideBar/adminLayoutSideBar";
import AdminLayoutNav from "../../components/adminLayoutNav/adminLayoutNav";
export default function AdminLayout(){

   


    return(
        <div className="admin-container">
            <div className="admin-layout">
                <div className="admin-leftSide">
                    <AdminLayoutHeader className='adminHeader'/>
                    <AdminLayoutSideBar/>
                </div>
                <div className="admin-rightSide">
                    <div className="adminRightsideNavContainer">
                        <AdminLayoutNav/>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

