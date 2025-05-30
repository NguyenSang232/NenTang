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
import { auth, provider,Facebook } from '../firebase/config';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [activeForm, setActiveForm] = useState('phone');
  const [email, setEmail] = useState(''); // Chỉ dùng 1 state cho email
  const [password, setPassword] = useState(''); // Chỉ dùng 1 state cho password
  const navigate = useNavigate();
  const otpInputRefs = useRef([]); // Có thể xóa nếu không sử dụng
  const LoginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, Facebook);
      const user = result.user;
      const userEmail = user.email;

      console.log("Đăng nhập thành công với Facebook:", user.email || user.displayName);
      localStorage.setItem("email", user.email || user.uid); // Lưu email hoặc uid
      navigate("/products");
    } catch (error) {
      console.error("Facebook login error:", error);
      let errorMessage = "Đăng nhập Facebook thất bại. Vui lòng thử lại.";

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Đăng nhập Facebook bị hủy bởi người dùng.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Yêu cầu đăng nhập Facebook bị hủy (có thể do mở nhiều popup).';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Tài khoản này đã tồn tại với một phương thức đăng nhập khác (ví dụ: Google, Email/Mật khẩu).';
          break;
        case 'auth/auth-domain-config-error':
          errorMessage = 'Lỗi cấu hình domain. Vui lòng kiểm tra lại cấu hình Firebase và Facebook App.';
          break;
        default:
          errorMessage = `Đăng nhập Facebook thất bại: ${error.message}`;
          break;
      }
      alert(errorMessage);
    }
  };

  const LoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;
      const idToken = await user.getIdToken();

      setEmail(userEmail); // Cập nhật state email
      localStorage.setItem("email", userEmail);
      navigate("/products");
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert('Đăng nhập Google bị hủy bởi người dùng.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        alert('Yêu cầu đăng nhập Google bị hủy (có thể do mở nhiều popup).');
      } else {
        alert(`Đăng nhập Google thất bại: ${error.message || 'Vui lòng thử lại.'}`);
      }
    }
  };

  const handleEmailLogin = async () => {
    try {
      if (!email || !password) { // Sử dụng state 'email' và 'password'
        alert("Vui lòng nhập đầy đủ Email và Mật khẩu.");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Sử dụng state 'email'
      const user = userCredential.user;

      console.log("Đăng nhập thành công với email:", user.email);
      localStorage.setItem("email", user.email);
      navigate("/products");
    } catch (error) {
      console.error("Lỗi đăng nhập bằng Email/Mật khẩu:", error);
      let errorMessage = "Đăng nhập thất bại. Vui lòng kiểm tra lại Email và Mật khẩu.";

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Địa chỉ Email không hợp lệ.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Tài khoản này đã bị vô hiệu hóa.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Không tìm thấy tài khoản với Email này.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mật khẩu không đúng.';
          break;
        case 'auth/missing-password':
          errorMessage = 'Vui lòng nhập mật khẩu.';
          break;
        default:
          errorMessage = `Đăng nhập thất bại: ${error.message}`;
          break;
      }
      alert(errorMessage);
    }
  };

  const handleEmailRegister = async () => {
    try {
      if (!email || !password) { // Sử dụng state 'email' và 'password'
        alert("Vui lòng nhập đầy đủ Email và Mật khẩu.");
        return;
      }

      if (password.length < 6) { // Sử dụng state 'password'
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Sử dụng state 'email'
      const user = userCredential.user;

      console.log("Đăng ký thành công với email:", user.email);
      alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
      setEmail(''); // Xóa email và mật khẩu sau khi đăng ký
      setPassword('');
      setActiveForm('phone'); // Quay lại form đăng nhập
    } catch (error) {
      console.error("Lỗi đăng ký bằng Email/Mật khẩu:", error);
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Địa chỉ Email này đã được sử dụng.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Địa chỉ Email không hợp lệ.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn (ít nhất 6 ký tự).';
          break;
        default:
          errorMessage = `Đăng ký thất bại: ${error.message}`;
          break;
      }
      alert(errorMessage);
    }
  };

  const handleSignUpClick = () => {
    setActiveForm('otp'); // Chuyển sang form đăng ký
    setEmail(''); // Xóa email và mật khẩu khi chuyển form
    setPassword('');
    // Bỏ setTimeout và ref nếu không có trường hợp cần focus cụ thể
    // if (otpInputRefs.current[0]) {
    //     otpInputRefs.current[0].focus();
    // }
  };

  const handleBackFromOtpClick = () => {
    setActiveForm('phone'); // Chuyển về form đăng nhập
    setEmail(''); // Xóa email và mật khẩu khi chuyển form
    setPassword('');
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

            {/* FORM ĐĂNG NHẬP */}
            <div className="form-content phone-form">
              <h1 className="display-3 fw-bold mb-4 text-white">SIGN IN</h1>
              <h5 className="mb-4 text-white">Sign in with email</h5>

              <div className="d-flex align-items-center mb-4 input-wrapper">
                <MDBIcon fas icon="envelope" size="lg" className="me-3" style={{ color: 'white' }} />
                <MDBInput
                  wrapperClass='flex-grow-1'
                  label='Your Email'
                  id='loginEmailInput' // ID duy nhất
                  type='email'
                  className='input-space-style'
                  value={email} // Sử dụng state 'email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center mb-4 input-wrapper">
                <MDBIcon fas icon="key" size="lg" className="me-3" style={{ color: 'white' }} />
                <MDBInput
                  wrapperClass='flex-grow-1'
                  label='Password'
                  id='loginPasswordInput' // ID duy nhất
                  type='password' // Sửa thành type='password'
                  className='input-space-style'
                  value={password} // Sử dụng state 'password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <MDBBtn
                className='w-100 gradient-button-space mb-4'
                size='lg'
                onClick={handleEmailLogin} // Gắn hàm đăng nhập
              >
                Sign In
              </MDBBtn>
              <p className="text-center text-white">
                Don't have an account? <a href="#!" className="text-white text-decoration-underline" onClick={handleSignUpClick}>Register now</a>
              </p>
              <hr className="my-4 divider-space" />

              <p className="mb-4 text-white text-center">Or continue with</p>

              <div className="d-flex justify-content-center mb-4 w-100">
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                  onClick={LoginWithGoogle}
                >
                  <MDBIcon fab icon='google' size="lg" className="me-2" /> Google
                </MDBBtn>
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                 onClick={LoginWithFacebook}
                 >
                  <MDBIcon fab icon='facebook' size="lg" className="me-2" /> Facebook
                </MDBBtn>
              </div>

              <p className="text-center mt-3 text-white">
                By registering you with our <a href="#!" className="text-white text-decoration-underline">Terms and Conditions</a>
              </p>
            </div>

            {/* FORM ĐĂNG KÝ */}
            <div className="form-content otp-form" >
              <h1 className="display-3 fw-bold mb-4 text-white">Register Now</h1>
              <p className="mb-4 text-white text-center">
                Be Different  <br />
              </p>

              <div className="d-flex align-items-center mb-4 input-wrapper">
                <MDBIcon fas icon="envelope" size="lg" className="me-3" style={{ color: 'white' }} />
                <MDBInput
                  wrapperClass='flex-grow-1'
                  label='Email' // Đổi label thành Email
                  id='registerEmailInput' // ID duy nhất
                  type='password'
                  className='input-space-style'
                  value={email} // Sử dụng state 'email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center mb-4 input-wrapper">
                <MDBIcon fas icon="key" size="lg" className="me-3" style={{ color: 'white' }} />
                <MDBInput
                  wrapperClass='flex-grow-1'
                  label='Password'
                  id='registerPasswordInput' // ID duy nhất
                  type='password' // Sửa thành type='password'
                  className='input-space-style'
                  value={password} // Sử dụng state 'password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center mb-4 w-100" >
                <MDBBtn
                  className='w-100 gradient-button-space mb-4'
                  size='lg'
                  onClick={handleEmailRegister} // Gắn hàm đăng ký
                >
                  Sign up
                </MDBBtn>
              </div>
              <p className="text-center text-white">
                Already have an account? <a href="#!" className="text-white text-decoration-underline" onClick={handleBackFromOtpClick}>Sign In</a>
              </p>
              <hr className="my-4 divider-space" />
              <p className="mb-4 text-white text-center">Or continue with</p>
              <div className="d-flex justify-content-center mb-4 w-100">
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                  onClick={LoginWithGoogle}
                >
                  <MDBIcon fab icon='google' size="lg" className="me-2" /> Google
                </MDBBtn>
                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-2 social-button-space google-button-small'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                  onClick={LoginWithFacebook}
                >
                  <MDBIcon fab icon='facebook' size="lg" className="me-2" /> Facebook
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