import { Button } from '@/common/Button';
import { IoCloseCircle } from 'react-icons/io5';
import stylist from "../../../assets/images/stylist.png"
import { useLocation, useNavigate } from 'react-router-dom';

interface StylistPopupProps {
    closePopup: () => void;
    stylistDetails: {
        // id?: any;
        // name: string;
        // role: string;
        // years_of_experience?: string;
        // rating: string;
        // profile_image: string;
        // provider: string;

        staff?: any;
        name: string;
        role_name: string;
        branch_name: string;
        status: string;
        role_id: string;
        branch_id: string;
        phone: string;
    }
}

export const StylistPopup: React.FC<StylistPopupProps> = ({ closePopup, stylistDetails }) => {

    const navigate = useNavigate();

    const location = useLocation(); // Detect current route


    const onSubmit = () => {
        // console.log(stylistDetails);
        // navigate(0);
        closePopup();

        // Prevent refresh in Dashboard/DashboardData
        if (location.pathname.includes("ServiceManagement")) {
            navigate(0); // Refresh page only if NOT in DashboardData
        }

        console.log("Refreshing the page after the popup confirm", stylistDetails);


    }
    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">

                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">


                                <div className="relative mb-5">

                                    <div className="flex items-center justify-center space-x-5">
                                        <div>
                                            {/* <img src={stylist} alt="" /> */}
                                            {/* <img src={stylistDetails.profile_image} alt={stylistDetails.name} /> */}
                                            <img src={stylist} alt={stylistDetails.name} />
                                        </div>
                                        <div className="text-center">
                                            <h2 key={stylistDetails.staff} className="text-2xl text-mindfulBlack font-semibold">
                                                {stylistDetails.name}
                                            </h2>
                                        </div>
                                    </div>
                                    {/* <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                    </div> */}
                                </div>

                                {/* Close Button */}
                                <div
                                    onClick={closePopup}
                                    className="absolute top-5 right-5 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>

                                <div className="text-center">
                                    <p className="text-lg text-mindfulBlack">Kindly confirm to assign this talk to {stylistDetails.name}</p>
                                </div>

                                {/* Buttons */}
                                <div className="pt-5">
                                    <div className="flex items-center justify-center space-x-5">
                                        {/* Cancel Button */}

                                        {/* Conditionally Render Cancel Button */}
                                        {/* {!location.pathname.includes("ServiceManagement") && (
                                            <Button
                                                onClick={closePopup}
                                                buttonType="button"
                                                buttonTitle="Cancel"
                                                className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            />
                                        )} */}

                                        {/* <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        /> */}


                                        {/* Submit Button */}
                                        <Button
                                            // onClick={closePopup}
                                            onClick={onSubmit}
                                            buttonType="button"
                                            buttonTitle="Confirm"
                                            className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
