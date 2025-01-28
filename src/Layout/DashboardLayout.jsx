import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import useRole from '@/hooks/useRole';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, isLoading] = useRole();

  useEffect(() => {
    if (!isLoading) {
      if (role === "admin") {
        navigate("/dashboard/statistics");
      } else if (role === "delivery-men") {
        navigate("/dashboard/my-delivery-list");
      } else if (role === "user") {
        navigate("/dashboard/my-profile");
      }
    }
  }, [role, isLoading, navigate]);
  return (
    <div className='relative min-h-screen md:flex bg-white'>
      <Sidebar />
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
