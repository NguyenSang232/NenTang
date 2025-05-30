import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarToggler,
  MDBInput
} from 'mdb-react-ui-kit';
import './Home.css'; // Tệp CSS tùy chỉnh của bạn
import { useNavigate } from 'react-router-dom'; 
// Import Carousel component và CSS của nó
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // import styles của carousel

// Đảm bảo đường dẫn này chính xác so với vị trí của file Home.jsx
import sanCauImage from '../assets/sancau.png';

const HomePage = () => {
 const navigate = useNavigate();
  const [showNavExternal, setShowNavExternal] = useState(false);
  const [activeForm, setActiveForm] = useState(''); // Vẫn giữ nếu bạn có logic form

  // Sử dụng một mảng các hình ảnh khác nhau hoặc dùng chung một hình ảnh nhiều lần
  const badmintonImages = [

    // Có thể lặp lại sanCauImage nếu bạn chỉ có một hình ảnh thực tế
    { id: 1, src: sanCauImage, alt: 'Hình ảnh cầu lông 2' },
    { id: 2, src: sanCauImage, alt: 'Hình ảnh cầu lông 3' },
    { id: 3, src: sanCauImage, alt: 'Hình ảnh cầu lông 4' },
    { id: 4, src: sanCauImage, alt: 'Hình ảnh cầu lông 5' },
  ];
 const handleSignInClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    navigate('/login'); // Chuyển hướng đến đường dẫn /login
  };
  return (
    <MDBContainer fluid className='p-0 home-container'>
      {/* Navbar Section */}
      <MDBNavbar expand='lg' className='custom-navbar'>
        <MDBContainer fluid className='d-flex align-items-center'>
          <MDBNavbarBrand href='#' className='me-4'>
            {/* <MDBIcon fab icon='github' size='2x' className='text-white' /> */}
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarHeaderContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavExternal(!showNavExternal)}
          >
            <MDBIcon fas icon='bars' className='text-white' />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showNavExternal} className='w-100'>
            <MDBNavbarNav className='d-flex align-items-center w-100'>
              <MDBNavbarItem className='me-3'>
                <MDBNavbarLink href='#' className='nav-link text-white'>Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className='me-3'>
                <MDBNavbarLink href='#' className='nav-link text-white'>Products</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className='me-3'>
                <MDBNavbarLink href='#' className='nav-link text-white'>About</MDBNavbarLink>
              </MDBNavbarItem>

              {/* Nút Sign in / Sign up */}
              <MDBNavbarItem className='d-flex align-items-center auth-buttons-group'>
                <MDBNavbarLink href='#' className='sign-in-button' onClick={handleSignInClick}>Sign in</MDBNavbarLink>
                <MDBNavbarLink href='#' className='sign-up-button'>Sign up</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

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
          <div className='carousel-container'> {/* Thêm một container để kiểm soát kích thước carousel */}
            <Carousel
              showArrows={false} // Hiển thị mũi tên điều hướng
              showStatus={false} // Ẩn trạng thái hiện tại (ví dụ: 1 of 5)
              showIndicators={true} // Hiển thị các chấm chỉ báo
              infiniteLoop={true} // Vòng lặp vô hạn
              autoPlay={true} // Tự động phát
              interval={3000} // Thời gian chuyển đổi (3 giây)
              transitionTime={800} // Thời gian chuyển động giữa các slide
              stopOnHover={true} // Dừng tự động phát khi di chuột qua
              showThumbs={false} // Ẩn các hình thu nhỏ (thumbnails)
              centerMode={true} // Hiển thị một phần của slide tiếp theo/trước đó
              centerSlidePercentage={80} // Tỷ lệ phần trăm slide trung tâm (ví dụ 70% là slide chính)
              // min/maxWidth: Để carousel chiếm chiều rộng cụ thể
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