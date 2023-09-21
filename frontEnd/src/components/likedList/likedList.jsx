import './likedList.css';


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Cookies  from 'universal-cookie';
import arrowToBottom from '../../assets/icons/cardIcons/arrowToBottom.jpg';
import { baseApi } from '../../configs/configs';


export default function LikedList(){

    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [defaultItem, setDefaultItem] = useState('From A to Z');
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [render, setRender] = useState(false);
    const cookies = new Cookies();

   
    useEffect(()=>{
        axios({
            method: 'get',
            url: `${baseApi}/login/shoppingcart`,
            headers: {
                "Authorization" : `Bearer ${cookies.get('userToken')}`
            }
        })
        .then((response)=>
            setShoppingCartItems(response)
        )
    },[render])

    const getDatas = (id) =>{
        
        axios({
            method: 'delete',
            url: `${baseApi}/login/shoppingcart`,
            data: {
                itemid: id
            },
            headers: {
                Authorization : `bearer ${cookies.get('userToken')}`
            }
              
        })
        .then((response)=>
        
            response.status === 200 ? 
            setRender(!render)
            : null
        )
        
    }

    return(
        <>
            <div className="liked-list-header">
                <h2>Liked Items</h2>

                <div className='choose-direction-container'>
                    <div className="choose-direction-container-header"
                        onClick={()=> setShowSubmenu(!showSubmenu)}                    
                    >
                        <span>{defaultItem}</span>
                        <img className='arrow-icon' src={arrowToBottom}/>
                    </div>
                    {showSubmenu ? 
                        <div className="select-submenu">
                            <div className="select-submenu-caret"></div>
                            <ul className='select-list-items'>
                                <li onClick={()=> setDefaultItem('From A to Z')}>From A to Z</li>
                                <li onClick={()=> setDefaultItem('From Z to A')}>From Z to A</li>
                            </ul>
                        </div>
                    : null
                    }
                    
                </div>
            </div>
            <div className="liked-list-body">
                {
                    shoppingCartItems.data !== undefined ?
                        shoppingCartItems.data.map((choosedItem,i)=>
                            
                            
                            <div className='selected-item' key={i}>
                                <div className='selected-item-img-container'>
                                    <img
                                        className='selected-item-img'
                                        src={choosedItem.url} 
                                    />
                                    <div
                                        className="hearth-icon-container"
                                        onClick={()=> getDatas(choosedItem.cartitemid)}                    
                                    >
                                        <img src={`https://wed.az/static/media/Frame-heart.3c9e0c8b.svg`}/>
                                    </div>
                                    <div className="count-icon-container">
                                        <img src={'https://wed.az/static/media/Frame%202.53.e7fee3a3.svg'}/>
                                        <span className='count-span'>{choosedItem.genre}</span>
                                    </div>
                                    
                                </div>
                                <div className="selected-item-text-container">
                                    <Link to={`/item/${choosedItem.itemid}`}>
                                        <h3>{choosedItem.fullname}</h3>
                                        <div className="choosedItemIconText">
                                            <img src="https://www.pngitem.com/pimgs/m/1-19073_transparent-shipping-box-clipart-product-icon-png-white.png"/>
                                            <h3>{choosedItem.piece}</h3>
                                        </div>
                                    </Link>
                                    
                                    <span><img src={''} />{}</span>
                                </div>
                                <div className="item-description">
                                    {/*choosedItem.service.item.description.slice(0,72)*/}
                                    <Link 
                                        to={`/item/${choosedItem.itemid}`}
                                        className='choosedItem-link'
                                    >...more about {}</Link>
                                </div>

                            </div>
                            
                        )
                    
                        :
                        <div className="no-choosed-item-container">
                            <div className='no-choosed-item'>
                                <span>You Have Not Selected Item.</span>
                            </div>
                        </div>
                    
                }
            </div>
        </>
    )
}