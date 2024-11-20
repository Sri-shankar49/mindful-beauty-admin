import { useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { Link } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { MdCloudUpload } from "react-icons/md";
import { SelectField } from "@/common/SelectField";

export const TaxInfoFreelanceForm = () => {

    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
    const [selectedFile4, setSelectedFile4] = useState<File | null>(null);

    // File change handler
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileNumber: number) => {
        const file = event.target.files?.[0];         // Optional chaining to check if files exist
        if (file) {
            if (fileNumber === 1) {
                setSelectedFile1(file);
            }
            else if (fileNumber === 2) {
                setSelectedFile2(file);
            }
            else if (fileNumber === 3) {
                setSelectedFile3(file);
            }
            else if (fileNumber === 4) {
                setSelectedFile4(file);
            }
        }
    };
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
                                                <div className="w-full h-[2px] bg-mindfulgrey rounded-lg z-[-10]"></div>
                                            </div>

                                            {/* One Icon */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
                                            >
                                                1
                                            </div>

                                            {/* Two Icon */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                            >
                                                2
                                            </div>

                                            {/* Three Icon */}
                                            <Link to="/TaxInfoForm">
                                                <div
                                                    className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                                >
                                                    3
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Heading */}
                                <div className="text-center py-2">
                                    <h5 className="text-lg text-mindfulBlack font-semibold">Tax Information / GST Number</h5>
                                </div>

                                <div>
                                    <form action="" method="post">
                                        <div className="grid grid-cols-2 gap-5">

                                            {/* Tax Identification Number */}
                                            <div>
                                                <label
                                                    htmlFor="accHolderName"
                                                    className="text-lg text-mindfulBlack">
                                                    Tax Identification Number
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="accHolderName"
                                                    id="accHolderName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* GST Number */}
                                            <div>
                                                <label
                                                    htmlFor="accHolderName"
                                                    className="text-lg text-mindfulBlack">
                                                    GST Number
                                                </label>
                                                <InputField
                                                    label={''}
                                                    name="accHolderName"
                                                    id="accHolderName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                />
                                            </div>

                                            {/* File Upload Area One */}
                                            <div>
                                                <div className="flex items-center space-x-5">
                                                    <div className="w-3/4">
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
                                            </div>

                                            {/* File Upload Area Two */}
                                            <div>
                                                <div className="flex items-center space-x-5">
                                                    <div className="w-3/4">
                                                        <label
                                                            htmlFor="upload-photo2"
                                                            className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                        >
                                                            {/* File Upload Icon */}
                                                            {/* <div>
                                                                <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                            </div> */}
                                                            <span className="text-md text-mindfulBlack">
                                                                {selectedFile2 ? selectedFile2.name : 'Upload files here'}
                                                            </span>
                                                        </label>

                                                        <input
                                                            id="upload-photo2"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, 2)}
                                                            className="hidden"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="upload-photo2"
                                                            className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                        >
                                                            <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                            Upload Files
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        {/* Sub Heading */}
                                        <div className="text-center">
                                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">KYC Documents</h5>
                                        </div>

                                        <div>
                                            <div className="grid grid-cols-2 gap-5">

                                                {/* Type of ID */}
                                                <div>
                                                    <div className="text-start py-2">
                                                        <h5 className="text-lg text-mindfulBlack font-semibold py-2">
                                                            Proof of Identity
                                                        </h5>
                                                    </div>

                                                    {/*  Type of ID */}
                                                    <div>
                                                        <label
                                                            htmlFor="typeOfId"
                                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                                        >
                                                            Type of ID
                                                        </label>
                                                        <SelectField
                                                            label={''}
                                                            name="typeOfId"
                                                            id="typeOfId"
                                                            options={[
                                                                { value: "id1", label: "ID 1" },
                                                                { value: "id2", label: "ID 2" },
                                                                { value: "id3", label: "ID 3" },
                                                                { value: "id4", label: "ID 4" },
                                                            ]}
                                                            className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Proof of Address */}
                                                <div>
                                                    <div className="text-start py-2">
                                                        <h5 className="text-lg text-mindfulBlack font-semibold py-2">
                                                            Proof of Address
                                                        </h5>
                                                    </div>

                                                    {/*  Proof of Address */}
                                                    <div>
                                                        <label
                                                            htmlFor="proofOfAddress"
                                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                                        >
                                                            Type of Document
                                                        </label>
                                                        <SelectField
                                                            label={''}
                                                            name="proofOfAddress"
                                                            id="proofOfAddress"
                                                            options={[
                                                                { value: "doctype1", label: "Document type 1" },
                                                                { value: "doctype2", label: "Document type 2" },
                                                                { value: "doctype3", label: "Document type 3" },
                                                                { value: "doctype4", label: "Document type 4" },
                                                            ]}
                                                            className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* ID Number */}
                                                <div>
                                                    <label
                                                        htmlFor="idNumber"
                                                        className="text-lg text-mindfulBlack">
                                                        ID Number
                                                    </label>
                                                    <InputField
                                                        label={''}
                                                        name="idNumber"
                                                        id="idNumber"
                                                        placeholder=""
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    />
                                                </div>

                                                {/* File Upload Area Three */}
                                                <div>
                                                    <label
                                                        htmlFor="idNumber"
                                                        className="text-lg text-mindfulBlack">
                                                        Upload a clear scan ot photo of the document
                                                    </label>
                                                    <div className="flex items-center space-x-5">
                                                        <div className="w-3/4">
                                                            <label
                                                                htmlFor="upload-photo3"
                                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                            >
                                                                {/* File Upload Icon */}
                                                                {/* <div>
                                                                    <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                </div> */}
                                                                <span className="text-md text-mindfulBlack">
                                                                    {selectedFile3 ? selectedFile3.name : 'Upload a clear scan ot photo of the document'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo3"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 3)}
                                                                className="hidden"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="upload-photo3"
                                                                className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                            >
                                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                                Upload Files
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* File Upload Area Four */}
                                                <div>
                                                    <div className="flex items-center space-x-5">
                                                        <div className="w-3/4">
                                                            <label
                                                                htmlFor="upload-photo4"
                                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                            >
                                                                {/* File Upload Icon */}
                                                                {/* <div>
                                                                    <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                </div> */}
                                                                <span className="text-md text-mindfulBlack">
                                                                    {selectedFile4 ? selectedFile4.name : 'Upload a clear scan ot photo of the ID'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo4"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 4)}
                                                                className="hidden"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="upload-photo4"
                                                                className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                            >
                                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                                Upload Files
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Reset Button */}
                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Back Button */}
                                                <Link to="/BankAccInfoFreelanceForm">
                                                    <Button
                                                        buttonType="button"
                                                        buttonTitle="Back"
                                                        className="bg-mindfulWhite text-md text-mindfulBlack border-[1px] border-mindfulBlack font-semibold rounded-sm px-8 py-2 focus-within:outline-none"
                                                    />
                                                </Link>

                                                {/* Submit Button */}
                                                <Link to="/Dashboard/ProfileProgress">
                                                    <Button
                                                        buttonType="submit"
                                                        buttonTitle="Submit"
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
