import React, { useEffect, useState } from "react";
import './itemPage.css';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import hearthIcon from '../../assets/icons/generalicons/hearth-icon.png';
import formIcon from '../../assets/icons/generalicons/letterIcon.svg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseApi } from "../../configs/configs";

export default function ItemPage(){
    
    const cookies = new Cookies();
    const { id } = useParams();
    const [ pageItems, getPageItems ] = useState([]);
    const [ isSelected, setSelected ] = useState(false);

    const userToken = cookies.get('userToken')
    const [authorName, setAuthorName] = useState('');
    const [pieceName, setPieceName] = useState('');
    const [bornDate, setBornDate] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const navigate = useNavigate()


    function getPageDatas(){
        if(userToken !== undefined && userToken.length && userToken.length > 0){
            axios({
                method: 'GET',
                url: `${baseApi}/azclassics/item/${id}`,
                headers: {
                    "Authorization" : `bearer ${cookies.get('userToken')}`
                }
            }).then((response) => {
                
                if(response.data[0] !== undefined){
                    getPageItems(response.data)
                    setAuthorName(response.data[0].fullname)
                    setBornDate(response.data[0].born)
                    setPieceName(response.data[0].piece)
                    setImgUrl(response.data[0].url)
                    if(response.data[0].wishlist === 1){setSelected(true)}
                }
            })
        }
        else{
            axios({
                method: 'GET',
                url: `${baseApi}/azclassics/item/${id}`,
            }).then((response) => { 
                if(response.data[0] !== undefined){
                    getPageItems(response.data)
                    setAuthorName(response.data[0].fullname)
                    setBornDate(response.data[0].born)
                    setPieceName(response.data[0].piece)
                    setImgUrl(response.data[0].url)
                }
            })
        }
    }
    useEffect(()=>{
        getPageDatas()
    },[id])

    function selectItem(itemid){
        if(isLoggedIn === false){
            navigate("/login")
        }
        else{ 
            if(isSelected === true){
                axios({
                    method: 'DELETE',
                    url: `${baseApi}/login/shoppingcart`,
                    data: {
                        itemid: itemid
                    },
                    headers: {
                        Authorization : `bearer ${cookies.get('userToken')}`
                    }
                }).then(response => {if(response.data.status === 200){setSelected(false)}})
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
                }).then(response => {if(response.data.status === 200){setSelected(true)}})
            }
        }
        
    }
    function submitChanges(){
        axios({
            method: 'PUT',
            url: `${baseApi}/azclassics/item`,
            data:{
                fullname: authorName, piece: pieceName, born: bornDate, url: imgUrl, id: pageItems[0].itemid
            }
        }).then((response) => {
            if(response.status === 200){
                getPageDatas()
                alert('Successfully Changed')
            }
        })
    }
    function changeItem(e, param){
        if(param === 'author'){
            setAuthorName(e.target.value)
        }else if(param === 'born'){
            setBornDate(e.target.value)
        }else if(param === 'piece'){
            setPieceName(e.target.value)
        }else if(param === 'url'){
            setImgUrl(e.target.value)
        }
    }
    return(
        pageItems.length && pageItems.length > 0 ?
            <section>
                <div className="itemSectionContainer">
                    <div className="itemSection">
                        <div className="itemSectionDirections">
                            <Link to={'/'} className="directionItem">Home Page</Link>
                            <Link to={`/genre/${pageItems[0].genre}`} className="directionItem">Genre Page</Link>   
                            <Link to={''} className="directionItem active">{pageItems[0].fullname}</Link>
                        </div>
                        <div className="itemSectionTop">
                            <div className="itemSectionTopLeft">
                                <div className="itemSectionTopHeader">
                                    <h3><span className="specialColorSpan">Author: </span>{pageItems[0].fullname}</h3> 
                                </div>
                                <div className="itemSectionTopBookName">
                                    <h3><span className="specialColorSpan">Book Name: </span>{pageItems[0].piece}</h3>
                                </div>
                                <div className="itemSectionTopBookName">
                                    <h3><span className="specialColorSpan">Born On: </span>{pageItems[0].born} <span className="specialColorSpan">Year</span></h3>
                                </div>
                            </div>
                            <div className="itemSectionTopRight" onClick={()=> selectItem(pageItems[0].itemid)}>
                                <img src={isSelected === false ? hearthIcon : "https://www.wed.az/static/media/Frame-heart.3c9e0c8b.svg"}/>
                                <span>Choose</span>
                            </div>
                        </div>
                        <div className="itemSectionBottom">
                            <div className="itemSectionBottomLeft">
                                <div className="itemSectionBottomLeftImgSection">
                                    <img src={pageItems[0].url}/>
                                </div>
                                <div className="itemSectionBottomLeftDescriptionSection">
                                    <h2>Description</h2>
                                    <div className="itemSectionBottomLeftDescription">
                                        {pageItems[0].description}
                                    </div>
                                </div>
                            </div>
                            <div className="itemSectionBottomRight">
                               
                                <div className="formHeader">
                                    <img src={formIcon} />
                                    <h3>Change Item Informations</h3>
                                </div>
                                <div className="changeForm">
                                    <div className="formItem">
                                        <span>Author Name</span>    
                                        <label htmlFor="changeTo" className="col-form-label"></label>
                                        <input value={authorName} onChange = {(e)=> changeItem(e, 'author')} type="text" name="changeTo" id="fullName" className="form-control"/>
                                    </div>
                                    <div className="formItem">
                                        <span>Born</span>
                                        <label htmlFor="newName" className="col-form-label"></label>
                                        <input value={bornDate} onChange = {(e)=> changeItem(e, 'born')} type="text" name="newName" id="born" className="form-control"/>
                                    </div>
                                    <div className="formItem">
                                        <span>Piece</span>    
                                        <label htmlFor="changeTo" className="col-form-label"></label>
                                        <input value={pieceName} onChange = {(e)=> changeItem(e, 'piece')} type="text" name="changeTo" id="newPiece" className="form-control"/>
                                    </div>
                                    <div className="formItem">
                                        <span>Photo Url</span>    
                                        <label htmlFor="changeTo" className="col-form-label"></label>
                                        <input value={imgUrl} onChange = {(e)=> changeItem(e, 'url')} type="text" name="changeTo" id="url" className="form-control"/>
                                    </div>
                                    <button type="button" className="submitChangeButton" onClick={(e)=> submitChanges(e)}>Submit</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        : null
    )
}

