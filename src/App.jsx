import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardUser from './Users/Page/Dashboard/DashboardUser';
import LoginPage from './SuperAdmin/Page/Login/Login-Page';
import { AuthContext } from './SuperAdmin/Components/AuthContext/AuthContext';
import PrivateRoute from './Components/Router/PrivateRoute';
import Dashboard from './SuperAdmin/Page/Dasboard/Dasboard';
import Home from './SuperAdmin/Page/Home/Home';
import About from './SuperAdmin/Page/Dasboard/Dasboard';
import Contact from './SuperAdmin/Page/Contact/Contact';
import Service from './SuperAdmin/Page/Service/Service';
import Project from './SuperAdmin/Page/Project/Project';
import Teams from './SuperAdmin/Page/Teams/Teams';
import Customer from './SuperAdmin/Page/Customer/Customer';
import jwtDecode from 'jwt-decode'; // Ensure proper import
import SupportDevice from './Components/Supports/SupportDevice';
import DetailService from './Users/Components/DetailService/DetailSevice';
import DetailProject from './Users/Components/DetailProject/DetailProject';
import SeeAllProject from './Users/Components/SeeAllProject/SeeAllProject';

function App() {
  const user = useContext(AuthContext);
  const token = localStorage.getItem('authToken');

  let admin = false;

  if (token) {
    try {
      const decodetoken = jwtDecode(token);
      admin = decodetoken.role === 'admin';
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  const isTabletOrLarger = SupportDevice('(min-width: 768px)');
  const isMobile = SupportDevice('(max-width: 767px)');

  return (
    <Routes>
      <Route path='/' element={<DashboardUser />} />
      <Route path='/detailsevice/:id' element={<DetailService />} />
      <Route path='/detailproject/:id' element={<DetailProject />} />
      <Route path='/seeallproject' element={<SeeAllProject />} />
      <Route path='/admin' element={<LoginPage />} />
      {admin && isTabletOrLarger && (
        <>
          <Route
            path='/admin/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/about'
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/contact'
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/service'
            element={
              <PrivateRoute>
                <Service />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/project'
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/teams'
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/customer'
            element={
              <PrivateRoute>
                <Customer />
              </PrivateRoute>
            }
          />
        </>
      )}
      {isMobile && <Route path='/admin/*' element={<Navigate to="/" />} />}
    </Routes>
  );
}

export default App;
