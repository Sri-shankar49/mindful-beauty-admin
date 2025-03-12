import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/common/Button'; // Assuming you have a reusable Button component
import { useEffect } from 'react';

export const Thankyou = () => {

    const providerID = sessionStorage.getItem("providerID");
    const phoneNumber = sessionStorage.getItem("phoneNumber");
    console.log("Getting providerID from session storage: ", providerID);
    console.log("Getting phoneNumber from session storage: ", phoneNumber);

    const navigate = useNavigate();

    useEffect(() => {
        // Clear history state to prevent back button from working
        window.history.pushState({}, "", window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    const handleLogin = () => {
        // navigate('/'); // Navigate to the login page
        // sessionStorage.clear();
        sessionStorage.clear();
        navigate('/', { replace: true }); // Navigate and replace history
        setTimeout(() => {
            window.history.pushState({}, "", window.location.href);
        }, 0);
    };

    return (
        <div>
            <div className="bg-SignInBgImg bg-cover bg-no-repeat h-dvh py-5 flex items-center">

                <div className="w-3/4 mx-auto h-dvh flex items-center max-2xl:h-[80%]">
                    <div className="w-full flex justify-center items-center bg-mindfulWhite rounded-lg shadow-lg z-0">

                        <div className="flex flex-col items-center justify-center w-full bg-mindfulLightgrey px-4 py-40">
                            {/* Success Icon */}
                            <div className="mb-6">
                                <FaCheckCircle size={80} className="text-mindfulGreen" />
                            </div>

                            {/* Thank You Message */}
                            <div className="text-center">

                                <h1 className="text-3xl font-bold text-mindfulBlack">
                                    Thank you for registering with us!
                                </h1>

                                <p className="text-lg text-gray-600 mt-4">
                                    Your provider ID is <span className="text-main font-semibold">{providerID}</span>.
                                </p>

                                {phoneNumber && (
                                    <p className="text-lg text-gray-600 mt-2">
                                        Kindly log in using the mobile number : <span className="text-main font-semibold">{phoneNumber}</span>.
                                    </p>
                                )}
                            </div>

                            {/* Login Button */}
                            <div className="mt-8">
                                <Button
                                    buttonTitle="Go to Login"
                                    className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                                    onClick={handleLogin}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
