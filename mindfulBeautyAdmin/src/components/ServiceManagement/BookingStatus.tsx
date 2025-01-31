import { NavLink, Outlet } from 'react-router-dom'
import { InputField } from '@/common/InputField'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSearchQuery as setBookingSearchQuery } from '@/redux/allbookingSlice';
import { setSearchQuery as setScheduleSearchQuery } from '@/redux/scheduleSlice';
import { setSearchQuery as setInprogressSearchQuery } from '@/redux/inprogressSlice';
import { setSearchQuery as setCompletedSearchQuery } from '@/redux/completedSlice';
import { setSearchQuery as setCancelledSearchQuery } from '@/redux/cancelledSlice';
// import { MdSearch } from "react-icons/md";

export const BookingStatus = () => {
    const dispatch = useDispatch()
    const searchQuery = useSelector((state: RootState) => state.allbooking.searchQuery || state.schedule.searchQuery
        || state.inprogress.searchQuery ||
        state.completed.searchQuery || state.cancelled.searchQuery)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        if (location.pathname.includes('AllBooking')) {
            dispatch(setBookingSearchQuery(query))
        } else if (location.pathname.includes('Schedule')) {
            dispatch(setScheduleSearchQuery(query));
        } else if (location.pathname.includes('Inprogress')) {
            dispatch(setInprogressSearchQuery(query));
        } else if (location.pathname.includes('Completed')) {
            dispatch(setCompletedSearchQuery(query));
        } else if (location.pathname.includes('Cancelled')) {
            dispatch(setCancelledSearchQuery(query));
        }
    }

    return (
        <div>
            <div className="bg-mindfulLightPink px-5 py-5">

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
                                <div className="">
                                    <InputField
                                        label={''}
                                        placeholder="Search"
                                        className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
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
