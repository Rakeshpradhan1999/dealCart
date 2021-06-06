import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Thumbs} from 'swiper/core';
import {makeStyles} from '@material-ui/core/styles';

SwiperCore.use ([Thumbs]);

const useStyles = makeStyles (theme => ({
  root: {},
  thumb: {
    marginTop: theme.spacing (3),
    margin: theme.spacing (0, 4),
    '& img': {
      height: 150,
    },
  },
}));

const ProductSlider = ({images}) => {
  const classes = useStyles ();

  const [thumbsSwiper, setThumbsSwiper] = useState (null);

  return (
    <main>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <Swiper thumbs={{swiper: thumbsSwiper}}>
        {images.map ((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt={item} style={{width: '100%'}} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs Swiper -> store swiper instance */}
      {/* It is also required to set watchSlidesVisibility and watchSlidesProgress props */}
      <Swiper
        slidesPerView={4}
        onSwiper={setThumbsSwiper}
        watchSlidesVisibility
        watchSlidesProgress
        className={classes.thumb}
        spaceBetween={10}
      >
        {images.map ((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt={item} style={{width: '100%'}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default ProductSlider;
