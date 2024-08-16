import React from 'react';
import Link1 from '../../components/Link1/Link1';
import Link2 from '../../components/Link2/Link2';
import { useLocation,Link } from 'react-router-dom';

const Home: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const formId = searchParams.get('formId');
    return (
        <div>
            <Link to={`withData?formId=${formId}`}>

            <Link1/>
            </Link>
            
            <Link to={`withoutData?formId=${formId}`}>

            <Link2/>
            </Link>
        </div>
    );
}

export default Home;
