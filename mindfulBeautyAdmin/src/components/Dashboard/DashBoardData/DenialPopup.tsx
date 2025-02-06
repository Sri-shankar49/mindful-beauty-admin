import React, { useEffect, useState } from 'react'
import { declineMessageAction, fetchDeclineMessages } from '@/api/apiConfig';
import { Button } from '@/common/Button';
// import { SelectField } from '@/common/SelectField';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { SelectField } from '@/common/SelectField';
// import { ShimmerTable } from 'shimmer-effects-react';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ShimmerTable } from 'shimmer-effects-react';

interface DenialPopupProps {
    closePopup: () => void;
    appointmentID: string;
}

interface DeclineListDataProps {
    message_id: number;
    text: string;
}

type addReasonormData = zod.infer<typeof addReasonSchema>;

// Zod schema for form validation
const addReasonSchema = zod.object({
    reason: zod.string().min(1, "Reason is required"),
});

export const DenialPopup: React.FC<DenialPopupProps> = ({ closePopup, appointmentID }) => {
    const navigate = useNavigate();
    const [declineListData, setDeclineListData] = useState<DeclineListDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeclineList = async () => {
            setLoading(true);

            try {
                const loadDeclineData = await fetchDeclineMessages();
                setDeclineListData(loadDeclineData.data);
                // If there's data, set the first item as default value
                if (loadDeclineData.data.length > 0) {
                    setValue("reason", String(loadDeclineData.data[0].message_id));
                }
            } catch (error: any) {
                setError(error.message || 'Failed to fetch decline list');
            } finally {
                setLoading(false);
            }
        }
        fetchDeclineList();
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<addReasonormData>({
        resolver: zodResolver(addReasonSchema),
    });

    const onSubmit = async (data: addReasonormData) => {
        setLoading(true);
        setError(null);
        console.log(`Selected reason: ${data.reason}`);
        try {
            const formData = new FormData();
            formData.append("appointment_id", appointmentID.toString());
            formData.append("message_id", data.reason);

            const DeclineMSg = await declineMessageAction(formData);
            if (DeclineMSg?.status === "success") {
                closePopup();
                navigate(0);
            }
        } catch (error: any) {
            setError(error.message || "Failed to decline the appointment.");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div>Loading...</div>;
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

                                <form onSubmit={handleSubmit(onSubmit)} method="post">
                                    <div>
                                        {/* Branch Select Field */}
                                        <div>
                                            <SelectField
                                                label=""
                                                id="reason"
                                                className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                options={
                                                    declineListData.length
                                                        ? declineListData.map((branch) => ({
                                                            key: branch.message_id,
                                                            value: branch.message_id ? String(branch.message_id) : "",
                                                            label: branch.text,
                                                        }))
                                                        : [{ value: "", label: "No reason available" }]
                                                }
                                                defaultValue={declineListData.length > 0 ? String(declineListData[0].message_id) : ""}
                                                {...register("reason")}
                                            />
                                            {errors.reason && (
                                                <p className="text-sm text-red-600">{errors.reason.message}</p>
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
