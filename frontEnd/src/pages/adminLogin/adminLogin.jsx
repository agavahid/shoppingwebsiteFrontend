import React, {  useState } from "react";
import './adminLogin.css';
import { useNavigate} from "react-router-dom";
import { Formik, Form, Field, useFormik } from 'formik';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setAdminLogIn } from '../../store/features/loginValue/loginValue'
import { baseApi } from "../../configs/configs";

export default function AdminLoginPage(){

    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    

    function login({ values }) {
        const {email, password} = values;

        axios({
            method: 'POST', 
            url: `${baseApi}/admin/login`,
            data: {
                adminname: email, 
                adminpassword: password
            }
        }).then((response) => {
            
            if(response.data.status !== undefined && response.data.status === 401){
                setErrorMsg(response.data.message);
            }
            if(response.data.status === undefined){
                navigate("/admin/dashboard");
                cookies.set("adminToken", response.data)
                dispatch(setAdminLogIn())
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
            <div className="adminloginPage">
                <div className="adminpageImg">
                    <img src="" className="adminpageImgItem"/>
                </div>
                <div className="adminSection">
                    <h1>Admin Login</h1>
                    
                    <Formik>
                        <Form >
                            <Field 
                                type="email"
                                name="email"
                                id="usermail"
                                className='adminFormInput'
                                placeholder="Name: admin"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Field
                                type="text"
                                name="password"
                                id="password" 
                                className='adminFormInput' 
                                placeholder="Password: admin"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <p className="errorMsg">{errorMsg}</p>
                        <button type="button" onClick={()=> handleSubmit()} className="adminloginButton" id="adminFormButton" >Log In</button>
                        </Form>
                    </Formik> 
                </div> 
            </div>
        </div>
    )
}