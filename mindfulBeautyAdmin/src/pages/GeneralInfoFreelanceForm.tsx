import { useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { Link } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { Slider } from "@/components/ui/slider"
import { MdCloudUpload } from "react-icons/md";


export const GeneralInfoFreelanceForm = () => {

    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);

    // File change handler
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileNumber: number) => {
        const file = event.target.files?.[0];         // Optional chaining to check if files exist
        if (file) {
            if (fileNumber === 1) {
                setSelectedFile1(file)
            }
        }
    }

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

                                    <h5 className="text-3xl text-mindfulWhite">Freelancer Service Registration Forms</h5>
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

                                            {/* Full Name */}
                                            <div>
                                                <label
                                                    htmlFor="ownersName"
                                                    className="text-lg text-mindfulBlack">
                                                    Full Name
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

                                            {/* Location */}
                                            <div>
                                                <label
                                                    htmlFor="salonLocation"
                                                    className="text-lg text-mindfulBlack">
                                                    Location
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="salonLocation"
                                                    id="salonLocation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Home Address */}
                                            <div>
                                                <label
                                                    htmlFor="salonAddress"
                                                    className="text-lg text-mindfulBlack">
                                                    Home Address
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

                                            {/* Services Provided */}
                                            <div>
                                                <label
                                                    htmlFor="servicesOffered"
                                                    className="text-lg text-mindfulBlack">
                                                    Services Provided
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    name="servicesOffered"
                                                    id="servicesOffered"
                                                    placeholder="eg. makeup, hair styling"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Years of Experience */}
                                            <div>
                                                <label
                                                    htmlFor="yearsOfExp"
                                                    className="text-lg text-mindfulBlack">
                                                    Years of Experience
                                                    <span className="text-main"> *</span>
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="number"
                                                    name="yearsOfExp"
                                                    id="yearsOfExp"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>


                                            {/* Languages Spoken */}
                                            <div>

                                                <label
                                                    htmlFor="establishedOn"
                                                    className="text-lg text-mindfulBlack">
                                                    Languages Spoken
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="establishedOn"
                                                    id="establishedOn"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Travel Capability */}
                                            <div>
                                                <label
                                                    htmlFor="travelCapability"
                                                    className="text-lg text-mindfulBlack">
                                                    Travel Capability
                                                </label>

                                                <p className="text-sm text-mindfulgrey pb-2">Do you travel to clients and up to what distance?</p>

                                                {/* Slider */}
                                                <div>
                                                    <div>
                                                        <Slider defaultValue={[33]} max={100} step={1} />
                                                    </div>

                                                    <div className="flex items-center justify-between pt-2">
                                                        <p className="text-lg text-mindfulBlack">0 Kms</p>
                                                        <p className="text-lg text-mindfulBlack">50 Kms</p>
                                                    </div>
                                                </div>

                                                {/* <textarea
                                                    rows={3}
                                                    name="travelCapability"
                                                    id="travelCapability"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea> */}
                                            </div>

                                            {/* File Upload Area */}
                                            <div>
                                                <label
                                                    htmlFor="upload-photo1"
                                                    className="text-lg text-mindfulBlack">
                                                    Certifications
                                                </label>

                                                <div className="flex items-center space-x-5">

                                                    <div>
                                                        <div className="w-64">

                                                            <label
                                                                htmlFor="upload-photo1"
                                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                            >
                                                                {/* File Upload Icon */}
                                                                {/* <div>
                                                                <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                            </div> */}
                                                                <span className="text-md text-mindfulBlack">
                                                                    {selectedFile1 ? selectedFile1.name : 'Upload files here'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo1"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 1)}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="upload-photo1"
                                                            className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        >
                                                            <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                            Upload Files
                                                        </label>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-mindfulgrey pt-2">
                                                        <span className="text-main">* </span>
                                                        Fields are mandatory
                                                    </p>
                                                </div>
                                            </div>

                                            {/* How many slots are you willing to take per month? */}
                                            <div>
                                                <label
                                                    htmlFor="slots"
                                                    className="text-lg text-mindfulBlack">
                                                    How many slots are you willing to take per month?
                                                </label>

                                                <InputField
                                                    label={''}
                                                    name="slots"
                                                    id="slots"
                                                    placeholder="eg. 20-30"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Are you willing to work at Sunday & Public holiday? */}
                                            <div>
                                                <label
                                                    htmlFor="publicHoliday"
                                                    className="text-lg text-mindfulBlack">
                                                    Are you willing to work at Sunday & Public holiday?
                                                </label>

                                                {/* <textarea
                                                    rows={3}
                                                    name="publicHoliday"
                                                    id="publicHoliday"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                ></textarea> */}
                                                <div className="flex items-center space-x-8">
                                                    <div>
                                                        <input type="radio" id="yes" name="radio" className="mr-1" />
                                                        <label htmlFor="yes" className="text-lg text-mindfulBlack">Yes</label>
                                                    </div>
                                                    <div>
                                                        <input type="radio" id="no" name="radio" className="mr-1" />
                                                        <label htmlFor="no" className="text-lg text-mindfulBlack">No</label>
                                                    </div>
                                                </div>
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
                                                <Link to="/BankAccInfoFreelanceForm">
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
