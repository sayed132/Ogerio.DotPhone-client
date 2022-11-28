import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../../Services/BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';
import AdvertisedDetails from './AdvertisedDetails';

const Advertised = () => {
    // const category = useLoaderData()
    const [verify, setVerify] = useState(false)
    // useEffect(() => {
        
    //         fetch('http://localhost:5000/users')
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log('users data',data);
    //                 setVerify(data)
    //             })
        
    // }, [])
    console.log('inside data',verify);
    const [bookingProduct, setBookingProduct] = useState(null);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/advertised')
            .then(res => res.json())

    })
    console.log('product:', products);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            {
                products.length > 0 && <h2 className="text-3xl">Available Advertised Items</h2>
            }

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6'>
                {
                    products.map(product => <AdvertisedDetails
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                        setVerify={setVerify}
                        verify={verify}
                    ></AdvertisedDetails>)
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

export default Advertised;