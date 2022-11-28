import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-site-eight.vercel.app/all-products');
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = product => {
        fetch(`https://assignment-12-server-site-eight.vercel.app/all-product/${product}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Product ${product.productName} deleted successfully`)
                    refetch();
                }
            })
    }

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
                            <th>Delete</th>
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
                                <td><td>{<button onClick={() => handleDelete(product._id)} className='btn btn-xs btn-danger'>Delete</button>}</td></td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;