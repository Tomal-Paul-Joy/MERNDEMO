import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Login/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/Parcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcel from "../Pages/MyParcel/MyParcel";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/PamentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/UsersManagement/UsersManagement";
import AdminRoute from "../AdminRoute/AdminRoute";
import AssignRiders from "../Pages/AssignRiders/AssignRiders";





export const router = createBrowserRouter([


    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/rider",
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/public/servicecenter.json').then(res => res.json())
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/public/servicecenter.json').then(res => res.json()),
                hydrateFallbackElement: <div>wait</div>
            },
            {
                path: '/send-parcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('/public/servicecenter.json').then(res => res.json()),
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                path: "my-parcels",
                Component: MyParcel,
            },
            {
                path: 'payment/:id',
                Component: Payment,

            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-cancelled',
                Component: PaymentCancel
            }
            ,
            {
                path: '/dashboard/payment-history',
                Component: PaymentHistory,
            },
            {
                path: '/dashboard/approve-riders',
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: '/dashboard/users-management',
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
            {
                path: '/dashboard/assign-riders',
                Component: AssignRiders
            }
        ]
    }
]);

