import { createBrowserRouter } from "react-router-dom";
import Error from "../../Error/Error";
import Main from "../../Layouts/Main";
import AddProducts from "../../Pages/Dashboard/AddProducts/AddProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductDetails from "../../Pages/Services/ProductDetails/ProductDetails";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/products-category/${params.id}`)
            },
            {
                path: 'add-product',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/blog'
            },
        ]
    },

    // {
    //     path: '/dashboard',
    //     element: <PrivateRoute><DashboardLayouts></DashboardLayouts></PrivateRoute>,
    //     errorElement: <Error></Error>,
    //     children: [
    //         {
    //             path: '/dashboard',
    //             element: <MyAppointment></MyAppointment>
    //         },
    //         {
    //             path: '/dashboard/allusers',
    //             element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
    //         },
    //         {
    //             path: '/dashboard/add-doctor',
    //             element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
    //         },
    //         {
    //             path: '/dashboard/managedoctors',
    //             element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
    //         },
    //         {
    //             path: '/dashboard/payment/:id',
    //             element: <Payment></Payment>,
    //             loader: ({params}) => fetch(`https://doctors-portal-server-site-xi.vercel.app/bookings/${params.id}`)
    //         },
    //     ]
    // }
])

export default router;