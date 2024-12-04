import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import mindfulBeautyLogoSmall from "../assets/icons/mindfulBeautyLogoSmall.png";
import ashtamudiLogo from "../assets/icons/ashtamudiLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store";
import { logout } from "@/redux/loginSlice";

export const Header = () => {

    const [profileHover, setProfileHover] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, phoneNumber } = useSelector((state: RootState) => state.login);

    const handleLogout = async () => {
        dispatch(logout()); // Logout and clear token
        navigate("/");
        sessionStorage.clear();

        // Purge persisted state (this will remove Redux Persist data, i.e., localStorage data)
        await persistor.purge();  // This clears the persisted Redux state from localStorage
    }


    const handleMouseEnter = () => {
        setProfileHover(true);
    };

    const handleMouseLeave = () => {
        setProfileHover(false);
    };
    return (
        <header>

            <div className="backdrop-blur-lg bg-opacity-100 shadow-md px-10 py-5">
                <div className="flex justify-between items-center">
                    {/* Admin Logo */}
                    <div className="flex justify-center items-center space-x-3">
                        {/* Mindful Beauty Logo */}
                        <Link to="/Dashboard">
                            <div>
                                <img src={mindfulBeautyLogoSmall} alt="mindful beauty logo" />
                            </div>
                        </Link>

                        {/* Vertical line */}
                        <div className="bg-mindfulgrey w-[1px] h-10"></div>

                        {/* Astamudi Wellness Logo */}
                        <div>
                            <img src={ashtamudiLogo} alt="ashtamudi logo" />
                        </div>
                    </div>

                    {/* Navbar Menu */}
                    <div>
                        <nav className="">
                            <ul className="flex items-center space-x-10">

                                {/* Dashboard */}
                                <NavLink
                                    to="/Dashboard"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Dashboard</li>
                                </NavLink>

                                {/* Manage Role */}
                                <NavLink
                                    to="/ManageRole"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Manage Role</li>
                                </NavLink>

                                {/* Service Listing */}
                                <NavLink
                                    to="/ServiceListing"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Service Listing</li>
                                </NavLink>

                                {/* Service Management */}
                                <NavLink
                                    to="/ServiceManagement"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Service Management</li>
                                </NavLink>

                                {/* Sales & Transactions */}
                                <NavLink
                                    to="/SalesTransactions"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Sales & Transactions</li>
                                </NavLink>

                                {/* Ratings & Reviews */}
                                <NavLink
                                    to="/RatingsReviews"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Ratings & Reviews</li>
                                </NavLink>

                                {/* Reports */}
                                <NavLink
                                    to="/Reports"
                                    className="active-nav"
                                    aria-current="page"
                                >
                                    <li className="text-md">Reports</li>
                                </NavLink>

                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-10">

                        <div className="flex items-center">
                            {/* Service Online */}
                            <div>
                                <p className="text-md text-mindfulBlack font-semibold">Service Online</p>
                            </div>

                            {/* Toggle Button */}
                            <div>
                                <div className="toggle-switch">
                                    <input className="toggle-input" id="toggle" type="checkbox" />
                                    <label className="toggle-label" htmlFor="toggle"></label>
                                </div>
                            </div>
                        </div>

                        {/* Notification Bell Icon */}
                        <div>
                            <FaBell className="text-[22px] text-mindfulBlue" />
                        </div>

                        {/* Profile Name */}
                        <div className="relative cursor-pointer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex items-center space-x-1">
                                <div className="bg-mindfulBlue rounded-full w-10 h-10 flex items-center justify-center mr-1">
                                    <FaUserLarge className="text-[18px] text-mindfulWhite" />
                                </div>

                                {/* Profile Name */}
                                <div className="w-20">
                                    <p className="text-md text-mindfulBlack font-semibold">
                                        {token && phoneNumber ? `Hello, User ${phoneNumber}` : `Hello, Guest`}
                                    </p>
                                </div>
                            </div>

                            {/* More Options */}
                            <div>
                                {profileHover && (
                                    <div className="absolute bottom-[-9.5rem] right-0 mt-2 w-48 bg-mindfulWhite rounded-md shadow-lg py-1 z-20">
                                        {/* <Link to=""> */}
                                        <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                            My Profile
                                        </div>
                                        {/* </Link> */}

                                        {/* <Link to=""> */}
                                        <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                            Password Reset
                                        </div>
                                        {/* </Link> */}

                                        {/* <Link to=""> */}
                                        <div onClick={handleLogout} className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                            Sign Out
                                        </div>
                                        {/* </Link> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </header>
    )
}
