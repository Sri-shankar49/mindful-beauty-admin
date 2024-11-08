import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import ashtamudiLogo from "../../../assets/icons/ashtamudiLogo.png"
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField';
import { Button } from '@/common/Button';
import { FiUpload } from 'react-icons/fi';
import { MdCloudUpload } from "react-icons/md";

interface AddBranchPopupProps {
    closePopup: () => void;
}

export const AddBranchPopup: React.FC<AddBranchPopupProps> = ({ closePopup }) => {


    const [logo, setLogo] = useState<string | null>(ashtamudiLogo); // Initially set to the default logo

    // Handle file change event
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file); // Generate a preview URL for the uploaded file
            console.log(previewUrl, "previewUrl");

            setLogo(previewUrl); // Update the logo state with the preview URL
        }
    };


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">

                            {/* Close Button */}
                            <div
                                onClick={closePopup}
                                className="absolute top-5 right-5 w-fit cursor-pointer"
                            >
                                <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                            </div>

                            <div className="grid grid-cols-2 items-center">
                                <div>
                                    {/* <div className="w-fit mx-auto">
                                        <img src={ashtamudiLogo} alt="ashtamudi logo" />
                                    </div> */}

                                    {/* File Upload Area */}
                                    {/* <div>
                                        <div className="">
                                            <label
                                                htmlFor="upload-photo"
                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-5 cursor-pointer hover:border-mindfulGreyTypeThree"
                                            >
                                                File Upload Icon
                                                <div>
                                                    <FiUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                </div>
                                                <span className="text-md text-mindfulBlack">
                                                    {selectedFile ? selectedFile.name : 'Upload Virtual Try-on Photo'}
                                                </span>

                                                <div className="flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-2">
                                                    <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                    <button className="text-sm text-mindfulWhite uppercase">Upload Logo</button>
                                                </div>
                                            </label>
                                            <div>
                                                <input
                                                    id="upload-photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div>
                                        {/* Logo Display Area */}
                                        <div className="w-fit mx-auto pb-5">
                                            <img src={logo} alt="Uploaded logo" className="w-full h-24 object-cover" />
                                        </div>

                                        {/* File Upload Area */}
                                        <div>
                                            <div className="">
                                                <label
                                                    htmlFor="upload-photo"
                                                    // className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-5 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                    className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-2 cursor-pointer"
                                                >
                                                    {/* Upload Button */}
                                                    {/* <div className="flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-2">
                                                        <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                        <button className="text-sm text-mindfulWhite uppercase">Upload Logo</button>
                                                    </div> */}
                                                    <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                    Upload Logo
                                                </label>
                                                <input
                                                    id="upload-photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div>
                                    <div className="relative mb-16">
                                        <h2 className="text-2xl text-mindfulBlack font-semibold">
                                            Add Branch
                                        </h2>

                                        <div
                                            className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5"
                                        >
                                        </div>
                                    </div>

                                    {/* Add Branch Form */}
                                    <form action="" method="post">
                                        <div className="space-y-5">
                                            {/* Branch Name */}
                                            <div>
                                                <label
                                                    htmlFor="branchName"
                                                    className="text-lg text-mindfulBlack font-semibold">
                                                    Branch Name
                                                </label>

                                                <InputField
                                                    label=""
                                                    name="branchName"
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Branch Phone Number */}
                                            <div>
                                                <label
                                                    htmlFor="branchPhoneNumber"
                                                    className="text-lg text-mindfulBlack font-semibold">
                                                    Branch Phone Number
                                                </label>

                                                <InputField
                                                    label=""
                                                    name="branchPhoneNumber"
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Branch Manager Name */}
                                            <div>
                                                <label
                                                    htmlFor="branchManagerNumber"
                                                    className="text-lg text-mindfulBlack font-semibold">
                                                    Branch Manager Number
                                                </label>

                                                <SelectField
                                                    label=""
                                                    name="branch"
                                                    // required
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                    options={[
                                                        { value: "branch1", label: "Branch 1" },
                                                        { value: "branch2", label: "Branch 2" },
                                                        { value: "branch3", label: "Branch 3" },
                                                    ]}
                                                // error="This field is required."
                                                />
                                            </div>

                                            {/* Branch Address */}
                                            <div>
                                                <label
                                                    htmlFor="branchAddress"
                                                    className="text-lg text-mindfulBlack font-semibold">
                                                    Branch Address
                                                </label>

                                                <textarea
                                                    name="branchAddress"
                                                    id="branchAddress"
                                                    rows={4}
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                >
                                                </textarea>
                                            </div>

                                            {/* Branch Location */}
                                            <div>
                                                <label
                                                    htmlFor="branchLocation"
                                                    className="text-lg text-mindfulBlack font-semibold">
                                                    Branch Location
                                                </label>

                                                <InputField
                                                    label=""
                                                    name="branchLocation"
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* Buttons */}
                                            <div>
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
                                                        buttonTitle="Submit"
                                                        className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                                    />
                                                </div>
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
