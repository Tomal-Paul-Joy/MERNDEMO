import React from 'react';
import { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from '../../../Components/ReviewCard';

const Reviews = ({ reviewPromise }) => {
    const reviews = use(reviewPromise);

    return (
        <div>
            <Swiper
                loop={true}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                autoplay={
                    {
                        delay: 2000,
                        disableOnInteraction: false,
                    }
                }
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {reviews.map((review, idx) => (
                    <SwiperSlide key={idx}>
                        <ReviewCard preview={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
