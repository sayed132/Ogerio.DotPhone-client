import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?buyerEmail=${user?.email}`;


    const { data: bookings = [] , refetch} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if(res.status === 401 || res.status === 403){
                return logOut()
            }
            const data = await res.json();
            return data;
        }
    })

    // const handleMakeAdmin = id => {
    //     fetch(`http://localhost:5000/users/admin/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast.success('Make Verified successful.')
    //                 refetch();
    //             }
    //         })
    // }

    const handleDelete = booking => {
        fetch(`http://localhost:5000/bookings/${booking}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Product ${booking.productName} deleted successfully`)
            }
        })
    }

    return (
        <div>
            <h3 className="text-3xl mb-5">My Order</h3>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>location</th>
                            <th>Booking Time</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={booking.image} alt="" />
                                </div>
                            </div></td>
                                <td>{booking.buyerName}</td>
                                <td>{booking.productName}</td>
                                <td>{booking.buyerLocation}</td>
                                <td>{booking.bookingTime}</td>
                                <td>{booking.resellPrice} tk</td>
                                <td>
                                {
                                        booking.resellPrice && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn btn-primary btn-sm text-white'>Pay Now</button>
                                        </Link>
                                    }
                                    {
                                        booking.resellPrice && booking.paid &&
                                        <button className='btn btn-primary btn-sm text-white' disabled>Paid</button>
                                    }
                                </td>
                                <td>{<button onClick={() => handleDelete(booking._id)} className='btn btn-xs btn-danger'>Delete</button>}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;