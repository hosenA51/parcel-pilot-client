import { FaUsers } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { BiSolidPackage } from "react-icons/bi";
import { ImUsers } from "react-icons/im";

const AdminMenu = () => {
    console.log("AdminMenu rendered");
    return (
        <>
            <MenuItem icon={BsGraphUp} label='Statistics' address='statistics' />
            <MenuItem icon={FaUsers} label='All Users' address='all-users' />
            <MenuItem icon={BiSolidPackage} label='All Parcels' address='all-parcels' />
            <MenuItem icon={ImUsers} label='All Delivery Men' address='all-delivery-men' />
        </>
    )
}

export default AdminMenu
