import { useEffect, useState } from 'react'
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { googleMapApi, loginRegister } from '@/api/apiConfig';


// Define Zod schema for validation
const registerSchema = zod.object({
  name: zod.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: zod.string().email({ message: "Invalid email address" }),
  phone: zod.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
  // servicetype: zod
  //   .union([zod.number(), zod.null()])
  //   .refine((val) => val == 1 || val == 2, { message: "Please select a service type" }),
  // servicetype: zod.string().min(1, { message: "Please select a service type" }),

  location: zod.string().min(3, { message: "Location must be at least 3 characters long" }),
});

type RegisterFormData = zod.infer<typeof registerSchema>;

export const Register: React.FC<RegisterFormData> = () => {


  const [activeUser, setActiveUser] = useState<number>(1);

  const navigate = useNavigate();


  // State Declaration to store form data
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);


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
        console.log("Latitude:", lat(), "Longitude:", lng());
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };


  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    // defaultValues: {
    //   servicetype: 1, // Default to "Salon" or any valid option
    // },
  });

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


  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    // setError(null);
    setEmailError(null);
    setPhoneError(null);

    console.log("Form Data Submitted:", data, typeof (activeUser), "active user");

    try {

      let city = selectedLocation
        ? extractCityFromLocation(selectedLocation)
        : ""; // If selectedLocation exists, extract city; else, set it to empty string.

      // If no city is found, fallback to using the state as the city
      if (!city) {
        const state = extractStateFromLocation(selectedLocation);
        city = state; // Use the state as the city
      }


      // Simulate API call
      const registrationData = await loginRegister(
        data.name,
        data.email,
        parseInt(data.phone), // Assuming phone is a string
        activeUser,     // Already a number
        // data.location
        selectedLocation, // Full address now being passed
        city,
        locationCoordinates.lat ?? 0, // Fallback to 0 if lat is null
        locationCoordinates.lng ?? 0, // Fallback to 0 if lng is null
      );
      console.log(registrationData.data, "Registration Data");

      // Navigate based on activeUser  &&  // Pass the form data to the next component
      handleRegistrationUser(data);

      // Store provider ID in sessionStorage
      sessionStorage.setItem("providerID", registrationData.data.provider_id);
      sessionStorage.setItem("providerName", registrationData.data.name);
      sessionStorage.setItem("providerEmail", registrationData.data.email);
      sessionStorage.setItem("phoneNumber", registrationData.data.phone);
      // sessionStorage.setItem("providerActiveUser", registrationData.data.activeUser);
      // sessionStorage.setItem("providerLocation", registrationData.data.location);
      sessionStorage.setItem("providerLocation", selectedLocation);
    }

    catch (error: any) {
      // setError(error.message || "Failed to register.");

      console.log("Error on register error ==>", error);
      const combinedError = error.message.split(" & ").map((err: string) => err.trim());

      // Set email and phone errors based on the combined error messages
      if (combinedError.length > 0 && combinedError[0] == "service provider with this phone already exists.") {
        setPhoneError(combinedError[0]);
      } else if (combinedError.length > 0 && combinedError[1] == "service provider with this email already exists.") {
        setEmailError(combinedError[0] || null);
      } else {
        setEmailError(combinedError[0]);
        setPhoneError(combinedError[1] || null);
      }

    } finally {
      setLoading(false);
    }
  }


  const handleRegistrationUser = (data: RegisterFormData) => {
    console.log(activeUser);

    // if (activeUser === 1) {
    //   console.log("salon");
    //   navigate("/GeneralInfoForm");
    // }
    // else if (activeUser === 2) {
    //   console.log("freelancer");
    //   navigate("/GeneralInfoFreelanceForm");
    // }

    const path = activeUser === 1 ? "/GeneralInfoForm" : "/GeneralInfoFreelanceForm";
    navigate(path, { state: data }); // Pass form data via state
  }

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>

      {/* Register form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Radio Button */}
          <div className="py-3">
            <div className="flex justify-between items-center w-52 mx-auto">
              {/* Radio Salon */}
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio"
                  id="salon"
                  className="focus-within:outline-none"
                  defaultChecked
                  onChange={() => setActiveUser(1)}
                />
                <label
                  htmlFor="salon"
                  className="text-mindfulWhite text-lg ml-2"
                  onClick={() => setActiveUser(1)}
                >
                  Salon
                </label>
              </div>

              {/* Freelancer Salon */}
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio"
                  id="freelancer"
                  className="focus-within:outline-none"
                  onChange={() => setActiveUser(2)}
                />
                <label
                  htmlFor="freelancer"
                  className="text-mindfulWhite text-lg ml-2"
                  onClick={() => setActiveUser(2)}
                >
                  Freelancer
                </label>
              </div>

            </div>

            {/* Display Error Message */}
            {/* {errors.servicetype && (
              // <p className="text-white text-sm text-center">{errors.servicetype.message}</p>
              <p className="text-white text-sm text-center">Please select a service type</p>
            )} */}
          </div>


          <div className="grid grid-cols-2 gap-5">



            {/* Salon Name */}
            <div>
              {/* <InputField
                label={'Salon Name*'}
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
              /> */}

              {/* {activeUser === 1 && */}
              <InputField
                label={activeUser === 1 ? "Salon Name*" : "Name*"}
                // label={'Salon Name*'}
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
                {...register("name")}
              />
              {/* } */}

              {/* {activeUser === 2 &&
                <InputField
                  label={'Name*'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                  {...register("phone")}
                />
              } */}
              {errors.name && <p className="text-white text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <InputField
                label={'Email*'}
                type="email"
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
                {...register("email")}
              />
              {errors.email && <p className="text-white text-sm">{errors.email.message}</p>}


              {/* Error from API response  */}
              {emailError && <p className="text-sm text-mindfulWhite">{emailError}</p>}

            </div>

            {/* Mobile */}
            <div>
              <InputField
                label={'Mobile*'}
                type="tel"
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
                {...register("phone")}
              />

              {errors.phone && <p className="text-white text-sm">{errors.phone.message}</p>}

              {/* Error from API response 
              {error && <p className="text-sm text-mindfulWhite">{error}</p>} */}

              {/* Error from API response  */}
              {phoneError && <p className="text-sm text-mindfulWhite">{phoneError}</p>}

            </div>

            {/* Location */}
            {/* <div>
              {activeUser === 1 &&
                <InputField
                  label={'Location*'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }

              {activeUser === 2 &&
                <InputField
                  label={'What is your location?'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }
            </div> */}

            <div className="relative w-full">
              <InputField
                label={activeUser === 1 ? 'Location*' : 'What is your location?'}
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
                {...register("location")}
                value={selectedLocation}
                onChange={handleLocationChange} // Handle input change
              />


              {/* Location Suggestions Dropdown */}
              {locationSuggestions.length > 0 && (
                <ul className="absolute left-0 top-full w-full border rounded-md max-h-60 overflow-y-auto bg-white shadow-lg z-[9999]">

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

              {errors.location && <p className="text-white text-sm">{errors.location.message}</p>}
            </div>

          </div>

          <div className="mt-10">

            {/* <Link to="/GeneralInfoFreelanceForm"> */}
            <Button
              // onClick={handleRegistrationUser}
              buttonType='submit'
              buttonTitle={loading ? "Registering..." : "Register"}
              className="w-full bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
            />
            {/* </Link> */}

          </div>
        </form>
      </div>




    </div>
  )
}
