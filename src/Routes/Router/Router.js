import { createBrowserRouter } from "react-router-dom";
import Error from "../../Error/Error";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Main from "../../Layouts/Main";
import AddProducts from "../../Pages/Dashboard/AddProducts/AddProducts";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
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
            
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/allusers',
                element: <AllUsers></AllUsers>
            }
        ]
    },


])

export default router;