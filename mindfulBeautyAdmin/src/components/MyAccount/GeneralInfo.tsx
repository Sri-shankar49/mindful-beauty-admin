import { Button } from "@/common/Button";
import { InputField } from "@/common/InputField"
import { SelectField } from "@/common/SelectField";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

export const GeneralInfo = () => {

    // File states
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
        taxFile: null,
        gstFile: null,
        identityFile: null,
        addressFile: null,
    });


    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFiles((prev) => ({ ...prev, [fileKey]: file }));
        }
    };

    return (
        <div>


            <div>
                <div>
                    <form method="post">

                        {/* General Information */}
                        <div>
                            <div>
                                <h5 className="text-xl font-semibold py-5">General Information</h5>
                            </div>

                            <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">

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
                                        type="tel"
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
                                        placeholder="eg. makeup, hair styling"
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"

                                    ></textarea>
                                </div>

                                {/* Salon Facilities */}
                                <div>
                                    <label
                                        htmlFor="servicesOffered"
                                        className="text-lg text-mindfulBlack">
                                        Salon Facilities
                                    </label>

                                    <textarea
                                        rows={3}
                                        name="servicesOffered"
                                        id="servicesOffered"
                                        placeholder=""
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"

                                    ></textarea>
                                </div>

                                {/* Cancellation Policy */}
                                <div>
                                    <label
                                        htmlFor="cancellationPolicy"
                                        className="text-lg text-mindfulBlack">
                                        Cancellation Policy
                                    </label>

                                    <textarea
                                        rows={3}
                                        name="cancellationPolicy"
                                        id="cancellationPolicy"
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

                            </div>
                        </div>

                        {/* Bank Account Information */}
                        <div>
                            <div>
                                <h5 className="text-xl font-semibold py-5">Bank Account Information</h5>
                            </div>

                            <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">

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
                        </div>

                        {/* Tax Information / GST Number */}
                        <div>
                            <div>
                                <h5 className="text-xl font-semibold py-5">Tax Information / GST Number</h5>
                            </div>

                            <div className="grid grid-cols-2 gap-5 pb-10">
                                {/* Tax Identification Number */}
                                <div>
                                    <label
                                        htmlFor="taxIdentificationNumber"
                                        className="text-lg text-mindfulBlack">
                                        Tax Identification Number
                                    </label>
                                    <InputField
                                        label={''}
                                        // name="taxIdentificationNumber"
                                        id="taxIdentificationNumber"
                                        placeholder=""
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                </div>

                                {/* GST Number */}
                                <div>
                                    <label
                                        htmlFor="gstNumber"
                                        className="text-lg text-mindfulBlack">
                                        GST Number
                                    </label>
                                    <InputField
                                        label={''}
                                        // name="gstNumber"
                                        id="gstNumber"
                                        placeholder=""
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                </div>

                                {/* File Upload Area One */}
                                <div>
                                    <div className="flex items-center space-x-5">
                                        <div className="w-3/4">
                                            <label
                                                htmlFor="taxFile"
                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                            >
                                                {/* File Upload Icon */}
                                                {/* <div>
                                                                                                <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                                            </div> */}
                                                <span className="text-md text-mindfulBlack">
                                                    {selectedFiles["taxFile"]?.name || 'Upload tax file here'}
                                                </span>
                                            </label>

                                            <input
                                                id="taxFile"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, "taxFile")}
                                                className="hidden"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="taxFile"
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
                                                htmlFor="gstFile"
                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                            >
                                                {/* File Upload Icon */}
                                                {/* <div>
                                                                                                <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                                            </div> */}
                                                <span className="text-md text-mindfulBlack">
                                                    {selectedFiles["gstFile"]?.name || 'Upload GST file here'}
                                                </span>
                                            </label>

                                            <input
                                                id="gstFile"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, "gstFile")}
                                                className="hidden"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="gstFile"
                                                className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                            >
                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                Upload Files
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                {/* Type of ID */}
                                <div>
                                    <div className="py-2">
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
                                            // name="typeOfId"
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
                                    <div className="py-2">
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
                                            // name="proofOfAddress"
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
                                        // name="idNumber"
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
                                                htmlFor="addressFile"
                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                            >
                                                {/* File Upload Icon */}
                                                {/* <div>
                                                                                                    <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                                                </div> */}
                                                <span className="text-md text-mindfulBlack">
                                                    {selectedFiles["addressFile"]?.name || 'Upload a clear scan or photo of the document'}
                                                </span>
                                            </label>

                                            <input
                                                id="addressFile"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, "addressFile")}
                                                className="hidden"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="addressFile"
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
                                                htmlFor="identityFile"
                                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                            >
                                                {/* File Upload Icon */}
                                                {/* <div>
                                                        <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                    </div> */}
                                                <span className="text-md text-mindfulBlack">
                                                    {selectedFiles["identityFile"]?.name || 'Upload a clear scan or photo of the ID'}
                                                </span>
                                            </label>

                                            <input
                                                id="identityFile"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, "identityFile")}
                                                className="hidden"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="identityFile"
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

                        <div>
                            <Button
                                buttonType="submit"
                                // buttonTitle={loading ? `Submitting...` : `Submit`}
                                buttonTitle="Update"
                                className="bg-main text-md text-mindfulWhite  font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
