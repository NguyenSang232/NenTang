// src/HomePage.jsx (hoặc tên file Home của bạn)
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';
import './Home.css';
import { useNavigate } from 'react-router-dom';

// Import Header component
import Header from './Header';// Điều chỉnh đường dẫn nếu cần

// Import Carousel component và CSS của nó
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Đảm bảo đường dẫn này chính xác so với vị trí của file Home.jsx
import sanCauImage from '../assets/sancau.png';

const HomePage = () => {
  const navigate = useNavigate();
  // State `showNavExternal` và `activeForm` không còn cần thiết ở đây vì chúng đã được chuyển sang Header
  // const [showNavExternal, setShowNavExternal] = useState(false);
  const [activeForm, setActiveForm] = useState(''); // Vẫn giữ nếu bạn có logic form khác liên quan đến HomePage

  const badmintonImages = [
    { id: 1, src: sanCauImage, alt: 'Hình ảnh cầu lông 2' },
    { id: 2, src: sanCauImage, alt: 'Hình ảnh cầu lông 3' },
    { id: 3, src: sanCauImage, alt: 'Hình ảnh cầu lông 4' },
    { id: 4, src: sanCauImage, alt: 'Hình ảnh cầu lông 5' },
  ];

  // Hàm handleSignInClick cũng đã được chuyển sang Header
  // const handleSignInClick = (e) => {
  //   e.preventDefault();
  //   navigate('/login');
  // };

  return (
    <MDBContainer fluid className='p-0 home-container'>
      {/* Sử dụng Header component đã được tách ra */}
      <Header />

      {/* Main Content Rows (Left and Right Sections) */}
      <MDBRow className='g-0 flex-grow-1 main-content-row'>
        {/* CỘT BÊN TRÁI: Logo và Text giới thiệu */}
        <MDBCol md='6' className='d-flex flex-column justify-content-center p-5 left-section'>
          <div className="logo-section mb-4">
            <MDBIcon icon="kickstarter" size="3x" className="me-2" style={{ color: 'white' }} />
            <span className="logo-text">SK</span>
            <span className="logo-subtext">BE DIFFERENT</span>
          </div>

          <h1 className="display-4 fw-bold text-white sign-in-adventure-text">
            CAN THO SKYLINE <br /> BADMINTON!
          </h1>
        </MDBCol>

        {/* CỘT BÊN PHẢI: Carousel hình ảnh */}
        <MDBCol md='6' className='d-flex flex-column justify-content-center align-items-center p-5 right-section'>
          <div className='carousel-container'>
            <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              transitionTime={800}
              stopOnHover={true}
              showThumbs={false}
              centerMode={true}
              centerSlidePercentage={80}
              className="badminton-carousel"
            >
              {badmintonImages.map(image => (
                <div key={image.id} className="carousel-image-item">
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </Carousel>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default HomePage;