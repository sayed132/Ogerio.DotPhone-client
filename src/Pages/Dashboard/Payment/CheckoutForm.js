import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({payment}) => {
    const {resellPrice, buyerName, _id, buyerEmail, productName, buyerPhone, sellerEmail, collectionId} = payment
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState();
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState();
    const [transactionId, setTransactionId] = useState()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://assignment-12-server-site-eight.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ resellPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resellPrice]);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
        }
        setSuccess('');
        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log("paymentIntent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                resellPrice,
                transactionId: paymentIntent.id,
                buyerEmail,
                productName,
                buyerPhone,
                sellerEmail,
                bookingId: _id,
                collectionId
            }
            fetch('https://assignment-12-server-site-eight.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-primary my-12' type="submit" disabled=
                    {!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-700'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;