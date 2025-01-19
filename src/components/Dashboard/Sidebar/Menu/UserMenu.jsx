import MenuItem from './MenuItem'
import { BiSolidPackage } from 'react-icons/bi'
import { TbBrandBooking } from "react-icons/tb";
import { ImProfile } from 'react-icons/im';

const UserMenu = () => {

  return (
    <>
      <MenuItem icon={TbBrandBooking} label='Book a Parcel' address='book-parcel' />
      <MenuItem icon={BiSolidPackage} label='My Parcels' address='my-parcels' />
      <MenuItem icon={ImProfile} label='My Profile' address='my-profile' />
    </>
  )
}

export default UserMenu