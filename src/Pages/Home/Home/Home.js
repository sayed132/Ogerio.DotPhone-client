import React from 'react';
import About from '../About/About';
import Advertised from '../Advertised/Advertised';
import Banner from '../Banner/Banner'
import HomeCategory from '../HomeCategory/HomeCategory';
const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <HomeCategory></HomeCategory>
            <Advertised></Advertised>
            <About></About>
        </div>
    );
};

export default Home;