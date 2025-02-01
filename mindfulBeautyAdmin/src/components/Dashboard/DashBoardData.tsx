import { useEffect, useState } from "react"
// import { SelectField } from "@/common/SelectField"
import { Button } from "@/common/Button"
// import { AreaChart } from "@/components/Dashboard/DashBoardData/AreaChart"
// import { BarChart } from "@/components/Dashboard/DashBoardData/BarChart"
// import { RangeChart } from "@/components/Dashboard/DashBoardData/RangeChart"
// import { DenialPopup } from "@/components/Dashboard/DashBoardData/DenialPopup"
import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup"
import Select, { SingleValue } from 'react-select';
// import stylist from "../../assets/images/stylist.png"
import { beauticiansList, bookingAction, dashBoardBookingList } from "@/api/apiConfig"
// import { useNavigate } from "react-router-dom"
import "./DashBoardData.css";
import { ShimmerTable } from "shimmer-effects-react"
import { NavLink } from "react-router-dom"
import { DenialPopup } from "./DashBoardData/DenialPopup"
import stylist from "../../assets/images/stylist.png"



// Define the type for each option
interface StylistOption {
    value: number;
    text: string;
    icon: string; // URL or path to the image
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
    // id?: any;
    // name: string;
    // role: string;
    // years_of_experience?: string;
    // rating: string;
    // profile_image: string;
    // provider: string;

    staff?: any;
    name: string;
    role_name: string;
    branch_name: string;
    status: string;
    role_id: string;
    branch_id: string;
    phone: string;
}


export const DashBoardData = () => {

    // const navigate = useNavigate();

    // const stylistData: StylistOption[] = [
    //     {
    //         value: 1,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 2,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 3,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     },
    //     {
    //         value: 4,
    //         text: 'Swetha',
    //         icon: `${stylist}`
    //     }
    // ];


    // const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);

    // State declaration for Denial Popup
    const [showDenialPopup, setShowDenialPopup] = useState(false);
    // State declaration for Stylist Popup
    const [showStylistPopup, setShowStylistPopup] = useState(false);

    const [selectedAppointmentID, setSelectedAppointmentID] = useState<string | null>(null);

    const [dashboardBookingListData, setDashboardBookingListData] = useState<DashBoardDataProps[]>([]);
    const [beauticiansListData, setBeauticiansListData] = useState<BeauticiansDataProps[]>([]);
    const [selectedStylist, setSelectedStylist] = useState<BeauticiansDataProps | null>(null);

    // const [sortOrder, setSortOrder] = useState<string>("desc");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [isAccepted, setIsAccepted] = useState(false);
    const [acceptedAppointments, setAcceptedAppointments] = useState<{ [key: number]: boolean }>({}); // Track accepted states by ID
    const [declinedAppointments, setDeclinedAppointments] = useState<{ [key: number]: boolean }>({}); // Track accepted states by ID

    const [stylistError, setStylistError] = useState<{ [key: number]: string; }>({});  // Key is appointment ID, value is the error message

    // handle onChange event of the dropdown
    // const handleStylistOption = (option: SingleValue<StylistOption>) => {
    //     setSelectedStylistOption(option);

    //     // Open Stylist Popup
    //     setShowStylistPopup(true);
    // };
    // const handleStylistOption = (selectedOption: { value: number; text: string; icon: string }) => {
    //     // setSelectedStylistOption(); // Optional: Save selected option in state

    //     // Open Stylist Popup
    //     // setShowStylistPopup(true); 

    //     // Access the beautician ID
    //     const selectedBeauticianId = selectedOption.value;

    //     console.log("Selected Beautician ID:", selectedBeauticianId);

    // };


    // Handle change events for the Select component
    // const handleStylistOption = (newValue: SingleValue<StylistOption>) => {
    //     if (newValue) {
    //         // Access the beautician ID
    //         const selectedBeauticianId = newValue.value;

    //         console.log("Selected Beautician ID:", selectedBeauticianId);

    //         // Perform additional actions, e.g., opening a popup or saving the state
    //         // setShowStylistPopup(true); // Example
    //     } else {
    //         console.log("No option selected.");
    //     }
    // };

    const handleStylistOption = (newValue: SingleValue<StylistOption>, appointmentID: number) => {
        if (newValue) {
            const selectedBeautician = beauticiansListData.find(
                (beautician) => beautician.staff === newValue.value
            );

            console.log("Selected Beautician Data log:", selectedBeautician);
            console.log("Selected Beautician ID:", selectedBeautician?.staff);


            if (selectedBeautician) {
                setSelectedStylist(selectedBeautician);
                setShowStylistPopup(true);

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


    const openDenialPopup = (appointmentID: string) => {
        setSelectedAppointmentID(appointmentID);
        setShowDenialPopup(true);
    };

    const closeDenialPopup = () => {
        setShowDenialPopup(false);
        setSelectedAppointmentID(null);
    };


    // const openStylistPopup = () => {
    //   setShowStylistPopup(true);
    // }

    const closeStylistPopup = () => {
        setShowStylistPopup(false);
    }


    useEffect(() => {
        const loadBookingList = async () => {
            setLoading(true);
            setError(null);

            // Login Provider ID
            const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
            console.log("Login Provider ID from session storage", sessionLoginProviderID);

            try {
                const data = await dashBoardBookingList(
                    Number(sessionLoginProviderID),
                    //  sortOrder
                );

                const beauticiansData = await beauticiansList(Number(sessionLoginProviderID));

                // const data = await dashBoardBookingList(Number(3));
                setDashboardBookingListData(data.bookings || []);    // Fallback to an empty array if data is null
                setBeauticiansListData(beauticiansData.data);

                console.log("Booking list data log:", data);
                console.log("Beauticians list data log:", beauticiansData.data);


            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        }
        loadBookingList();
    }, [
        // sortOrder
    ]);


    // Handle Sort Change
    // const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSortOrder(event.target.value); // Update sort order based on dropdown value
    // };

    // Local Sorting Function
    // const sortBookings = (data: any[], order: string) => {
    //     return [...data].sort((a, b) => {
    //         if (order === "asc") {
    //             return a.user_name.localeCompare(b.user_name);
    //         }
    //         return b.user_name.localeCompare(a.user_name);
    //     });
    // };

    // Apply Local Sorting on Data Change
    // useEffect(() => {
    //     const sortedData = sortBookings(dashboardBookingListData, sortOrder);
    //     setDashboardBookingListData(sortedData); // Update with sorted data
    // }, [sortOrder]); // Only sort when sortOrder changes


    const handleActionSubmit = async (appointmentID: number, stylistID: number, actionID: number,) => {


        // Check if stylist is selected
        if (!selectedStylist) {
            // Set error message for the specific appointment
            setStylistError((prevState) => ({
                ...prevState,
                [appointmentID]: "Please select a stylist", // Error message for this specific booking
            }));
            return; // Prevent further execution if no stylist is selected
        }

        setLoading(true);
        setError(null);

        try {
            const data = await bookingAction(appointmentID, stylistID, actionID);
            // if (data.status === "success") {
            //     // alert("Appointment accepted successfully");
            //     // setIsAccepted(true);
            //     setAcceptedAppointments((prevState) => ({
            //         ...prevState,
            //         [appointmentID]: true, // Mark this appointment as accepted
            //     }));

            //     setDeclinedAppointments()
            //     // navigate(0);
            // }

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
                    setSelectedStylist(null);

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


            console.log("Booking Action data log:", data);

        } catch (error: any) {
            setError(error.message || 'Failed to fetch staff list');
        } finally {
            setLoading(false); // Ensure loading is false after fetching
        }
    }

    // const handleActionSubmit = async (appointmentID: number, actionID: number) => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const data = await bookingAction(appointmentID, actionID); // Await the API call
    //         console.log("Booking Action data log:", data);

    //         if (data.status === "success") {
    //             console.log("Booking action succeeded:", data.message);
    //             navigate(0); // Reload the page or trigger desired behavior
    //         } else {
    //             console.error("Booking action failed:", data.message || "Unknown error.");
    //             setError(data.message || "Action failed. Please try again.");
    //         }
    //     } catch (error: any) {
    //         setError(error.message || "An error occurred while performing the action.");
    //         console.error("Error in handleActionSubmit:", error.message);
    //     } finally {
    //         setLoading(false); // Ensure loading is false after the process
    //     }
    // };


    // if (loading) return <div>Loading...</div>;
    if (loading) return <div>
        <div>
            <ShimmerTable
                mode="light"
                row={2}
                col={4}
                border={1}
                borderColor={"#cbd5e1"}
                rounded={0.25}
                rowGap={16}
                colPadding={[15, 5, 15, 5]}
            />
        </div>
    </div>;
    if (error) return <div>{error}</div>;


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
                            {/* <label
                                htmlFor="sort"
                                className="text-md text-mindfulBlack font-semibold mb-1"
                            >
                                Sort
                            </label> */}


                        </div>
                        {/* <select
                            id="sort"
                            value={sortOrder}
                            onChange={handleSortChange} // Trigger sort logic
                            className="w-72 rounded-sm border-2 border-mindfulgrey px-2 py-1.5 focus:outline-none"
                        >
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select> */}
                    </div>
                </div>
            </div>



            {/* Charts & Booking Table */}
            {/* <div className="grid grid-cols-3 gap-5"> */}
            <div className="grid grid-cols-1 gap-5">

                {/* Grid Column One -- --> Charts  */}
                {/* <div>
                    <div>
                        <h5 className="text-lg font-semibold py-5">Overview</h5>
                    </div>


                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <AreaChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <BarChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <RangeChart />
                            </div>

                            <div className="border-[1px] border-mindfulgrey rounded-md px-2 py-2">
                                <BarChart />
                            </div>
                        </div>
                    </div>
                </div> */}


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

                    <div>
                        <table className="w-full border-[1px] rounded-lg px-2 py-2">
                            <thead className="bg-mindfulLightgrey border-b-[1px]">
                                <tr className="">
                                    <th className="w- text-start px-2 py-3">Booking ID</th>
                                    <th className="w- px-2 py-3">Date</th>
                                    <th className="w- px-2 py-3">Time</th>
                                    <th className="w- px-2 py-3">Branch</th>
                                    <th className="w- text-start px-2 py-3">Cust. Name</th>
                                    <th className="w- text-start px-2 py-3">Cust. Mobile</th>
                                    <th className="w- text-start px-2 py-3">Service</th>
                                    <th className="w- text-start px-2 py-3">Assign Stylist</th>
                                    <th className="w- text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Heading */}
                                {/* <tr>
                            <th colSpan={4} className="bg-mindfulLightgrey text-start px-2 py-4">Heading 1</th>
                        </tr> */}

                                {/* Content & Checkbox */}
                                {dashboardBookingListData.length > 0 ? (
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
                                            {/* <td className="text-start px-2 py-5">
                                                <ul>
                                                    <li>Eyesbrows Threading</li>
                                                    <li>Forehead Threading</li>
                                                </ul>
                                            </td> */}

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
                                                            // icon: beautician.profile_image,
                                                            icon: stylist,
                                                        }))}
                                                        // onChange={handleStylistOption}
                                                        onChange={(newValue) => handleStylistOption(newValue, dashboardData.appointment_id)} // Pass appointmentID here
                                                        getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                                                        formatOptionLabel={(option) => (
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                                                                <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                            </div>
                                                        )}
                                                        getOptionValue={(option) => option.value.toString()}
                                                    />

                                                    {/* Display the error message for the specific appointment */}
                                                    {stylistError && stylistError[dashboardData.appointment_id] && (
                                                        <div className="text-sm text-red-600">{stylistError[dashboardData.appointment_id]}</div>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="text-center px-2 py-5">
                                                <div className="space-y-3">

                                                    <div>

                                                        {/* <Button
                                                            onClick={() =>
                                                                !isAccepted &&
                                                                handleActionSubmit(
                                                                    Number(dashboardData.appointment_id),
                                                                    1,
                                                                    // setIsAccepted,
                                                                    // setLoading,
                                                                    // setError,
                                                                    // navigate
                                                                )
                                                            }
                                                            buttonType="button"
                                                            buttonTitle={
                                                                isAccepted
                                                                    ? "Accepted" // Display "Accepted" if the action was successful
                                                                    : loading
                                                                        ? "Accepting..." // Show loading text while the request is being processed
                                                                        : "Accept" // Default text
                                                            }
                                                            className={`w-24 text-md ${isAccepted ? "text-gray-400 cursor-not-allowed" : "text-mindfulGreen"
                                                                } font-semibold border-[1px] ${isAccepted ? "border-gray-400" : "border-mindfulGreen"
                                                                } rounded-[5px] px-3 py-1`}
                                                            disabled={loading || isAccepted} // Disable button if loading or already accepted
                                                        /> */}

                                                        {/* <Button
                                                            onClick={() => handleActionSubmit(Number(dashboardData.appointment_id), 1)}
                                                            buttonType="button"
                                                            buttonTitle={isAccepted ? "Accepted" : "Accept"}
                                                            className="w-24 text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-[5px] px-3 py-1"
                                                        /> */}

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

                                                    {/* <div>
                                                        <Button
                                                            onClick={openDenialPopup}
                                                            buttonType="button"
                                                            buttonTitle="Deny"
                                                            className="w-24 text-md text-mindfulBlue font-semibold border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1"
                                                        />
                                                    </div> */}
                                                    {!acceptedAppointments[dashboardData.appointment_id] && (
                                                        <div>
                                                            <Button
                                                                onClick={() => openDenialPopup(dashboardData.appointment_id)}
                                                                buttonType="button"
                                                                buttonTitle="Decline"
                                                                className="w-24 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                                            />

                                                            {/* <Button
                                                                onClick={() =>
                                                                    !declinedAppointments[dashboardData.appointment_id] &&
                                                                    handleActionSubmit(dashboardData.appointment_id, dashboardData.stylist_id, 2)
                                                                }
                                                                buttonType="button"
                                                                buttonTitle={declinedAppointments[dashboardData.appointment_id] ? "Declined" : loading ? "Declining..." : "Decline"}
                                                                className={`w-24 text-md ${declinedAppointments[dashboardData.appointment_id] ? "text-gray-400 cursor-not-allowed" : "text-mindfulRed"} font-semibold border-[1px] ${declinedAppointments[dashboardData.appointment_id] ? "border-gray-400" : "border-mindfulRed"} rounded-[5px] px-3 py-1`}
                                                                disabled={loading || declinedAppointments[dashboardData.appointment_id] || acceptedAppointments[dashboardData.appointment_id]} // Disable if accepted or already declined
                                                            /> */}
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
                                )}



                                {/* <tr className="border-b-2 pb-2">
                                    <td className="px-2 py-5">BK023</td>
                                    <td className="text-start px-2 py-5">18-08-2024</td>
                                    <td className="text-start px-2 py-5">10.00</td>
                                    <td className="text-start px-2 py-5">Shenoys</td>
                                    <td className="text-start px-2 py-5">Ramya</td>
                                    <td className="text-start px-2 py-5">1234567890</td>
                                    <td className="text-start px-2 py-5">
                                        <ul>
                                            <li>Eyesbrows Threading</li>
                                            <li>Forehead Threading</li>
                                        </ul>
                                    </td>

                                    <td className="text-start px-2 py-5">
                                        Branch Select Field
                                        <div>
                                            <SelectField
                                                onChange={openStylistPopup}
                                                label=""
                                                name="branch"
                                                // required
                                                className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                options={[
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                ]}
                                            // error="This field is required."
                                            />

                                            <Select
                                                placeholder="Select Option"
                                                value={selectedStylistOption}
                                                options={stylistData}
                                                onChange={handleStylistOption}
                                                getOptionLabel={(option) => (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                                                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                    </div>
                                                )}
                                                getOptionValue={(option) => option.value.toString()}
                                            />

                                            <Select
                                                placeholder="Select Option"
                                                value={selectedStylistOption}
                                                options={stylistData}
                                                onChange={handleStylistOption}
                                                getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                                                formatOptionLabel={(option) => (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                                                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                    </div>
                                                )}
                                                getOptionValue={(option) => option.value.toString()}
                                            />

                                            {selectedStylistOption && (
                                                <div style={{ marginTop: 20, lineHeight: '25px' }}>
                                                    <b>Selected Option:</b> {selectedStylistOption.text}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="text-center px-2 py-5">
                                        <div className="space-y-3">

                                            <div>
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Accept"
                                                    className="w-20 text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-[5px] px-3 py-1"
                                                />
                                            </div>

                                            <div>
                                                <Button
                                                    onClick={openDenialPopup}
                                                    buttonType="button"
                                                    buttonTitle="Deny"
                                                    className="w-20 text-md text-mindfulBlue font-semibold border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1"
                                                />
                                            </div>

                                            <div>
                                                <Button
                                                    onClick={openDenialPopup}
                                                    buttonType="button"
                                                    buttonTitle="Decline"
                                                    className="w-20 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                                />
                                            </div>
                                        </div>
                                    </td>


                                </tr> */}


                                {/* Content & Checkbox */}
                                {/* <tr className="border-b-2 pb-2">
                                    <td className="px-2 py-5">BK023</td>
                                    <td className="text-start px-2 py-5">18-08-2024</td>
                                    <td className="text-start px-2 py-5">10.00</td>
                                    <td className="text-start px-2 py-5">Shenoys</td>
                                    <td className="text-start px-2 py-5">Ramya</td>
                                    <td className="text-start px-2 py-5">1234567890</td>
                                    <td className="text-start px-2 py-5">
                                        <ul>
                                            <li>Eyesbrows Threading</li>
                                            <li>Forehead Threading</li>
                                        </ul>
                                    </td>

                                    <td className="text-start px-2 py-5">
                                        Branch Select Field
                                        <div>
                                            <SelectField
                                                onChange={openStylistPopup}
                                                label=""
                                                name="branch"
                                                // required
                                                className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                options={[
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                    { value: "swetha", label: "Swetha" },
                                                ]}
                                            // error="This field is required."
                                            />

                                            <Select
                                                placeholder="Select Option"
                                                value={selectedStylistOption}
                                                options={stylistData}
                                                onChange={handleStylistOption}
                                                getOptionLabel={(option) => (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                                                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                    </div>
                                                )}
                                                getOptionValue={(option) => option.value.toString()}
                                            />

                                            <Select
                                                placeholder="Select Option"
                                                value={selectedStylistOption}
                                                options={stylistData}
                                                onChange={handleStylistOption}
                                                getOptionLabel={(option) => option.text} // Use `text` as the string label for accessibility and filtering
                                                formatOptionLabel={(option) => (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={option.icon} alt={option.text} style={{ width: 16, height: 16 }} />
                                                        <span style={{ marginLeft: 5 }}>{option.text}</span>
                                                    </div>
                                                )}
                                                getOptionValue={(option) => option.value.toString()}
                                            />

                                            {selectedStylistOption && (
                                                <div style={{ marginTop: 20, lineHeight: '25px' }}>
                                                    <b>Selected Option:</b> {selectedStylistOption.text}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="text-center px-2 py-5">
                                        <div className="space-y-3">

                                            <div>
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Accept"
                                                    className="w-20 text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-[5px] px-3 py-1"
                                                />
                                            </div>

                                            <div>
                                                <Button
                                                    onClick={openDenialPopup}
                                                    buttonType="button"
                                                    buttonTitle="Deny"
                                                    className="w-20 text-md text-mindfulBlue font-semibold border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1"
                                                />
                                            </div>

                                            <div>
                                                <Button
                                                    onClick={openDenialPopup}
                                                    buttonType="button"
                                                    buttonTitle="Decline"
                                                    className="w-20 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                                />
                                            </div>
                                        </div>
                                    </td>


                                </tr> */}

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

        </div>


    )
}
