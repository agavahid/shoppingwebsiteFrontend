import React from "react";
import './blogs.css';
import { Link } from "react-router-dom";


export default function Blogs(){

    
    return(
        <div className="blogContainer">
            <div className="blogHeader">
                <h1 className="BlogHeaderItem">
                    See Blog Items
                </h1>
            </div>
            <div className="blogCard">
                <img className="blogCardImg" src="https://i.guim.co.uk/img/media/84d82b388f25613597e6c652f78a201f30f5545e/0_635_4626_2775/500.jpg?quality=85&auto=format&fit=max&s=377231d3e3f38f91c07b6ebc544cbb01"/>
                <div className="blogCardHover">
                    <Link className="blogCardHoverLink" to={'/blogs'}>Read More..</Link>
                </div>
            </div>
        </div>
    )
}