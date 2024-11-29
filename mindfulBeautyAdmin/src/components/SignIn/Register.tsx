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
  const [error, setError] = useState<string | null>(null);

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    // defaultValues: {
    //   servicetype: 1, // Default to "Salon" or any valid option
    // },
  });


  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

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

      // Navigate based on activeUser
      handleRegistrationUser();

      // Store provider ID in sessionStorage
      sessionStorage.setItem("providerID", registrationData.data.provider_id);
    }

    catch (error: any) {
      setError(error.message || "Failed to register.")
    } finally {
      setLoading(false);
    }
  }


  const handleRegistrationUser = () => {
    console.log(activeUser);

    if (activeUser === 1) {
      console.log("salon");
      navigate("/GeneralInfoForm");
    }
    else if (activeUser === 2) {
      console.log("freelancer");
      navigate("/GeneralInfoFreelanceForm");
    }
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
