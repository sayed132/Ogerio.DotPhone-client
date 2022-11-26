import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = `http://localhost:5000/my-products?sellerEmail=${user?.email}`;


    const { data: products = [], refetch } = useQuery({
        queryKey: ['my-products', user?.email],
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
            console.log(data);
            return data;
        }
    })

    const handleDelete = product => {
        fetch(`http://localhost:5000/my-products/${product}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Product ${product.productName} deleted successfully`)
            }
        })
    }

    return (
        <div>
            <h3 className="text-3xl mb-5">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category</th>
                            <th>Product</th>
                            <th>location</th>
                            <th>Posted Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.category_name}</td>
                                <td>{product.productName}</td>
                                <td>{product.productLocation}</td>
                                <td>{product.postedTime}</td>
                                <td>{product.resellPrice} tk</td>
                                <td><button className='btn btn-xs btn-primary'>Sold</button></td>
                                <td>{<button onClick={() => handleDelete(product._id)} className='btn btn-xs btn-danger'>Delete</button>}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;