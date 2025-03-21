import { useEffect, useRef, useState } from 'react';
import { Button } from '@/common/Button';
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// import { verifyOTP } from '@/api/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; // Import RootState
import { verifyOTPThunk, setPhoneNumber } from '../../redux/loginSlice';
import { fetchLogin } from '@/api/apiConfig';

interface VerifyOtpProps {
    onVerifyOtp: () => void;
}

// Zod validation schema for the form
const verifyOtpSchema = zod.object({
    otp: zod.array(zod.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit")).length(4, "Must be 4 digits"),
});

type VerifyOtpFormData = zod.infer<typeof verifyOtpSchema>;

export const VerifyOtp: React.FC<VerifyOtpProps> = ({ onVerifyOtp }) => {

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();
    // const [error, setError] = useState<string | null>(null);
    // console.log(error, "Set Error for this error state");

    const { otpError, token, phoneNumber } = useSelector((state: RootState) => state.login);

    // Getting Phone Number from Session Storage
    // const phoneNumber = sessionStorage.getItem('phoneNumber') || "";
    // console.log("Getting Phone Number from Session Storage", phoneNumber);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
    });

    // Watch the OTP input values dynamically
    const otpFields = watch('otp', ['', '', '', '']); // Default values for OTP fields

    // Combine the OTP fields into one value
    // const otpValue = otpFields.join('');

    // Initialize otpRefs as an array of refs for OTP input fields
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [timer, setTimer] = useState(60); // State for the timer
    const [isResendEnabled, setIsResendEnabled] = useState(false); // State for resend button

    useEffect(() => {
        const storedPhoneNumber = sessionStorage.getItem('EnteredPhoneNumber');
        console.log("Getting phone Number from redux persist", storedPhoneNumber);

        if (storedPhoneNumber) {
            dispatch(setPhoneNumber(storedPhoneNumber)); // Sync Redux state with sessionStorage
        }
    }, [dispatch]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendEnabled(true); // Enable resend after 60 seconds
        }
    }, [timer]);

    // Handle OTP submission
    const onSubmit = (data: VerifyOtpFormData) => {
        const userOtp = data.otp.join(''); // Combine OTP digits into a string
        if (phoneNumber && userOtp) {
            dispatch(verifyOTPThunk({ phoneNumber: phoneNumber, otp: userOtp }));
        } else {
            console.error("Phone number or OTP is missing");
        }
    };


    useEffect(() => {
        if (token) {
            navigate('/Dashboard/DashboardData'); // Redirect after successful OTP validation
        }
    }, [token, navigate]);

    // Handle OTP input changes and move focus
    // const handleOtpInputChange = (value: string, index: number) => {
    //     setValue(`otp.${index}`, value); // Set value in React Hook Form
    //     // setOtpError(null); // Clear any existing error

    //     // Focus on the next input field
    //     if (value && index < otpFields.length - 1) {
    //         otpRefs.current[index + 1]?.focus();
    //     }

    //     // Move to the previous input if backspace is pressed and current field is empty
    //     if (!value && index > 0) {
    //         otpRefs.current[index - 1]?.focus();
    //     }
    // };

    const handleResendOtp = async () => {
        console.log('Login Form Submitted Data:', phoneNumber);

        try {
            // Ensure phoneNumber is a valid number
            if (phoneNumber) {
                const loginData = await fetchLogin(Number(phoneNumber)); // Convert to number
                console.log('OTP Generated Response:', loginData);

                if (loginData.status === "success") {
                    sessionStorage.setItem('EnteredPhoneNumber', String(phoneNumber));
                    setIsResendEnabled(false);
                    setTimer(60);
                }
            } else {
                throw new Error("Phone number is required.");
            }
        } catch (error: any) {
            console.error('Error Generating OTP:', error.message);
            // setError(error.message || "Failed to generate OTP. Please try again.");
        }
    };

    return (
        <div>
            <div>
                <h5 className="text-[20px] text-mindfulWhite font-semibold pt-5 pb-1.5 max-lg:text-base *:">OTP Verification</h5>
                <p className="text-lg text-mindfulWhite pb-1.5 flex items-center max-lg:text-base max-md:flex-col max-md:items-start">Enter the OTP sent to

                    <span className="font-semibold flex items-center ml-1"> +91 {phoneNumber}
                        <MdModeEdit
                            onClick={onVerifyOtp}
                            className="text-[18px] text-mindfulWhite ml-1 cursor-pointer"
                        />
                    </span>
                </p>
            </div>

            <div>
                <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                    {/* Input Password Fields */}
                    <div className="space-x-5 pt-2 pb-3">

                        {otpFields.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                {...register(`otp.${index}`)}
                                className="w-10 h-10 border-2 border-mindfulLightGrey rounded-[6px] px-3 py-3 text-center focus:outline-none"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers

                                    // Set the value properly
                                    setValue(`otp.${index}`, value);

                                    // Move focus to the next input if user types a digit
                                    if (value && index < otpFields.length - 1) {
                                        otpRefs.current[index + 1]?.focus();
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                        e.preventDefault(); // Prevent non-numeric input
                                    }

                                    if (e.key === "Backspace") {
                                        setValue(`otp.${index}`, ""); // Clear the current input

                                        // Move to previous input if it's empty
                                        if (index > 0) {
                                            otpRefs.current[index - 1]?.focus();
                                        }
                                    }
                                }}
                                value={otpFields[index]} // Ensure reactivity
                                ref={(el) => (otpRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    {errors.otp && <p className="text-sm text-mindfulWhite">
                        {errors.otp?.message || "Please enter a valid 4-digit OTP."}
                    </p>
                    }
                    {otpError && <p className="text-sm text-mindfulWhite">{otpError}</p>}

                    {/* Din't receive OTP */}
                    <div className="pb-5">
                        <p className="text-lg text-mindfulWhite max-lg:text-base">Didn't receive OTP? {" "}
                            {isResendEnabled ? (
                                <span className="underline cursor-pointer hover:no-underline"
                                    onClick={handleResendOtp}
                                >Resend</span>
                            ) : (
                                <span className="underline cursor-pointer hover:no-underline">Resend in {timer} seconds</span>
                            )}
                        </p>
                    </div>

                    <div>
                        {/* <Link to="/Dashboard"> */}
                        <Button
                            buttonType="submit"
                            buttonTitle="Verify & Continue"
                            className="w-3/4 bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
                        />
                        {/* </Link> */}
                    </div>
                </form>
            </div>
        </div>
    )
}
