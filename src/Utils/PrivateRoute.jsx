import { useLocation, Navigate } from 'react-router-dom';
import { TOKEN } from './Constants';

const PrivateRoute = ({ children }) => {
    let location = useLocation();

    return localStorage.getItem(TOKEN) ? 
        children : 
        <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;