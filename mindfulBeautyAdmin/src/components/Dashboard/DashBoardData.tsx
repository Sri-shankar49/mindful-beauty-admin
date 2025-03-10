import { useEffect, useState } from "react"
import { Button } from "@/common/Button"
import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup"
import Select, { SingleValue } from 'react-select';
import { beauticiansList, bookingAction, dashBoardBookingList } from "@/api/apiConfig"
import "./DashBoardData.css";
import { ShimmerTable } from "shimmer-effects-react"
import { NavLink } from "react-router-dom"
import { DenialPopup } from "./DashBoardData/DenialPopup"
import stylist from "../../assets/images/stylist.png"
import { WalletPopup } from "./WalletPopup";
import { NotifyError } from "@/common/Toast/ToastMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Define the type for each option
interface StylistOption {
    value: number;
    text: string;
    icon: any; // URL or path to the image
}

interface Service {
    service_name: string;
    price: number;
}

interface DashBoardDataProps {
    // appointment_id?: string | number;
    appointment_id?: any;
    appointment_date: string;
    appointment_time: string;
    branch?: string;
    user_name: string;
    user_phone: string;
    service_names: Service[];
    branch_city: string;
    stylist_id?: any;
}

interface BeauticiansDataProps {
    staff?: any;
    name: string;
    role_name: string;
    branch_name: string;
    status: string;
    role_id: string;
    branch_id: string;
    phone: string;
    photo: any;
}
export const DashBoardData = () => {

    // Getting Freelancer state from Redux
    const { loginBranchID, freelancer } = useSelector((state: RootState) => state.login);
    console.log("Freelancer boolean Status & Branch ID", freelancer, loginBranchID);


    // State declaration for Denial Popup
    const [showDenialPopup, setShowDenialPopup] = useState(false);
    // State declaration for Stylist Popup
    const [showStylistPopup, setShowStylistPopup] = useState(false);
    const [selectedAppointmentID, setSelectedAppointmentID] = useState<string | null>(null);
    const [dashboardBookingListData, setDashboardBookingListData] = useState<DashBoardDataProps[]>([]);
    const [beauticiansListData, setBeauticiansListData] = useState<BeauticiansDataProps[]>([]);
    const [selectedStylist, setSelectedStylist] = useState<BeauticiansDataProps | null>(null);
    const [selectedStylists, setSelectedStylists] = useState<{ [key: number]: any }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [acceptedAppointments, setAcceptedAppointments] = useState<{ [key: number]: boolean }>({}); // Track accepted states by ID
    const [declinedAppointments, setDeclinedAppointments] = useState<{ [key: number]: boolean }>({}); // Track accepted states by ID
    const [stylistError, setStylistError] = useState<{ [key: number]: string; }>({});  // Key is appointment ID, value is the error message
    const [showWalletPopup, setShowWalletPopup] = useState<boolean>(false);
    const openWalletPopup = () => {
        setShowWalletPopup(true);
    }

    const closeWalletPopup = () => {
        setShowWalletPopup(false);
    }

    const handleStylistOption = (newValue: SingleValue<StylistOption>, appointmentID: number) => {
        if (newValue) {
            const selectedBeautician = beauticiansListData.find(
                (beautician) => beautician.staff === newValue.value
            );
            if (selectedBeautician) {
                setSelectedStylist(selectedBeautician);
                setShowStylistPopup(true);
                // Setting Stylist value to the selected beautician
                setSelectedStylists((prevState) => ({
                    ...prevState,
                    [appointmentID]: selectedBeautician,
                }));
                // Save the selected stylist in sessionStorage
                sessionStorage.setItem(`selectedStylist_${appointmentID}`, JSON.stringify(selectedBeautician));
                // Clear the error for the selected appointment
                setStylistError((prevState) => {
                    const newState = { ...prevState };
                    delete newState[appointmentID]; // Remove the error for this specific appointment
                    return newState;
                });
            }
        } else {
            console.log("No option selected.");
        }
    };

    // Function handler for storing the stylist data in the session storage
    useEffect(() => {
        const updatedStylists = { ...selectedStylists };
        dashboardBookingListData.forEach((dashboardData) => {
            const storedStylist = sessionStorage.getItem(`selectedStylist_${dashboardData.appointment_id}`);
            if (storedStylist) {
                updatedStylists[dashboardData.appointment_id] = JSON.parse(storedStylist);
            }
        });
        setSelectedStylists(updatedStylists);
    }, [dashboardBookingListData]);

    const openDenialPopup = (appointmentID: string) => {
        setSelectedAppointmentID(appointmentID);
        setShowDenialPopup(true);
    };

    const closeDenialPopup = () => {
        setShowDenialPopup(false);
        setSelectedAppointmentID(null);
    };
    const closeStylistPopup = () => {
        setShowStylistPopup(false);
    }

    // Function Handler for loading appointment data
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await Promise.all([
            loadBookingList(),
            loadStylistList()
        ]);
    }

    const loadBookingList = async () => {
        setLoading(true);
        // Login Provider ID
        const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
        try {
            const data = await dashBoardBookingList(
                Number(sessionLoginProviderID),
                Number(loginBranchID),
            );
            // const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));
            setDashboardBookingListData(data.bookings || []);    // Fallback to an empty array if data is null
            // setBeauticiansListData(beauticiansData.data);
        } catch (error: any) {
            // setError(error.message || 'Failed to fetch staff list');
            NotifyError(error.message || 'Failed to fetch staff list');
        } finally {
            setLoading(false); // Ensure loading is false after fetching
        }
    }

    const loadStylistList = async () => {
        setLoading(true);
        // Login Provider ID
        if (!freelancer) {
            const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
            try {
                const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));
                setBeauticiansListData(beauticiansData.data);
            } catch (error: any) {
                // setError(error.message || 'Failed to fetch staff list');
                NotifyError(error.message || 'Failed to fetch staff list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        }
    }


    const handleActionSubmit = async (appointmentID: number, stylistID: number, actionID: number,) => {

        // ✅ If NOT a freelancer, check if a stylist is selected
        if (!freelancer && !selectedStylist) {
            // Set error message for the specific appointment
            setStylistError((prevState) => ({
                ...prevState,
                [appointmentID]: "Please select a stylist", // Error message for this specific booking
            }));
            return; // Prevent further execution if no stylist is selected
        }
        setLoading(true);
        try {
            const data = await bookingAction(appointmentID, stylistID, actionID);
            if (data.status === "success") {
                if (actionID === 1) { // Action for Accept
                    setAcceptedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: true, // Mark this appointment as accepted
                    }));

                    // Optionally clear declined appointments if necessary
                    setDeclinedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: false,
                    }));

                    // Clear selected stylist after accepting the appointment
                    // setSelectedStylist(null);

                    // ✅ If NOT a freelancer, clear selected stylist after accepting
                    if (!freelancer) setSelectedStylist(null);

                } else if (actionID === 2) { // Action for Decline
                    setDeclinedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: true, // Mark this appointment as declined
                    }));

                    // Optionally clear accepted appointments if necessary
                    setAcceptedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: false,
                    }));
                }
            }
        } catch (error: any) {
            // setError(error.message || 'An error occurred while processing your request.');
            NotifyError(error.message || 'An error occurred while processing your request.');
            if (error.message === "You don't have the minimum amount in your wallet to perform this action.") {
                openWalletPopup();
            }
        } finally {
            setLoading(false); // Ensure loading is false after fetching
        }
    }

    return (
        <div>
            {/* Heading & Sort */}
            <div className="pb-5">
                <div className="w-full flex items-center justify-between">
                    <div>
                        <h5 className="text-3xl font-semibold">Dashboard</h5>
                    </div>
                    <div>
                        {/* Sort */}
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Charts & Booking Table */}
            <div className="grid grid-cols-1 gap-5">
                {/* Grid Column Two -- --> Booking Table  */}
                <div className="col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">Bookings</h5>
                        </div>

                        <div>
                            <NavLink to="/ServiceManagement/BookingStatus/AllBooking">
                                <p className="text-lg text-main font-semibold underline hover:no-underline">View All Booking</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className="max-xl:overflow-x-scroll">
                        <table className="w-full border-[1px] rounded-lg px-2 py-2">
                            <thead className="bg-mindfulLightgrey border-b-[1px]">
                                <tr className="">
                                    <th className="text-start px-2 py-3">Booking ID</th>
                                    <th className="text-start px-2 py-3">Date</th>
                                    <th className="text-start px-2 py-3">Time</th>
                                    <th className="text-start px-2 py-3">Branch</th>
                                    <th className="text-start px-2 py-3">Cust. Name</th>
                                    <th className="text-start px-2 py-3">Cust. Mobile</th>
                                    <th className="text-start px-2 py-3">Service</th>
                                    {freelancer !== true && <th className="text-start px-2 py-3">Assign Stylist</th>}
                                    <th className="text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Heading */}
                                {/* Content & Checkbox */}
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="text-center px-2 py-5">
                                            <ShimmerTable
                                                mode="light"
                                                row={dashboardBookingListData.length + 1} // Adjust based on expected staff rows
                                                col={9} // Matches table columns
                                                border={1}
                                                borderColor={"#cbd5e1"}
                                                rounded={0.25}
                                                rowGap={16}
                                                colPadding={[15, 5, 15, 5]}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    dashboardBookingListData.length > 0 ? (
                                        dashboardBookingListData.map((dashboardData) => (
                                            <tr key={dashboardData.appointment_id} className="border-b-2 pb-2">
                                                <td className="px-2 py-5">{dashboardData.appointment_id}</td>
                                                <td className="text-start px-2 py-5">{dashboardData.appointment_date}</td>
                                                <td className="text-start px-2 py-5">{dashboardData.appointment_time}</td>
                                                <td className="text-start px-2 py-5">{dashboardData.branch_city}</td>
                                                <td className="text-start px-2 py-5">{dashboardData.user_name}</td>
                                                <td className="text-start px-2 py-5">{dashboardData.user_phone}</td>
                                                {/* <td className="text-start px-2 py-5">{dashboardData.service_names}</td> */}

                                                <td className="text-start px-2 py-5">
                                                    <ul>
                                                        {dashboardData.service_names.map((service, index) => (
                                                            <li key={index}>{service.service_name}</li>
                                                        ))}
                                                    </ul>
                                                </td>


                                                {freelancer !== true &&
                                                    <td className="text-start px-2 py-5">
                                                        {/* Stylist Select Field */}
                                                        <div>
                                                            <Select
                                                                placeholder="Select Option"
                                                                // value={selectedStylistOption}
                                                                // options={stylistData}
                                                                options={beauticiansListData.map((beautician) => ({
                                                                    value: beautician.staff,
                                                                    text: beautician.name,
                                                                    icon: beautician.photo || stylist,
                                                                }))}
                                                                // onChange={handleStylistOption}
                                                                onChange={(newValue) => handleStylistOption(newValue, dashboardData.appointment_id)} // Pass appointmentID here
                                                                getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                                                                formatOptionLabel={(option) => (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <img src={option.icon} alt={option.text} style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                                                                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                                    </div>
                                                                )}
                                                                getOptionValue={(option) => option.value.toString()}
                                                                value={selectedStylists[dashboardData.appointment_id] ?
                                                                    {
                                                                        value: selectedStylists[dashboardData.appointment_id].staff,
                                                                        text: selectedStylists[dashboardData.appointment_id].name,
                                                                        icon: selectedStylists[dashboardData.appointment_id].photo || stylist,
                                                                    }
                                                                    : null}
                                                            />

                                                            {/* Display the error message for the specific appointment */}
                                                            {stylistError && stylistError[dashboardData.appointment_id] && (
                                                                <div className="text-sm text-red-600">{stylistError[dashboardData.appointment_id]}</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                }


                                                <td className="text-center px-2 py-5">
                                                    <div className="space-y-3">

                                                        <div>
                                                            <Button
                                                                onClick={() =>
                                                                    !acceptedAppointments[dashboardData.appointment_id] &&
                                                                    // handleActionSubmit(dashboardData.appointment_id, dashboardData.stylist_id, 1)
                                                                    handleActionSubmit(dashboardData.appointment_id, selectedStylist?.staff, 1)
                                                                }
                                                                buttonType="button"
                                                                buttonTitle={acceptedAppointments[dashboardData.appointment_id] ? "Accepted" : loading ? "Accepting..." : "Accept"}
                                                                className={`w-24 text-md ${acceptedAppointments[dashboardData.appointment_id] ? "text-gray-400 cursor-not-allowed" : "text-mindfulGreen"} font-semibold border-[1px] ${acceptedAppointments[dashboardData.appointment_id] ? "border-gray-400" : "border-mindfulGreen"} rounded-[5px] px-3 py-1`}
                                                                disabled={loading || acceptedAppointments[dashboardData.appointment_id] || declinedAppointments[dashboardData.appointment_id]} // Disable if declined or already accepted
                                                            />


                                                        </div>
                                                        {!acceptedAppointments[dashboardData.appointment_id] && (
                                                            <div>
                                                                <Button
                                                                    onClick={() => openDenialPopup(dashboardData.appointment_id)}
                                                                    buttonType="button"
                                                                    buttonTitle="Decline"
                                                                    className="w-24 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                                                />
                                                            </div>
                                                        )}

                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center py-5">
                                                No Bookings found.
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showDenialPopup && selectedAppointmentID !== null && (
                <DenialPopup closePopup={closeDenialPopup} appointmentID={selectedAppointmentID} />
            )}

            {/* {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}
            {showStylistPopup && selectedStylist && (
                <StylistPopup closePopup={closeStylistPopup} stylistDetails={selectedStylist} />
            )}


            {showWalletPopup && <WalletPopup closePopup={closeWalletPopup}
            // errorMessage={error}
            />}

        </div>


    )
}
