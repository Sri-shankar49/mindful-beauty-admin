import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'

interface GenerateOtpProps {
    onGenerateOtp: () => void;
}

export const GenerateOtp: React.FC<GenerateOtpProps> = ({ onGenerateOtp }) => {
    return (
        <div>
            <div>
                <h5 className="text-[20px] text-mindfulWhite font-semibold pt-5 pb-1.5">Enter your registered mobile no</h5>
                <p className="text-lg text-mindfulWhite pb-1.5">We will send you the 4 digit verification code</p>

                <form action="" method="post">
                    <div>
                        <div className="pb-14">
                            <InputField
                                label={''}
                                type="number"
                                placeholder="Enter your mobile number"
                                className="w-3/4 rounded-[5px] px-4 py-2 focus-within:outline-none"
                            />
                        </div>

                        <div>
                            <Button
                                onClick={onGenerateOtp}
                                buttonType="submit"
                                buttonTitle="Generate OTP"
                                className="w-3/4 bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 mb-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
