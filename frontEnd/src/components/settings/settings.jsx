import './settings.css';

import notePadIcon from '../../assets/icons/cardIcons/notePad.png';
import emailIcon from '../../assets/icons/cardIcons/emailicon.png';
import phoneIcon from '../../assets/icons/cardIcons/phoneIcon.png';
import lockIcon from '../../assets/icons/cardIcons/lock.png';
import defaultUserPic from '../../assets/icons/cardIcons/default-user.png';
import React, { useState, useEffect }  from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { baseApi } from '../../configs/configs';

export default function Settings(){
    
    const[checkActive, setCheckActive] = useState(false);
    
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
      
            <div className="settingsdiv">  
                <div className="user-informations">
                    <div className="user-information-container">
                        <h2>Personal Informations</h2>
                        <div className="user-informations-contents">
                            <div className="user-informations-left-content">

                                <Formik
                                    initialValues={{
                                    fullName: '',
                                    password: '',
                                    email: '',
                                    }}
                                    onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    alert(JSON.stringify(values, null, 2));
                                    }}
                                >
                                    <Form className="settings-form">
                                        <h4>Name, Surname</h4>
                                        <div className='settings-field-container'>
                                            <img className="defaultUserPic" src={defaultUserPic}/>    
                                            <Field id="text" name="fullName" type="text" value={userInfos.userName} className='settings-form-field'/>
                                            <img className="notePadIcon" src={notePadIcon}/>
                                        </div>
                                        
                                        <h4>E-mail</h4>
                                        <div className="settings-field-container">
                                            <img className="emailIcon" src={emailIcon}/>
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                className='settings-form-field'
                                                value={userInfos.email}
                                            />
                                        </div>

                                        <h4>Phone Number</h4>
                                        <div className='settings-field-container'>
                                            <img src={phoneIcon} className='phoneIcon' />
                                            <Field 
                                                id="number"
                                                name="number" 
                                                type='number' 
                                                className='settings-form-field'
                                                value={userInfos.phone}/>
                                        </div>
                                    
                                    </Form>
                                </Formik>
                            </div>
                            <div className="user-informations-right-content">
                                <Formik>
                                    <Form className="settings-form">
                                        <h4>Add Photo</h4>
                                        <div className='settings-field-container'>
                                            <label htmlFor="file" className='fileLabel'>
                                                <img src={``}/>
                                                <span>Add Photo</span>
                                                <input name="file" id="file" type="file" />
                                            </label>
                                            
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className="adjustments">
                    <div className="adjusments-container">
                        <h2>Settings</h2>
                        <div className="adjusments-contents">
                            <div className="adjusments-left-content">
                            <Formik
                                    initialValues={{
                                    number: '',
                                    password: '',
                                    email: '',
                                    }}
                                    onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    alert(JSON.stringify(values, null, 2));
                                    }}
                                >
                                    <Form  className="adjusments-form">

                                        <div className="adjusments-field-container">
                                            <h4>Actual Password</h4>
                                            <div className='adjusments-field-content'>
                                                <img className="lockIcon" src={lockIcon}/>
                                                <Field id="number" name="number" type="number"  className='settings-form-field'/>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="adjusments-field-container">
                                            <h4>New Password</h4>
                                            <div className="adjusments-field-content">
                                                <img className="lockIcon" src={lockIcon}/>
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className='settings-form-field'
                                                />
                                            </div>
                                        </div>
                                        

                                        <div className="adjusments-field-container">
                                            <h4>New Passoword</h4>
                                            <div className='adjusments-field-content'>
                                                <img className="lockIcon" src={lockIcon}/>
                                                <Field id="password" name="password" type='password' className='settings-form-field'/>
                                            </div>

                                        </div>
                                        

                                        <button type="submit" className='save-button'>Save</button>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="adjusments-right-content">
                                <Formik>
                                    <Form>
                                        <div className="wedding-date">
                                            <h4>Date</h4>
                                            <div className="adjusments-field-container">
                                                <Field type="date" className='settings-form-field'></Field>
                                            </div>
                                            
                                        </div>

                                        
                                        <div className="sexOf-user">
                                            <h4>Sex</h4>
                                            <div className="adjusments-sex-field-container">
                                                <div 
                                                    className= {checkActive === true ? "sex-check" : "sex-check-active"} 
                                                    onClick={()=> setCheckActive(!checkActive)}
                                                    >M
                                                </div>
                                                <div 
                                                    className= {checkActive === false ? "sex-check" : "sex-check-active"}
                                                    onClick={()=> setCheckActive(!checkActive)}
                                                >F
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : null
    )
}
