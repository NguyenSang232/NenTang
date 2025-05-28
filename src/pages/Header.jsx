import React from 'react';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        Mrs. College Guide
      </div>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}><a href="#" style={linkStyle}>Trang Chu</a></li>
          <li style={liStyle}><a href="#" style={linkStyle}>Dat San</a></li>
          <li style={liStyle}><a href="#" style={linkStyle}>Mua Sam</a></li>
          <li style={liStyle}><a href="#" style={linkStyle}>Thong Tin</a></li>
          <li style={liStyle}><a href="#" style={linkStyle}>About</a></li>
        </ul>
      </nav>
      <div style={authButtonsStyle}>
        <button style={loginButtonStyle} onClick={() => navigate('/login')}>Dang Nhap</button>
        <button style={signUpButtonStyle} onClick={() => navigate('/register')}>Dang Ky</button>
      </div>
    </header>
  );
};

// Basic inline styles for demonstration
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 50px',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif', // Using a common font family
};

const logoStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#333',
};

const navStyle = {
  // flex: 1, // Uncomment if you want the nav to take up more space
  marginLeft: 'auto', // Pushes the nav to the right, before auth buttons
  marginRight: '20px', // Space between nav and auth buttons
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
};

const liStyle = {
  marginLeft: '30px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#555',
  fontSize: '16px',
  transition: 'color 0.3s ease',
};

// Add hover effect if desired (needs more advanced CSS techniques or libraries)
// linkStyle[':hover'] = {
//   color: '#007bff',
// };

const authButtonsStyle = {
  display: 'flex',
  gap: '10px',
};

const loginButtonStyle = {
  backgroundColor: 'white',
  color: '#333',
  border: '1px solid #ccc',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
};

// loginButtonStyle[':hover'] = {
//   backgroundColor: '#f0f0f0',
// };

const signUpButtonStyle = {
  backgroundColor: '#FFC107', // A yellowish color
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
};

// signUpButtonStyle[':hover'] = {
//   backgroundColor: '#e0a800', // Darker yellow on hover
// };

export default Header;