import { NavLink, Outlet } from 'react-router-dom'
import { InputField } from '@/common/InputField'
import { MdSearch } from "react-icons/md";

export const BookingStatus = () => {
    return (
        <div>
            <div className="bg-mindfulLightPink h-dvh px-5 py-5 relative z-[-1]" >

                <div className="bg-mindfulWhite px-5 py-5">

                    <div className="border-b-2 border-b-mindfulgrey pb-2">
                        <div className="flex items-center justify-between">
                            {/* Sub Menus */}
                            <ul className="flex items-center space-x-10">
                                <NavLink
                                    to="AllBooking"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>All Booking</li>
                                </NavLink>

                                <NavLink
                                    to="Schedule"
                                    className="active-sub-nav"
                                    aria-current="page"

                                >
                                    <li>Schedule</li>
                                </NavLink>

                                <NavLink
                                    to="Inprogress"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>Inprogress</li>
                                </NavLink>

                                <NavLink
                                    to="Completed"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>Completed</li>
                                </NavLink>

                                <NavLink
                                    to="Cancelled"
                                    className="active-sub-nav"
                                    aria-current="page"
                                >
                                    <li>Cancelled</li>
                                </NavLink>
                            </ul>

                            <div>
                                <div className="relative">
                                    {/* <input
                                            type="text"
                                            name=""
                                            id=""
                                            className=''
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
        </div>
    )
}
