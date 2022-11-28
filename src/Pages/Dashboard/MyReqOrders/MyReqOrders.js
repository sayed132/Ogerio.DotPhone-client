import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyReqOrders = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `https://assignment-12-server-site-eight.vercel.app/req-order?sellerEmail=${user?.email}`;


    const { data: orders = [] } = useQuery({
        queryKey: ['req-order', user?.email],
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
            <h3 className="text-3xl mb-5">My Buyers</h3>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Category</th>
                            <th>Product</th>
                            <th>location</th>
                            <th>Booking Time</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order, i) => <tr key={order._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={order.image} alt="" />
                                </div>
                            </div></td>
                                <td>{order.buyerName}</td>
                                <td>{order.buyerEmail}</td>
                                <td>{order.buyerPhone}</td>
                                <td>{order.category_name}</td>
                                <td>{order.productName}</td>
                                <td>{order.buyerLocation}</td>
                                <td>{order.bookingTime}</td>
                                <td>{order.resellPrice} tk</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReqOrders;