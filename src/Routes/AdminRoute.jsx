import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();

    if(isLoading) return <span className="loading loading-dots loading-lg"></span>
    if(role === 'admin') return children
    return <Navigate to='/dashboard' state={{from: location}} replace='true'></Navigate>
};

export default AdminRoute;