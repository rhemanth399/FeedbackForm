import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


type ProtectedRouteProps = {
    children: JSX.Element;
    
  };

  export default function ProtectedRoute({ children}: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // If no token, redirect to login
      return <Navigate to="/" replace />;
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
  
      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token has expired, redirect to login
        localStorage.removeItem('token'); // Optionally clear the token
        return <Navigate to="/" replace />;
      }
      return children;
    }
    catch(error){
        return <Navigate to="/" replace />
    }

}