import { IoCloseCircle } from "react-icons/io5";
// import { Button } from '@/common/Button';
import { InputField } from "@/common/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { cancelPayment, createOrder, verifyPayment } from "@/api/apiConfig";

interface CreditsPopupProps {
    refreshWalletData: () => void;
    closePopup: () => void;
}
declare global {
    interface Window {
        Razorpay: any;
    }
}

// Zod schema for form validation
const creditPopupSchema = zod.object({
    // requiredCredit: zod.string().min(1, { message: "Credit amount is required" }) // Ensure input is not empty
    //     .regex(/^\d+$/, { message: "Credit amount must be a valid number" }), // Ensure input is a number
    // requiredCredit: zod
    //     .string()
    //     .min(1, { message: "Credit amount is required" }) // Ensure input is not empty
    //     .regex(/^\d+$/, { message: "Credit amount must be a valid number" }) // Ensure input is a number
    //     .refine((val) => Number(val) >= 2000, {
    //         message: "Minimum credit amount should be 2000"
    //     }), // Ensure value is at least 2000
    requiredCredit: zod.string().min(1, { message: "Credit amount is required" }), // Ensure input is not empty
});

type creditsPopupFormData = zod.infer<typeof creditPopupSchema>;

// Function handler for RAZORPAY Payment
const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        if (document.getElementById("razorpay-script")) {
            return resolve(true); // Razorpay script already loaded
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.id = "razorpay-script";
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error("Failed to load Razorpay script"));
        document.body.appendChild(script);
    });
};

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

    // Load Razorpay script on mount
    useEffect(() => {
        loadRazorpayScript().catch((error) => {
            console.error(error.message);
        });
    }, []);

    const onSubmit = async (data: creditsPopupFormData) => {
        setLoading(true); // Start loading state
        setError(null); // Clear any previous errors
        setButtonState({ ...buttonState, isSubmitted: false }); // Reset submission state

        console.log("Submitted data:", data);

        try {
            if (!sessionLoginProviderID) {
                throw new Error("Login Provider ID is missing. Please try again.");
            }

            // Create order with the given amount and receipt
            const response = await createOrder(
                Number(data.requiredCredit), // Amount
                `receipt#${Math.floor(Math.random() * 10000)}`, // Generate a receipt number, or you can modify this as needed
                Number(sessionLoginProviderID)
            );
            console.log("Order created successfully:", response);

            // Update button text and color on success
            //   setButtonState({
            //     buttonText: "Credits purchased successfully!",
            //     isSubmitted: true,
            //   });

            // Reset the form after successful submission

            // Reset button text and color after 3 seconds
            setTimeout(() => {
                setButtonState({ buttonText: "Buy Credits", isSubmitted: true });

                // Now trigger Razorpay
                if (window.Razorpay) {
                    const options = {
                        key: "rzp_live_W6lWHSfydSDFbE", // Your Razorpay Key ID
                        amount: Number(data.requiredCredit) * 100, // Convert to paise
                        currency: "INR",
                        name: "Dhivya P",
                        description: "Purchase Credits",
                        order_id: response.order.id, // Order ID from the response
                        // provider_id:
                        // handler: function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
                        //   alert(JSON.stringify(response));

                        // },
                        handler: async function (response: {
                            razorpay_payment_id: any;
                            razorpay_order_id: any;
                            razorpay_signature: any;
                        }) {
                            console.log("Payment Response:", response);

                            // Now call verifyPayment API after successful Razorpay payment
                            try {
                                const verificationResponse = await verifyPayment(
                                    response.razorpay_order_id, // Razorpay Order ID
                                    response.razorpay_payment_id, // Razorpay Payment ID
                                    response.razorpay_signature, // Razorpay Signature
                                    Number(sessionLoginProviderID)
                                );

                                console.log(
                                    "Payment Verification Response:",
                                    verificationResponse
                                );
                                console.log("razorpay_order_id", response.razorpay_order_id);
                                console.log(
                                    "razorpay_payment_id",
                                    response.razorpay_payment_id
                                );
                                console.log("razorpay_signature", response.razorpay_signature);

                                // Handle the verification response here
                                if (verificationResponse.status === "success") {
                                    alert("Payment verified successfully!");
                                    // Proceed with further actions (e.g., updating wallet or UI)
                                } else {
                                    alert("Payment verification failed!");
                                }
                            } catch (error: any) {
                                console.error(
                                    "Error during payment verification:",
                                    error.message
                                );
                                console.log("Error during payment verification. Please try again.");
                            }
                        },

                        prefill: {
                            name: "User",
                            email: "user@example.com",
                            contact: "9000090000",
                        },
                        notes: {
                            address: "Razorpay Corporate Office",
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };

                    //var rzp1 = new window.Razorpay(options);
                    const rzp1 = new window.Razorpay(options);
                    // Listen for payment failure
                    rzp1.on(
                        "payment.failed",
                        async function (response: {
                            error: { metadata: any; reason: any };
                        }) {
                            console.log("Payment Failed:", response);
                            try {
                                const cancelResponse = await cancelPayment(
                                    response.error.metadata.order_id,
                                    Number(sessionLoginProviderID)
                                );
                                console.log("Cancel Response:", cancelResponse);

                                if (cancelResponse.status === "success") {
                                    alert(
                                        `Payment canceled successfully! Order ID: ${cancelResponse.order_id}`
                                    );
                                } else {
                                    console.error("Failed to cancel payment", cancelResponse);
                                    alert("Payment cancellation failed. Please try again later.");
                                }
                            } catch (error: any) {
                                console.error(
                                    "Error during payment cancellation:",
                                    error.message || error
                                );
                                console.log("Error during payment cancellation. Please try again.");
                            }
                        }
                    );

                    rzp1.open();

                    // Reset form and state after successful payment
                    reset();
                    setTimeout(() => {
                        setButtonState({ buttonText: "Buy Credits", isSubmitted: false });
                        refreshWalletData();
                        closePopup();
                    }, 3000);
                } else {
                    console.error("Razorpay script not loaded properly!");
                }
            }, 3000); // <-- This is where you close the first setTimeout
        } catch (error: any) {
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                                    <h2 className="text-2xl text-mindfulBlack font-semibold">
                                        Credits
                                    </h2>
                                </div>
                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5"></div>
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
                                            className="text-md text-mindfulBlack font-semibold"
                                        >
                                            Enter Required Credit
                                            {/* <span className="text-main"> *</span> */}
                                        </label>
                                        <InputField
                                            label={""}
                                            type="number"
                                            // name="requiredCredit"
                                            id="requiredCredit"
                                            placeholder=""
                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            {...register("requiredCredit")}
                                        />

                                        {errors.requiredCredit && (
                                            <p className="text-sm text-red-600">
                                                {errors.requiredCredit.message}
                                            </p>
                                        )}

                                        {/* Display error message */}
                                        {error && <p className="text-sm text-red-600">{error}</p>}

                                        <p className="text-sm text-main italic pt-3">
                                            One credit equals to Rs.1*
                                        </p>
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
                                            {loading ? "Submitting..." : buttonState.buttonText}{" "}
                                            {/* Use buttonText state */}
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
    );
};
