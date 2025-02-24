import React, { useEffect, useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { MdCloudUpload } from "react-icons/md";
import { SelectField } from "@/common/SelectField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { taxInfo } from "@/api/apiConfig";

interface TaxInfoResponse {
    data: {
        tax_identification_number: string;
        gst_number: string;
    };
}

// Define Zod schema for validation
const taxInfoSchema = zod.object({
    taxIdentificationNumber: zod.string().min(3, "Tax Identification Number is required"),
    gstNumber: zod.string().regex(/^[0-9]{15}$/, { message: "GST Number must be 15 digits" }),
    proofOfIdentityType: zod.string().optional(),
    proofOfIdentityNumber: zod.string().min(3, "ID Number must be 3 digits"),
    proofOfAddressType: zod.string().optional(),
});

type TaxInfoFormData = zod.infer<typeof taxInfoSchema>;

export const TaxInfoForm: React.FC<TaxInfoFormData> = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    // const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    // const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
    // const [selectedFile4, setSelectedFile4] = useState<File | null>(null);

    // // File change handler
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileNumber: number) => {
    //     const file = event.target.files?.[0];         // Optional chaining to check if files exist
    //     if (file) {
    //         if (fileNumber === 1) {
    //             setSelectedFile1(file);
    //         }
    //         else if (fileNumber === 2) {
    //             setSelectedFile2(file);
    //         }
    //         else if (fileNumber === 3) {
    //             setSelectedFile3(file);
    //         }
    //         else if (fileNumber === 4) {
    //             setSelectedFile4(file);
    //         }
    //     }
    // };


    // File states
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
        tax_file: null,
        gst_file: null,
        identity_file: null,
        address_file: null,
    });


    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFiles((prev) => ({ ...prev, [fileKey]: file }));
        }
    };


    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<TaxInfoFormData>({
        resolver: zodResolver(taxInfoSchema),
        defaultValues: {
            // ownersName: registartionFormData.name || '',
            // salonName: registartionFormData.name || '',
            // contactNumber: registartionFormData.phone || '',
            // emailAddress: registartionFormData.email || '',
            taxIdentificationNumber: sessionStorage.getItem("taxIdNumber") || '',
            gstNumber: sessionStorage.getItem("gstNumber") || '',
        },
    });

    // const onSubmit = async (data: TaxInfoFormData) => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const sessionProviderID = sessionStorage.getItem("providerID");
    //         if (!sessionProviderID) {
    //             throw new Error("Provider ID is missing from session storage.");
    //         }

    //         // Prepare form data
    //         const formData = new FormData();
    //         formData.append("taxIdentificationNumber", data.taxIdentificationNumber);
    //         formData.append("gstNumber", data.gstNumber);

    //         // Append optional fields if they exist
    //         if (data.proofOfIdentityType) formData.append("proofOfIdentityType", data.proofOfIdentityType);
    //         if (data.proofOfIdentityNumber) formData.append("proofOfIdentityNumber", data.proofOfIdentityNumber);
    //         if (data.proofOfAddressType) formData.append("proofOfAddressType", data.proofOfAddressType);

    //         // Append files
    //         Object.keys(selectedFiles).forEach((key) => {
    //             const file = selectedFiles[key];
    //             if (file) {
    //                 formData.append(key, file);
    //             }
    //         });

    //         const response = await taxInfo(``, {
    //             method: "POST",
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to register tax information.");
    //         }

    //         console.log("Tax Info Submission Success:", await response.json());

    //         // Navigate to the next step
    //         navigate("/Dashboard/ProfileProgress");
    //     } catch (error: any) {
    //         setError(error.message || "Something went wrong");
    //     } finally {
    //         setLoading(false);
    //     }
    // };




    const onSubmit = async (data: TaxInfoFormData) => {

        setLoading(true);
        setError(null);

        console.log("Tax Info Form Submitted Data :", data);

        try {
            // Getting the ProviderID from session storage
            const sessionProviderID = sessionStorage.getItem("providerID");
            if (!sessionProviderID) {
                throw new Error("Provider ID is missing from session storage.");
            }

            // Prepare form data
            const formData = new FormData();

            // Append required fields
            formData.append("provider", sessionProviderID);
            formData.append("tax_identification_number", data.taxIdentificationNumber);
            formData.append("gst_number", data.gstNumber);

            // Append optional fields if they have values
            if (data.proofOfIdentityType) {
                formData.append("proof_of_identity_type", data.proofOfIdentityType)
            };
            if (data.proofOfIdentityNumber) {
                formData.append("proof_of_identity_number", data.proofOfIdentityNumber)
            };
            if (data.proofOfAddressType) {
                formData.append("proof_of_address_type", data.proofOfAddressType)
            };

            // Append selected files
            Object.keys(selectedFiles).forEach((key) => {
                const file = selectedFiles[key];
                if (file) {
                    formData.append(key, file);
                }
            });

            // Debugging: Log the FormData contents
            console.log("FormData Contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Call the taxInfo function
            const taxInfoData = await taxInfo(formData) as TaxInfoResponse;

            console.log("Tax Info Submission Success:", taxInfoData);

            sessionStorage.setItem("taxIdNumber", taxInfoData.data.tax_identification_number);
            sessionStorage.setItem("gstNumber", taxInfoData.data.gst_number);


            // Navigate to the next step
            // navigate("/Dashboard/ProfileProgress");
            navigate("/Thankyou");
        }

        catch (error: any) {
            console.log("Tax Info Form Error:", error);
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    // Add a new useEffect to handle error message timeout
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Update the ErrorMessage component to include a transition
    const ErrorMessage = () => error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 transition-opacity duration-500 ease-in-out">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        </div>
    );

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
                                                <div className="w-full h-[2px] bg-mindfulgrey rounded-lg z-[-10]"></div>
                                            </div>

                                            {/* One Icon */}
                                            <Link to="/GeneralInfoForm">
                                                <div
                                                    className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
                                                >
                                                    1
                                                </div>
                                            </Link>

                                            {/* Two Icon */}
                                            <Link to="/BankAccInfoForm">
                                                <div
                                                    className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                                >
                                                    2
                                                </div>
                                            </Link>

                                            {/* Three Icon */}
                                            {/* <Link to="/TaxInfoForm"> */}
                                            <div
                                                className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                            >
                                                3
                                            </div>

                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Heading */}
                                <div className="text-center py-2">
                                    <h5 className="text-lg text-mindfulBlack font-semibold">Tax Information / GST Number</h5>
                                </div>

                                <div>
                                    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-2 gap-5">

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
                                                    {...register("taxIdentificationNumber")}
                                                />
                                                {errors.taxIdentificationNumber && <p className="text-sm text-red-600">{errors.taxIdentificationNumber.message}</p>}
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
                                                    {...register("gstNumber")}
                                                />
                                                {errors.gstNumber && <p className="text-sm text-red-600">{errors.gstNumber.message}</p>}
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
                                                                {selectedFiles["tax_file"]?.name || 'Upload tax file here'}
                                                            </span>
                                                        </label>

                                                        <input
                                                            id="taxFile"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, "tax_file")}
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
                                                                {selectedFiles["gst_file"]?.name || 'Upload GST file here'}
                                                            </span>
                                                        </label>

                                                        <input
                                                            id="gstFile"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, "gst_file")}
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

                                        </div>


                                        {/* Sub Heading */}
                                        <div className="text-center">
                                            <h5 className="text-lg text-mindfulBlack font-semibold py-5">KYC Documents</h5>
                                        </div>

                                        <div>
                                            <div className="grid grid-cols-2 gap-5">

                                                {/* Type of ID */}
                                                <div>
                                                    <div className="text-center py-2">
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
                                                            {...register("proofOfIdentityType")}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Proof of Address */}
                                                <div>
                                                    <div className="text-center py-2">
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
                                                            {...register("proofOfAddressType")}
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
                                                        {...register("proofOfIdentityNumber")}
                                                    />
                                                    {errors.proofOfIdentityNumber && <p className="text-sm text-red-600">{errors.proofOfIdentityNumber.message}</p>}

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
                                                                    {selectedFiles["address_file"]?.name || 'Upload a clear scan or photo of the document'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="addressFile"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, "address_file")}
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
                                                                    {selectedFiles["identity_file"]?.name || 'Upload a clear scan or photo of the ID'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="identityFile"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, "identity_file")}
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


                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Reset Button */}
                                                <ErrorMessage />
                                                <Button
                                                    onClick={() => location.reload()}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Back Button */}
                                                {/* <Link to="/BankAccInfoForm"> */}
                                                <Button
                                                    onClick={() => navigate('/BankAccInfoForm')}
                                                    buttonType="button"
                                                    buttonTitle="Back"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack border-[1px] border-mindfulBlack font-semibold rounded-sm px-8 py-2 focus-within:outline-none"
                                                />
                                                {/* </Link> */}

                                                {/* Submit Button */}
                                                {/* <Link to="/Dashboard/ProfileProgress"> */}
                                                <Button
                                                    buttonType="submit"
                                                    buttonTitle={loading ? `Submitting...` : `Submit`}
                                                    className="bg-main text-md text-mindfulWhite  font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />
                                                {/* </Link> */}

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