import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authActions';
import { useNavigate, Link } from 'react-router-dom';
import emailValidator from 'email-validator';
// import img
import googleImg from '../assets/img/google.svg';
import appleimg from '../assets/img/apple.svg';
import brandimg from '../assets/img/brand.png';
import emailimg from '../assets/img/email.svg';
import eyeimg from '../assets/img/eye.svg';
import passwordimg from '../assets/img/password.svg';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (!emailValidator.validate(credentials.email)) {
      setEmailError('Invalid email format. Please enter a valid email.');
      return;
    }
    if (!credentials.password) {
      setPasswordError('Password is required.');
      return;
    }
    setLoading(true);

    try {
      const response = await dispatch(login(credentials));
      if (response && response.success) {
        if (response.data.password === credentials.password) {
          navigate('/userlist', { replace: true });
        } else {
          setErrorMessage('Login failed: Password does not match.');
        }
      } else {
        setErrorMessage('Login failed: User info not matched with API.');
      }
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-[20px] md:px-[81px] mt-4">
        <div className="flex gap-[10px] items-center">
          <img src={brandimg} alt="" />
          <p className="font-bold text-xl text-[#4E5D78] ">Stack</p>
        </div>
        <div>
          <select className="h-[43px] text-center bg-[#F0F5FA] rounded-2xl text-[#B0B7C3] text-[12px] font-medium px-[18px] pr-[35px] ">
            <option value>English(UK)</option>
            <option value>Arabic</option>
            <option value>Urdu</option>
          </select>
        </div>
      </div>
      <div className="container h-screen mx-auto flex justify-center items-center flex-col">
        <div className="text-center">
          <p className="text-[26px] font-bold mb-[19px] ">Sign In</p>
          <p className="text-[18px] font-medium text-[#8A94A6] mb-[30px]">Welcome back, you've been missed!</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col md:flex-row items-center gap-[30px]">
            <div className="h-[58px] text-center bg-[#F0F5FA] rounded-2xl text-[#B0B7C3] text-[12px] font-medium px-[18px] pr-[35px] flex items-center gap-[11px]">
              <img className="google_img" src={googleImg} alt="google icon" />
              <p className="google_text">Sign In with Google</p>
            </div>
            <div className="h-[58px] text-center bg-[#F0F5FA] rounded-2xl text-[#B0B7C3] text-[12px] font-medium px-[18px] pr-[35px] flex items-center gap-[11px]">
              <img className="apple_img" src={appleimg} alt="apple icon" />
              <p className="apple_text">Sign In with Apple ID</p>
            </div>
          </div>
          <div className="grid grid-cols-[45%_10%_45%] justify-items-center items-center my-[30px]">
            <hr className="border border-[#8A94A6] w-full" />
            <p className="or">OR</p>
            <hr className="border border-[#8A94A6] w-full" />
          </div>
          <div className="relative mb-[30px]">
            <img className="w-[18px] h-[18px] absolute top-2/4 left-[18px] translate-y-[-50%]" src={emailimg} alt="email" />
            <input
              type="text"
              name='email'
              className="pl-[51px] w-full h-[58px] text-base text-[#b0b7c3] rounded-2xl border border-[#F3F3F3] focus:border-[#FF5630] focus:outline-none focus:ring-0"
              placeholder="Your Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          {emailError && <p className="my-4 text-[#FF5630]">{emailError}</p>}
          <div className="relative">
            <img className="w-[18px] h-[18px] absolute top-2/4 left-[18px] translate-y-[-50%]" src={passwordimg} alt="password" />
            <input
              type="password"
              name='password'
              className="pl-[51px] w-full h-[58px] text-base text-[#b0b7c3] rounded-2xl border border-[#F3F3F3]  "
              placeholder="Create Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <img className="w-[18px] h-[18px] absolute top-2/4 right-[18px] translate-y-[-50%]" src={eyeimg} alt=''/>
          </div>
          {passwordError && <p className="my-4 text-[#FF5630]">{passwordError}</p>}
          <div className="mt-4 mb-[31px] flex items-center gap-[17px]">
            <input type="checkbox" className="border-none mr-2 w-7 h-7 rounded-lg text-blue-500" defaultValue={1} />
            <label className="text-base text-[#B0B7C3]">I agree to the terms and condition</label>
          </div>
          <div>
            <button type="submit" className="rounded-2xl w-full bg-[#377dff] text-white h-[58px] text-base font-medium">
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
          <div className="mt-[35px] text-center font-medium text-base">
            <p className="text-[#B0B7C3]">Don't Have an account yet? <Link className="text-[#377DFF]" to="/register">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
