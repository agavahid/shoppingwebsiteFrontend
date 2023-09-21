import React from "react";
import './userInfos.css';
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteItem from "../modals/deleteItem/deleteItem";
import ChangeItem from "../modals/changeItem/changeItem"
import { baseApi } from "../../configs/configs";


export default function UserInfos(){
    const [pageItems, setPageItems] = useState([]);
    const [val, setVal] = useState(1000);

    function changeActivity(index){
        if(index === val){
            setVal(1000)
        }else{
            setVal(index)
        }
    }
    function controlActivity(index){
        if(val === index){
            return "userEditorContainer active"
        }else{
            return "userEditorContainer"
        }
    }
    function stop(e){
        e.stopPropagation()
    }
    function getPageItems(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics/users`
        })
        .then(response => {
            setPageItems(response.data)
        })
    }
    useEffect(()=>{
        getPageItems()
    },[])
   
    return(
        <>{
            pageItems.length && pageItems.length > 0 ? 
            <div className="pageItemsContainer">

                {
                    pageItems.map((item, index) => 
                       
                        <div className="pageItem" key={index}>
                            <div className="pageItemInfos">
                                <div className="pageItemInfosLeft">
                                    <span>UserName: <span>{item.userName}</span> </span>
                                    <span>Email: <span>{item.email}</span></span>
                                </div>
                                <div className="pageItemInfosRight">
                                    <span>Location: <span>{item.location}</span></span>
                                    <span>UserId: <span>{item.userid}</span></span>
                                </div>
                                <div className="pageItemEditor" onClick={()=> changeActivity(index)}>
                                    <img className="productEditIcon" src="https://static.thenounproject.com/png/425205-200.png"/>
                                    <div index={index} className={controlActivity(index)} onClick={(e)=>stop(e)}>
                                        <DeleteItem url ={'user'} id={item.userid} isRender={getPageItems}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    )
                }
            </div>
            : null
        }</>
    )
} 