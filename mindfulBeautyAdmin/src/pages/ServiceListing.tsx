import { NavLink, Outlet } from 'react-router-dom';

export const ServiceListing = () => {

  return (
    <div>
      <div>
        <div>
          <div className="bg-mindfulLightPink px-5 py-5" >

            <div className="bg-mindfulWhite px-5 py-5">

              <div className="border-b-2 border-b-mindfulgrey pb-3.5">
                <div className="flex items-center">
                  {/* Sub Menus */}
                  <ul className="flex items-center space-x-10">
                    <NavLink
                      to="ServiceList"
                      className={({ isActive }) =>
                        isActive ? "active-sub-nav active" : undefined
                      }
                      aria-current="page"
                    >
                      <li>Services</li>
                    </NavLink>

                    <NavLink
                      to="PackagesList"
                      className={({ isActive }) =>
                        isActive ? "active-sub-nav active" : undefined
                      }
                      aria-current="page"
                    >
                      <li>Packages</li>
                    </NavLink>

                  </ul>
                </div>
              </div>

              <Outlet />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
