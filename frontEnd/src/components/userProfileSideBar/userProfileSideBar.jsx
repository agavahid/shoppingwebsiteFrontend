import React, { useEffect } from "react";
import './userProfileSideBar.css';



import Cookies from 'universal-cookie';
import { useState } from 'react';
import axios from 'axios';
import defaultProfilePic from '../../assets/icons/generalicons/default-user-icon.jpg';
import { baseApi } from "../../configs/configs";

export default function UserProfileSideBar(){

    
    const[userInfos, setUserInfos] = useState('');
    const cookies = new Cookies();
 
    useEffect(()=>{
        const token =  cookies.get('userToken')
        
        axios({
            method: 'POST',
            url: `${baseApi}/user`,
            headers: {"authorization" : `bearer ${token}`},
        })
            .then(response => {
                setUserInfos(response.data.rows[0])
        })
    },[])
   
    
    return(
        
            userInfos ? 

                <div className="user-profile-sideBar">
                    <div className="userProfile-header">
                        <div className="userProfile-image-container">
                            <img className='defaultProfilePic' src={defaultProfilePic}/>
                        </div>

                        <div className='register-date'>
                            <p className='userName'>UserName
                                <span className='specialDateSpan'>{userInfos.userName}</span>    
                            </p>
                            <div className="registerDateContainer">
                                <p className='userRegisterEmail'>E-Mail
                                    <span className='specialDateSpan'>{userInfos.email}</span>
                                </p>
                            </div> 
                        </div>
                    </div>
                    <div className="userProfile-bottom">
                        
                    </div>
                </div>


            : null
        
        
    )
}