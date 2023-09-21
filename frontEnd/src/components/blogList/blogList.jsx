import React from "react";
import './blogList.css';
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteItem from "../modals/deleteItem/deleteItem";
import ChangeItem from "../modals/changeItem/changeItem";
import AddItem from "../modals/addItem/addItem";
import { baseApi } from "../../configs/configs";

export default function BlogList(){
    const [pageItem, setPageItem] = useState([]);
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
            return "blogEditorContainer active"
        }else{
            return "blogEditorContainer"
        }
    }
    function stop(e){
        e.stopPropagation()
    }
    function getPageItem(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics/blogs`
        })
        .then(response => {
            setPageItem(response.data)
            console.log(response.data)

        })
    }
    useEffect(()=>{
        getPageItem()
    },[])
    return(
        
        <>
        
        {
            pageItem.length && pageItem.length > 0 ? 
            <div className="blogsContainer">
                <AddItem url ={'blogs'} isRender={getPageItem}/>
                {
                    pageItem.map((item, index) => 
                       
                        <div className="blog" key={index}>
                            <div className="blogInfos">
                                <div className="blogInfosLeft">
                                    <span>Author Name: <span>{item.fullname}</span> </span>
                                    <span>Author Title: <span>{item.title}</span></span>
                                </div>
                                <div className="blogInfosRight">
                                    <span>Born: <span>{item.born}</span></span>
                                    <span>Popular Piece: <span>{item.popularpiece}</span></span>
                                </div>
                                
                                <div className="blogEditor" onClick={()=> changeActivity(index)}>
                                    <img className="blogEditIcon" src="https://static.thenounproject.com/png/425205-200.png"/>
                                    <div index={index} className={controlActivity(index)} onClick={(e)=>stop(e)}>
                                        <DeleteItem url ={'blogs'} id={item.id} isRender={getPageItem}/> 
                                        <ChangeItem url ={'blogs'} id={item.id} isRender={getPageItem}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    )
                    /* DELETE ITEM A LINK BASLIGI GÖNDERMEYI UNUTMA */
                }
            </div>
            : null
        }
        </>
        
        
    )
}