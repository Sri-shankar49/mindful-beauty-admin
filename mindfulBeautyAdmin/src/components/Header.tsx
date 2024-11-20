import { FaBell } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import mindfulBeautyLogoSmall from "../assets/icons/mindfulBeautyLogoSmall.png";
import ashtamudiLogo from "../assets/icons/ashtamudiLogo.png";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
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
                        <div>
                            <div className="flex items-center">
                                <div className="bg-mindfulBlue rounded-full w-10 h-10 flex items-center justify-center mr-1">
                                    <FaUserLarge className="text-[18px] text-mindfulWhite" />
                                </div>

                                {/* Profile Name */}
                                <div>
                                    <p className="text-md text-mindfulBlack font-semibold">Paul</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </header>
    )
}
