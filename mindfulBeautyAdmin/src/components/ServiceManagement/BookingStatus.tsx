import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { InputField } from '@/common/InputField'
// import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setSearchQuery as setAllbookingSearchQuery } from '@/redux/allbookingSlice';
import { setSearchQuery as setScheduleSearchQuery } from '@/redux/scheduleSlice';
import { setSearchQuery as setInprogressSearchQuery } from '@/redux/inprogressSlice';
import { setSearchQuery as setCompletedSearchQuery } from '@/redux/completedSlice';
import { setSearchQuery as setCancelledSearchQuery } from '@/redux/cancelledSlice';

export const BookingStatus = () => {

    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    // Determine current tab and fetch appropriate search state
    // Determine which tab is active
    const isAllBookingTab = location.pathname.includes('AllBooking');
    const isScheduleTab = location.pathname.includes('Schedule');
    const isInprogressTab = location.pathname.includes('Inprogress');
    const isCompletedTab = location.pathname.includes('Completed');
    const isCancelledTab = location.pathname.includes('Cancelled');

    // Get search query from Redux state
    const allBookingSearchQuery = useSelector((state: RootState) => state.allbooking.searchQuery);
    const scheduleSearchQuery = useSelector((state: RootState) => state.schedule.searchQuery);
    const inprogressSearchQuery = useSelector((state: RootState) => state.inprogress.searchQuery);
    const completedSearchQuery = useSelector((state: RootState) => state.completed.searchQuery);
    const cancelledSearchQuery = useSelector((state: RootState) => state.cancelled.searchQuery);

    // Set correct search query
    // const searchQuery = isAllBookingTab ? bookingSearchQuery : isScheduleTab ? scheduleSearchQuery : isInprogressTab ? inprogressSearchQuery : isCompletedTab ? CompletedSearchQuery : isCancelledTab ? CancelledSearchQuery : '';

    const searchQuery =
        isAllBookingTab ? allBookingSearchQuery :
            isScheduleTab ? scheduleSearchQuery :
                isInprogressTab ? inprogressSearchQuery :
                    isCompletedTab ? completedSearchQuery :
                        isCancelledTab ? cancelledSearchQuery :
                            '';


    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (isAllBookingTab) {
            dispatch(setAllbookingSearchQuery(value));
        } else if (isScheduleTab) {
            dispatch(setScheduleSearchQuery(value));
        } else if (isInprogressTab) {
            dispatch(setInprogressSearchQuery(value));
        } else if (isCompletedTab) {
            dispatch(setCompletedSearchQuery(value));
        } else if (isCancelledTab) {
            dispatch(setCancelledSearchQuery(value));
        }
    };


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
                                    {/* <input
                                            type="text"
                                            name=""
                                            id=""
                                            className=''
                                        /> */}
                                    <InputField
                                        label={''}
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                    />
                                    {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
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
