// import { Button } from "@/common/Button";
import { useState, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { fetchGeneralInfoDetails, googleMapApi, updateGeneralInfo, uploadTaxFiles } from "@/api/apiConfig";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectField } from "@/common/SelectField";
import { ShimmerTable } from "shimmer-effects-react";

// Define the validation schema
const generalInfoSchema = z.object({
    ownersName: z.string().min(3, "Owner's name is required"),
    salonName: z.string().min(3, "Salon name is required"),
    contactNumber: z.string().min(10, "Contact number must be 10 digits").max(10, "Contact number must be 10 digits").regex(/^[0-9]+$/, "Must be only digits"),
    emailAddress: z.string().min(1, "Email is required").email("Invalid email format"),

    salonLocation: z.string().optional(),

    latitude: z.string().optional(),
    longitude: z.string().optional(),


    establishedOn: z.string().optional(),
    salonAddress: z.string().optional(),
    servicesOffered: z.string().optional(),
    businessHours: z.string().optional(),
    salonFacilities: z.string().optional(),
    cancellationPolicy: z.string().optional(),
    staffInformation: z.string().optional(),

    providerImage: z.string().optional(),
    taxFile: z.string().optional(),
    gstFile: z.string().optional(),
    identityFile: z.string().optional(),
    addressFile: z.string().optional(),

    accHolderName: z.string().min(3, "Bank Account Holder Name is required"),
    bankName: z.string().min(3, "Bank Name is required"),
    bankNumber: z.string().regex(/^[0-9]{12}$/, { message: "Bank Account Number must be 12 digits" }),
    accountType: z.string().min(1, "Account Type is required"),
    bankBranch: z.string().optional(),
    ifscCode: z.string().optional(),

    taxIdentificationNumber: z.string().min(3, "Tax Identification Number is required"),
    gstNumber: z.string().regex(/^[0-9]{15}$/, { message: "GST Number must be 15 digits" }),
    proofOfIdentityType: z.string().optional(),
    idNumber: z.string().min(3, "ID Number must be 3 digits"),
    proofOfAddressType: z.string().optional(),

});

type GeneralFormData = z.infer<typeof generalInfoSchema>;

export const GeneralInfo = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<GeneralFormData>({
        resolver: zodResolver(generalInfoSchema),
    });

    // File states
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
        tax_file: null,
        gst_file: null,
        identity_file: null,
        address_file: null,
        image_url: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const sessionProviderID = sessionStorage.getItem("loginProviderID");
    const [bankId, setBankId] = useState<number | null>(null);
    const [taxId, setTaxId] = useState<number | null>(null);



    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    const [locationCoordinates, setLocationCoordinates] = useState<{ lat: number | null; lng: number | null; }>({ lat: null, lng: null });

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

                let city = "";
                let state = ""; // Declare state variable
                const addressComponents = results[0].address_components;

                // Look for the 'locality' component (the city)
                addressComponents.forEach((component) => {
                    if (component.types.includes("locality")) {
                        city = component.long_name; // The city
                    }
                    if (component.types.includes("administrative_area_level_1")) {
                        state = component.long_name; // The state
                    }
                });

                // If no city found, fallback to the state as city
                if (!city) {
                    city = state; // Use state as city
                }

                console.log("city", city);

                // Store latitude and longitude in state (you can use these values for submission)
                setLocationCoordinates({
                    lat: lat(),
                    lng: lng(),
                });

                // Optionally, store the full address in a separate state if needed
                setSelectedLocation(fullAddress); // Store the full address instead of the description
                setValue('salonLocation', fullAddress);
                console.log("Latitude:", lat(), "Longitude:", lng());
            } else {
                console.error("Geocoding failed:", status);
            }
        });
    };




    // Fetch provider details on component mount
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);

                const response = await fetchGeneralInfoDetails(Number(sessionProviderID));
                console.log("API response on general info ==>", response)
                console.log("API response bankid ==>", response.data.bank_details[0].bank_id)
                console.log("API response taxid ==>", response.data.tax_details[0].tax_id)
                setBankId(response.data.bank_details[0].bank_id);
                setTaxId(response.data.tax_details[0].tax_id);
                setValue('ownersName', response.data.owner_name || '');
                setValue('salonName', response.data.name || '');
                setValue('contactNumber', response.data.phone || '');
                setValue('emailAddress', response.data.email || '');

                setValue('salonLocation', response.data.branch || '');

                setValue('establishedOn', response.data.established_on || '');
                setValue('salonAddress', response.data.branch || '');
                setValue('servicesOffered', response.data.services_offered || '');
                setValue('businessHours', response.data.working_hours || '');
                setValue('salonFacilities', response.data.salon_facilities || '');
                setValue('cancellationPolicy', response.data.cancellation_policy || '');
                setValue('staffInformation', response.data.staff_information || '');

                // Set image URL
                setValue("providerImage", response.data.image_url || "");
                setValue("taxFile", response.data.tax_details[0].tax_file || "");
                setValue("gstFile", response.data.tax_details[0].gst_file || "");
                setValue("identityFile", response.data.tax_details[0].identity_file || "");
                setValue("addressFile", response.data.tax_details[0].address_file || "");

                // Set image URL in selectedFiles state
                setSelectedFiles((prev) => ({
                    ...prev,
                    image_url: response.data.image_url
                        ? new File([], response.data.image_url.split("/").pop() || "")
                        : null,
                    tax_file: response.data.tax_details[0].tax_file
                        ? new File([], response.data.tax_details[0].tax_file.split("/").pop() || "")
                        : null,
                    gst_file: response.data.tax_details[0].gst_file
                        ? new File([], response.data.tax_details[0].gst_file.split("/").pop() || "")
                        : null,
                    identity_file: response.data.tax_details[0].identity_file
                        ? new File([], response.data.tax_details[0].identity_file.split("/").pop() || "")
                        : null,
                    address_file: response.data.tax_details[0].address_file
                        ? new File([], response.data.tax_details[0].address_file.split("/").pop() || "")
                        : null,
                }));

                setValue('accHolderName', response.data.bank_details[0].account_holder_name || '');
                setValue('bankName', response.data.bank_details[0].bank_name || '');
                setValue('bankNumber', response.data.bank_details[0].bank_account_number || '');
                setValue('accountType', response.data.bank_details[0].account_type || '');
                setValue('bankBranch', response.data.bank_details[0].bank_branch || '');
                setValue('ifscCode', response.data.bank_details[0].ifsc_code || '');

                setValue('taxIdentificationNumber', response.data.tax_details[0].tax_identification_number || '');
                setValue('gstNumber', response.data.tax_details[0].gst_number || '');
                setValue('idNumber', response.data.tax_details[0].proof_of_identity_number || '');
            } catch (error: any) {
                setSubmitError(error instanceof Error ? error.message : 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFiles((prev) => ({ ...prev, [fileKey]: file }));
        }
    };

    // A helper function to extract the city if not already available
    const extractCityFromLocation = (location: string): string => {
        // You can implement a custom way to extract the city from the location string
        // For example, split the address and check if the last part is a city
        // (Adjust this based on your location format)
        const parts = location.split(",");
        return parts.length > 1 ? parts[parts.length - 3] : ""; // Assumes the city is second to last in the address
    };

    // A helper function to extract the state if not already available
    const extractStateFromLocation = (location: string): string => {
        const parts = location.split(",");
        // Assuming the state is the second-to-last part of the address
        return parts.length > 1 ? parts[parts.length - 2].trim() : "";
    };


    const onSubmit = async (data: GeneralFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);
        console.log("data  ===> ", data);

        try {

            let city = selectedLocation
                ? extractCityFromLocation(selectedLocation)
                : ""; // If selectedLocation exists, extract city; else, set it to empty string.

            // If no city is found, fallback to using the state as the city
            if (!city) {
                const state = extractStateFromLocation(selectedLocation);
                city = state; // Use the state as the city
            }


            const profileDataSave = await updateGeneralInfo({
                "provider_id": Number(sessionProviderID),
                "owner_name": data.ownersName,
                "name": data.salonName,
                "phone": data.contactNumber,
                "email": data.emailAddress,

                "branch": selectedLocation,
                "latitude": String(locationCoordinates.lat),
                "longitude": String(locationCoordinates.lng),
                "city": city,

                "established_on": data.establishedOn,
                "services_offered": data.servicesOffered,
                "working_hours": data.businessHours,
                "cancellation_policy": data.cancellationPolicy,
                "staff_information": data.staffInformation,
                "image_url": null,
                "business_summary": null,
                "gender_type": null,
                "timings": null,
                "salon_facilities": data.salonFacilities,
                "years_of_experience": null,
                "languages_spoken": null,
                "travel_capability_kms": null,
                "certifications": null,
                "willing_to_work_holidays": null,
                "bank_details": [
                    {
                        "bank_id": bankId,
                        "account_holder_name": data.accHolderName,
                        "bank_name": data.bankName,
                        "bank_account_number": data.bankNumber,
                        "account_type": data.accountType,
                        "bank_branch": data.bankBranch,
                        "ifsc_code": data.ifscCode
                    }
                ],
                "tax_details": [
                    {
                        "tax_id": taxId,
                        "tax_identification_number": data.taxIdentificationNumber,
                        "tax_file": "",
                        "gst_number": data.gstNumber,
                        "gst_file": "",
                        "proof_of_identity_type": "",
                        "proof_of_identity_number": data.idNumber,
                        "identity_file": "",
                        "proof_of_address_type": "",
                        "address_file": ""
                    }
                ]
            });
            setSubmitSuccess("Profile updated successfully!");
            console.log("Profile data saved", profileDataSave);

            // Prepare the FormData for file uploads
            const formData = new FormData();
            formData.append('provider_id', String(sessionProviderID));

            if (taxId) {
                formData.append('tax_id', String(taxId)); // Pass the tax_id from the state here
            }

            if (selectedFiles["image_url"]) {
                formData.append('image_url', selectedFiles["image_url"]);
            }

            if (selectedFiles["tax_file"]) {
                formData.append('tax_file', selectedFiles["tax_file"]);
            }

            if (selectedFiles["gst_file"]) {
                formData.append('gst_file', selectedFiles["gst_file"]);
            }

            if (selectedFiles["identity_file"]) {
                formData.append('identity_file', selectedFiles["identity_file"]);
            }

            if (selectedFiles["address_file"]) {
                formData.append('address_file', selectedFiles["address_file"]);
            }

            // Now, upload the files using the uploadTaxFiles API
            const fileUploadResponse = await uploadTaxFiles(formData);
            console.log("Tax files uploaded successfully:", fileUploadResponse);

            setSubmitSuccess("Profile updated and files uploaded successfully!");

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    {/* General Information */}
                    <div>
                        <h5 className="text-xl font-semibold py-5">General Information</h5>

                        {loading ? (
                            <div className="text-center py-4">
                                <ShimmerTable
                                    mode="light"
                                    row={3}
                                    col={4}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">
                                {/* Owner's Name */}
                                <div>
                                    <label htmlFor="ownersName" className="text-lg text-mindfulBlack">
                                        Owner's Name <span className="text-main"> *</span>
                                    </label>
                                    <input
                                        {...register("ownersName")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.ownersName && <p className="text-sm text-red-600">{errors.ownersName.message}</p>}
                                </div>
                                {/* Salon Name */}
                                <div>
                                    <label htmlFor="salonName" className="text-lg text-mindfulBlack">
                                        Salon Name <span className="text-main"> *</span>
                                    </label>
                                    <input
                                        {...register("salonName")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.salonName && <p className="text-sm text-red-600">{errors.salonName.message}</p>}
                                </div>
                                {/* Contact Number */}
                                <div>
                                    <label htmlFor="contactNumber" className="text-lg text-mindfulBlack">
                                        Contact Number <span className="text-main"> *</span>
                                    </label>
                                    <input
                                        {...register("contactNumber")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.contactNumber && <p className="text-sm text-red-600">{errors.contactNumber.message}</p>}

                                </div>
                                {/* Email Address */}
                                <div>
                                    <label htmlFor="emailAddress" className="text-lg text-mindfulBlack">
                                        Email Address <span className="text-main"> *</span>
                                    </label>
                                    <input
                                        {...register("emailAddress")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.emailAddress && <p className="text-sm text-red-600">{errors.emailAddress.message}</p>}

                                </div>
                                {/* Salon Location */}
                                <div className="relative">
                                    <label
                                        htmlFor="salonLocation"
                                        className="text-lg text-mindfulBlack">
                                        Salon Location
                                    </label>

                                    <input
                                        {...register("salonLocation")}
                                        //value={selectedLocation}
                                        onChange={handleLocationChange} // Handle input change
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
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

                                    <input
                                        type="date"
                                        {...register("establishedOn")}
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
                                        {...register("salonAddress")}
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
                                        {...register("servicesOffered")}
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
                                        {...register("businessHours")}
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
                                        {...register("salonFacilities")}
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
                                        {...register("cancellationPolicy")}
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
                                        {...register("staffInformation")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"

                                    ></textarea>
                                </div>

                                {/* File Upload Area */}
                                <div>
                                    <label
                                        htmlFor="providerImage"
                                        className="text-lg text-mindfulBlack">
                                        Provider Image <span className="text-main">*</span>
                                    </label>

                                    <div className="flex items-center space-x-5">

                                        <div>
                                            <div className="w-64">

                                                <label
                                                    htmlFor="providerImage"
                                                    className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-2 cursor-pointer hover:border-mindfulGreyTypeThree"
                                                >
                                                    {/* File Upload Icon */}
                                                    {/* <div>
                                                                                                        <MdFileUpload className="text-[36px] text-mindfulBlack mb-2" />
                                                                                                    </div> */}
                                                    <span className="text-md text-mindfulBlack break-all px-2">
                                                        {/* {selectedFile["certifications"]?.name || 'Upload certification files here'} */}
                                                        {selectedFiles["image_url"]?.name || "Upload Salon logo here"}

                                                    </span>
                                                </label>

                                                <input
                                                    id="providerImage"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    {...register("providerImage")}
                                                    onChange={(e) => handleFileChange(e, "image_url")}
                                                />

                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="providerImage"
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

                            </div>
                        )}
                    </div>

                    {/* Bank Account Information */}
                    <div>
                        <div>
                            <h5 className="text-xl font-semibold py-5">Bank Account Information</h5>
                        </div>

                        {loading ? (
                            <div className="text-center py-4">
                                <ShimmerTable
                                    mode="light"
                                    row={2}
                                    col={4}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </div>

                        ) : (
                            <div className="grid grid-cols-4 gap-5 border-b-2 border-b-mindfulgrey pb-10">

                                {/* Bank Account Holder Name */}
                                <div>
                                    <label
                                        htmlFor="accHolderName"
                                        className="text-lg text-mindfulBlack">
                                        Bank Account Holder Name
                                    </label>
                                    <input
                                        {...register("accHolderName")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.accHolderName && <p className="text-sm text-red-600">{errors.accHolderName.message}</p>}

                                </div>

                                {/* Bank Name */}
                                <div>
                                    <label
                                        htmlFor="bankName"
                                        className="text-lg text-mindfulBlack">
                                        Bank Name
                                    </label>
                                    <input
                                        {...register("bankName")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.bankName && <p className="text-sm text-red-600">{errors.bankName.message}</p>}

                                </div>

                                {/* Bank Account Number */}
                                <div>
                                    <label
                                        htmlFor="bankNumber"
                                        className="text-lg text-mindfulBlack">
                                        Bank Account Number
                                    </label>
                                    <input
                                        {...register("bankNumber")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.bankNumber && <p className="text-sm text-red-600">{errors.bankNumber.message}</p>}

                                </div>

                                {/* Account Type */}
                                <div>
                                    <label
                                        htmlFor="accountType"
                                        className="text-lg text-mindfulBlack">
                                        Account Type
                                    </label>
                                    <input
                                        {...register("accountType")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.accountType && <p className="text-sm text-red-600">{errors.accountType.message}</p>}

                                </div>

                                {/* Bank Branch */}
                                <div>
                                    <label
                                        htmlFor="bankBranch"
                                        className="text-lg text-mindfulBlack">
                                        Bank Branch
                                    </label>
                                    <input
                                        {...register("bankBranch")}
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
                                    <input
                                        {...register("ifscCode")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                </div>

                            </div>
                        )}
                    </div>

                    {/* Tax Information / GST Number */}
                    <div>
                        <div>
                            <h5 className="text-xl font-semibold py-5">Tax Information / GST Number</h5>
                        </div>

                        {loading ? (
                            <div className="text-center py-4">
                                <ShimmerTable
                                    mode="light"
                                    row={4}
                                    col={2}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-5 pb-10">
                                {/* Tax Identification Number */}
                                <div>
                                    <label
                                        htmlFor="taxIdentificationNumber"
                                        className="text-lg text-mindfulBlack">
                                        Tax Identification Number
                                    </label>
                                    <input
                                        {...register("taxIdentificationNumber")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
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
                                    <input
                                        {...register("gstNumber")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
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
                                                <span className="text-md text-mindfulBlack break-all px-2">
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
                                                <span className="text-md text-mindfulBlack break-all px-2">
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
                                        {/* <SelectField
                                    {...register("typeOfId")}
                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                /> */}
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
                                        {/* <SelectField
                                    {...register("proofOfAddress")}
                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                /> */}
                                    </div>
                                </div>

                                {/* ID Number */}
                                <div>
                                    <label
                                        htmlFor="idNumber"
                                        className="text-lg text-mindfulBlack">
                                        ID Number
                                    </label>
                                    <input
                                        {...register("idNumber")}
                                        className="w-full rounded-[5px] border-[1px] border-mindfulBlack px-2 py-1.5 focus-within:outline-none"
                                    />
                                    {errors.idNumber && <p className="text-sm text-red-600">{errors.idNumber.message}</p>}

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
                                                <span className="text-md text-mindfulBlack break-all px-2">
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
                                                <span className="text-md text-mindfulBlack break-all px-2">
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
                        )}

                    </div>

                    <div>
                        {/* <Button
                        buttonType="submit"
                        buttonTitle="Update"
                        className="bg-main text-md text-mindfulWhite font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                    /> */}
                        {submitError && (
                            <p className="text-red-600 mb-2">{submitError}</p>
                        )}
                        {submitSuccess && (
                            <p className="text-green-500 mb-2">{submitSuccess}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-main rounded-[4px] text-lg text-mindfulWhite px-8 py-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div >

        </div >
    );
}
