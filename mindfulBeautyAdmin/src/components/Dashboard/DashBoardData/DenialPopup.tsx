import React, { useEffect, useState } from 'react'
import { declineMessageAction, fetchDeclineMessages } from '@/api/apiConfig';
import { Button } from '@/common/Button';
// import { SelectField } from '@/common/SelectField';
import { IoCloseCircle } from 'react-icons/io5';
// import { ShimmerTable } from 'shimmer-effects-react';

interface DenialPopupProps {
    closePopup: () => void;
    appointmentID: string;
}

interface DeclineListDataProps {
    message_id: number;
    text: string;
}

export const DenialPopup: React.FC<DenialPopupProps> = ({ closePopup, appointmentID }) => {

    const [declineListData, setDeclineListData] = useState<DeclineListDataProps[]>([]);
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchDeclineList = async () => {
            setLoading(true);

            try {
                const loadDeclineData = await fetchDeclineMessages();
                setDeclineListData(loadDeclineData.data);

                console.log("Fetched decline list data log:", loadDeclineData.data);

            } catch (error: any) {
                setError(error.message || 'Failed to fetch decline list');
            } finally {
                setLoading(false);
            }
        }
        fetchDeclineList();
    }, []);


    const handleDeclineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const messageID = e.target.value;
        setSelectedReason(messageID);
        console.log(`Selected reason: ${messageID}`);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedReason) {
            setError("Please select a reason for order denial.");
            return;
        }

        try {
            setLoading(true);
            const data = await declineMessageAction(Number(appointmentID), Number(selectedReason));
            console.log("Modify status data log:", data);

            // Optionally close the popup or show success message
            closePopup();
        } catch (error: any) {
            setError(error.message || "Failed to decline the appointment.");
        } finally {
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

                                <form onSubmit={handleSubmit} method="post">
                                    <div>
                                        {/* Branch Select Field */}
                                        <div>
                                            {/* <SelectField
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
                                                value={"Select any one of the Reason"} // Set default value from the API response
                                                onChange={handleDeclineChange}
                                            // error="This field is required."
                                            /> */}

                                            <select
                                                // name=""
                                                id=""
                                                className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                // value={selectedBranch}
                                                // onChange={handleBranchChange} // Call on change
                                                // value={bookingData.status_id} // Set default value from the API response
                                                onChange={handleDeclineChange} // Handle status change

                                            >
                                                <option value="" disabled>
                                                    Select the reason
                                                </option>

                                                {declineListData.map((decline) => (
                                                    <option key={decline.message_id} value={decline.message_id}>
                                                        {decline.text}
                                                    </option>
                                                ))}
                                            </select>
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
