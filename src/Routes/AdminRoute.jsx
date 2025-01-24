import useRole from "@/hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (isLoading) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (role === 'admin') {
        return children;
    }
    console.log('Role in AdminRoute:', role);
    return <Navigate to='/dashboard' state={{from: location}} replace='true'></Navigate>
};

export default AdminRoute;
