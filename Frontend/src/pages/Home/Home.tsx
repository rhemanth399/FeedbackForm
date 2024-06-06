import React from 'react';
import Link1 from '../../components/Link1/Link1';
import Link2 from '../../components/Link2/Link2';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <Link to="withData">

            <Link1/>
            </Link>
            
            <Link to="withoutData">

            <Link2/>
            </Link>
        </div>
    );
}

export default Home;
