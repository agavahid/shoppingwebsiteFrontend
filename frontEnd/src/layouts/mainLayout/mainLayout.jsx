import React, { useEffect } from "react";
import './mainLayout.css';
import HeaderLayout from '../headerLayout/headerLayout';
import FooterLayout from '../footerLayout/footerLayout';
import { useDispatch } from "react-redux";
import { setLogin, setAdminLogIn } from "../../store/features/loginValue/loginValue";
import Cookies from "universal-cookie";


export default function MainLayout({children}) {
    const cookies = new Cookies;
    const dispatch = useDispatch();


    useEffect(()=>{

        const userToken = cookies.get('userToken');
        const adminToken = cookies.get('adminToken');
        if(userToken !== undefined){
            dispatch(setLogin())
        }else if(adminToken !== undefined){
            dispatch(setAdminLogIn())
        }
       
    },[])
    return(
        <>
        <HeaderLayout/>
            {children}
        <FooterLayout/>
        </>
        
    )
}