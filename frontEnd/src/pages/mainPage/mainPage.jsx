import React from "react";
import './mainPage.css';
import HeaderSwiper from "../../components/swipers/headerSwiper/headerSwiper"
import GenreCataloge from "../../components/genreCataloge/genreCataloge";
import Blogs from "../../components/blogs/blogs";

export default function MainPage(){
    
    return(
    
        <div className="mainPage">
            <HeaderSwiper/>
            <GenreCataloge/>
            <Blogs/>
        </div>
    )
}