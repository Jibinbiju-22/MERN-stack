import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import './style.css';
import './responsive.css';
import sliderBg from './images/123.jpg';
import sliderBg2 from './images/456.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
        <section class="slider_section ">
           <div class="slider_bg_box">
           <img src={sliderBg} alt="Slider Background" />
           </div>
           <div id="customCarousel1" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                 <div class="carousel-item active">
                    <div class="container ">
                       <div class="row">
                          <div class="col-md-7 col-lg-6 ">
                             <div class="detail-box">
                                <h1>
                                   <span>
                                   Plan Your Dream Getaway
                                   </span>
                                   <br></br>

                                </h1>
                                <p>
                                Immerse yourself in the vibrant local culture, where traditions blend seamlessly with modern charm. Indulge in culinary delights that will tantalize your taste buds, from street-side vendors to world-class dining experiences.
                                </p>
                                <div class="btn-box">
                                   <a href="/users" class="btn1">
                                   USERS
                                   </a>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section class="slider_section ">
           <div class="slider_bg_box">
           <img src={sliderBg2} alt="Slider Background" />
           </div>
           <div id="customCarousel1" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                 <div class="carousel-item active">
                    <div class="container ">
                       <div class="row">
                          <div class="col-md-7 col-lg-6 ">
                             <div class="detail-box">
                                <h1>
                                   <span>
                                   Discover Adventure
                                   </span>
                                   <br></br>

                                </h1>
                                <p>
                                Step into a world of wonder and exploration with handpicked travel experiences. Discover pristine beaches, historic landmarks, and hidden gems off the beaten path.
                                </p>
                                <div class="btn-box">
                                   <a href="/users" class="btn1">
                                   USERS
                                   </a>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        </Slider>
    );
};
export default Home;