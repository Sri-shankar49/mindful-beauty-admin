import { fetchDeclineMessages } from '@/api/apiConfig';
import { Button } from '@/common/Button';
import { SelectField } from '@/common/SelectField';
import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
// import { ShimmerTable } from 'shimmer-effects-react';

interface DenialPopupProps {
    closePopup: () => void;
}

interface DeclineListDataProps {
    message_id: number;
    text: string;
}

export const DenialPopup: React.FC<DenialPopupProps> = ({ closePopup }) => {

    const [declineListData, setDeclineListData] = useState<DeclineListDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchDeclineList = async () => {
            setLoading(true);

            try {
                const loadDeclineData = await fetchDeclineMessages();
                setDeclineListData(loadDeclineData.data);

                console.log("Fetched decline list data log:", loadDeclineData);

            } catch (error: any) {
                setError(error.message || 'Failed to fetch decline list');
            } finally {
                setLoading(false);
            }
        }
        fetchDeclineList();
    }, []);


    const handleDeclineChange = async (e: React.ChangeEvent<HTMLSelectElement>, appointmentID: string, messageID: string) => {
        const messageID = e.target.value;
        console.log(`Status changed for booking ID ${appointmentID} to ${messageID}`);

        // Optional: Update the status in the backend or state
        // API call or local state update logic here
        try {
            setLoading(true);

            const data = await modifyStatus(Number(appointmentID), Number(newStatusId));

            console.log("Modify status data log:", data);


            // Refresh the schedule list data after status update
            await fetchRefreshedBookingListData();

        } catch (error: any) {
            setError(error.message || "Failed to fetch booking list for the selected status");
        }
        finally {
            setLoading(false);

        }
    };

    if (loading) return <div>Loading...</div>;
    // if (loading) return <div>
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // </div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">

                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">


                                <div className="relative mb-5">

                                    <div className="text-center">
                                        <h2 className="text-2xl text-mindfulBlack font-semibold">Provide Reason for Order Denial</h2>
                                    </div>
                                    {/* <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                    </div> */}
                                </div>

                                {/* Close Button */}
                                <div
                                    onClick={closePopup}
                                    className="absolute top-5 right-5 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>

                                {/* Branch Select Field */}
                                <div>
                                    <SelectField
                                        label=""
                                        name="reason"
                                        // required
                                        className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                        // options={[
                                        //     { value: "staffNotAvailable", label: "Staff Not Available" },
                                        //     { value: "serviceUnavailableAtSelectedTime", label: "Service Unavailable At Selected Time" },
                                        //     { value: "appointmentOverbooked", label: "Appointment Overbooked" },
                                        //     { value: "technicalIssuesWithService", label: "Technical Issues With Service" },
                                        // ]}
                                        options={declineListData.map((decline) => ({
                                            value: String(decline.message_id), // Replace 'value' with the actual key from your API
                                            label: decline.text, // Replace 'label' with the actual key from your API
                                        }))}
                                        value={bookingData.status_id} // Set default value from the API response
                                        onChange={(e) => handleStatusChange(e, decline.id)} // Handle status change
                                    // error="This field is required."
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="pt-5">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}
                                        <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            buttonType="submit"
                                            buttonTitle="Confirm"
                                            className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
