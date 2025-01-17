import { NavLink, Outlet } from 'react-router-dom'

export const MyAccount = () => {
    return (
        <div>
            <div>
                <div className="bg-mindfulLightPink px-5 py-5" >

                    <div className="bg-mindfulWhite px-5 py-5">

                        <div className="border-b-2 border-b-mindfulgrey pb-3.5">
                            <div className="flex items-center">
                                {/* Sub Menus */}
                                <ul className="flex items-center space-x-10">
                                    <NavLink
                                        to="GeneralInfo"
                                        className={({ isActive }) =>
                                            isActive ? "active-sub-nav active" : undefined
                                        }
                                        aria-current="page"
                                    >
                                        <li>General Info</li>
                                    </NavLink>

                                    <NavLink
                                        to="Wallet"
                                        className={({ isActive }) =>
                                            isActive ? "active-sub-nav active" : undefined
                                        }
                                        aria-current="page"
                                    >
                                        <li>Wallet</li>
                                    </NavLink>

                                </ul>
                            </div>
                        </div>

                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    )
}
