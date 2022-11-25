import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import SingleProductDetails from './SingleProductDetails';

const ProductDetails = () => {
    const category = useLoaderData()
    const [bookingProduct, setBookingProduct] = useState(null);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/available-product/${category.category_name}`)
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
                    ></SingleProductDetails>)
                }
                {
                    bookingProduct &&
                    <BookingModal
                        bookingProduct={bookingProduct}
                        setBookingProduct={setBookingProduct}
                        refetch={refetch}
                    ></BookingModal>
                }

            </div>

        </div>
    );
};

export default ProductDetails;