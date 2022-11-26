import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton';

const SingleProductDetails = ({ product, setBookingProduct }) => {
    console.log(product);
    const { resellPrice, postedTime, image, sellerName, sellerEmail, productName, originalPrice, _id, category_name, productLocation, uses } = product;
    return (
        <div className="card extra-style card-compact w-100 bg-base-100 shadow-2xl">

            <figure><img className='h-52' src={image} alt="" /></figure>

            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <h2 className="card-title">{productName}</h2>
                    <h3 className="card-title text-blue-700">{category_name}</h3>

                </div>
                <div>
                    <div className='mb-12 text-1xl font-semibold text-gray-400'>
                        <p>Location: {productLocation}</p>
                        <p>Years of uses: {uses}</p>
                        <h3>Post by: {sellerName} </h3>
                        <p>Org. Price: {originalPrice}</p>
                        <p>Post Time: {postedTime}</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-2xl text-orange-500 font-semibold'>Resell: {resellPrice}</p>
                        </div>
                        <div className="card-actions ">
                            <label
                                htmlFor="booking-modal"
                                className="btn btn-primary text-white"
                                onClick={() => setBookingProduct(product)}
                            >Buy Now</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;