import React, {useState} from "react";
import './registerPage.css';
import { Link } from "react-router-dom";
import { Formik, Form, Field, useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../configs/configs";


export default function RegisterPage(){
    
    const [badRequestMessage, setBadRequestMessage] = useState('');
    const navigate = useNavigate()
    function registration({username, password, email, location, phone}) {
         
        axios({
            method: 'POST', 
            url: `${baseApi}/register`,
            data: {
                username: username, 
                password: password, 
                email: email, 
                location: location, 
                phone: phone
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status && response.data.status === 400){
                setBadRequestMessage(response.data.message)
            }else if(response.data.status && response.data.status === 200){
                alert(response.data.message)
                navigate('/login')
            }
        })
         
    }

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
          username : '',
          password: '',
          email: '',
          location: '',  
          phone: ''
        },
        onSubmit: values => {
            registration({username: values.username, password: values.password, email: values.email, location: values.location, phone: values.phone });
        }
      })
    return (
        <div>
            
            <div className="registerPage">
                <div className="pageImg">
                    <img src="" className="pageImgItem"/>
                </div>
                <div className="registerSection">
                    <h1>Register to your Profile</h1>
                    <Formik>
                        <Form >
                            <Field 
                                type="text"
                                name="username"
                                id="username"
                                className='registerFormInput'
                                placeholder="UserName"
                                value={values.username}
                                onChange={handleChange}
                            />
                            <Field
                                type="string"
                                name="password"
                                id="password" 
                                className='registerFormInput' 
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Field
                                type="email" 
                                name="email" 
                                id="email" 
                                className='registerFormInput' 
                                placeholder="E-Mail"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Field
                                type="text" 
                                name="location" 
                                id="location" 
                                className='registerFormInput' 
                                placeholder="location"
                                value={values.location}
                                onChange={handleChange}
                            />
                            <Field 
                                type="number" 
                                name="phone" 
                                id="phone" 
                                className='registerFormInput' 
                                placeholder="phone"
                                value={values.phone}
                                onChange={handleChange}
                            />
                        <button type="button" onClick={()=> handleSubmit()} className="registerButton" id="registerFormButton" >Register</button>
                        <h3 className="badRequestMessage">{badRequestMessage}</h3>
                        </Form>
                    </Formik>
                    
                    <div className="registerSectionLoginPart">
                        <p>Do you have account?</p>
                        <p><Link to={'/login'} className="linkToLogin">Login</Link> here </p>
                    </div>
                    
                </div> 
            </div>
        </div>
    )
}