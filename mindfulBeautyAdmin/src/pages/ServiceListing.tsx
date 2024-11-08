import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { MdSearch } from 'react-icons/md'
import { MdFormatListBulletedAdd } from "react-icons/md";
import { SelectField } from '@/common/SelectField';
import "../components/ServiceListing/ServiceListing.css"

export const ServiceListing = () => {

  return (
    <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

      <div className="bg-mindfulWhite px-5 py-5">

        <div className="pb-5">
          <div className="flex items-center justify-between">
            <div>
              <NavLink to="ServiceList">
                <h5 className="text-3xl font-semibold">Services List (85)</h5>
              </NavLink>
            </div>

            {/* Select, Add Service & Search */}
            <div className="flex items-center space-x-5">

              {/* Branch Select Field */}
              <div>
                <SelectField
                  label=""
                  name="branch"
                  // required
                  className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                  options={[
                    { value: "kochi", label: "Kochi" },
                    { value: "trivandrum", label: "Trivandrum" },
                    { value: "kollam", label: "Kollam" },
                    { value: "thrissur", label: "Thrissur" },
                  ]}
                // error="This field is required."
                />
              </div>

              {/* Add Service */}
              <NavLink to={"AddServices"}>
                <div
                  // onClick={openBranchPopup}
                  className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                >
                  <div>
                    <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                  </div>

                  <Button
                    buttonType="button"
                    buttonTitle="Add Service"
                    className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                  />
                </div>
              </NavLink>

              {/* Search Field */}
              <div className="flex items-center relative">
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
