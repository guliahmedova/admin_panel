import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
    const auth = JSON.parse(localStorage.getItem('accessToken'));

    return (
        auth ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;