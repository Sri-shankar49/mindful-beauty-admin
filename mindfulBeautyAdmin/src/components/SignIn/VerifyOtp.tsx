import { Button } from '@/common/Button';
import { MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

interface VerifyOtpProps {
    onVerifyOtp: () => void;
}

export const VerifyOtp: React.FC<VerifyOtpProps> = ({ onVerifyOtp }) => {
    return (
        <div>
            <div>
                <h5 className="text-[20px] text-mindfulWhite font-semibold pt-5 pb-1.5">OTP Verification</h5>
                <p className="text-lg text-mindfulWhite pb-1.5 flex">Enter the OTP sent to
                    <span className="font-semibold flex items-center"> +91 1234567890
                        <MdModeEdit
                            onClick={onVerifyOtp}
                            className="text-[18px] text-mindfulWhite ml-1 cursor-pointer"
                        />
                    </span>
                </p>
            </div>

            {/* Input Password Fields */}
            <div className="space-x-5 pt-2 pb-3">
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
                <input
                    type="text"
                    maxLength={1}
                    name=""
                    className="w-10 h-10 border-none rounded-sm px-3 py-3 text-center focus:outline-none"
                />
            </div>

            {/* Din't receive OTP */}
            <div className="pb-5">
                <p className="text-lg text-mindfulWhite">Din't receive OTP? {" "}
                    <span className="underline">Resend</span>
                </p>
            </div>

            <div>
                <Link to="/Dashboard">
                    <Button
                        buttonType="submit"
                        buttonTitle="Verify & Continue"
                        className="w-3/4 bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
                    />
                </Link>
            </div>
        </div>
    )
}
