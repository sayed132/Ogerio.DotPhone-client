import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const [isSeller, setIsSeller] = useState([])
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        fetch('http://localhost:5000/users-seller')
            .then(res => res.json())
            .then(data => {
                setIsSeller(data)
            })
    }, [])

    const handleVerify = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make Verified successful.')
                    refetch();
                }
            })
    }

    const handleDelete = user => {
        fetch(`http://localhost:5000/admin/users/${user}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`this  ${user.name} user deleted successfully`)
                }
            })
    }

    return (
        <div>
            <div className='my-12'>
                <h2 className="text-3xl mb-5 font-semibold">All Seller</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Account</th>
                                <th>Create Time</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isSeller.map((user, i) => <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td><div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={user.photoURL} alt="" />
                                        </div>
                                    </div></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.account_type}</td>
                                    <td>{user.account_create_time}</td>
                                    <td>
                                        {user?.verify !== true && <button onClick={() => handleVerify(user._id)} className='btn btn-xs btn-primary'>Make Verified</button>}
                                        {user?.verify && <p className='bg-green-600 text-white text-center text-sm rounded-lg py-1'>Verified</p>}
                                    </td>
                                    <td>{<button onClick={() => handleDelete(user._id)} className='btn btn-xs btn-danger'>Delete</button>}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
            <div>
                <h2 className="text-3xl mb-5 font-semibold">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Account</th>
                                <th>Create Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, i) => <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td><div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={user.photoURL} alt="" />
                                        </div>
                                    </div></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.account_type}</td>
                                    <td>{user.account_create_time}</td>
                                    <td>{<button onClick={() => handleDelete(user._id)} className='btn btn-xs btn-danger'>Delete</button>}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;