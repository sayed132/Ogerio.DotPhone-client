import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import DashboardNavbar from '../Pages/Shared/Navbar/DashboardNavbar/DashboardNavbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <div>
            <DashboardNavbar></DashboardNavbar>
            <div className="drawer  drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to="/dashboard">My Orders</Link></li>
                        
                        {
                           isSeller &&
                            <>
                                <li><Link to="/dashboard/add-product">Add Product</Link></li>
                                <li><Link to="/dashboard/my-products">My Products</Link></li>
                                <li><Link to="/dashboard/req-order">My Buyers</Link></li>
                                
                            </>
                        }
                        {
                           isAdmin &&
                            <>
                                <li><Link to="/dashboard/allusers">All users</Link></li>
                                <li><Link to="/dashboard/all-products">All Products</Link></li>
                                <li><Link to="/dashboard/report-to-admin">Report to admin</Link></li>
                                
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;