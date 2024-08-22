import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/AuthContext/AuthContext';
import { jwtDecode } from 'jwt-decode';
import imageLogo from '../../../assets/images/logog.png';
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const  {login}  = useAuth();

  async function handleLogin() {
    const itemValue = { email, password };
    try {
      const result = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemValue),
      });

      const data = await result.json();
      if (data.status === true) {
        const tokenPayload = jwtDecode(data.access_token); // Decode the JWT token
        login(data.access_token);

        if (tokenPayload.role === 'admin') {
          console.log("tokenPayload===", tokenPayload.role);
          
          // If admin, navigate to the admin dashboard
          navigate("/admin/home");
        } else {
          // If not admin, navigate to a user page or stay on the login page with a message
          alert("You are not authorized to access the admin dashboard.");
          navigate("/user/home"); // Replace with the route for regular users
        }
      } else {
        handleLoginError(data.status);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert("There was an issue logging in. Please try again.");
    }
  }

  function handleLoginError(status) {
    if (status === 402) {
      alert("Invalid email. Please try again.");
    } else if (status === 403) {
      alert("Incorrect password. Please try again.");
    } else {
      alert("You are not authorized to access this page. Please contact the system administrator.");
    }
  }

  return (
    <div className='bg-gray-100'>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className='space-y-1 my-2'>
          <img src={imageLogo} alt="logo" className='w-[30w] h-[30vh]' />
        </div>
        <div className='max-w-md w-full mx-auto bg-white rounded-lg p-7 space-y-5'>
          <div className='flex flex-col'>
            <label className='mb-1 text-sm' htmlFor="email">ປ້ອນອິເມວ</label>
            <input className='px-3 py-2 border border-gray-200 rounded-md' type="email" name="email" id="email" placeholder='Example@gennexs.com' onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm' htmlFor="password">ປ້ອນລະຫັດຜ່ານ</label>
            <input className='px-3 py-2 border border-gray-200 rounded-md' type="password" name="password" id="password" placeholder='***********' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button className='w-full bg-[#006897] text-white rounded-md py-2' onClick={handleLogin}>ເຂົ້າສູ່ລະບົບ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
