import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './genreCataloge.css';
import axios from 'axios'
import { baseApi } from "../../configs/configs";

export default function GenreCataloge(){

    const[sectionItems, setSectionItems] = useState([]);
    
    useEffect(()=>{

        axios({
            method: 'GET',
            url: `${baseApi}/professions`
        })
        
        .then(response => {
            setSectionItems(response.data)
        })
    },[])



    return(
        sectionItems.length && sectionItems.length > 0 ? 
        
            <div className="genreCatalogeContainer">
                <div className="genreCatalogeHeader">
                    <h3>Browse Genres</h3>
                </div>
                <div className="genreCatalogeMenu">
                    {
                        sectionItems.map((index,i) => 
                        
                            <Link className="genreCalatogeMenuItem" key={i} to={`/genre/${index.professionid}`}>
                                <img src={index.prourl}/>
                                <div className="spanHolderLinear"/>
                                <span>{index.name}</span>
                            </Link>
                        )
                    }
                </div>
            </div>
        : null
        
    )
}











