import React, { useEffect, useState } from "react";
import salonChair from "../assets/icons/salonChair.svg";
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { generalInfo, googleMapApi } from "@/api/apiConfig";
import { MdCloudUpload } from "react-icons/md";


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
    providerImage: zod.preprocess((val) => {
        if (typeof val === "string" && val.trim() === "") return undefined;
        return val;
    },
        zod.union([
            zod.instanceof(File, { message: "Provider image is required" }),
            zod.string().url({ message: "Provider image is required" })
        ])
    )
});

type GeneralInfoFormData = zod.infer<typeof generalInfoSchema>;

export const GeneralInfoForm: React.FC<GeneralInfoFormData> = () => {



    // Form data From the Register component
    // const location = useLocation();
    // const registartionFormData = location.state; // Access the passed data

    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Getting the ProviderID from session storage
    const sessionProviderID = sessionStorage.getItem("providerID");
    console.log("Selected Provider ID from session storage", sessionProviderID);



    const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({ image_url: null });

    const [imageName, setImageName] = useState<string | null>(null);


    // File change handler
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
    //     const file = event.target.files?.[0];         // Optional chaining to check if files exist
    //     if (file) {
    //         setSelectedFile((prev => ({ ...prev, [fileKey]: file })))
    //     }
    // }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0]; // Check if a file exists
        if (file) {
            // Update state with the selected file
            setSelectedFile((prev) => ({ ...prev, [fileKey]: file }));
            sessionStorage.setItem("providerImage", file.name);

            // Convert the file to a Base64 string and store it in sessionStorage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                if (typeof base64data === "string") {
                    sessionStorage.setItem("providerImageBase64", base64data);
                }
            };
            reader.readAsDataURL(file);

            // Update form value and clear any existing errors
            setImageName(file.name);
            setValue("providerImage", file);
            clearErrors("providerImage");
        }
    };

    useEffect(() => {
        const storedImageName = sessionStorage.getItem("providerImage");
        const storedImageBase64 = sessionStorage.getItem("providerImageBase64");

        if (storedImageName && storedImageBase64) {
            setImageName(storedImageName);
            // Convert the Base64 string back into a File object
            fetch(storedImageBase64)
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File([blob], storedImageName, { type: blob.type });
                    setSelectedFile({ image_url: file });
                    setValue("providerImage", file);
                })
                .catch((error) => {
                    console.error("Error converting Base64 to File:", error);
                });
        }
    }, []);


    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<GeneralInfoFormData>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            // ownersName: registartionFormData.name || '',
            // salonName: registartionFormData.name || '',
            // contactNumber: registartionFormData.phone || '',
            // emailAddress: registartionFormData.email || '',
            ownersName: sessionStorage.getItem("providerName") || '',
            salonName: sessionStorage.getItem("providerName") || '',
            contactNumber: sessionStorage.getItem("phoneNumber") || '',
            emailAddress: sessionStorage.getItem("providerEmail") || '',
            salonLocation: sessionStorage.getItem("providerLocation") || '',
        },
    });



    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>();

    const [locationCoordinates, setLocationCoordinates] = useState<{ lat: number | null; lng: number | null; }>({ lat: null, lng: null });

    console.log(locationCoordinates, "Just logging the co-ordinates");

    // Load Google Maps API
    useEffect(() => {

        googleMapApi(() => {
            console.log("Google Maps API loaded");
        });
    }, []);

    // Function to handle location input and get suggestions
    const handleLocationInput = (input: string) => {
        if (input.length > 1) {
            // Trigger after 3 characters
            const autocomplete = new window.google.maps.places.AutocompleteService();
            autocomplete.getPlacePredictions({ input }, (predictions, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    predictions
                ) {
                    setLocationSuggestions(
                        predictions.map((prediction) => prediction.description)
                    );
                } else {
                    setLocationSuggestions([]);
                }
            });
        } else {
            setLocationSuggestions([]);
        }
    };

    // Handle input changes in location field
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        console.log("inputvalue", inputValue);
        setSelectedLocation(inputValue); // Update the input value
        handleLocationInput(inputValue); // Fetch location suggestions
    };

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
        setLocationSuggestions([]); // Clear suggestions after selection

        // Use Google Maps Geocoding API to get the latitude and longitude
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results?.[0]) {
                const { lat, lng } = results[0].geometry.location;
                const fullAddress = results[0].formatted_address; // Full address

                // Store latitude and longitude in state (you can use these values for submission)
                setLocationCoordinates({
                    lat: lat(),
                    lng: lng(),
                });

                // Optionally, store the full address in a separate state if needed
                setSelectedLocation(fullAddress);       // Store the full address instead of the description
                setValue("salonLocation", fullAddress); // ✅ Update form field value
                console.log("Latitude:", lat(), "Longitude:", lng());
            } else {
                console.error("Geocoding failed:", status);
            }
        });
    };

    // const onSubmit = async (data: GeneralInfoFormData) => {
    //     setLoading(true);
    //     setError(null);

    //     console.log("General Info Form Submitted Data:", data);

    //     try {
    //         // Simulate API call
    //         const generalInfoData = await generalInfo(
    //             data.ownersName,
    //             data.salonName,
    //             parseInt(data.contactNumber),
    //             data.emailAddress,
    //             data.salonLocation || "", // Provide default value
    //             data.establishedOn || "", // Provide default value
    //             data.salonAddress || "", // Provide default value
    //             data.servicesOffered || "", // Provide default value
    //             data.businessHours || "", // Provide default value
    //             data.staffInformation || "", // Provide default value
    //             data.salonFacilities || "", // Provide default value
    //             data.cancellationPolicy || "" // Provide default value
    //         );
    //         console.log("General Info Data:", generalInfoData);

    //         // Navigate to the next step
    //         navigate("/BankAccInfoForm");
    //     }

    //     catch (error: any) {
    //         setError(error.message || "Something went wrong");
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    const onSubmit = async (data: GeneralInfoFormData) => {
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
            formData.append("owner_name", data.ownersName || "");
            formData.append("salon_name", data.salonName || "");
            formData.append("email", data.emailAddress || "");
            formData.append("phone", data.contactNumber || "");
            formData.append("saloon_location", data.salonLocation || "");
            formData.append("established_on", data.establishedOn || "");
            formData.append("saloon_address", data.salonAddress || "");
            formData.append("services_offered", data.servicesOffered || "");
            formData.append("working_hours", data.businessHours || "");
            formData.append("staff_information", data.staffInformation || "");
            // formData.append("certifications", data.certifications || "");
            formData.append("salon_facilities", data.salonFacilities || "");
            formData.append("cancellation_policy", data.cancellationPolicy || "");

            // Append latitude and longitude if available
            if (locationCoordinates.lat !== null && locationCoordinates.lng !== null) {
                formData.append('latitude', locationCoordinates.lat.toString());
                formData.append('longitude', locationCoordinates.lng.toString());
            }

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
            const generalInfoFreelanceData = await generalInfo(formData);

            console.log("General Info Freelance Data:", generalInfoFreelanceData);

            // Navigate to the next step
            // navigate("/BankAccInfoForm");
            navigate("/BankAccInfoForm", { state: { from: "GeneralInfoForm" } });

        }

        catch (error: any) {
            setError(error.message || "Something went wrong");
        }
        finally {
            setLoading(false);
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
                                            <div className="relative">
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
                                                    value={selectedLocation}
                                                    onChange={handleLocationChange} // Handle input change
                                                />

                                                {/* Location Suggestions Dropdown */}
                                                {locationSuggestions.length > 0 && (
                                                    <ul className="absolute left-0 top-[-10] w-full border rounded-md max-h-60 overflow-y-auto bg-white shadow-lg z-[9999]">

                                                        {locationSuggestions.map((location, index) => (
                                                            <li
                                                                key={index}
                                                                className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                                                                onClick={() => handleLocationSelect(location)} // Handle suggestion click
                                                            >
                                                                {location}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
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

                                            {/* File Upload Area */}
                                            <div>
                                                <label
                                                    htmlFor="upload-photo1"
                                                    className="text-lg text-mindfulBlack">
                                                    Provider Image <span className="text-main">*</span>
                                                </label>

                                                <div className="flex items-start space-x-5">

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
                                                                    {/* {selectedFile["certifications"]?.name || 'Upload certification files here'} */}
                                                                    {imageName || "Upload Salon logo here"}

                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo1"
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                {...register("providerImage")}
                                                                onChange={(e) => handleFileChange(e, "image_url")}
                                                            />

                                                            {errors.providerImage && (
                                                                <p className="text-sm text-red-600">{errors.providerImage.message}</p>
                                                            )}
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

                                            </div>

                                        </div>

                                        {/* Error Response from the API */}
                                        {error && <p className="text-sm text-red-600">{error}</p>}

                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    onClick={() => {
                                                        // Reset form logic
                                                        // location.reload();
                                                        window.location.reload();
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
