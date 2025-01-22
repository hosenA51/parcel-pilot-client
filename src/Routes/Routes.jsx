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
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "@/pages/Dashboard/Admin/Statistics";
import AllParcels from "@/pages/Dashboard/Admin/AllParcels";

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
                    <UserRoute>
                        <BookParcel></BookParcel>
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: 'my-parcels',
                element: <PrivateRoute>
                    <UserRoute>
                        <MyParcels></MyParcels>
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: 'my-profile',
                element: <PrivateRoute>
                    <UserRoute>
                        <MyProfile></MyProfile>
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: 'update-parcel/:id',
                element: <PrivateRoute>
                    <UserRoute>
                        <UpdateParcel></UpdateParcel>
                    </UserRoute>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/parcels/${params.id}`)
            },
            {
                path: 'statistics',
                element: <PrivateRoute>
                    <AdminRoute>
                        <Statistics></Statistics>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: 'all-parcels',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AllParcels></AllParcels>
                    </AdminRoute>
                </PrivateRoute>
            }
        ],
    }
]);