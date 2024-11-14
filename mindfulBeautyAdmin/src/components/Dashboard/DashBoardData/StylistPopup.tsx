import { Button } from '@/common/Button';
import { IoCloseCircle } from 'react-icons/io5';
import stylist from "../../../assets/images/stylist.png"

interface StylistPopupProps {
    closePopup: () => void;
}

export const StylistPopup: React.FC<StylistPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">

                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">


                                <div className="relative mb-5">

                                    <div className="flex items-center justify-center space-x-5">
                                        <div>
                                            <img src={stylist} alt="" />
                                        </div>
                                        <div className="text-center">
                                            <h2 className="text-2xl text-mindfulBlack font-semibold">Swetha</h2>
                                        </div>
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

                                <div className="text-center">
                                    <p className="text-lg text-mindfulBlack">Kindly confirm to assign this talk to Swetha</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
