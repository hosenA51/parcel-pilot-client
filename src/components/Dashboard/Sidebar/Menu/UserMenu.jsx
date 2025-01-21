import MenuItem from './MenuItem'
import { BiSolidPackage } from 'react-icons/bi'
import { TbBrandBooking } from "react-icons/tb";
import { ImProfile } from 'react-icons/im';

const UserMenu = () => {

  return (
    <>
      <MenuItem icon={ImProfile} label='My Profile' address='my-profile' />
      <MenuItem icon={TbBrandBooking} label='Book a Parcel' address='book-parcel' />
      <MenuItem icon={BiSolidPackage} label='My Parcels' address='my-parcels' />
    </>
  )
}

export default UserMenu