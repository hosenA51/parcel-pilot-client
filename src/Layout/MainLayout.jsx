import Footer from "@/pages/Shared/Footer/Footer";
import Navbar from "@/pages/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;