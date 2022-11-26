import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/all-products');
            const data = await res.json();
            return data;
        }
    });

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

    return (
        <div>
            <h2 className="text-3xl">All Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>n</th>
                            <th>Image</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Category</th>
                            <th>Product Name</th>
                            <th>Posted Time</th>
                            <th>Sell price</th>
                            <th>Original price</th>
                            <th>Location</th>
                            <th>Year of uses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={product.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{product.sellerName}</td>
                                <td>{product.sellerEmail}</td>
                                <td>{product.category_name}</td>
                                <td>{product.productName}</td>
                                <td>{product.postedTime}</td>
                                <td>{product.resellPrice}</td>
                                <td>{product.originalPrice}</td>
                                <td>{product.productLocation}</td>
                                <td>{product.uses}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;