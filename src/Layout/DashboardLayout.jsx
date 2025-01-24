import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'

const DashboardLayout = () => {
  const location = useLocation();
  console.log('Current Path:', location.pathname);
  return (
    <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
