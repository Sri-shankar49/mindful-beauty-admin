import { useState } from 'react';
import { GenerateOtp } from './GenerateOtp'
import { VerifyOtp } from './VerifyOtp'

export const Login = () => {

    const [isOtpGenerated, setIsOtpGenerated] = useState(false);

    // Handler to call when OTP generation is triggered
    const handleGenerateOtp = () => {
        setIsOtpGenerated(true);
    };

    const handleVerifyOtp = () => {
        setIsOtpGenerated(false)
    }

    return (
        <div>
            {isOtpGenerated ? (
                <VerifyOtp onVerifyOtp={handleVerifyOtp} />
            ) : (
                <GenerateOtp onGenerateOtp={handleGenerateOtp} />
            )}
        </div>
    )
}
