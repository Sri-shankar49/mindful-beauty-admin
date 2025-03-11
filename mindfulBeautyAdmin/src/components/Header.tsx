import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { FaBell } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import mindfulBeautyLogoSmall from "../assets/icons/mindfulBeautyLogoSmall.png";
import ashtamudiLogo from "../assets/icons/ashtamudiLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store";
import { logout } from "@/redux/loginSlice";
import { onlineAction } from "@/api/apiConfig";

export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, phoneNumber, permissions, providerLogo, providerOnlineStatus } = useSelector((state: RootState) => state.login);
    console.log("Permission check ==>", permissions, token, phoneNumber, providerLogo, providerOnlineStatus);


    // Getting Freelancer state from Redux
    const { freelancer, mainBranch } = useSelector((state: RootState) => state.login);
    console.log("Freelancer boolean Status & Main Branch", freelancer, mainBranch);

    // ** Check session storage first, otherwise use providerOnlineStatus **
    const storedStatus = sessionStorage.getItem("isActiveStatus");
    const initialStatus = storedStatus !== null ? JSON.parse(storedStatus) : providerOnlineStatus === 1;

    const [isActive, setIsActive] = useState(initialStatus);

    useEffect(() => {
        // On refresh, reset isActive based on providerOnlineStatus if there's no session data
        if (storedStatus === null) {
            setIsActive(providerOnlineStatus === 1);
        }
    }, [providerOnlineStatus]);


    const [profileHover, setProfileHover] = useState(false);

    // const [isActive, setIsActive] = useState(false); // State to track the toggle status

    // const [isActive, setIsActive] = useState<boolean>(() => {
    //     const savedStatus = sessionStorage.getItem("isActiveStatus"); // Check stored status
    //     return savedStatus ? JSON.parse(savedStatus) : false; // Convert from string to boolean
    // });


    // const handleToggle = () => {
    //     setIsActive(!isActive); // Toggle the state on click
    // };



    // Debugging: Check permissions in the header
    useEffect(() => {
        console.log("Permissions in Header:", permissions);
    }, [permissions]);

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

    // Login Branch ID
    const sessionLoginBranchID = sessionStorage.getItem("loginBranchID");
    console.log("Login Provider ID from session storage", sessionLoginBranchID);

    const handleOnlineToggle = async () => {

        if (!sessionLoginBranchID) {
            console.error("Branch ID is missing from session storage.");
            return;
        }

        const branchID = Number(sessionLoginBranchID);
        if (isNaN(branchID)) {
            console.error("Invalid Branch ID:", sessionLoginBranchID);
            return;
        }

        const status = isActive ? 0 : 1;       // Toggle between 0 and 1  // Set the value based on toggle state

        // setIsActive(!isActive);                 // Update state

        console.log("Branch ID: ", sessionLoginBranchID);
        console.log("Service Status: ", status);

        try {
            const response = await onlineAction(Number(sessionLoginBranchID), String(status));

            setIsActive(!isActive); // Update UI only after successful API call
            console.log("Online Status updated successfully", response);
            sessionStorage.setItem("isActiveStatus", JSON.stringify(!isActive)); // Store new state

        } catch (error: any) {
            console.error("Error updating online status:", error.message);
        }
    };

    return (
        <header>

            <div className="backdrop-blur-lg bg-opacity-100 shadow-md px-10 py-5">
                <div className="flex justify-between items-center max-2xl:flex-wrap max-2xl:gap-x-10 max-2xl:justify-between">
                    {/* Admin Logo */}
                    <div className="flex justify-center items-center space-x-3 max-2xl:order-1">
                        {/* Mindful Beauty Logo */}
                        <Link to="/Dashboard">
                            <div>
                                <img
                                    src={mindfulBeautyLogoSmall}
                                    alt="mindful beauty logo"
                                    className="object-contain w-28 max-2xl:w-32 max-2xl:h-20"
                                    loading="lazy"
                                />
                            </div>
                        </Link>

                        {/* Vertical line */}
                        <div className="bg-mindfulgrey w-[1px] h-10"></div>

                        {/* Astamudi Wellness Logo */}
                        <div>
                            <img
                                src={`${providerLogo || ashtamudiLogo}`}
                                alt="ashtamudi logo"
                                className="object-contain w-28 max-2xl:w-32 max-2xl:h-20"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Navbar Menu */}
                    <div className="max-2xl:order-3 max-2xl:mx-auto">
                        <nav className="">
                            <ul className="flex items-center space-x-10 2xl:space-x-5 max-2xl:space-x-5">

                                {/* Dashboard */}

                                {permissions?.dashboard == true && (
                                    <NavLink
                                        to="/Dashboard"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5 "
                                        aria-current="page"
                                    >
                                        <li className="text-md">Dashboard</li>
                                    </NavLink>
                                )}

                                {permissions?.manage_role == true && (
                                    <NavLink
                                        to="/ManageRole"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5 "
                                        aria-current="page"
                                    >
                                        <li className="text-md">Manage Role</li>
                                    </NavLink>
                                )}

                                {/* Service Listing */}
                                {permissions?.service_listing == true && (
                                    <NavLink
                                        to="/ServiceListing"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        aria-current="page"
                                    >
                                        <li className="text-md">Service Listing</li>
                                    </NavLink>
                                )}

                                {/* Service Management */}
                                {permissions?.service_management == true && (
                                    <NavLink
                                        to="/ServiceManagement"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        aria-current="page"
                                    >
                                        <li className="text-md">Service Management</li>
                                    </NavLink>
                                )}

                                {/* Sales & Transactions */}
                                {permissions?.sales_transactions == true && (
                                    <NavLink
                                        to="/SalesTransactions"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        aria-current="page"
                                    >
                                        <li className="text-md">Sales & Transactions</li>
                                    </NavLink>
                                )}

                                {/* Ratings & Reviews */}
                                {permissions?.ratings_reviews == true && (
                                    <NavLink
                                        to="/RatingsReviews"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        aria-current="page"
                                    >
                                        <li className="text-md">Ratings & Reviews</li>
                                    </NavLink>
                                )}

                                {/* Reports */}
                                {permissions?.reports == true && (
                                    <NavLink
                                        to="/Reports"
                                        className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        aria-current="page"
                                    >
                                        <li className="text-md">Reports</li>
                                    </NavLink>
                                )}

                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-10 2xl:space-x-5 max-2xl:order-2">

                        <div className="flex items-center">
                            {/* Service Online */}
                            <div>
                                <p className={`text-md font-semibold
                                             ${isActive ? "text-mindfulBlack" : "text-mindfulgrey"}
                                            `}>
                                    Service  {isActive ? 'Online' : 'Offline'}
                                </p>
                            </div>

                            {/* Toggle Button */}
                            <div>
                                <div className={`toggle-switch ${isActive ? 'active' : 'inactive'}`}>
                                    <input
                                        className="toggle-input"
                                        id="toggle"
                                        type="checkbox"
                                        checked={isActive}
                                        // onChange={() => handleToggle()}
                                        onChange={() => handleOnlineToggle()}
                                    />
                                    <label className="toggle-label" htmlFor="toggle"></label>
                                </div>
                            </div>
                        </div>

                        {/* Notification Bell Icon */}
                        {/* <div>
                            <FaBell className="text-[22px] text-mindfulBlue" />
                        </div> */}

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
                                    <div className="absolute bottom-[-6.5rem] right-0 mt-2 w-48 bg-mindfulWhite rounded-md shadow-lg py-1 z-20">


                                        <Link
                                            // to="/MyAccount"
                                            to={mainBranch ? "/MyAccount" : "#"} // Prevents navigation when disabled
                                            aria-current="page"
                                        // className="active-nav 2xl:before:-bottom-7 max-2xl:before:-bottom-5"
                                        >
                                            <div
                                                title={mainBranch ? "" : "You don't have permission to access this option."} // Tooltip when disabled
                                                className={`px-4 py-3 text-mindfulBlack hover:bg-gray-100 
                                                    ${mainBranch ? "" : "cursor-not-allowed opacity-50"}`} // Disables click & changes UI
                                            >
                                                My Account
                                            </div>
                                        </Link>

                                        {/* <Link to=""> */}
                                        {/* <div className="px-4 py-3 text-mindfulBlack hover:bg-gray-100">
                                            Password Reset
                                        </div> */}
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