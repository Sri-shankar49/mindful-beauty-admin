import salonChair from "../assets/icons/salonChair.svg";
import { Link } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';

export const GeneralInfoForm = () => {
    return (
        <div>
            <div className="bg-SignInBgImg bg-cover bg-no-repeat h-dvh">

                <div className="w-3/4 mx-auto h-dvh flex items-center">
                    <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg z-0">
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
                                            <div className="w-full absolute top-5 left-0 z-[-1]">
                                                <div className="w-full h-[2px] bg-mindfulgrey rounded-lg z-[10]"></div>
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
                                                    className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                                >
                                                    2
                                                </div>
                                            </Link>

                                            {/* Three Icon */}
                                            {/* <Link to="/Cart"> */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center"
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

                                            {/* Owner's Name */}
                                            <div>
                                                <label
                                                    htmlFor="ownersName"
                                                    className="text-lg text-mindfulBlack">
                                                    Owner's Name
                                                    <span className="text-main"> *</span>
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="ownersName"
                                                    id="ownersName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Salon Name */}
                                            <div>
                                                <label
                                                    htmlFor="salonName"
                                                    className="text-lg text-mindfulBlack">
                                                    Salon Name
                                                    <span className="text-main"> *</span>
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="salonName"
                                                    id="salonName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Contact Number */}
                                            <div>
                                                <label
                                                    htmlFor="contactNumber"
                                                    className="text-lg text-mindfulBlack">
                                                    Contact Number
                                                    <span className="text-main"> *</span>
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

                                            {/* Email Address */}
                                            <div>
                                                <label
                                                    htmlFor="emailAddress"
                                                    className="text-lg text-mindfulBlack">
                                                    Email Address
                                                    <span className="text-main"> *</span>
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

                                            {/* Salon Location */}
                                            <div>
                                                <label
                                                    htmlFor="salonLocation"
                                                    className="text-lg text-mindfulBlack">
                                                    Salon Location
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="salonLocation"
                                                    id="salonLocation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Established On */}
                                            <div>
                                                <label
                                                    htmlFor="establishedOn"
                                                    className="text-lg text-mindfulBlack">
                                                    Established On
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="establishedOn"
                                                    id="establishedOn"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Salon Address */}
                                            <div>
                                                <label
                                                    htmlFor="salonAddress"
                                                    className="text-lg text-mindfulBlack">
                                                    Salon Address
                                                </label>
                                                {/* <InputField
                                                    label={''}
                                                    name="salonAddress"
                                                    id="salonAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                /> */}
                                                <textarea
                                                    rows={3}
                                                    name="salonAddress"
                                                    id="salonAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"

                                                ></textarea>
                                            </div>

                                            {/* Services Offered */}
                                            <div>
                                                <label
                                                    htmlFor="servicesOffered"
                                                    className="text-lg text-mindfulBlack">
                                                    Services Offered
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="servicesOffered"
                                                    id="servicesOffered"
                                                    placeholder="eg. makeup, hair styling"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Business Hours */}
                                            <div>
                                                <label
                                                    htmlFor="businessHours"
                                                    className="text-lg text-mindfulBlack">
                                                    Business Hours
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="businessHours"
                                                    id="businessHours"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Staff Information */}
                                            <div>
                                                <label
                                                    htmlFor="staffInformation"
                                                    className="text-lg text-mindfulBlack">
                                                    Staff Information
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="staffInformation"
                                                    id="staffInformation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Salon Facilities */}
                                            <div>
                                                <label
                                                    htmlFor="staffInformation"
                                                    className="text-lg text-mindfulBlack">
                                                    Salon Facilities
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="staffInformation"
                                                    id="staffInformation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Cancellation Policy */}
                                            <div>
                                                <label
                                                    htmlFor="staffInformation"
                                                    className="text-lg text-mindfulBlack">
                                                    Cancellation Policy
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="staffInformation"
                                                    id="staffInformation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                        </div>


                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    // onClick={closePopup}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Submit Button */}
                                                <Link to="/BankAccInfoForm">
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
