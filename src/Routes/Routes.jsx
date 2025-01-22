import MainLayout from "@/Layout/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import {
    createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/Layout/DashboardLayout";
import BookParcel from "@/pages/Dashboard/User/BookParcel";
import MyParcels from "@/pages/Dashboard/User/MyParcels";
import UpdateParcel from "@/pages/Dashboard/User/UpdateParcel";
import MyProfile from "@/pages/Dashboard/User/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: 'book-parcel',
                element: <PrivateRoute>
                    <BookParcel></BookParcel>
                </PrivateRoute>
            },
            {
                path: 'my-parcels',
                element: <PrivateRoute>
                    <MyParcels></MyParcels>
                </PrivateRoute>
            },
            {
                path: 'my-profile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>
            },
            {
                path: 'update-parcel/:id',
                element: <PrivateRoute>
                    <UpdateParcel></UpdateParcel>
                </PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/parcels/${params.id}`)
            }
        ],
    }
]);