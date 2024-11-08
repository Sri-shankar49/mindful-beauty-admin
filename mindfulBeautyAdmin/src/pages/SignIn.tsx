import { useState } from 'react'
import mindfulBeautyGirl from "../assets/images/mindfulBeautyGirl.png"
import mindfulBeautyLogo from "../assets/icons/mindfulBeautyLogo.svg"
import { Login } from '@/components/SignIn/Login'
import { Register } from '@/components/SignIn/Register'

export const SignIn = () => {

  const [activeSection, setActiveSection] = useState('login');

  return (
    <div>
      <div className="bg-SignInBgImg bg-cover bg-no-repeat h-dvh">

        <div className="w-3/4 mx-auto h-dvh flex items-center">
          <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg">
            {/* <div className="bg-mindfulWhite rounded-lg drop-shadow-md"> */}

            {/* Mindful Beauty Girl Image */}
            <div className="bg-mindfulWhite w-full rounded-tl-[10px] rounded-bl-[10px] px-16">
              <div>
                <img src={mindfulBeautyGirl} alt="mindfulBeautyGirl" className="w-fit" />
              </div>
            </div>

            {/* Mindful Beauty SignIn Content */}
            <div className="bg-main w-full rounded-tr-[10px] rounded-br-[10px] px-16 py-28">
              <div className="pb-10">
                <img src={mindfulBeautyLogo} className="w-fit mx-auto" alt="mindfulBeautyLogo" />
              </div>

              <div>
                <div className="flex items-center space-x-5 border-b-[1px] border-b-mindfulWhite">

                  <h5 className={`text-[20px] text-mindfulWhite font-semibold pb-2 cursor-pointer
                    ${activeSection === "login" ? "border-mindfulWhite border-b-2 pb-1" : "text-mindfulWhite"}
                  `}
                    onClick={() => setActiveSection('login')}
                  >
                    Login
                  </h5>

                  <h5 className={`text-[20px] text-mindfulWhite font-semibold pb-2 cursor-pointer
                    ${activeSection === "register" ? "border-mindfulWhite border-b-2 pb-1" : "text-mindfulWhite"}
                    `}
                    onClick={() => setActiveSection('register')}
                  >
                    New to Mindful Beauty
                  </h5>
                </div>
              </div>

              <div>
                {activeSection === "login" && <Login />}
                {activeSection === "register" && <Register />}

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div >
  )
}
