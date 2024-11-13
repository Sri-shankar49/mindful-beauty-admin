import { useState } from 'react'
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { Link } from 'react-router-dom';

export const Register = () => {

  const [activeUser, setActiveUser] = useState("salon");

  return (
    <div>

      {/* Radio Button */}
      <div className="flex justify-between items-center w-52 mx-auto py-3">
        {/* Radio Salon */}
        <div className="flex items-center">
          <input
            type="radio"
            name="radio"
            id="salon"
            className="focus-within:outline-none"
          />
          <label
            htmlFor="salon"
            className="text-mindfulWhite text-lg ml-2"
            onClick={() => setActiveUser("salon")}
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
          />
          <label
            htmlFor="freelancer"
            className="text-mindfulWhite text-lg ml-2"
            onClick={() => setActiveUser("freelancer")}
          >
            Freelancer
          </label>
        </div>
      </div>


      {/* Register form */}
      <div>
        <form action="" method="post">

          <div className="grid grid-cols-2 gap-5">

            {/* Salon Name */}
            <div>
              {/* <InputField
                label={'Salon Name*'}
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
              /> */}

              {activeUser === "salon" &&
                <InputField
                  label={'Salon Name*'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }

              {activeUser === "freelancer" &&
                <InputField
                  label={'Name*'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }
            </div>

            {/* Email */}
            <div>
              <InputField
                label={'Email*'}
                type="email"
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <InputField
                label={'Mobile*'}
                type='number'
                className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              {activeUser === "salon" &&
                <InputField
                  label={'Location*'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }

              {activeUser === "freelancer" &&
                <InputField
                  label={'What is your location?'}
                  className="w-full rounded-[5px] px-4 py-2 focus-within:outline-none"
                  required
                />
              }
            </div>
          </div>

          <div className="mt-10">
            <Link to="/GeneralInfoForm">
              <Button
                buttonTitle={'Register'}
                className="w-full bg-mindfulgrey border-[1px] border-mindfulgrey text-mindfulWhite rounded-[5px] font-semibold px-2 py-2 focus-within:outline-none hover:bg-main hover:border-[1px] hover:border-mindfulWhite"
              />
            </Link>

          </div>
        </form>
      </div>




    </div>
  )
}
