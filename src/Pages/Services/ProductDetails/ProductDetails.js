import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import SingleProductDetails from './SingleProductDetails';

const ProductDetails = () => {
    const category = useLoaderData()
    const [verify, setVerify] = useState(false)
    useEffect(() => {
        
            fetch('https://assignment-12-server-site-eight.vercel.app/users')
                .then(res => res.json())
                .then(data => {
                    console.log('users data',data);
                    setVerify(data)
                })
        
    }, [])
    console.log('inside data',verify);
    const [bookingProduct, setBookingProduct] = useState(null);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`https://assignment-12-server-site-eight.vercel.app/available-product/${category.category_name}`)
            .then(res => res.json())

    })
    console.log('product:', products);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6'>
                {
                    products.map(product => <SingleProductDetails
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                        setVerify={setVerify}
                        verify={verify}
                    ></SingleProductDetails>)
                }
                {
                    bookingProduct &&
                    <BookingModal
                        bookingProduct={bookingProduct}
                        verify={verify}
                        setBookingProduct={setBookingProduct}
                        setVerify={setVerify}
                        refetch={refetch}
                    ></BookingModal>
                }

            </div>

        </div>
    );
};

export default ProductDetails;