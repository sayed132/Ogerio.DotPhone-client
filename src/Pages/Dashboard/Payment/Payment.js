import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation} from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_PK);

const Payment = () => {
    const payment = useLoaderData();
    const navigation = useNavigation();
    // const { resellPrice, productName,} = booking;
    const {resellPrice, productName} = payment
    console.log(payment);
    if(navigation.state === "loading"){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-3xl">Payment for {productName}</h2>
            <p className='text-xl'><i>please pay <strong>${resellPrice}</strong> for this {productName} mobile phone</i></p>

            <div className="w-96 my-12 shadow-lg border-r-slate-300 border p-4 rounded-md">
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        payment={payment} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;