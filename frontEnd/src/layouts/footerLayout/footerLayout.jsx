import React from "react";
import './footerLayout.css';
import { footerMenu } from "../../components/footerMenuItems/footerMenuItems";
import { Link } from "react-router-dom";
import FooterLayoutMenuItem from "../../components/footerLayoutMenuItem/footerLayoutMenuItem";



export default function FooterLayout(){
    return(
        <footer>
            <div className='footer'>
                <div className="footerMenuContainer">
                    { 
                        footerMenu.map((item,index) => 
                            <FooterLayoutMenuItem itemMenu={item} key={index}/>
                        ) 
                    }
                </div>
                <div className="footerMenuLine"></div>
                <div className="footerBottom">
                    <div className="copyRights">
                        <h3>2023 Advertical Media LLC. All Rights Reserved.</h3>
                    </div>
                    <div className="termsPrivacy">
                        <Link className="linkToPrivacy" to={''}>Terms/Privacy</Link>
                    </div>
                </div>
                
            </div>      
        </footer>
        
    )
}	