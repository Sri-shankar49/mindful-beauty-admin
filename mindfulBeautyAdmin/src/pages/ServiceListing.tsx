import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { MdSearch } from 'react-icons/md'
import { MdFormatListBulletedAdd } from "react-icons/md";
import { SelectField } from '@/common/SelectField';
import "../components/ServiceListing/ServiceListing.css"
import { Pagination } from '@/common/Pagination';

export const ServiceListing = () => {

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
