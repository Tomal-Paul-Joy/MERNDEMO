import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../../../assets/brands/amazon.png';
import slide2 from '../../../assets/brands/amazon_vector.png';
import slide3 from '../../../assets/brands/casio.png'
import slide4 from '../../../assets/brands/moonstar.png'
import slide5 from '../../../assets/brands/randstad.png'
import slide6 from '../../../assets/brands/star.png'
import slide7 from '../../../assets/brands/start_people.png'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const brandLogo = [slide1, slide2, slide3, slide4, slide5, slide6, slide7]

const Brands = () => {
    return (
        <div>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}

            >

                {
                    brandLogo.map((brand, idx) => (<SwiperSlide key={idx}><img src={brand} alt=""></img></SwiperSlide>))
                }
            </Swiper>

        </div>
    );
};

export default Brands;