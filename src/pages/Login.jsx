import React, { useState, useRef } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import './Login.css';

function Login() {
  const [activeForm, setActiveForm] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const otpInputRefs = useRef([]);

  const handleSignUpClick = () => {
    setActiveForm('otp');
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 100);
  };

  const handleBackFromOtpClick = () => {
    setActiveForm('phone');
    setOtp(new Array(6).fill(''));
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        otpInputRefs.current[index - 1].focus();
      }
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
        if (index < 5) otpInputRefs.current[index + 1].focus();
    } else if (e.key === "ArrowLeft") {
        if (index > 0) otpInputRefs.current[index - 1].focus();
    }
    // Xử lý phím Enter riêng biệt (sẽ xử lý ở cấp độ form để đơn giản hơn)
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      setTimeout(() => {
        if (otpInputRefs.current[5]) {
          otpInputRefs.current[5].focus();
        }
      }, 0);
    }
  };

  // HÀM MỚI: Xử lý xác minh OTP (khi nhấn nút hoặc Enter)
  const handleVerifyOtp = () => {
    const fullOtp = otp.join(''); // Ghép các số OTP lại thành một chuỗi
    if (fullOtp.length === 6) {
      console.log("Mã OTP đã nhập:", fullOtp);
      // Thực hiện logic xác minh OTP của bạn ở đây
      alert("Xác minh OTP: " + fullOtp); // Ví dụ thông báo
      // Sau khi xác minh, bạn có thể chuyển hướng hoặc thực hiện hành động tiếp theo
    } else {
      alert("Vui lòng nhập đủ 6 chữ số OTP.");
    }
  };

  // HÀM MỚI: Xử lý Enter trên form OTP
  const handleOtpFormKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn hành vi mặc định của Enter (ví dụ: submit form nếu có)
      handleVerifyOtp(); // Gọi hàm xác minh OTP
    }
  };


  return (
    <MDBContainer fluid className='p-0 login-container'>

      <MDBRow className='g-0 h-100'>

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

        {/* CỘT BÊN PHẢI: Container chứa cả các form */}
        <MDBCol md='6' className='d-flex flex-column justify-content-center align-items-center p-5 right-section'>
          <div className={`form-carousel ${activeForm === 'otp' ? 'slide-left-1' : ''}`}>

            {/* FORM ĐĂNG NHẬP BẰNG SỐ ĐIỆN THOẠI */}
            <div className="form-content phone-form">
              <h1 className="display-3 fw-bold mb-4 text-white">SIGN IN</h1>
              <h5 className="mb-4 text-white">Sign in with phone number</h5>

              <div className="d-flex align-items-center mb-4 input-wrapper">
                <MDBIcon icon="phone" size="lg" className="me-3" style={{ color: 'white' }} />
                <MDBInput
                  wrapperClass='flex-grow-1'
                  label='Your phone number'
                  id='phoneNumberInput'
                  type='tel'
                  className='input-space-style'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <MDBBtn
                className='w-100 gradient-button-space mb-4'
                size='lg'
                onClick={handleSignUpClick}
              >
                Sign up
              </MDBBtn>

              <hr className="my-4 divider-space" />

              <p className="mb-4 text-white text-center">Or continue with</p>

              <div className="d-flex justify-content-center mb-4 w-100">
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                >
                  <MDBIcon fab icon='google' size="lg" className="me-2" /> Google
                </MDBBtn>
              </div>

              <p className="text-center mt-3 text-white">
                By registering you with our <a href="#!" className="text-white text-decoration-underline">Terms and Conditions</a>
              </p>
            </div>

            {/* FORM XÁC THỰC OTP 6 SỐ */}
            {/* THÊM onKeyDown CHO FORM OTP */}
            <div className="form-content otp-form" onKeyDown={handleOtpFormKeyDown}>
              <h1 className="display-3 fw-bold mb-4 text-white">VERIFY PHONE</h1>
              <p className="mb-4 text-white text-center">
                Please enter the 6-digit code sent to your phone number: <br />
                <strong>{phoneNumber}</strong>
              </p>

              <div className="otp-input-container d-flex justify-content-center mb-4">
                {otp.map((data, index) => (
                  <MDBInput
                    key={index}
                    id={`otpInput-${index}`}
                    type='text'
                    maxLength='1'
                    className='otp-digit-input'
                    value={data}
                    onChange={e => handleOtpChange(e.target, index)}
                    onKeyDown={e => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    ref={el => otpInputRefs.current[index] = el}
                  />
                ))}
              </div>

              <MDBBtn
                className='w-100 gradient-button-space mb-4'
                size='lg'
                onClick={handleVerifyOtp} // Gán hàm xác minh cho nút
              >
                Verify Code
              </MDBBtn>

              <p className="text-center text-white">
                Didn't receive the code? <a href="#!" className="text-white text-decoration-underline">Resend Code</a>
              </p>

              <hr className="my-4 divider-space" />

              <div className="d-flex justify-content-center mb-4 w-100">
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                  onClick={handleBackFromOtpClick}
                >
                  <MDBIcon icon='arrow-left' size="lg" className="me-2" /> Back to Phone
                </MDBBtn>
              </div>

            </div> {/* End otp-form */}

          </div> {/* End form-carousel */}
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

export default Login;