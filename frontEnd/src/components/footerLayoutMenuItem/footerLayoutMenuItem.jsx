import React from "react";
import './footerLayoutMenuItem.css';
import { Link } from "react-router-dom";




export default function FooterLayoutMenuItem({itemMenu}){
    return(
        <div className="footerMenu" >
            <div className="footerMenuItemHeader">
                <h3>{itemMenu.itemName}</h3>
            </div>
            <div className="footerMenuItemContainer">
                {   
                    itemMenu.menuItem.map((menuItem, i)=>
                        <Link className="linkToFooterMenuItem" to={`/`} key={i}>{menuItem}</Link>
                    )
                } 
            </div>
            
        </div>
    )
}