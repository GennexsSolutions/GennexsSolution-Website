import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Page/Dasboard/Dasboard';
import Home from '../../Page/Home/Home';
import About from '../../Page/About/About';
import Contact from '../../Page/Contact/Contact';
import Service from '../../Page/Service/Service';
import Project from '../../Page/Project/Project';
import Teams from '../../Page/Teams/Teams';
import PrivateRoute from '../../../Components/Router/PrivateRoute';
import { AuthContext } from '../AuthContext/AuthContext';
import DashboardUser from '../../../Users/Page/Dashboard/DashboardUser';
import LoginPage from '../../../SuperAdmin/Page/Login/Login-Page';

function RoutAdmin() {
    const  user  = useContext(AuthContext);
    const isAdmin = user?.role === 'admin';
    return (
        <Routes>
            <Route path='/' element={<DashboardUser />} />
            <Route path='/admin' element={<LoginPage />} />
            {isAdmin && (
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
                </>
            )}
        </Routes>
    );
}

export default RoutAdmin;
