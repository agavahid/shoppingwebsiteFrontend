import React from "react";
import './adminLayoutHeader.css';





import Cookies from 'universal-cookie';
import { useState } from 'react';
import defaultProfilePic from '../../assets/icons/generalicons/default-user-icon.jpg';

export default function AdminLayoutHeader(){

    
    const[userInfos, setUserInfos] = useState('');
    const cookies = new Cookies();
 
    return(
        
           // userInfos ? 

                <div className="user-profile-sideBar">
                    <div className="userProfile-header">
                        <div className="userProfile-image-container">
                            <img className='defaultProfilePic' src={defaultProfilePic}/>
                        </div>

                        <div className='register-date'>
                            <p className='userName'>Admin
                                <span className='specialDateSpan'>Admin</span>    
                            </p>
                        </div>
                    </div>
                </div>


            //: null
        
        
    )
}