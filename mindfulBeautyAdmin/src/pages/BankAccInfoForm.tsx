import salonChair from "../assets/icons/salonChair.svg";
import { Link } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';

export const BankAccInfoForm = () => {
    return (
        <div>
            <div className="bg-SignInBgImg bg-cover bg-no-repeat h-dvh">

                <div className="w-3/4 mx-auto h-dvh flex items-center">
                    <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg">
                        {/* <div className="bg-mindfulWhite rounded-lg drop-shadow-md"> */}

                        <div className="w-full px-5 py-5">
                            <div className="">

                                {/* Heading */}
                                <div className="w-full text-center bg-main rounded-md px-5 py-5 flex items-center justify-center space-x-5">
                                    <div className="bg-mindfulWhite rounded-full px-2 py-2">
                                        <img
                                            src={salonChair}
                                            alt="Salon chair"
                                        />
                                    </div>

                                    <h5 className="text-3xl text-mindfulWhite">Salon Service Registration Forms</h5>
                                </div>

                                {/* Steps Indicator */}
                                <div>
                                    {/* Numbers Div */}
                                    <div className="my-10">
                                        <div className="w-3/4 mx-auto relative flex justify-between items-center">

                                            {/* Back Line */}
                                            <div className="w-full absolute top-5 left-0">
                                                <div className="w-full h-[2px] bg-mindfulBlack rounded-lg z-[10]"></div>
                                            </div>

                                            {/* One Icon */}
                                            <Link to="/Login">
                                                <div
                                                    className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
                                                >
                                                    1
                                                </div>
                                            </Link>

                                            {/* Two Icon */}
                                            <Link to="/DateTime">
                                                <div
                                                    className="bg-mindfulgrey text-mindfulWhite w-[40px] h-[40px] border-2 border-mindfulBlack rounded-full z-10 flex justify-center items-center"
                                                >
                                                    2
                                                </div>
                                            </Link>

                                            {/* Three Icon */}
                                            {/* <Link to="/Cart"> */}
                                            <div
                                                className="bg-mindfulgrey text-mindfulWhite w-[40px] h-[40px] border-2 border-mindfulBlack rounded-full flex justify-center items-center"
                                            >
                                                3
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Heading */}
                                <div className="text-center py-2">
                                    <h5 className="text-lg text-mindfulBlack font-semibold">General Information</h5>
                                </div>

                                <div>
                                    <form action="" method="post">
                                        <div className="grid grid-cols-3 gap-5">

                                            {/* Bank Account Holder Name */}
                                            <div>
                                                <label
                                                    htmlFor="accHolderName"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Account Holder Name
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="accHolderName"
                                                    id="accHolderName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Bank Name */}
                                            <div>
                                                <label
                                                    htmlFor="bankName"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Name
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="bankName"
                                                    id="bankName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Bank Account Number */}
                                            <div>
                                                <label
                                                    htmlFor="contactNumber"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Account Number
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="number"
                                                    name="contactNumber"
                                                    id="contactNumber"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Account Type */}
                                            <div>
                                                <label
                                                    htmlFor="emailAddress"
                                                    className="text-lg text-mindfulBlack">
                                                    Account Type
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="email"
                                                    name="emailAddress"
                                                    id="emailAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Bank Branch */}
                                            <div>
                                                <label
                                                    htmlFor="bankBranch"
                                                    className="text-lg text-mindfulBlack">
                                                    Bank Branch
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="bankBranch"
                                                    id="bankBranch"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* IFSC Code or equivalent */}
                                            <div>
                                                <label
                                                    htmlFor="ifscCode"
                                                    className="text-lg text-mindfulBlack">
                                                    IFSC Code or equivalent
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="ifscCode"
                                                    id="ifscCode"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>


                                        </div>


                                        {/* Buttons */}
                                        <div className="text-center pt-60 pb-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Reset Button */}
                                                <Button
                                                    // onClick={closePopup}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Back Button */}
                                                <Button
                                                    // onClick={closePopup}
                                                    buttonType="button"
                                                    buttonTitle="Back"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack border-[1px] border-mindfulBlack font-semibold rounded-sm px-8 py-2 focus-within:outline-none"
                                                />

                                                {/* Next Button */}
                                                <Link to="/TaxInfoForm">
                                                    <Button
                                                        buttonType="submit"
                                                        buttonTitle="Next"
                                                        className="bg-main text-md text-mindfulWhite  font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                    />
                                                </Link>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
