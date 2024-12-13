import { useEffect, useState } from "react"
import { SelectField } from "@/common/SelectField"
import { Button } from "@/common/Button"
import { AreaChart } from "@/components/Dashboard/DashBoardData/AreaChart"
import { BarChart } from "@/components/Dashboard/DashBoardData/BarChart"
import { RangeChart } from "@/components/Dashboard/DashBoardData/RangeChart"
import { DenialPopup } from "@/components/Dashboard/DashBoardData/DenialPopup"
import { StylistPopup } from "@/components/Dashboard/DashBoardData/StylistPopup"
import Select, { SingleValue } from 'react-select';
import stylist from "../../assets/images/stylist.png"
import { bookingAction, dashBoardBookingList } from "@/api/apiConfig"
import { useNavigate } from "react-router-dom"


// Define the type for each option
interface StylistOption {
    value: number;
    text: string;
    icon: string; // URL or path to the image
}

interface DashBoardDataProps {
    appointment_id?: string;
    appointment_date: string;
    appointment_time: string;
    branch?: string;
    user_name: string;
    user_phone: string;
    service_names: string;
    branch_city: string;
}


export const DashBoardData = () => {

    const navigate = useNavigate();

    const stylistData: StylistOption[] = [
        {
            value: 1,
            text: 'Swetha',
            icon: `${stylist}`
        },
        {
            value: 2,
            text: 'Swetha',
            icon: `${stylist}`
        },
        {
            value: 3,
            text: 'Swetha',
            icon: `${stylist}`
        },
        {
            value: 4,
            text: 'Swetha',
            icon: `${stylist}`
        }
    ];


    const [selectedStylistOption, setSelectedStylistOption] = useState<SingleValue<StylistOption>>(null);
    // State declaration for Denial Popup
    const [showDenialPopup, setShowDenialPopup] = useState(false);
    // State declaration for Stylist Popup
    const [showStylistPopup, setShowStylistPopup] = useState(false);

    const [dashboardBookingListData, setDashboardBookingListData] = useState<DashBoardDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // handle onChange event of the dropdown
    const handleStylistOption = (option: SingleValue<StylistOption>) => {
        setSelectedStylistOption(option);

        // Open Stylist Popup
        setShowStylistPopup(true);
    };


    const openDenialPopup = () => {
        setShowDenialPopup(true);
    }

    const closeDenialPopup = () => {
        setShowDenialPopup(false);
    }

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
                const data = await dashBoardBookingList(Number(sessionLoginProviderID));
                // const data = await dashBoardBookingList(Number(3));
                setDashboardBookingListData(data.bookings || []);    // Fallback to an empty array if data is null
                console.log("Booking list data log:", data);

            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        }
        loadBookingList();
    }, [dashboardBookingListData]);


    const handleActionSubmit = (appointmentID: number, actionID: number) => {
        setLoading(true);
        setError(null);

        try {
            const data = bookingAction(appointmentID, actionID);
            if (status === "success") {
                navigate(0);
            }
            console.log("Booking Action data log:", data);

        } catch (error: any) {
            setError(error.message || 'Failed to fetch staff list');
        } finally {
            setLoading(false); // Ensure loading is false after fetching
        }
    }


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
                                label={''}
                                name="sort"
                                id="sort"
                                options={[
                                    { value: "a-z", label: "A-Z" },
                                    { value: "z-a", label: "Z-A" },
                                ]}
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
                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">Bookings</h5>
                        </div>

                        <div>
                            <p className="text-lg text-main font-semibold underline hover:no-underline">View All Booking</p>
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
                                            <td className="text-start px-2 py-5">{dashboardData.service_names}</td>
                                            {/* <td className="text-start px-2 py-5">
                                                <ul>
                                                    <li>Eyesbrows Threading</li>
                                                    <li>Forehead Threading</li>
                                                </ul>
                                            </td> */}

                                            <td className="text-start px-2 py-5">
                                                {/* Branch Select Field */}
                                                <div>
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
                                                </div>
                                            </td>

                                            <td className="text-center px-2 py-5">
                                                <div className="space-y-3">

                                                    <div>
                                                        <Button
                                                            onClick={() => handleActionSubmit(Number(dashboardData.appointment_id), 1)}
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

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-5">
                                            No Bookings found.
                                        </td>
                                    </tr>
                                )}

                                <tr className="border-b-2 pb-2">
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
                                        {/* Branch Select Field */}
                                        <div>
                                            {/* <SelectField
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
                          /> */}

                                            {/* <Select
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
                          /> */}

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

                                            {/* {selectedStylistOption && (
                            <div style={{ marginTop: 20, lineHeight: '25px' }}>
                              <b>Selected Option:</b> {selectedStylistOption.text}
                            </div>
                          )} */}
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


                                </tr>


                                {/* Content & Checkbox */}
                                <tr className="border-b-2 pb-2">
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
                                        {/* Branch Select Field */}
                                        <div>
                                            {/* <SelectField
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
                          /> */}

                                            {/* <Select
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
                          /> */}

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

                                            {/* {selectedStylistOption && (
                            <div style={{ marginTop: 20, lineHeight: '25px' }}>
                              <b>Selected Option:</b> {selectedStylistOption.text}
                            </div>
                          )} */}
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


                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showDenialPopup && <DenialPopup closePopup={closeDenialPopup} />}
            {showStylistPopup && <StylistPopup closePopup={closeStylistPopup} />}

        </div>


    )
}
