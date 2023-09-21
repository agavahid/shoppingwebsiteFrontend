import React from "react";
import './headerSwiper.css';
import "swiper/css/pagination";
import "swiper/css";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


export default function HeaderSwiper(){


    return( 
        <div className="swiperContainer">
            <Swiper 
                className="mySwiper" 
                pagination={{ dynamicBullets: true,}} 
                modules={[Pagination]}
            >
                <SwiperSlide>
                    <div className="swiperTransparent">
                        <img src="https://media.istockphoto.com/id/133986336/photo/library-of-old-books.jpg?s=612x612&w=0&k=20&c=r0_EyfVx8pkrpTAHDWAgkKwocUJleFQefPR_kP8aBoA="/>
                    </div>    
                    <div className="textItem">
                        <h1>LOTS OF EBOOKS. 100 % FREE</h1>
                        <p>Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting to be discovered.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperTransparent">
                        <img src="https://media.istockphoto.com/id/183978170/photo/library-of-old-books.jpg?s=170667a&w=0&k=20&c=3lah1f62j7Yv-59oFBkJDj0IgVIPjlrtkjYBH3KxqZU="/>
                    </div> 
                    <div className="textItem">
                        <h1>FREE AND DISCOUNTED BESTSELLERS</h1>
                        <p>Join 150,000+ fellow readers. Get free and discounted bestsellers straight to your inbox with the ManyBooks eBook deals newsletter. </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperTransparent">
                        <img src="https://img.freepik.com/premium-photo/old-university-shelves-culture-concept_136875-464.jpg?w=2000" />
                    </div> 
                    <div className="textItem">
                        <h1>The Ultimate Guide to Free eBooks</h1>
                        <p>Not sure what to read next? Explore our catalog of public domain books with our editors. Some real gems are hidden in our library. </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
