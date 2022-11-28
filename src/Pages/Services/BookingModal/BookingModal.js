import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct, refetch }) => {
    const { productName, category_name, resellPrice, image, sellerEmail, _id } = bookingProduct;
    console.log("inside", bookingProduct);
    const { user } = useContext(AuthContext);


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const time = new Date().toLocaleString();
        const resellPrice = form.resellPrice.value;
        const category_name = form.category_name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const name = form.name.value;
        const buyerLocation = form.location.value;
        const booking = {
            collectionId : _id,
            productName,
            resellPrice,
            image,
            category_name,
            bookingTime: time,
            buyerName: name,
            buyerEmail: email,
            sellerEmail,
            buyerPhone: phone,
            buyerLocation
        }

        fetch('https://assignment-12-server-site-eight.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setBookingProduct(null);
                    toast.success('item is booked')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }

            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Model: {productName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name="name" type="text" defaultValue={user?.displayName} readOnly disabled className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} readOnly disabled className="input w-full input-bordered" />
                        <input name="category_name" type="text" defaultValue={category_name} readOnly disabled className="input w-full input-bordered" />
                        <input name="category_name" type="text" defaultValue={productName} readOnly disabled className="input w-full input-bordered" />
                        <input name="resellPrice" type="text" defaultValue={resellPrice} readOnly disabled className="input w-full input-bordered" />
                        <input required name="phone" type="text" placeholder="Type Your Phone Number" className="input w-full input-bordered" />
                        <input required name="location" type="text" placeholder="Please Provide Your Location " className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;