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

        <div className="w-3/4 mx-auto h-full flex items-center max-2xl:w-[85%] max-xl:w-[90%]">
          <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg">
            {/* <div className="bg-mindfulWhite rounded-lg drop-shadow-md"> */}

            {/* Mindful Beauty Girl Image */}
            <div className="bg-mindfulWhite w-full h-full rounded-tl-[10px] rounded-bl-[10px] px-16 max-2xl:px-12 max-xl:px-8">
              <div className="w-full h-full">
                <img src={mindfulBeautyGirl} alt="mindfulBeautyGirl" className="w-fit h-full mx-auto" />
              </div>
            </div>

            {/* Mindful Beauty SignIn Content */}
            <div className="bg-main w-full rounded-tr-[10px] rounded-br-[10px] px-16 py-28 max-2xl:px-12 max-2xl:py-20 max-xl:px-8 max-xl:py-16">
              <div className="pb-10 max-xl:pb-5">
                <img src={mindfulBeautyLogo} className="w-fit mx-auto max-2xl:w-52 max-xl:w-40 " alt="mindfulBeautyLogo" />
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
                {activeSection === "register" && <Register location={''} name={''} email={''} phone={''} />}

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div >
  )
}
