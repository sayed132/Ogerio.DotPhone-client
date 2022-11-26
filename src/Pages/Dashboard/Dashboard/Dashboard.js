import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?buyerEmail=${user?.email}`;


    const { data: bookings = [] } = useQuery({
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
                            <th>Category</th>
                            <th>Product</th>
                            <th>location</th>
                            <th>Booking Time</th>
                            <th>Price</th>
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
                                <td>{booking.category_name}</td>
                                <td>{booking.productName}</td>
                                <td>{booking.buyerLocation}</td>
                                <td>{booking.bookingTime}</td>
                                <td>{booking.resellPrice} tk</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;