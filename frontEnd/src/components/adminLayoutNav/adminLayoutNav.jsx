import React, { useEffect, useState } from "react";
import './adminLayoutNav.css';
import axios from "axios"; 
import { Link } from "react-router-dom";
import { adminNavBar } from "../adminNavItems/adminNavItems";
import { baseApi } from "../../configs/configs";

export default function AdminLayoutNav(){
    
    const [userCount, setUserCount] = useState([]);
    const [itemCount, setItemCount] = useState([]);
    const [blogItemCount, setBlogItemCount]= useState([]);

    function getUserCount(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics/users`
        }).then(response => setUserCount(response.data.length))
    }
    
    function getItemCount(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics`
        }).then(response => setItemCount(response.data.length))
    }
    function getBlogItemCount(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics/blogs`
        }).then(response => setBlogItemCount(response.data.length))
    }
    useEffect(()=>{
        getUserCount()
        getItemCount()
        getBlogItemCount()
        console.log(adminNavBar)
    },[])
    
    return(
        <>
            {
                adminNavBar ? 
                adminNavBar.map((item, index) => 
                    <div className={`pageItem-${item.class}`} key={index}>
                        <div className="pageItemContainer">
                            <div className="pageItemLeft">
                                <span className="cardItemCount">{item.id === 1 ? itemCount : item.id === 2 ? blogItemCount : userCount}</span>
                                <span>Page Items</span>
                            </div>
                            <div className="pageItemRight">
                                <img src={item.url} className="pageItem-img"/>
                            </div>
                        </div>
                        <div className="pageItemAbout">
                            <Link to={`/admin/dashboard/${item.navLink}`} className="adminLayoutCartDirection">More Info</Link>
                        </div>
                    </div>
                )
                : null
            }
        </>
    )
}