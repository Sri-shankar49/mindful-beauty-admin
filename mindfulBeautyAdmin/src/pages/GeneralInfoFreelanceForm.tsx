import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
import salonChair from "../assets/icons/salonChair.svg";
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/common/InputField';
import { Button } from '@/common/Button';
import { Slider } from "@/components/ui/slider"
import { MdCloudUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { generalInfoFreelance, googleMapApi } from "@/api/apiConfig";
import { NotifyError } from "@/common/Toast/ToastMessage";


// Define Zod schema for validation
const generalInfoFreelanceSchema = zod.object({
    fullName: zod.string().min(3, "Full name is required"),
    emailAddress: zod.string().email("Invalid email address"),
    contactNumber: zod.string().regex(/^[0-9]{10}$/, { message: "Contact number must be 10 digits" }),
    location: zod.string().optional(),
    homeAddress: zod.string().optional(),
    servicesProvided: zod.string().optional(),
    yearsOfExperience: zod.string().min(1, "Years of experience is required"),
    languagesSpoken: zod.string().optional(),
    travelCapability: zod.string().optional(),
    certifications: zod.string().optional(),
    slots: zod.string().optional(),
    willingToWork: zod.string().optional(),
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

type GeneralInfoFreelanceFormData = zod.infer<typeof generalInfoFreelanceSchema>;



export const GeneralInfoFreelanceForm: React.FC<GeneralInfoFreelanceFormData> = () => {

    // Form data From the Register component
    // const location = useLocation();
    // const registartionFormData = location.state; // Access the passed data

    const navigate = useNavigate();

    const [willingToWork, setWillingToWork] = useState<number>(1);
    const [distance, setDistance] = useState(33); // Default value of 33

    const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({
        certifications: null,
        image_url: null
    });

    // const [imageName, setImageName] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(sessionStorage.getItem("providerImageName") || null);

    // const [certificationsName, setcertificationsName] = useState<string | null>(null);


    // File change handler
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
    //     const file = event.target.files?.[0];         // Optional chaining to check if files exist
    //     if (file) {
    //         setSelectedFile((prev => ({ ...prev, [fileKey]: file })))
    //     }
    // }



    // Retrieve the Provider Image file
    useEffect(() => {
        const storedImageName = sessionStorage.getItem("providerImageName");
        if (storedImageName) {
            setImageName(storedImageName);

            // Retrieve the Blob URL and create a new File object
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
        }
        // Retrieve the certifications file
        const storedCertificationName = sessionStorage.getItem("certifications");
        if (storedCertificationName) {
            const storedCertificationBlobUrl = sessionStorage.getItem(
                "certificationFileUrl"
            );
            if (storedCertificationBlobUrl) {
                fetch(storedCertificationBlobUrl)
                    .then((response) => response.blob())
                    .then((blob) => {
                        const file = new File([blob], storedCertificationName); // Create a new File object
                        setSelectedFile((prev) => ({ ...prev, certifications: file }));
                    });
            }
        }
    }, []);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0]; // Optional chaining to check if files exist
        if (file) {
            setSelectedFile((prev) => ({ ...prev, [fileKey]: file }));
            if (fileKey === "image_url") {
                sessionStorage.setItem("providerImageName", file.name);
                const blobUrl = URL.createObjectURL(file);
                sessionStorage.setItem("selectedFile", blobUrl); // Store the Blob URL
                // Convert the file to a Base64 string and store it in sessionStorage
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    if (typeof base64data === "string") {
                        sessionStorage.setItem("providerImageBase64", base64data);
                    }
                };
                reader.readAsDataURL(file);
                setImageName(file.name); // Update the image name in state
                setValue("providerImage", file);
                clearErrors("providerImage"); // Clear validation error for providerImage
            } else if (fileKey === "certifications") {
                sessionStorage.setItem("certifications", file.name); // Store certification file name
                const certificationBlobUrl = URL.createObjectURL(file);
                sessionStorage.setItem("certificationFileUrl", certificationBlobUrl); // Store the certification Blob URL
                // setcertificationsName(file.name); // Update the image name in state

            }
        }
    };


    // const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);


    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, watch } = useForm<GeneralInfoFreelanceFormData>({
        resolver: zodResolver(generalInfoFreelanceSchema),
        defaultValues: {
            // fullName: registartionFormData.name || '',
            // emailAddress: registartionFormData.email || '',
            // contactNumber: registartionFormData.phone || '',
            fullName: sessionStorage.getItem("providerName") || '',
            // salonName: sessionStorage.getItem("providerName") || '',
            contactNumber: sessionStorage.getItem("phoneNumber") || '',
            emailAddress: sessionStorage.getItem("providerEmail") || '',
            location: sessionStorage.getItem("providerLocation") || '',
            homeAddress: sessionStorage.getItem("homeAddress") || '',
            servicesProvided: sessionStorage.getItem("servicesProvided") || '',
            yearsOfExperience: sessionStorage.getItem("yearsOfExperience") || '',
            languagesSpoken: sessionStorage.getItem("languagesSpoken") || '',
            travelCapability: sessionStorage.getItem("travelCapability") || '',
            certifications: sessionStorage.getItem("certifications") || '',
            slots: sessionStorage.getItem("slots") || '',
            willingToWork: sessionStorage.getItem("willingToWork") || '',
        },
    });


    // Watch form values and update sessionStorage on change
    // useEffect(() => {
    //     const subscription = watch((values) => {
    //         sessionStorage.setItem("providerName", values.fullName || '');
    //         sessionStorage.setItem("phoneNumber", values.contactNumber || '');
    //         sessionStorage.setItem("providerEmail", values.emailAddress || '');
    //         sessionStorage.setItem("providerLocation", values.location || '');
    //     });

    //     return () => subscription.unsubscribe();
    // }, [watch]);

    // ✅ Sync form fields with sessionStorage when form loads
    useEffect(() => {
        const fields: (keyof GeneralInfoFreelanceFormData)[] = [
            "fullName", "contactNumber", "emailAddress", "location", "homeAddress",
            "servicesProvided", "yearsOfExperience", "languagesSpoken", "travelCapability",
            "certifications", "slots", "willingToWork"
        ];

        fields.forEach(field => {
            const storedValue = sessionStorage.getItem(field);
            if (storedValue) {
                setValue(field, storedValue);
            }
        });

        // ✅ Handle Travel Capability separately to ensure it's set correctly
        // const storedDistance = sessionStorage.getItem("travelCapability");
        // if (storedDistance) {
        //     setDistance(parseInt(storedDistance, 10));  // Convert to number
        //     setValue("travelCapability", storedDistance);  // Update form field
        // }

        const storedDistance = sessionStorage.getItem("travelCapability");

        if (storedDistance !== null) {
            const parsedDistance = parseInt(storedDistance, 10) || 33;  // Use stored value or default 33
            setDistance(parsedDistance);
            setValue("travelCapability", parsedDistance.toString());
        } else {
            // Set default if no stored value
            sessionStorage.setItem("travelCapability", "33");
            setDistance(33);
            setValue("travelCapability", "33");
        }

    }, [setValue]);


    // ✅ Watch form changes and update sessionStorage dynamically
    useEffect(() => {
        const subscription = watch((values) => {
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && value !== sessionStorage.getItem(key)) {  // ✅ Only update if changed
                    sessionStorage.setItem(key, String(value));
                }
            });
        });

        return () => subscription.unsubscribe();
    }, [watch]);



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
                setValue("location", fullAddress); // ✅ Update form field value
                console.log("Latitude:", lat(), "Longitude:", lng());
            } else {
                console.error("Geocoding failed:", status);
            }
        });
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


    const onSubmit = async (data: GeneralInfoFreelanceFormData) => {
        setLoading(true);
        // setError(null);

        console.log("General Info Freelance Form Submitted Data:", data);

        try {

            // Save latest values in sessionStorage before submitting
            // sessionStorage.setItem("providerName", data.fullName);
            // sessionStorage.setItem("phoneNumber", data.contactNumber);
            // sessionStorage.setItem("providerEmail", data.emailAddress);
            // sessionStorage.setItem("providerLocation", data.location || '');

            // ✅ Save latest values in sessionStorage before submitting
            Object.entries(data).forEach(([key, value]) => {
                sessionStorage.setItem(key, String(value));
            });

            // Getting the ProviderID from session storage
            const sessionProviderID = sessionStorage.getItem("providerID");
            if (!sessionProviderID) {
                throw new Error("Provider ID is missing from session storage.");
            }

            sessionStorage.setItem("travelCapability", String(distance)); // Ensure travel capability is stored

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
            // formData.append("travel_capability_kms", data.travelCapability || "");
            formData.append("travel_capability_kms", String(distance));        // ✅ Use latest value
            // formData.append("certifications", data.certifications || "");
            formData.append("available_slots", data.slots || "");
            formData.append("willing_to_work_holidays", willingToWork.toString());

            const FreelaunceLocation = sessionStorage.getItem("freelancer_location") || data.location;
            // const city = extractCityFromLocation(salonLocation || "");
            // formData.append("city", city);
            let city = extractCityFromLocation(FreelaunceLocation || ""); // Check if city exists
            if (!city) {
                // If city is not available, fallback to using the state name
                const state = extractStateFromLocation(FreelaunceLocation || ""); // You can implement a function to extract the state
                city = state; // Use the state as city
            }

            formData.append("city", city);

            // Append latitude and longitude if available
            if (locationCoordinates.lat !== null && locationCoordinates.lng !== null) {
                formData.append("latitude", locationCoordinates.lat.toString());
                formData.append("longitude", locationCoordinates.lng.toString());
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
            const generalInfoFreelanceData = await generalInfoFreelance(formData);

            console.log("General Info Freelance Data:", generalInfoFreelanceData);

            // Navigate to the next step
            // navigate("/BankAccInfoForm");
            // navigate("/BankAccInfoForm", { state: { from: "GeneralInfoFreelanceForm" } });
            navigate("/TaxInfoForm", { state: { from: "GeneralInfoFreelanceForm" } });

        }

        catch (error: any) {
            // setError(error.message || "Something went wrong");
            NotifyError(error.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }

    }


    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;


    return (
        <div>
            <div className="bg-SignInBgImg bg-cover bg-no-repeat py-5">

                <div className="w-3/4 mx-auto flex items-center max-xl:w-[85%]">
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
                                        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2">

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
                                            <div className="relative">
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

                                                {errors.yearsOfExperience && <div className="text-sm text-red-600">{errors.yearsOfExperience.message}</div>}
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
                                                        <Slider
                                                            // defaultValue={[33]}
                                                            defaultValue={[distance]} // ✅ Ensure the default value is correct
                                                            max={50}
                                                            step={1}
                                                            // onValueChange={(value) => setDistance(value[0])}
                                                            onValueChange={(value) => {
                                                                setDistance(value[0]);  // ✅ Update state
                                                                setValue("travelCapability", value[0].toString());  // ✅ Sync with form
                                                                sessionStorage.setItem("travelCapability", value[0].toString());  // ✅ Save in sessionStorage
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between pt-2">
                                                        <p className="text-lg text-mindfulBlack">0 Kms</p>
                                                        <p className="text-lg text-mindfulBlack">
                                                            {distance} Kms
                                                            {/* {register("travelCapability").value || 33} Kms */}
                                                        </p>
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

                                                <div className="flex flex-wrap gap-3 items-start space-x-5">

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
                                                                    {selectedFile["certifications"]?.name || 'Upload certification files here'}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="upload-photo1"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, "certifications")}
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

                                            {/* File Upload Area */}
                                            <div>
                                                <label
                                                    htmlFor="providerImage"
                                                    className="text-lg text-mindfulBlack">
                                                    Provider Image <span className="text-main">*</span>
                                                </label>

                                                <div className="flex items-start space-x-5">

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
                                                                <span className="text-md text-mindfulBlack">
                                                                    {/* {selectedFile["certifications"]?.name || 'Upload certification files here'} */}
                                                                    {imageName || "Upload Salon logo here"}

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

                                                            {errors.providerImage && (
                                                                <p className="text-sm text-red-600">{errors.providerImage.message}</p>
                                                            )}
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


                                        {/* Error Response from the API */}
                                        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}

                                        {/* Buttons */}
                                        <div className="text-center py-10">
                                            <div className="flex items-center justify-center space-x-5">
                                                {/* Cancel Button */}
                                                <Button
                                                    // Reset form logic
                                                    // onClick={() => location.reload()}
                                                    onClick={() => window.location.reload()}
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
