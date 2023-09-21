import React, { useState } from "react";
import './blogPageItems.css';



export default function BlogPageItems({item}){
    const [isOpen, setIsOpen] = useState(false);
    function open(){
        setIsOpen(true)
    }
    console.log(item)
    return(
        <div className="blogPageItem" >
            <div className="BlogPageItemHeader">
                <img src={item.url}/>
            </div>
            <div className="blogPageItemabout">
                <h1 className="PageItemName">{item.fullname}</h1>
                <h3 className="PageItemName">{item.title}</h3>
                <h3 className="PageItemName">Born: {item.born}</h3>
                <h3 className="PageItemName">Nation: {item.nation}</h3>
                <h3 className="PageItemName">Popular Piece: {item.popularpiece}</h3>
                <div className="pageItemDescription">
                    <div className={isOpen === false ? "pageItemDescriptionItem" : "pageItemDescriptionItem active"}>{item.description}</div>
                    <span onClick={()=> open()} className={isOpen === false ? "itemDesctiptionSpanActive" : "itemDesctiptionSpanDeactive"}>..Read More</span>
                </div>
            </div>
        </div>
    )
}