import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton';
import blueTick from '../../../Assets/bluetick.png'
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const SingleProductDetails = ({ product, setBookingProduct, verify, setVerify }) => {
    const {user} = useContext(AuthContext)
    const [reportItem, setReportItem] = useState(null);
    console.log(product);
    console.log('inside this', verify);
    const { resellPrice, postedTime, image, sellerName, sellerEmail, productName, originalPrice, _id, category_name, productLocation, uses } = product;


    const handleReport = id => {
        
        const time = new Date().toLocaleString();
        const reporterEmail = user?.email;
        const reporterName = user?.displayName
        const report = {
            collectionId : _id,
            productName,
            resellPrice,
            image,
            category_name,
            reportTime: time,
            sellerEmail,
            reporterEmail,
            reporterName
        }

        fetch(`http://localhost:5000/report-to-admin/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    
                    toast.success('item reported')
                    // refetch()
                }
                else {
                    toast.error(data.message)
                }

            })

    }
    return (
        <div className="card extra-style card-compact w-100 bg-base-100 shadow-2xl">

            <figure><img className='h-52' src={image} alt="" /></figure>

            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <h2 className="card-title">{productName}</h2>
                    {/* <h3 className="card-title text-blue-700">{category_name}</h3> */}
                    <button onClick={() => handleReport(_id)} className='btn btn-xs btn-primary'>Report to Admin</button>

                </div>
                <div>
                    <div className='mb-12 text-1xl font-semibold text-gray-400'>
                        <p>Location: {productLocation}</p>
                        <p>Years of uses: {uses}</p>
                        <h3>Posted by: 
                        {
                         verify?.verify === true && sellerName && <img className='w-4 h-4 rounded-full' src={blueTick} alt="verify" />
                        }
                        {sellerName}
                        </h3>
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