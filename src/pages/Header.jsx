// src/components/Header.jsx
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logonen.png';
// Đảm bảo đường dẫn CSS tùy chỉnh của bạn phù hợp với component này
// Nếu các style navbar nằm trong Home.css, bạn có thể cân nhắc tạo Navbar.css riêng
import './Home.css'; // Giả sử custom-navbar styles vẫn nằm trong Home.css

const Header = () => {
  const navigate = useNavigate();
  const [showNavExternal, setShowNavExternal] = useState(false);

  const handleSignInClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    navigate('/login'); // Chuyển hướng đến đường dẫn /login
  };

  // Thêm hàm xử lý khi click vào Home
  const handleHomeClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    navigate('/'); // Chuyển hướng đến trang chủ (thường là '/')
  };
   const handleProductClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    navigate('/products'); // Chuyển hướng đến trang chủ (thường là '/')
  };

  return (
    <MDBNavbar expand='lg' className='custom-navbar'>
      <MDBContainer fluid className='d-flex align-items-center'>
        <MDBNavbarBrand href='#' className='me-4'>
          {/* Bạn có thể thêm logo hoặc icon ở đây nếu muốn */}
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarHeaderContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavExternal(!showNavExternal)}
        >
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavExternal} className='w-100'>
          <MDBNavbarNav className='d-flex align-items-center w-100'>
                <MDBNavbarItem className='me-3'>
             <img src={Logo} style={{ width: 30, height: 30, marginTop:6 }} />
            </MDBNavbarItem>
            <MDBNavbarItem className='me-3'>
              {/* Thay đổi href và thêm onClick */}
              <MDBNavbarLink href='/' className='nav-link text-white' onClick={handleHomeClick}>Home</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-3'>
              <MDBNavbarLink href='#' className='nav-link text-white' onClick={handleProductClick}>Products</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-3'>
              <MDBNavbarLink href='#' className='nav-link text-white'>Booking</MDBNavbarLink>
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
  );
};

export default Header;