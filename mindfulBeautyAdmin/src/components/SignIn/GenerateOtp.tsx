import { useState } from 'react';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { fetchLogin } from '@/api/apiConfig';

interface GenerateOtpProps {
    onGenerateOtp: () => void;
}

// Zod validation schema for the form
const generateOtpSchema = zod.object({
    phoneNumber: zod.string().length(10, { message: 'Phone number must be exactly 10 digits' }),
});

type GenerateOtpFormData = zod.infer<typeof generateOtpSchema>;

export const GenerateOtp: React.FC<GenerateOtpProps> = ({ onGenerateOtp }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, } = useForm<GenerateOtpFormData>({
        resolver: zodResolver(generateOtpSchema),
    });

    const onSubmit = async (data: GenerateOtpFormData) => {
        setLoading(true);
        setError(null);

        console.log('Login Form Submitted Data:', data);

        try {
            // Simulate API call
            const loginData = await fetchLogin(parseInt(data.phoneNumber));

            console.log('OTP Generated Response:', loginData);

            if (loginData.status === "success") {
                sessionStorage.setItem("phoneNumber", data.phoneNumber)
            }

            // Trigger the parent callback on successful OTP generation
            onGenerateOtp();
        }
        catch (error: any) {
            console.error('Error Generating OTP:', error.message);
            setError(error.message || "Failed to generate OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <h5 className="text-[20px] text-mindfulWhite font-semibold pt-5 pb-1.5">Enter your registered mobile no</h5>
                <p className="text-lg text-mindfulWhite pb-1.5">We will send you the 4 digit verification code</p>

                <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="pb-14">
                            <InputField
                                label={''}
                                type="number"
                                placeholder="Enter your mobile number"
                                className="w-3/4 rounded-[5px] px-4 py-2 focus-within:outline-none"
                                {...register('phoneNumber')}
                            />

                            {/* Error from ZOD  */}
                            {errors.phoneNumber && (
                                <p className="text-sm text-mindfulWhite">{errors.phoneNumber.message}</p>
                            )}

                            {/* Error from API response  */}
                            {error && <p className="text-sm text-mindfulWhite">{error}</p>}
                        </div>

                        <div>
                            <Button
                                // onClick={onGenerateOtp}
                                buttonType="submit"
                                buttonTitle={loading ? 'Generating...' : 'Generate OTP'}
                                className="w-3/4 bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 mb-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
                                disabled={loading}
                            />
                            {/* {error && <p className="text-red-600 text-sm mt-2">{error}</p>} */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
