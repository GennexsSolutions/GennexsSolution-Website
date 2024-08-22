import { useAuth } from '../../SuperAdmin/Components/AuthContext/AuthContext';
import LoginPage from '../../SuperAdmin/Page/Login/Login-Page';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    console.log("user", user);

    if (user?.role !== 'admin') {
      
        return <LoginPage/>; // Return null to prevent rendering of children
    }

    return children;
};

export default PrivateRoute;
