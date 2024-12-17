import { NavLink, Outlet } from 'react-router-dom'
import { InputField } from '@/common/InputField'
import { MdSearch } from "react-icons/md";
import "../components/ManageRole/ManageRole.css";

export const ManageRole = () => {
  return (
    <div className="bg-mindfulLightPink px-5 py-5" >

      <div className="bg-mindfulWhite px-5 py-5">

        <div className="border-b-2 border-b-mindfulgrey pb-2">
          <div className="flex items-center justify-between">
            {/* Sub Menus */}
            <ul className="flex items-center space-x-10">
              <NavLink
                to="RolesManagement"
                className={({ isActive }) =>
                  isActive ? "active-sub-nav  active" : undefined
                }
                aria-current="page"
              >
                <li>Roles Management</li>
              </NavLink>

              <NavLink
                to="StaffManagement"
                className={({ isActive }) =>
                  isActive ? "active-sub-nav active" : undefined
                }
                aria-current="page"
              >
                <li>Staff Management</li>
              </NavLink>

              <NavLink
                to="BranchManagement"
                className={({ isActive }) =>
                  isActive ? "active-sub-nav active" : undefined
                }
                aria-current="page"
              >
                <li>Branch Management</li>
              </NavLink>

            </ul>

            <div>
              <div className="relative">
                {/* <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                /> */}
                <InputField
                  label={''}
                  placeholder="Search"
                  className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                />
                <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <Outlet />

      </div>


    </div>
  )
}
