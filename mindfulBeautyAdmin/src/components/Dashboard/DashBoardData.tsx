/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useEffect, useState } from "react";
import { SelectField } from "@/common/SelectField";
import { Button } from "@/common/Button";
import { AreaChart } from "@/components/Dashboard/DashBoardData/AreaChart";
import { BarChart } from "@/components/Dashboard/DashBoardData/BarChart";
import { RangeChart } from "@/components/Dashboard/DashBoardData/RangeChart";
import { DenialPopup } from "@/components/Dashboard/DashBoardData/DenialPopup";
// import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup";
import Select, { SingleValue } from "react-select";
// import stylist from "../../assets/images/stylist.png";
import {
    bookingAction,
    dashBoardBookingList,
    fetchStylists,
} from "@/api/apiConfig";

// import { useNavigate } from "react-router-dom"

// Define the type for each option
export interface StylistOption {
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
}

export const DashBoardData = () => {
    const [showDenialPopup, setShowDenialPopup] = useState(false);
    // State declaration for Stylist Popup
    //   const [showStylistPopup, setShowStylistPopup] = useState(false);

    const [, setShowStylistPopup] = useState(false);

    const [dashboardBookingListData, setDashboardBookingListData] = useState<
        DashBoardDataProps[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [isAccepted, setIsAccepted] = useState(false);
    const [acceptedAppointments, setAcceptedAppointments] = useState<{
        [key: number]: boolean;
    }>({}); // Track accepted states by ID
    const [declinedAppointments, setDeclinedAppointments] = React.useState<
        Record<number, boolean>
    >({});

    const [denialAppointmentId, setDenialAppointmentId] = useState<string | null>(
        null
    );
    const [stylistData, setStylistData] = useState<StylistOption[]>([]);

    //   const [selectedStylistOption, ] =
    //     useState<SingleValue<StylistOption>>(null);

    const [selectedStylist, setSelectedStylist] = useState<{
        [key: number]: StylistOption | null;
    }>({});

    // const [currentStylist, setCurrentStylist] = useState<StylistOption | null>(null);

    const [, setCurrentStylist] = useState<StylistOption | null>(null);

    const openDenialPopup = (appointmentId: string) => {
        setDenialAppointmentId(appointmentId);
        setShowDenialPopup(true);
    };

    // const handleStylistOption = (option: SingleValue<StylistOption>) => {
    //     if (option) {
    //         setCurrentStylist(option); // Store selected stylist details
    //         setShowStylistPopup(true); // Open the popup
    //     }
    // };

    const handleStylistOption = (
        appointmentId: number,
        option: SingleValue<StylistOption>
    ) => {
        if (option) {
            setSelectedStylist((prev) => ({ ...prev, [appointmentId]: option }));
            setCurrentStylist(option);
            setShowStylistPopup(true);
        }
    };

    const closeDenialPopup = () => {
        setShowDenialPopup(false);
    };

    //   const closeStylistPopup = () => {
    //     setShowStylistPopup(false);
    //   };

    const [sortOrder, setSortOrder] = useState<string>("a-z");

    useEffect(() => {
        const loadBookingList = async () => {
            setLoading(true);
            setError(null);

            const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
            console.log(
                "Login Provider ID from session storage",
                sessionLoginProviderID
            );

            try {
                const data = await dashBoardBookingList(
                    Number(sessionLoginProviderID),
                    sortOrder
                );

                // Sort based on sortOrder
                const sortedBookings = (data.bookings || []).sort((a: any, b: any) => {
                    if (sortOrder === "asc")
                        return a.user_name.localeCompare(b.user_name); // Ascending
                    if (sortOrder === "desc")
                        return b.user_name.localeCompare(a.user_name); // Descending
                    return 0;
                });

                setDashboardBookingListData(sortedBookings);
                console.log("Booking list data log:", sortedBookings);
            } catch (error: any) {
                setError(error.message || "Failed to fetch staff list");
            } finally {
                setLoading(false);
            }
        };

        loadBookingList();
    }, [sortOrder]);

    const handleActionSubmit = async (
        appointmentID: number,
        actionID: number,
        // stylist_id: number = 1 // Example of a static stylist ID
    ) => {
        setLoading(true);
        setError(null);

        try {
            const stylist_id = selectedStylist[appointmentID]?.value || 0;

            const data = await bookingAction(appointmentID, actionID, stylist_id);
            console.log("actionID", actionID);
            console.log("appointmentID", appointmentID);
            console.log("stylist_id", stylist_id);
            if (data.status === "success") {
                // alert("Appointment accepted successfully");
                // setIsAccepted(true);
                if (actionID === 1) {
                    setAcceptedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: true, // Mark this appointment as accepted
                    }));
                } else if (actionID === 2) {
                    setDeclinedAppointments((prevState) => ({
                        ...prevState,
                        [appointmentID]: true, // Mark this appointment as declined
                    }));
                }
                // navigate(0);
            }
            console.log("Booking Action data log:", data);
        } catch (error: any) {
            setError(error.message || "Failed to fetch staff list");
        } finally {
            setLoading(false); // Ensure loading is false after fetching
        }
    };

    useEffect(() => {
        const loadStylists = async () => {
            try {
                const response = await fetchStylists();
                const stylists = Array.isArray(response)
                    ? response
                    : response.data || [];
                const options = stylists.map((stylist: any) => ({
                    value: stylist.id,
                    text: stylist.name,
                    icon: stylist.profile_image,
                }));
                setStylistData(options);
            } catch (error: any) {
                console.error("Error loading stylists:", error);
            }
        };
        loadStylists();
    }, []);

    if (loading) return <div>Loading...</div>;
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
                        {/* City */}
                        <div>
                            <label
                                htmlFor="sort"
                                className="text-md text-mindfulBlack font-semibold mb-1"
                            >
                                Sort
                            </label>
                            <SelectField
                                label=""
                                name="sort"
                                id="sort"
                                options={[
                                    { value: "asc", label: "A-Z" },
                                    { value: "desc", label: "Z-A" },
                                ]}
                                value={sortOrder} // Pass the selected value as a string
                                onChange={(event) => setSortOrder(event.target.value)} // Update sortOrder based on event
                                className="w-72 rounded-sm border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts & Booking Table */}
            <div className="grid grid-cols-3 gap-5">
                {/* Grid Column One -- --> Charts  */}
                <div>
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
                </div>

                {/* Grid Column Two -- --> Booking Table  */}
                <div className="col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">
                                Bookings
                            </h5>
                        </div>

                        <div>
                            <p className="text-lg text-main font-semibold underline hover:no-underline">
                                View All Booking
                            </p>
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
                                    <th className="w- text-start px-2 py-3">Assign Stylisttt</th>
                                    <th className="w- text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Heading */}

                                {/* Content & Checkbox */}
                                {dashboardBookingListData.length > 0 ? (
                                    dashboardBookingListData.map((dashboardData) => (
                                        <tr
                                            key={dashboardData.appointment_id}
                                            className="border-b-2 pb-2"
                                        >
                                            <td className="px-2 py-5">
                                                {dashboardData.appointment_id}
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                {dashboardData.appointment_date}
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                {dashboardData.appointment_time}
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                {dashboardData.branch_city}
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                {dashboardData.user_name}
                                            </td>
                                            <td className="text-start px-2 py-5">
                                                {dashboardData.user_phone}
                                            </td>
                                            {/* <td className="text-start px-2 py-5">{dashboardData.service_names}</td> */}

                                            <td className="text-start px-2 py-5">
                                                <ul>
                                                    {dashboardData.service_names.map((service, index) => (
                                                        <li key={index}>{service.service_name}</li>
                                                    ))}
                                                </ul>
                                            </td>

                                            <td className="text-start px-2 py-5">
                                                <div>
                                                    <Select
                                                        placeholder="Select Stylist"
                                                        value={
                                                            selectedStylist[dashboardData.appointment_id] ||
                                                            null
                                                        }
                                                        options={stylistData}
                                                        onChange={(option) =>
                                                            handleStylistOption(
                                                                dashboardData.appointment_id,
                                                                option
                                                            )
                                                        }
                                                        getOptionLabel={(option) => option.text}
                                                        formatOptionLabel={(option) => (
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <img
                                                                    src={option.icon}
                                                                    alt={option.text}
                                                                    style={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        borderRadius: "50%",
                                                                    }}
                                                                />
                                                                <span style={{ marginLeft: 10 }}>
                                                                    {option.text}
                                                                </span>
                                                            </div>
                                                        )}
                                                        getOptionValue={(option) => option.value.toString()}
                                                    />
                                                </div>
                                            </td>

                                            <td className="text-center px-2 py-5">
                                                <div className="space-y-3">
                                                    <div>
                                                        <Button
                                                            onClick={() =>
                                                                !acceptedAppointments[
                                                                dashboardData.appointment_id
                                                                ] &&
                                                                handleActionSubmit(
                                                                    dashboardData.appointment_id,
                                                                    1
                                                                )
                                                            }
                                                            buttonType="button"
                                                            buttonTitle={
                                                                acceptedAppointments[
                                                                    dashboardData.appointment_id
                                                                ]
                                                                    ? "Accepted"
                                                                    : loading
                                                                        ? "Accepting..."
                                                                        : "Accept"
                                                            }
                                                            className={`w-24 text-md ${acceptedAppointments[
                                                                dashboardData.appointment_id
                                                            ]
                                                                ? "text-gray-400 cursor-not-allowed"
                                                                : "text-mindfulGreen"
                                                                } font-semibold border-[1px] ${acceptedAppointments[
                                                                    dashboardData.appointment_id
                                                                ]
                                                                    ? "border-gray-400"
                                                                    : "border-mindfulGreen"
                                                                } rounded-[5px] px-3 py-1`}
                                                            disabled={
                                                                loading ||
                                                                acceptedAppointments[
                                                                dashboardData.appointment_id
                                                                ]
                                                            } // Disable if loading or already accepted
                                                        />
                                                    </div>

                                                    <div>
                                                        <Button
                                                            onClick={() => {
                                                                openDenialPopup(
                                                                    dashboardData.appointment_id.toString()
                                                                ); // Pass the appointment ID
                                                                handleActionSubmit(
                                                                    dashboardData.appointment_id,
                                                                    2
                                                                );
                                                            }}
                                                            disabled={
                                                                declinedAppointments[
                                                                dashboardData.appointment_id
                                                                ] ||
                                                                acceptedAppointments[
                                                                dashboardData.appointment_id
                                                                ]
                                                            }
                                                            buttonType="button"
                                                            buttonTitle="Deny"
                                                            className="w-24 text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-[5px] px-3 py-1"
                                                        />
                                                    </div>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showDenialPopup && (
                <DenialPopup
                    closePopup={closeDenialPopup}
                    appointmentId={denialAppointmentId!} // Pass the ID to the popup
                />
            )}

            {/* {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />} */}
            {/* 
      {showStylistPopup && currentStylist && (
    <StylistPopup closePopup={closeStylistPopup} stylist={currentStylist} />
)} */}
        </div>
    );
};
