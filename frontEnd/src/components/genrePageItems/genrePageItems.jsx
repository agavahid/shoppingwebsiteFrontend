import React, { useEffect, useState } from "react";
import './genrePageItems.css'
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../configs/configs";
export default function GenrePageItems({item}){

    const[isLiked, setIsLiked] = useState(false);
    const cookies = new Cookies;
    const navigate = useNavigate();

    useEffect(()=>{
        
        if(item.wishlist === 1){
            setIsLiked(true)
        }
    },[])
    
    
    function handleLike(itemid){
        setIsLiked(!isLiked)
        const cookie = cookies.get('userToken')
        if (cookie === undefined){
            navigate('/login')
        }
        else{
            if(isLiked === true) {
                axios({
                    method: 'DELETE',
                    url: `${baseApi}/login/shoppingcart`,
                    data: {
                        itemid: itemid
                    },
                    headers: {
                        Authorization : `bearer ${cookies.get('userToken')}`
                    }
                }).then(response => console.log(response))
            }else{
                axios({
                    method: 'PUT',
                    url: `${baseApi}/login/shoppingcart`,
                    data: {
                        itemid: itemid
                    },
                    headers: {
                        Authorization : `bearer ${cookies.get('userToken')}`
                    }
                }).then(response => console.log(response))
            }
        }
    }
    return(
        <div className="genrePageItem">
            <div className="genrePageItemHeader">
                <img src={item.url}/>
                <div className="genrePageLikeIcon"  onClick={()=> handleLike(item.itemid)}>
                    <img src={isLiked === true ? 'https://wed.az/static/media/Frame-heart.3c9e0c8b.svg' : "https://wed.az/static/media/Frame%202.54.c4c248f5.svg"} />
                </div>
            </div>
            <div className="genrePageItemBody">
                <h3>Name: {item.fullname}</h3>
                <span>Piece: {item.piece}</span>
                <span>Born: {item.born}</span>
                <Link className="linkToChoosedItem" to={`/item/${item.itemid}`}>See More About</Link>
            </div>
            
        </div>
    )
}