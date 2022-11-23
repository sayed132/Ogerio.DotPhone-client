import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner'
import HomeCategory from '../HomeCategory/HomeCategory';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeCategory></HomeCategory>
            <About></About>
        </div>
    );
};

export default Home;