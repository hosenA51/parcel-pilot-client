import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
    const {data: role, isLoading} = useQuery({
        queryKey:['role', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure(`/users/role/${user?.email}`)
            console.log("Role Data:", data);  // এখানে লগ ইনফো দিয়ে চেক করুন
            return data?.role || 'user';
        }
    })
    
    return [role, isLoading]
};

export default useRole;