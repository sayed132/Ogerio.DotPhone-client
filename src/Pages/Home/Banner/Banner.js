import React from 'react';
import bannerImg from '../../../Assets/banner/img11.jpg'
import PrimaryButton from '../../../Components/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero shadow-md rounded-md">
            <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={bannerImg} className="rounded-lg lg:w-1/2 shadow-2xl" alt='banner'/>
            
                <div>
                    <h1 className="text-5xl font-bold">Latest Lunching Phone!</h1>
                    <p className="py-6">A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail. All powered by the ultimate smartphone chip.</p>
                    <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gearrice.com%2Fupdate%2Fthese-are-the-best-wallpapers-of-the-house-of-the-dragon%2F&psig=AOvVaw0DUb-OhLH3S6LPsEmZvpZz&ust=1669316175531000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCbsL_9xPsCFQAAAAAdAAAAABAK"><PrimaryButton>See Update</PrimaryButton></a>
                </div>
            </div>
        </div>
    );
};

export default Banner;