import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdHomeWork, MdReviews } from 'react-icons/md'
import MenuItem from './MenuItem'
import { ImProfile } from "react-icons/im";
const DeliveryMenMenu = () => {
  return (
    <>
      <MenuItem
        icon={HiClipboardDocumentList}
        label='My Delivery List'
        address='my-delivery-list'
      />
      <MenuItem icon={ImProfile} label='My Profile' address='my-profile' />
      <MenuItem icon={MdReviews} label='My Reviews' address='my-reviews' />
    </>
  )
}

export default DeliveryMenMenu

