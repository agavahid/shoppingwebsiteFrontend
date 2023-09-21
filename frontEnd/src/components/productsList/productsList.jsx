import React from "react";
import './productsList.css';
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteItem from "../modals/deleteItem/deleteItem";
import ChangeItem from "../modals/changeItem/changeItem";
import AddItem from "../modals/addItem/addItem";
import { baseApi } from "../../configs/configs";


export default function ProductsList(){
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
            return "productEditorContainer active"
        }else{
            return "productEditorContainer"
        }
    }
    function stop(e){
        e.stopPropagation()
    }
    function getPageItem(){
        axios({
            method: 'GET',
            url: `${baseApi}/azclassics`
        })
        .then(response => {
            setPageItem(response.data)
        })
    }
    useEffect(()=>{
        getPageItem()
    },[])
    
    return(
        
        <>
       
        {
            pageItem.length && pageItem.length > 0 ? 
            <div className="productsContainer">
                <AddItem url ={'item'} isRender={getPageItem}/>
                {
                    pageItem.map((item, index) => 
                       
                        <div className="product" key={index}>
                            <div className="productInfos">
                                <div className="productInfosLeft">
                                    <span>Author Name: <span>{item.fullname}</span> </span>
                                    <span>Piece: <span>{item.piece}</span></span>
                                </div>
                                <div className="productInfosRight">
                                    <span>Born: <span>{item.born}</span></span>
                                    <span>ItemId: <span>{item.itemid}</span></span>
                                </div>
                                
                                <div className="productEditor" onClick={()=> changeActivity(index)}>
                                    <img className="productEditIcon" src="https://static.thenounproject.com/png/425205-200.png"/>
                                    <div index={index} className={controlActivity(index)} onClick={(e)=>stop(e)}>
                                        <DeleteItem url ={'item'} id={item.itemid} isRender={getPageItem}/> 
                                        <ChangeItem url ={'item'} id={item.itemid} isRender={getPageItem}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    )
                }
                
            </div>
            : null
        }
        </>
        
        
    )
}