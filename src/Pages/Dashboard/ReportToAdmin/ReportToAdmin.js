import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const ReportToAdmin = () => {
    const { user, logOut } = useContext(AuthContext);

    const url = 'https://assignment-12-server-site-eight.vercel.app/report-to-admin';


    const { data: products = [], refetch } = useQuery({
        queryKey: ['my-products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (res.status === 401 || res.status === 403) {
                return logOut()
            }
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    const handleDelete = product => {
        fetch(`https://assignment-12-server-site-eight.vercel.app/report-to-admin/${product}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Product ${product.productName} deleted successfully`)
                }
            })
    }
    


    return (
        <div>
            <h3 className="text-3xl mb-5">Report Items</h3>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Reporter Name</th>
                            <th>Reporter email</th>
                            <th>Seller Email</th>
                            <th>Reported Time</th>
                            <th>Delete</th>
                            <th>productName</th>
                            <th>category_name</th>
                            <th>Price</th>
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
                                <td>{product.reporterName}</td>
                                <td>{product.reporterEmail}</td>
                                <td>{product.sellerEmail}</td>
                                <td>{product.reportTime}</td>
                                <td>{<button onClick={() => handleDelete(product._id)} className='btn btn-xs btn-danger'>Delete</button>}</td>
                                <td>{product.productName} tk</td>
                                <td>{product.category_name}</td>
                                <td>{product.resellPrice}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportToAdmin;