/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchMessages, sendMessage } from "@/api/apiConfig";
import { Button } from "@/common/Button";
import { SelectField } from "@/common/SelectField";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

interface DenialPopupProps {
    appointmentId: string;
    closePopup: () => void;

}



export const DenialPopup: React.FC<DenialPopupProps> = ({ closePopup, appointmentId }) => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null); // Store selected message_id



    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                const response = await fetchMessages();
                // Transform API data into format suitable for SelectField options
                const formattedOptions = response.data.map(
                    (item: { message_id: number; text: string }) => ({
                        value: `message_${item.message_id}`, // Dynamic value
                        label: item.text,
                    })
                );
                setOptions(formattedOptions);
            } catch (err: any) {
                setError(err.message || "Failed to load messages.");
            } finally {
                setLoading(false);
            }
        };
        loadMessages();
    }, []);




    const handleConfirm = async () => {
        if (selectedMessageId && appointmentId) {
            try {
                const messageId = selectedMessageId.split("_")[1];
                // const text="Staff Not Available"
                const response = await sendMessage(appointmentId, messageId);
                console.log("Message sent successfully:", response);
                closePopup();
            } catch (error: any) {
                console.error("Error sending message:", error);
            }
        }
    };




    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">
                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">
                                <div className="relative mb-5">
                                    <div className="text-center">
                                        <h2 className="text-2xl text-mindfulBlack font-semibold">
                                            Provide Reason for Order Denial
                                        </h2>
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
                                    {loading ? (
                                        <p>Loading reasons...</p>
                                    ) : error ? (
                                        <p className="text-red-500">{error}</p>
                                    ) : (
                                        <SelectField
                                            label=""
                                            name="reason"
                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            options={options}
                                            onChange={(e) => setSelectedMessageId(e.target.value)} // Set selected message_id
                                        />
                                    )}
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
                                            onClick={handleConfirm} // Trigger sendMessage API call on click

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
    );
};
