import React, { useEffect, useState } from "react";
import './genrePage.css';
import { useParams } from "react-router";
import axios from "axios";
import GenrePageItems from "../../components/genrePageItems/genrePageItems";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseApi } from "../../configs/configs";

export default function GenrePage(){
    const { id } = useParams();
    const cookies = new Cookies();
    const userToken = cookies.get('userToken')
    
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [staticItem, setStaticItem] = useState('From A to Z');
    const [pageItems, setPageItems] = useState([]);
    const [pageHeader, setPageHeader] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [itemLength, setItemLength] = useState('');
    
    function getPageDatas(){
        if(userToken !== undefined && userToken.length && userToken.length > 0){
            axios({
                method: 'GET',
                url: `${baseApi}/azclassics/genre/${id}`,
                headers: {
                    "Authorization" : `bearer ${cookies.get('userToken')}`
                }
            }).then((response) => {
                setPageItems(response.data)
                setItemLength(response.data.length)
            })
        }
        else{
            axios({
                method: 'GET',
                url: `${baseApi}/azclassics/genre/${id}`
            }).then((response) => {
                setPageItems(response.data)
                setItemLength(response.data.length)
                
            })
        }
        
        
        
    }

    useEffect(()=>{
        
        getPageDatas()
        axios({
            method: 'get',
            url: `${baseApi}/professions`
        })
            .then((response)=> {
                for(let i in response.data){
                    if(response.data[i].professionid === Number(id)){
                        setPageHeader(response.data[i].name)
                        setPageTitle(response.data[i].title)
                    }
                }
            })
        axios({
            method: 'POST',
            url: `${baseApi}/filter`,
        })

        
    },[id])
    function sortItems(sortTo){
        setShowSubmenu(!showSubmenu)
        console.log(sortTo)
    }
    
    return(
        <section>  
            <div className="genrePageContainer">
                <div className="genrePageTransparent">
                    <div className="genrePageTransparentImage">
                        <img src='https://media.istockphoto.com/id/866383490/photo/book-store.jpg?s=612x612&w=is&k=20&c=_YztHsnHzy_qxHeeuIbaF4U4v4AsQ0At70D1YF5nqXM='/>
                    </div>
                    <div className="genrePageTransparentButtonContainer">
                        <Link to={'/'} className='transparentLinkTo' >Main Page</Link>
                        <Link to={''} className='transparentLinkTo active'>Genre Page</Link>
                    </div>
                    <div className="genrePageTransparentHeadersContainer">
                            <h1 className="genrePageTransparentHeaderItems">{pageHeader}</h1>
                            <h3 className="genrePageTransparentHeaderItems-small">{pageTitle}</h3>
                    </div>
                </div>
                <div className="genrePage">


                    <div className="genrePageLeft">
                        {   pageItems.length > 0 ?
                        <div className="genrePageFilterContainer">
                            <div className="genrePageFilterContainerHeader">
                                <h2>Sort Page Items</h2>
                            </div>
                            <div className="genrePageFilterContainerItems">
                            
                            

                                <div className='choose-direction'>
                                    <div className="choose-direction-header" onClick={()=> setShowSubmenu(!showSubmenu)}>
                                        <span>{staticItem}</span>
                                        <img className='arrow-icon-direction' 
                                        src={'https://www.pngfind.com/pngs/m/52-520060_free-png-download-down-arrow-grey-png-images.png'}/>
                                    </div>
                                    { showSubmenu ? 
                                    <>
                                        <div className="select-direction-submenu-caret"></div>
                                        <div className="select-direction-submenu">
                                            <ul className='select-direction-list-items'>
                                                <li onClick={()=> sortItems('From A to Z') }>A to Z</li>
                                                <li onClick={()=> sortItems('From Z to A')}>Z to A</li>
                                            </ul>
                                        </div>
                                    </>
                                        
                                    : null
                                    }
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        : null
                        }
                    </div>
                    {  pageItems.length > 0 ?
                        <div className="genrePageRight">
                            <div className="genrePageHeaderContainer">
                                
                                <div className="genrePageHeader" >
                                    
                                    <h2 className="itemLength">{itemLength} Items</h2>
                                </div>
                                    
                            </div>

                            <div className="genrePageItemContainer">
                                {
                                    <div className="genrePageItemContainerBody">
                                        {
                                            pageItems.map((item,index) => 
                                                <GenrePageItems item={item} key={index}/>
                                            )
                                        }
                                    </div>

                                }
                                
                            </div>
                        </div>
                    :   
                    <div className="noResultContainer">
                        <h1>Ooops No Result Here</h1>
                        <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"/>
                    </div> 
                    }
                </div>
                
            </div>
        </section>
        
    )
}