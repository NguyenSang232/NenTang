import React from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Logo from '../assets/logonen.png';
import Lee from '../assets/lee.png';
import Cau from '../assets/caulong.png';

import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';

import './Products.css';

const Products = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
      alert("Đăng xuất thành công!");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      alert("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <MDBContainer fluid className='p-0 home-container'>
      <Header />

      <MDBBtn color="danger" className="mb-4" onClick={Logout}>
        Đăng xuất
      </MDBBtn>

      <MDBRow className="g-4">
        <MDBCol md="4" sm="12">
          <MDBCard>
            <MDBCardImage src={Logo} alt="Logo" position="top" style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <MDBCardBody>
              <h5 className="text-center">Logo</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" sm="12">
          <MDBCard>
            <MDBCardImage src={Lee} alt="Lee" position="top" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <MDBCardBody>
              <h5 className="text-center">Lee</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" sm="12">
          <MDBCard>
            <MDBCardImage src={Cau} alt="Cầu lông" position="top" style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <MDBCardBody>
              <h5 className="text-center">Cầu lông</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Products;
