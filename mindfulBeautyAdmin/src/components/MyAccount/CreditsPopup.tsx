import { IoCloseCircle } from 'react-icons/io5';
// import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from 'react';
import { addWalletTransaction } from '@/api/apiConfig';

interface CreditsPopupProps {
    refreshWalletData: () => void;
    closePopup: () => void;
}

// Zod schema for form validation
const creditPopupSchema = zod.object({
    // requiredCredit: zod.string().min(1, { message: "Credit amount is required" }) // Ensure input is not empty
    //     .regex(/^\d+$/, { message: "Credit amount must be a valid number" }), // Ensure input is a number
    requiredCredit: zod
        .string()
        .min(1, { message: "Credit amount is required" }) // Ensure input is not empty
        .regex(/^\d+$/, { message: "Credit amount must be a valid number" }) // Ensure input is a number
        .refine((val) => Number(val) >= 2000, {
            message: "Minimum credit amount should be 2000"
        }), // Ensure value is at least 2000
});

type creditsPopupFormData = zod.infer<typeof creditPopupSchema>;

export const CreditsPopup: React.FC<CreditsPopupProps> = ({ closePopup, refreshWalletData }) => {

    const [loading, setLoading] = useState(false); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);

    // Consolidated state for button text and submission status
    const [buttonState, setButtonState] = useState({ buttonText: "Buy Credits", isSubmitted: false });

    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm<creditsPopupFormData>({
        resolver: zodResolver(creditPopupSchema),
        defaultValues: {
            requiredCredit: "",
        },
    });

    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);


    const onSubmit = async (data: creditsPopupFormData) => {
        setLoading(true); // Start loading state
        setError(null);   // Clear any previous errors
        setButtonState({ ...buttonState, isSubmitted: false }); // Reset submission state


        console.log("Submitted data:", data);

        try {

            if (!sessionLoginProviderID) {
                throw new Error('Login Provider ID is missing. Please try again.');
            }

            // API call to add credit
            const response = await addWalletTransaction(Number(sessionLoginProviderID), Number(data.requiredCredit));
            console.log("Credit points submitted successfully:", response);

            // Update button text and color on success
            setButtonState({ buttonText: "Credits purchased successfully!", isSubmitted: true });

            // Reset the form after successful submission
            reset(); // Clears all form fields including rating and comment

            // Reset button text and color after 3 seconds
            setTimeout(() => {
                setButtonState({ buttonText: "Buy Credits", isSubmitted: false });
                refreshWalletData();
                closePopup();
            }, 3000);
        }
        catch (error: any) {
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);  // End loading state
        }
    }

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">


                            <div className="relative mb-5">

                                <div className="">
                                    <h2 className="text-2xl text-mindfulBlack font-semibold">Credits</h2>
                                </div>
                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                </div>
                            </div>

                            {/* Close Button */}
                            <div
                                onClick={closePopup}
                                className="absolute top-5 right-5 w-fit cursor-pointer"
                            >
                                <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} method="post">
                                <div className="pt-8 pb-3">
                                    {/* Branch Select Field */}
                                    <div>
                                        <label
                                            htmlFor="requiredCredit"
                                            className="text-md text-mindfulBlack font-semibold">
                                            Enter Required Credit
                                            {/* <span className="text-main"> *</span> */}

                                        </label>
                                        <InputField
                                            label={''}
                                            type="number"
                                            // name="requiredCredit"
                                            id="requiredCredit"
                                            placeholder=""
                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            {...register("requiredCredit")}
                                        />

                                        {errors.requiredCredit && (
                                            <p className="text-sm text-red-500">{errors.requiredCredit.message}</p>
                                        )}

                                        {/* Display error message */}
                                        {error && (<p className="text-sm text-red-500">{error}</p>)}

                                        <p className="text-sm text-main italic pt-3">One credit equals to Rs.1*</p>


                                    </div>

                                    {/* Button */}
                                    <div className="pt-5">
                                        {/* Submit Button */}
                                        {/* <Button
                                            buttonType="submit"
                                            buttonTitle="Buy Credits"
                                            className="bg-main text-md text-mindfulWhite rounded-sm px-4 py-2.5 focus-within:outline-none"
                                        /> */}

                                        <button
                                            type="submit"
                                            className={`${buttonState.isSubmitted ? "bg-green-500" : "bg-main"}
                text-md text-mindfulWhite rounded-sm px-4 py-2.5 focus-within:outline-none`}
                                            disabled={loading}
                                        >
                                            {/* Submit */}
                                            {loading ? "Submitting..." : buttonState.buttonText} {/* Use buttonText state */}

                                            {/* <HiArrowSmRight className="text-[22px] text-mindfulWhite ml-1" /> */}
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
