import React, {useState , useEffect} from "react";
import './searchInput.css';
import searchIcon from '../../assets/icons/generalicons/search-icon.png'
import axios from "axios";
import {Link} from "react-router-dom"
import { baseApi } from "../../configs/configs";


export default function SearchInput(){

    const [searchText, setSearchText] = useState('');
    const [resultArr, setResultArr] = useState([]);    
    
    useEffect(()=>{
        if(searchText.length !== 0){
            axios({
                method: "GET",
                url: `${baseApi}/azclassics/book/search?q=${searchText}`
            }).then((response)=>
                setResultArr(response.data)
            )
        }else{
            setResultArr([])
        }
        
    },[searchText])
    function handleClick(){
        setSearchText('');
        document.getElementById('searchInputId').value = '';
    }
    return(
        <div className="inputContainer">
            <input type="text" placeholder="Search by title, author or keyword" className="searchInput" id="searchInputId" onChange={(e)=> setSearchText(e.target.value)}/> 
            <img src={searchIcon} className="searchImg"/>
            {
                resultArr.length > 0 ?
                    <div className="searchResultContainer">
                        <div className="searchResultContens">
                            <ul className="searchResultItems">
                                { 
                                    resultArr.map((item,index)=>
                                        <li className="searchResultListItem" key={index} onClick={()=> handleClick()}>
                                            <Link to={`/item/${item.itemid}`} className="searchItemLink">
                                                <div className="contentItemLeft">
                                                    {`${item.fullname}`}
                                                </div>
                                                <div className="contentItemRight">
                                                    <img src={`${item.url}`}/>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                    : null
            }
            
        </div>
        
    )
}