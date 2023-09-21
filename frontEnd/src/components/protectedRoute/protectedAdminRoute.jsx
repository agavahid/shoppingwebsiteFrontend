import React from "react";


import { useNavigate } from "react-router-dom"; 
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/features/loginValue/loginValue';
import { useEffect } from "react";
import  Cookies  from 'universal-cookie';


export default function ProtectedAdminRoute({children}){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(cookies.get('adminToken')) {
          //dispatch(setLogin()) // async
          navigate('/admin/dashboard/users')
        }else{
          navigate('/admin/login')
        }
    },[])

     
    if(cookies.get('adminToken')) {
        return children
    }
    
    return false;
}