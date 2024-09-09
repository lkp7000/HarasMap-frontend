import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/api';
import Header from '../../Component/Layout/Header';
import Footer from '../../Component/Layout/Footer';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HiEye, HiEyeOff } from 'react-icons/hi';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errormessage, seterrormessage] = useState();
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();

  const { t } = useTranslation();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await login(email, password);
      localStorage.setItem('token', response.jwtToken);
      localStorage.setItem('role', response.role);
      localStorage.setItem('agentID', response.agentID);

      if (response.role === 'admin') {
        navigate('/AdminDashboard');
      } else if (response.role === 'agent') {
        navigate('/AgentDashboard');
      }
    } catch (error: any) {

      if (error.response && error.response.status === 404) {
        seterrormessage(error.response.data.message);

      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };



  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);


  return (
    <>
      <Header />
      <div className='pt-8'>
        <div className="pt-28 pb-10 bg-[#91cedb]/30">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div
              className="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',
              }}
            ></div>
            <form onSubmit={handleLogin} className="w-full p-8 lg:w-1/2">

              <p className="text-xl text-gray-600 text-center">{t('Welcome back!')}</p>

              <div className="mt-4 flex items-center justify-between">
              
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t('Email Address')}
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id='email'
                  name='email'
                  placeholder={t('Please enter the email')}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mt-4  relative">
        <div className="flex justify-between ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('Password')}
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none pt-7"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
        <input
          className="bg-gray-200  text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none pr-10"
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder={t('Please enter the password')}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <p style={{  color: 'red', fontSize:'12px', fontWeight: 'bold' }}>{errormessage} </p>

              <div className="mt-8 ">
                <button type='submit' className="bg-[#91cedb] font-bold py-2 px-4 w-full rounded hover:text-black">

                  <span className='p-5'>  {t('Login')}   </span>
                  {loading && <CircularProgress color='inherit' thickness={8} size={16} />}
                </button>

              </div>

              <div className="mt-4 items-center justify-between">

                <span className="border-b w-1/5 md:w-1/4" />
                <span className="border-b w-1/5 md:w-1/4" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
