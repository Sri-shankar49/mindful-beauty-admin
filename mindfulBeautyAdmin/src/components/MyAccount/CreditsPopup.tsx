import { IoCloseCircle } from 'react-icons/io5';
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';

interface CreditsPopupProps {
    closePopup: () => void;
}

export const CreditsPopup: React.FC<CreditsPopupProps> = ({ closePopup }) => {
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

                            <form method="post">
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
                                            name="requiredCredit"
                                            id="requiredCredit"
                                            placeholder=""
                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"

                                        />

                                        <p className="text-sm text-main italic pt-3">One credit equals to Rs.1*</p>


                                    </div>

                                    {/* Button */}
                                    <div className="pt-5">
                                        {/* Submit Button */}
                                        <Button
                                            buttonType="submit"
                                            buttonTitle="Buy Credits"
                                            className="bg-main text-md text-mindfulWhite rounded-sm px-4 py-2.5 focus-within:outline-none"
                                        />

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
