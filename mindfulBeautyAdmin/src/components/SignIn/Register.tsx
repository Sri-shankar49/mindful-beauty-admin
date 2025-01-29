import { useState } from 'react'
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { loginRegister } from '@/api/apiConfig';


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

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    // defaultValues: {
    //   servicetype: 1, // Default to "Salon" or any valid option
    // },
  });


  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    // setError(null);
    setEmailError(null);
    setPhoneError(null);

    console.log("Form Data Submitted:", data, typeof (activeUser), "active user");

    try {
      // Simulate API call
      const registrationData = await loginRegister(
        data.name,
        data.email,
        parseInt(data.phone), // Assuming phone is a string
        activeUser,     // Already a number
        data.location
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

            <div>
              <InputField
                label={activeUser === 1 ? 'Location*' : 'What is your location?'}
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
                {...register("location")}
              />
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
