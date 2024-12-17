import React, { useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { generalInfo } from "@/api/apiConfig";


// Define Zod schema for validation
const generalInfoSchema = zod.object({
    ownersName: zod.string().min(1, "Owner's name is required"),
    salonName: zod.string().min(1, "Salon name is required"),
    contactNumber: zod.string().regex(/^[0-9]{10}$/, { message: "Contact number must be 10 digits" }),
    emailAddress: zod.string().email("Invalid email address"),
    salonLocation: zod.string().optional(),
    establishedOn: zod.string().optional(),
    salonAddress: zod.string().optional(),
    servicesOffered: zod.string().optional(),
    businessHours: zod.string().optional(),
    staffInformation: zod.string().optional(),
    salonFacilities: zod.string().optional(),
    cancellationPolicy: zod.string().optional(),
});

type GeneralInfoFormData = zod.infer<typeof generalInfoSchema>;

export const GeneralInfoForm: React.FC<GeneralInfoFormData> = () => {



    // Form data From the Register component
    const location = useLocation();
    const registartionFormData = location.state; // Access the passed data

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Getting the ProviderID from session storage
    const sessionProviderID = sessionStorage.getItem("providerID");
    console.log("Selected Provider ID from session storage", sessionProviderID);



    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<GeneralInfoFormData>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            ownersName: registartionFormData.name || '',
            salonName: registartionFormData.name || '',
            contactNumber: registartionFormData.phone || '',
            emailAddress: registartionFormData.email || '',
        },
    });


    const onSubmit = async (data: GeneralInfoFormData) => {
        setLoading(true);
        setError(null);

        console.log("General Info Form Submitted Data:", data);

        try {
            // Simulate API call
            const generalInfoData = await generalInfo(
                data.ownersName,
                data.salonName,
                parseInt(data.contactNumber),
                data.emailAddress,
                data.salonLocation || "", // Provide default value
                data.establishedOn || "", // Provide default value
                data.salonAddress || "", // Provide default value
                data.servicesOffered || "", // Provide default value
                data.businessHours || "", // Provide default value
                data.staffInformation || "", // Provide default value
                data.salonFacilities || "", // Provide default value
                data.cancellationPolicy || "" // Provide default value
            );
            console.log("General Info Data:", generalInfoData);

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
                                            <div
                                                className="bg-mindfulBlue text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center z-10 cursor-pointer"
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
                                            <div
                                                className="bg-mindfulAsh text-mindfulWhite w-[40px] h-[40px] rounded-full flex justify-center items-center"
                                            >
                                                3
                                            </div>
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
                                                    // name="ownersName"
                                                    id="ownersName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("ownersName")}
                                                />
                                                {errors.ownersName && (
                                                    <p className="text-sm text-red-600">{errors.ownersName.message}</p>
                                                )}
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
                                                    // name="salonName"
                                                    id="salonName"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("salonName")}
                                                />
                                                {errors.salonName && (
                                                    <p className="text-sm text-red-600">{errors.salonName.message}</p>
                                                )}
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
                                                    // name="contactNumber"
                                                    id="contactNumber"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("contactNumber")}
                                                />
                                                {errors.contactNumber && (
                                                    <p className="text-sm text-red-600">{errors.contactNumber.message}</p>
                                                )}
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
                                                {errors.emailAddress && (
                                                    <p className="text-sm text-red-600">{errors.emailAddress.message}</p>
                                                )}
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
                                                    // name="salonLocation"
                                                    id="salonLocation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("salonLocation")}

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
                                                    type="date"
                                                    // name="establishedOn"
                                                    id="establishedOn"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("establishedOn")}

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
                                                    // name="salonAddress"
                                                    id="salonAddress"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("salonAddress")}

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
                                                    // name="servicesOffered"
                                                    id="servicesOffered"
                                                    placeholder="eg. makeup, hair styling"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("servicesOffered")}

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
                                                    // name="businessHours"
                                                    id="businessHours"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("businessHours")}

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
                                                    // name="staffInformation"
                                                    id="staffInformation"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("staffInformation")}

                                                ></textarea>

                                                <div>
                                                    <p className="text-sm text-mindfulgrey pt-2">
                                                        <span className="text-main">* </span>
                                                        Fields are mandatory
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Salon Facilities */}
                                            <div>
                                                <label
                                                    htmlFor="salonFacilities"
                                                    className="text-lg text-mindfulBlack">
                                                    Salon Facilities
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    // name="salonFacilities"
                                                    id="salonFacilities"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("salonFacilities")}

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
                                                    // name="cancellationPolicy"
                                                    id="cancellationPolicy"
                                                    placeholder=""
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                                    {...register("cancellationPolicy")}

                                                ></textarea>
                                            </div>

                                        </div>


                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    onClick={() => {
                                                        // Reset form logic
                                                        location.reload();
                                                    }}
                                                    buttonType="button"
                                                    buttonTitle="Reset"
                                                    className="bg-mindfulWhite text-md text-mindfulBlack font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                                />

                                                {/* Submit Button */}
                                                {/* <Link to="/BankAccInfoForm"> */}
                                                <Button
                                                    buttonType="submit"
                                                    buttonTitle={loading ? "Submitting" : "Next"}
                                                    className="bg-main text-md text-mindfulWhite font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
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
