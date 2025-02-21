import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { InputField } from '@/common/InputField';
// import { MdSearch } from "react-icons/md";
import "../components/ManageRole/ManageRole.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery as setStaffSearchQuery } from '@/redux/staffSlice';
import { setSearchQuery as setBranchSearchQuery } from '@/redux/branchSlice';
import { RootState } from '@/redux/store';

export const ManageRole = () => {

  const dispatch = useDispatch();
  const location = useLocation(); // Detect current route

  const searchQuery = useSelector((state: RootState) => state.staff.searchQuery || state.branch.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (location.pathname.includes('StaffManagement')) {
      dispatch(setStaffSearchQuery(query));
    } else if (location.pathname.includes('BranchManagement')) {
      dispatch(setBranchSearchQuery(query));
    }
  };

  // Add this to check if we're on the RolesManagement page
  const showSearch = location.pathname.includes('RolesManagement');

  return (
    <div className="bg-mindfulLightPink px-5 py-5" >

      <div className="bg-mindfulWhite px-5 py-5">

        <div className="border-b-2 border-b-mindfulgrey pb-2">
          <div className="flex items-center justify-between">
            {/* Sub Menus */}
            <ul className="flex items-center space-x-10">
              {/* <NavLink
                to="RolesManagement"
                className={({ isActive }) =>
                  isActive ? "active-sub-nav active" : undefined
                }
                aria-current="page"
              >
                <li>Roles Management</li>
              </NavLink> */}

              <NavLink
                to="RolesManagement"
                className={({ isActive }) =>
                  isActive ? "active-sub-nav active" : undefined
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

            {/* Only show search input if not on RolesManagement */}
            {/* {showSearch && ( */}
            <div>
              <div className="">
                <InputField
                  label={''}
                  placeholder="Search"
                  className={`${showSearch ? "invisible" : ""} w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            {/* )} */}
          </div>
        </div>

        <Outlet />

      </div>


    </div>
  )
}
