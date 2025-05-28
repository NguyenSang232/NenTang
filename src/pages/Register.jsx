import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // import file CSS

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/users/register', {
        email,
        password,
        role: 'USER',
      });
      alert(res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>Register</button>
        <p className="register-link" onClick={() => navigate('/')}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
