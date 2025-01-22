import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

const UserRoute = ({children}) => {
    const [role, isLoading] = useRole();

    if(isLoading) return <span className="loading loading-dots loading-lg"></span>
    if(role === 'user') return children
    return <Navigate to='/dashboard' state={{from: location}} replace='true'></Navigate>
};

export default UserRoute;