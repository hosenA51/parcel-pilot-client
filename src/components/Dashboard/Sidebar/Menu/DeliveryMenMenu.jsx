import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdHomeWork, MdReviews } from 'react-icons/md'
import MenuItem from './MenuItem'
const DeliveryMenMenu = () => {
  return (
    <>
      <MenuItem
        icon={HiClipboardDocumentList}
        label='My Delivery List'
        address='my-delivery-list'
      />
      <MenuItem icon={MdReviews} label='My Reviews' address='my-reviews' />
    </>
  )
}

export default DeliveryMenMenu

