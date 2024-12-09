import React from 'react'
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField';
import { IoCloseCircle } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';
import { PiCamera } from "react-icons/pi";

interface EditStaffPopupProps {
    closePopup: () => void;
}

export const EditStaffPopup: React.FC<EditStaffPopupProps> = ({ closePopup }) => {
    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Staff</h2>
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

                            <div className="">
                                <form action="" method="post">
                                    <div className="">

                                        {/* Add Staff Form */}
                                        <div className="space-y-5">

                                            {/* City */}
                                            <div className="">
                                                <label
                                                    htmlFor="name"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Name
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Role */}
                                            <div>
                                                <label
                                                    htmlFor="role"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Role
                                                </label>

                                                <SelectField
                                                    label={''}
                                                    name="role"
                                                    id="role"
                                                    options={[
                                                        { value: "kochi", label: "Kochi" },
                                                        { value: "trivandrum", label: "Trivandrum" },
                                                        { value: "kollam", label: "Kollam" },
                                                        { value: "thrissur", label: "Thrissur" },
                                                    ]}
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Branch */}
                                            <div>
                                                <label
                                                    htmlFor="branch"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Branch
                                                </label>

                                                <SelectField
                                                    label={''}
                                                    name="branch"
                                                    id="branch"
                                                    options={[
                                                        { value: "kochi", label: "Kochi" },
                                                        { value: "trivandrum", label: "Trivandrum" },
                                                        { value: "kollam", label: "Kollam" },
                                                        { value: "thrissur", label: "Thrissur" },
                                                    ]}
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Upload Photo */}
                                            <div className="flex items-end justify-between">

                                                <div>

                                                    <label
                                                        htmlFor="uploadPhoto"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Upload Photo
                                                    </label>

                                                    <div className="relative">
                                                        <InputField
                                                            label={''}
                                                            placeholder="Take a Photo"
                                                            className="w-40 rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        />
                                                        <PiCamera className="text-[22px] text-mindfulBlack absolute top-2 right-2 cursor-pointer" />
                                                    </div>
                                                </div>

                                                <div>
                                                    {/* File Upload Area */}
                                                    <div>
                                                        <div className="">
                                                            <label
                                                                htmlFor="upload-photo"
                                                                className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                            >

                                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                                Upload Files
                                                            </label>
                                                            <input
                                                                id="upload-photo"
                                                                type="file"
                                                                accept="image/*"
                                                                // onChange={handleFileChange}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>


                                    {/* Buttons */}
                                    <div className="pt-10">
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
                                                buttonTitle="Update"
                                                className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
