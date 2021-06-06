import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Autoplay} from 'swiper';
import 'swiper/swiper-bundle.css';
import Card from '../productCard/Card';
import {CircularProgress} from '@material-ui/core';

SwiperCore.use ([Navigation, Autoplay]);

const ProductsSlider = ({products, loading, error}) => {
  return (
    <div>
      {loading
        ? <CircularProgress />
        : error
            ? <div>error</div>
            : <Swiper
                navigation={false}
                // loop={true}
                grabCursor={true}
                autoplay={{delay: 20000}}
                breakpoints={{
                  300: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {products.map (product => (
                  <SwiperSlide key={product._id}>
                    <Card product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>}
    </div>
  );
};

export default ProductsSlider;
