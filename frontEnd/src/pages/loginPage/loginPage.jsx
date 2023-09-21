import React, {  useState } from "react";
import './loginPage.css';
import { Link , useNavigate} from "react-router-dom";
import { Formik, Form, Field, useFormik } from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { setLogin } from '../../store/features/loginValue/loginValue'
import { baseApi } from "../../configs/configs";

export default function LoginPage(){

    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    
    function login({ values }) {
        const {email, password} = values;

        axios({
            method: 'POST', 
            url: `${baseApi}/login`,
            data: {
                email: email, 
                password: password
            }
        }).then((response) => {
            
            if(response.data.status !== undefined && response.data.status === 401){
                setErrorMsg(response.data.message);
                
            }
            if(response.data.status === undefined){
                navigate('/');
                cookies.set("userToken", response.data)
                dispatch(setLogin())
            }
            
        })       
    }
    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
          email : '',
          password: '',
        },
        onSubmit: values => {
            login({ values });
        }
      })
    return (
        <div>
            <div className="loginPage">
                <div className="pageImg">
                    <img src="" className="pageImgItem"/>
                </div>
                <div className="loginSection">
                    <h1>Login to your Profile</h1>
                    
                    <Formik>
                        <Form > 
                            <Field 
                                type="email"
                                name="email"
                                id="usermail"
                                className='loginFormInput'
                                placeholder="E-Mail"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Field
                                type="text"
                                name="password"
                                id="password" 
                                className='loginFormInput' 
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <p className="errorMsg">{errorMsg}</p>
                        <button type="button" onClick={()=> handleSubmit()} className="loginButton" id="loginFormButton" >Log In</button>
                        </Form>
                    </Formik>
                    <div className="loginSectionRegisterPart">
                        <p>Do you have not account yet?</p>
                        <p><Link to={'/register'} className="linkToRegister">Register</Link> here </p>
                    </div>
                    
                </div> 
            </div>
        </div>
    )
}