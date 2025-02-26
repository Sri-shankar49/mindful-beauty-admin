import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
// import ashtamudiLogo from "../../../assets/icons/ashtamudiLogo.png"
import { InputField } from '@/common/InputField';
// import { SelectField } from '@/common/SelectField';
import { Button } from '@/common/Button';
import { MdCloudUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { addBranch, googleMapApi } from '@/api/apiConfig';
import { ShimmerTable } from 'shimmer-effects-react';

interface AddBranchPopupProps {
    closePopup: () => void;
    refreshData: () => void;
}

// Zod schema for form validation
const addBranchSchema = zod.object({
    branchName: zod.string().min(3, "Branch Name is required"),
    branchPhoneNumber: zod.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    branchAddress: zod.string().min(3, "Branch address is required"),
    branchLocation: zod.string().min(3, "Branch location is required"),
});

type addBranchFormData = zod.infer<typeof addBranchSchema>;

export const AddBranchPopup: React.FC<AddBranchPopupProps> = ({ closePopup, refreshData }) => {

    // const [logo, setLogo] = useState<File | null>(ashtamudiLogo); // Initially set to the default logo

    const [logo, setLogo] = useState<{ [key: string]: File | null }>({
        logo: null,
    }); // Initially set to the default logo
    const [preview, setPreview] = useState<string | null>(null); // Store preview URL

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setLogo((prev) => ({ ...prev, [fileKey]: file }));
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const [loading, setLoading] = useState(false); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);


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

                // Store latitude and longitude in state (you can use these values for submission)
                setLocationCoordinates({
                    lat: lat(),
                    lng: lng(),
                });

                // Optionally, store the full address in a separate state if needed
                setSelectedLocation(fullAddress); // Store the full address instead of the description
                console.log("Latitude:", lat(), "Longitude:", lng());
            } else {
                console.error("Geocoding failed:", status);
            }
        });
    };

    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<addBranchFormData>({
        resolver: zodResolver(addBranchSchema),
    });


    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    const onSubmit = async (data: addBranchFormData) => {

        setLoading(true);
        setError(null);

        console.log("Add Branch Popup Form Submitted Data :", data);

        try {

            // Prepare form data
            const formData = new FormData();

            // Append required fields
            formData.append("provider_id", String(sessionLoginProviderID));
            formData.append("branch_name", data.branchName);
            formData.append("branch_phone_number", data.branchPhoneNumber);
            formData.append("branch_address", data.branchAddress);
            // formData.append("branch_location", data.branchLocation);
            formData.append("branch_location", selectedLocation);


            // if (logo) {
            //     formData.append("logo", logo);
            // }

            // Append latitude and longitude if they exist
            if (locationCoordinates.lat && locationCoordinates.lng) {
                formData.append("latitude", String(locationCoordinates.lat));
                formData.append("longitude", String(locationCoordinates.lng));
            }

            // Append selected files
            Object.keys(logo).forEach((key) => {
                const file = logo[key];
                if (file) {
                    formData.append(key, file);
                }
            });


            // Debugging: Log the FormData contents
            console.log("Add branch FormData Contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Call the taxInfo function
            const addBranchData = await addBranch(formData);

            console.log("Add branch Submission Success:", addBranchData);

            // If the submission is successful, reset the form and close the popup
            if (addBranchData?.status === "success") {
                closePopup();
                refreshData();


            }
        }

        catch (error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }


    // Handle file change event
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     console.log(file, "file");

    //     if (file) {
    //         // const previewUrl = URL.createObjectURL(file); // Generate a preview URL for the uploaded file
    //         // console.log(previewUrl, "previewUrl");

    //         // setLogo(previewUrl); // Update the logo state with the preview URL
    //         setLogo(file); // Update the logo state with the preview URL
    //     }
    // };


    // if (loading) return <div>Loading...</div>;
    // if (loading) return <div>
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // </div>;
    // if (error) return <div>{error}</div>;


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50 ">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 h-fit mx-auto px-10 py-10 ">

                            {/* Close Button */}
                            <div
                                onClick={closePopup}
                                className="absolute top-5 right-5 w-fit cursor-pointer"
                            >
                                <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                            </div>

                            {loading ? (<div>
                                <ShimmerTable
                                    mode="light"
                                    row={6}
                                    col={1}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </div>) : (
                                <div>
                                    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-2 items-center gap-5">
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
                                                        {/* <img src={`${logo}`} alt="Uploaded logo" className="w-full h-24 object-cover" /> */}
                                                        {preview && (
                                                            <img
                                                                src={preview}
                                                                alt="Uploaded Logo"
                                                                className="w-full h-full rounded-md object-cover"
                                                            />
                                                        )}
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
                                                                // onChange={handleFileChange}
                                                                onChange={(e) => handleFileChange(e, "logo")}
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
                                                {/* <form action="" method="post"> */}
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
                                                            // name="branchName"
                                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                            {...register("branchName")}
                                                        />

                                                        {errors.branchName && (
                                                            <p className="text-red-600 text-sm">{errors.branchName.message}</p>
                                                        )}
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
                                                            // name="branchPhoneNumber"
                                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                            {...register("branchPhoneNumber")}
                                                        />

                                                        {errors.branchPhoneNumber && (
                                                            <p className="text-red-600 text-sm">{errors.branchPhoneNumber.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Branch Manager Name */}
                                                    {/* <div>
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
                                         </div> */}

                                                    {/* Branch Address */}
                                                    <div>
                                                        <label
                                                            htmlFor="branchAddress"
                                                            className="text-lg text-mindfulBlack font-semibold">
                                                            Branch Address
                                                        </label>

                                                        <textarea
                                                            // name="branchAddress"
                                                            id="branchAddress"
                                                            rows={4}
                                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                            {...register("branchAddress")}
                                                        >

                                                        </textarea>

                                                        {errors.branchAddress && (
                                                            <p className="text-red-600 text-sm">{errors.branchAddress.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Branch Location */}
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="branchLocation"
                                                            className="text-lg text-mindfulBlack font-semibold">
                                                            Branch Location
                                                        </label>

                                                        <InputField
                                                            label=""
                                                            // name="branchLocation"
                                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-3 focus-within:outline-none"
                                                            {...register("branchLocation")}
                                                            value={selectedLocation}
                                                            onChange={handleLocationChange} // Handle input change
                                                        />

                                                        {locationSuggestions.length > 0 && (
                                                            <ul className="absolute left-0 right-0 top-full mt-1 border rounded-md max-h-60 overflow-y-auto bg-white shadow-lg z-50">
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

                                                        {errors.branchLocation && (
                                                            <p className="text-red-600 text-sm">{errors.branchLocation.message}</p>
                                                        )}
                                                    </div>


                                                    {/* Error Response from the API */}
                                                    {error && <p className="text-sm text-red-600">{error}</p>}

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
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}
