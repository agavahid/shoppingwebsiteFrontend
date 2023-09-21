import React, { useEffect, useRef, useState } from "react";
import Genres from '../../components/genres/genres';
import './headerLayout.css';
import { Link } from 'react-router-dom';
import SearchInput from "../../components/search/searchInput";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, setAdminLogOut } from '../../store/features/loginValue/loginValue';
import leftMobileIcon from "../../assets/icons/mainPageIcons/menu-left.png";
import rightMobileIcon from "../../assets/icons/mainPageIcons/menu-right.png";
import closeIcon from "../../assets/icons/mainPageIcons/close-blue.png";
import Cookies from 'universal-cookie';


export default function HeaderLayout(){

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const isAdminLoggedIn = useSelector(state => state.login.isAdminLogged);
    const cookies = new Cookies();
    const [isActive, setIsActive] = useState(false);
    const [leftMenu, setLeftMenu] = useState(false);
    const [rightMenu, setRightMenu] = useState(false);
    const [isLeftDrpActive, setLeftDrpActive] = useState(false);

    function setLeftDrpDownMenu(){
        setLeftDrpActive(!isLeftDrpActive)
    }
    function logOutFunc(e){
        e.stopPropagation()
        cookies.remove('userToken');
        dispatch(setLogOut())
        activity()
        setRightMenu(false)
    }
    function adminLogout(e) {
        e.stopPropagation()
        cookies.remove('adminToken');
        dispatch(setAdminLogOut())
        activity()
        setRightMenu(false)
    }
    function activity(e){
        e.stopPropagation()
        setIsActive(!isActive)
        if(isLeftDrpActive === true){
            setLeftDrpActive(false)
        }
    }
    function activityMobile(){
        setLeftMenu(false)
        setRightMenu(false)
        document.body.style.overflow = 'auto';
    }
    function setContentsMenuLeft(){
        setLeftMenu(!leftMenu)
        if(leftMenu === true){
            document.body.style.overflow = 'auto';
        }else{
            document.body.style.overflow = 'hidden';
        }
    }
    function setContentsMenuRight(e){
        setRightMenu(!rightMenu)
        if(rightMenu === true){
            document.body.style.overflow = 'auto';
        }else{
            document.body.style.overflow = 'hidden';
        }
    }
    function closeMenu(){
        if(isActive === true){
            setIsActive(false)
        }
    }
    
    document.addEventListener("click", closeMenu)
    

    return( 
        <header>
            <nav className='navbar'>
                <div className="container">
                    <div className="contents">
                        <div className="leftMobileMenuIcon"  onClick={()=> setContentsMenuLeft()}>
                            <img src={leftMobileIcon}/>
                        </div>
                        <div className={leftMenu === false ? "leftContents" : "leftContents active"}>
                            <div className={leftMenu === false ? "leftContentShadow" : "leftContentShadow active"}></div>
                            <div className={leftMenu === false ? "leftContentsMenu": "leftContentsMenu active"}>
                                <div className="leftContentsTop" onClick={()=> setContentsMenuLeft()}>
                                    <img src={closeIcon} />
                                </div>
                                <div className="leftContentsBottom">                                    
                                    <div className={leftMenu === false ? "headerLogo" : "headerLogo active"}> 
                                        <Link to={'/'} onClick={()=> activityMobile()}>
                                            <img src='https://icon2.cleanpng.com/20180412/vxe/kisspng-ibooks-computer-icons-desktop-wallpaper-ios-7-book-5acf9f2135f831.8549188515235561292211.jpg' className='mainLogo'/>    
                                        </Link>
                                        <Genres 
                                            buttonClick={activityMobile} 
                                            rightMenuActivity={isActive} 
                                            setrightMenuActivity={setIsActive} 
                                            isleftDrpMenuActive={setLeftDrpDownMenu}    
                                            isLeftDrpActive={isLeftDrpActive}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="middleContents">
                            <SearchInput/>
                        </div>
                        { 
                            isAdminLoggedIn === true ?
                                
                                <div className="rightContents">
                                    <div className="rightMobileMenuIcon" onClick={(e)=> setContentsMenuRight(e)}>
                                        <img src={rightMobileIcon}/>
                                    </div>
                                    <div className={rightMenu === false ? "rightContentShadow" : "rightContentShadow active"}></div>
                                    <div className={rightMenu === false ? "rightContentsMenu" : "rightContentsMenu active" }>
                                        <div className={rightMenu === false ? "rightContentsMenuTop" : "rightContentsMenuTop active"}>
                                            <img src={closeIcon} onClick={(e)=> setContentsMenuRight(e)}/>
                                        </div>
                                        <div className={rightMenu === false ? "rightContentsMenuBottom" : "rightContentsMenuBottom active"}>
                                            <div className="rightContentsUser">
                                                <div className="rightContentsUserHeader" onClick={(e)=> activity(e)}>
                                                    <h3>Admin Items</h3>
                                                </div>
                                                
                                                <div className={isActive === false ? "userProfileCaret" : "userProfileCaret active"}></div>
                                                <div className={isActive === false ? "rightContentsUserBody" : "rightContentsUserBody active"}>
                                                    <Link className="toLogin" to={'/admin/dashboard'} onClick={()=> activityMobile()}>Dashboard</Link>
                                                    <Link className="toLogin" to={'/'} onClick={(e)=> adminLogout(e)}>Log Out</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :

                            isLoggedIn === false ? 
                            
                            <div className="rightContents">
                                <div className="rightMobileMenuIcon" onClick={(e)=> setContentsMenuRight(e)}>
                                    <img src={rightMobileIcon}/>
                                </div>
                                <div className={rightMenu === false ? "rightContentShadow" : "rightContentShadow active"}></div>
                                <div  className={rightMenu === false ? "rightContentsMenu" : "rightContentsMenu active" }>
                                    <div className={rightMenu === false ? "rightContentsMenuTop" : "rightContentsMenuTop active"}>
                                        <img src={closeIcon} onClick={(e)=> setContentsMenuRight(e)}/>
                                    </div>
                                    <div className={rightMenu === false ? "rightContentsMenuBottom" : "rightContentsMenuBottom active"}>
                                        <Link to={'/login'} onClick={()=> activityMobile()}>
                                            <img className="toCartItem"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz0Ohchf7vyTf4psg8TZJP_45drCu6fjUCQw&usqp=CAU"/>
                                        </Link>
                                        <div className="rightContentsUser">
                                            <div className="rightContentsUserHeader" onClick={(e)=> activity(e)}>
                                                <h3>User Profile</h3>
                                            </div>
                                            
                                            <div className={isActive === false ? "userProfileCaret" : "userProfileCaret active"}></div>
                                            <div className={isActive === false ? "rightContentsUserBody" : "rightContentsUserBody active"}>
                                                <Link className="toLogin" to={'/admin/login'} onClick={()=> activityMobile()}>Admin</Link>
                                                <Link className="toRegister" to={'/register'} onClick={()=> activityMobile()}>Register</Link>
                                                <Link className="toLogin" to={'/login'} onClick={()=> activityMobile()}>Log In</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :  
                            <div className="rightContents">
                                <div className="rightMobileMenuIcon" onClick={(e)=> setContentsMenuRight(e)}>
                                    <img src={rightMobileIcon}/>
                                </div>
                                <div className={rightMenu === false ? "rightContentShadow" : "rightContentShadow active"}></div>
                                <div className={rightMenu === false ? "rightContentsMenu" : "rightContentsMenu active" }>
                                    <div className={rightMenu === false ? "rightContentsMenuTop" : "rightContentsMenuTop active"}>
                                        <img src={closeIcon} onClick={(e)=> setContentsMenuRight(e)}/>
                                    </div>
                                    <div className={rightMenu === false ? "rightContentsMenuBottom" : "rightContentsMenuBottom active"}>
                                        <Link to={'/profile/likedList'} onClick={()=> activityMobile()}>
                                            <img className="toCartItem" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz0Ohchf7vyTf4psg8TZJP_45drCu6fjUCQw&usqp=CAU"/>
                                        </Link>
                                        <div className="rightContentsUser">
                                            <div className="rightContentsUserHeader"  onClick={(e)=> activity(e)}>
                                                <h3>User Profile</h3>
                                            </div>
                                            <div className={isActive === false ? "userProfileCaret" : "userProfileCaret active"}></div>
                                            <div className={isActive === false ? "rightContentsUserBody" : "rightContentsUserBody active"}>
                                                <Link className="toRegister" to={'/profile/settings'} onClick={()=> activityMobile()}>Profile</Link>
                                                <Link className="toLogin" to={'/'} onClick={(e)=> logOutFunc(e)}>Log Out</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}



