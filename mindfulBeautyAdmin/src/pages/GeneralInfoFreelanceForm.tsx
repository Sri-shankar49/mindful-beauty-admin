import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import salonChair from "../assets/icons/salonChair.svg";
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { Slider } from "@/components/ui/slider"
import { MdCloudUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { generalInfoFreelance } from "@/api/apiConfig";


// Define Zod schema for validation
const generalInfoFreelanceSchema = zod.object({
    fullName: zod.string().min(3, "Full name is required"),
    emailAddress: zod.string().email("Invalid email address"),
    contactNumber: zod.string().regex(/^[0-9]{10}$/, { message: "Contact number must be 10 digits" }),
    location: zod.string().optional(),
    homeAddress: zod.string().optional(),
    servicesProvided: zod.string().optional(),
    yearsOfExperience: zod.string().optional(),
    languagesSpoken: zod.string().optional(),
    travelCapability: zod.string().optional(),
    certifications: zod.string().optional(),
    slots: zod.string().optional(),
    willingToWork: zod.string().optional(),
});

type GeneralInfoFreelanceFormData = zod.infer<typeof generalInfoFreelanceSchema>;



export const GeneralInfoFreelanceForm: React.FC<GeneralInfoFreelanceFormData> = () => {

    // Form data From the Register component
    const location = useLocation();
    const registartionFormData = location.state; // Access the passed data

    const [willingToWork, setWillingToWork] = useState<number>(1);

    const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({ certificationsFile: null });

    // File change handler
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];         // Optional chaining to check if files exist
        if (file) {
            setSelectedFile((prev => ({ ...prev, [fileKey]: file })))
        }
    }

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<GeneralInfoFreelanceFormData>({
        resolver: zodResolver(generalInfoFreelanceSchema),
        defaultValues: {
            fullName: registartionFormData.name || '',
            emailAddress: registartionFormData.email || '',
            contactNumber: registartionFormData.phone || '',
        },
    });




    const onSubmit = async (data: GeneralInfoFreelanceFormData) => {
        setLoading(true);
        setError(null);

        console.log("General Info Freelance Form Submitted Data:", data);

        try {

            // Getting the ProviderID from session storage
            const sessionProviderID = sessionStorage.getItem("providerID");
            if (!sessionProviderID) {
                throw new Error("Provider ID is missing from session storage.");
            }

            // Prepare form data
            const formData = new FormData();

            // Append mandatory fields
            formData.append("provider", sessionProviderID);
            formData.append("owner_name", data.fullName || "");
            formData.append("email", data.emailAddress || "");
            formData.append("phone", data.contactNumber || "");
            formData.append("freelancer_location", data.location || "");
            formData.append("home_address", data.homeAddress || "");
            formData.append("services_offered", data.servicesProvided || "");
            formData.append("years_of_experience", data.yearsOfExperience || "");
            formData.append("languages_spoken", data.languagesSpoken || "");
            formData.append("travel_capability_kms", data.travelCapability || "");
            // formData.append("certifications", data.certifications || "");
            formData.append("available_slots", data.slots || "");
            formData.append("willing_to_work_holidays", willingToWork.toString());

            // Append optional fields if they exist
            // if (data.certifications) {
            //     formData.append("certifications", data.certifications);
            // }

            // Append selected files
            Object.keys(selectedFile).forEach((key) => {
                const file = selectedFile[key];
                if (file) {
                    formData.append(key, file);
                }
            });

            // Debugging: Log the FormData contents
            console.log("FormData Contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Prepare form data
            const generalInfoFreelanceData = await generalInfoFreelance(formData);

            console.log("General Info Freelance Data:", generalInfoFreelanceData);

            // Navigate to the next step
            navigate("/BankAccInfoForm");
        }

        catch (error: any) {
            setError(error.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }

    }


    // if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


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
                                            {/* <Link to="/Login"> */}
                                            <div
                                                className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
                                            >
                                                1
                                            </div>
                                            {/* </Link> */}

                                            {/* Two Icon */}
                                            {/* <Link to="/DateTime"> */}
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full z-10 flex justify-center items-center"
                                            >
                                                2
                                            </div>
                                            {/* </Link> */}

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
                                    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-3 gap-5">

                                            {/* Full Name */}
                                            <div>
                                                <label
                                                    htmlFor="fullName"
                                                    className="text-lg text-mindfulBlack">
                                                    Full Name
                                                    <span className="text-main"> *</span>
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="fullName"
                                                    id="fullName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("fullName")}
                                                />

                                                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
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
                                                    // name="emailAddress"
                                                    id="emailAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("emailAddress")}
                                                />

                                                {errors.emailAddress && <p className="text-sm text-red-600">{errors.emailAddress.message}</p>}

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
                                                    // name="contactNumber"
                                                    id="contactNumber"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("contactNumber")}
                                                />

                                                {errors.contactNumber && <p className="text-sm text-red-600">{errors.contactNumber.message}</p>}
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <label
                                                    htmlFor="location"
                                                    className="text-lg text-mindfulBlack">
                                                    Location
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="location"
                                                    id="location"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("location")}
                                                />

                                            </div>

                                            {/* Home Address */}
                                            <div>
                                                <label
                                                    htmlFor="homeAddress"
                                                    className="text-lg text-mindfulBlack">
                                                    Home Address
                                                </label>
                                                {/* <InputField
                                                    label={''}
                                                    name="homeAddress"
                                                    id="homeAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                /> */}
                                                <textarea
                                                    rows={3}
                                                    // name="homeAddress"
                                                    id="homeAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("homeAddress")}

                                                ></textarea>
                                            </div>

                                            {/* Services Provided */}
                                            <div>
                                                <label
                                                    htmlFor="servicesProvided"
                                                    className="text-lg text-mindfulBlack">
                                                    Services Provided
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    // name="servicesProvided"
                                                    id="servicesProvided"
                                                    placeholder="eg. makeup, hair styling"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("servicesProvided")}

                                                ></textarea>
                                            </div>

                                            {/* Years of Experience */}
                                            <div>
                                                <label
                                                    htmlFor="yearsOfExperience"
                                                    className="text-lg text-mindfulBlack">
                                                    Years of Experience
                                                    <span className="text-main"> *</span>
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="number"
                                                    // name="yearsOfExperience"
                                                    id="yearsOfExperience"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("yearsOfExperience")}
                                                />
                                            </div>


                                            {/* Languages Spoken */}
                                            <div>

                                                <label
                                                    htmlFor="languagesSpoken"
                                                    className="text-lg text-mindfulBlack">
                                                    Languages Spoken
                                                </label>
                                                <InputField
                                                    label={''}
                                                    // name="languagesSpoken"
                                                    id="languagesSpoken"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("languagesSpoken")}
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
                                                                    {selectedFile["certificationsFile"]?.name || 'Upload certification files here'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo1"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, "certificationsFile")}
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
                                                    // name="slots"
                                                    id="slots"
                                                    placeholder="eg. 20-30"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("slots")}

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
                                                        <input
                                                            type="radio"
                                                            id="yes"
                                                            name="radio"
                                                            className="mr-1"
                                                            defaultChecked
                                                            onChange={() => setWillingToWork(1)}
                                                        />
                                                        <label
                                                            htmlFor="yes"
                                                            className="text-lg text-mindfulBlack"
                                                            onClick={() => setWillingToWork(1)}
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="no"
                                                            name="radio"
                                                            className="mr-1"
                                                            onChange={() => setWillingToWork(0)}
                                                        />
                                                        <label
                                                            htmlFor="no"
                                                            className="text-lg text-mindfulBlack"
                                                            onClick={() => setWillingToWork(0)}
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    onClick={() => location.reload()}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Submit Button */}
                                                {/* <Link to="/BankAccInfoFreelanceForm"> */}
                                                <Button
                                                    buttonType="submit"
                                                    buttonTitle={loading ? "Submitting..." : "Next"}
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
