import { useState } from "react";
import editButton from "../../assets/icons/editButton.png"
import deleteButton from "../../assets/icons/deleteButton.png"
import rectangleBlack from "../../assets/images/rectangleBlack.png"
import { EditServicePopup } from "./AddServices/EditServicePopup";
import { Button } from "@/common/Button";


export const ServiceList = () => {

    const [showEditServicePopup, setShowEditServicePopup] = useState(false);

    const openEditService = () => {
        setShowEditServicePopup(!showEditServicePopup)
    }

    const closeEditService = () => {
        setShowEditServicePopup(false)
    }

    return (
        <div>
            <div>
                <table className="w-full">
                    <thead className="bg-mindfulLightgrey">
                        <tr className="">
                            <th className="text-start px-2 py-3">SKU ID</th>
                            <th className="text-start px-2 py-3">Service</th>
                            <th className="text-start px-2 py-3">Category</th>
                            <th className="text-start px-2 py-3">Sub Category</th>
                            <th className="text-start px-2 py-3">Pricing</th>
                            <th className="text-start px-2 py-3">Duration</th>
                            <th className="text-start px-2 py-3">Status</th>
                            <th className="text-start px-2 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Content */}
                        <tr className="border-b-2">
                            <td className="text-start px-2 py-5">MB94873</td>
                            <td className="text-start px-2 py-5">
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <img src={rectangleBlack} alt="rectangle black" />
                                    </div>

                                    <p className="text-md text-mindfulBlack">Full Face Threading</p>
                                </div>
                            </td>
                            <td className="text-start px-2 py-5">Skin</td>
                            <td className="text-start px-2 py-5">Threading</td>
                            <td className="text-start px-2 py-5">200</td>
                            <td className="text-start px-2 py-5">15 mins</td>
                            <td className="text-start px-2 py-5">
                                <Button
                                    buttonType="button"
                                    buttonTitle={"Active"}
                                    className="text-md text-mindfulGreen font-semibold border-[1px] border-mindfulGreen rounded-sm px-3 py-1"
                                />
                            </td>

                            <td className="px-2 py-5">
                                <div className="flex items-center space-x-5">
                                    {/* <button
                                        className="bg-mindfulWhite text-md text-mindfulYellow border-2 border-mindfulYellow rounded-[6px] px-2 py-1">
                                        Reset Password
                                    </button> */}
                                    {/* <button>
                                        <img src={resetPasswordButton} alt="resetPasswordButton" />
                                    </button> */}
                                    <button onClick={openEditService}>
                                        <img src={editButton} alt="editButton" />
                                    </button>
                                    <button>
                                        <img src={deleteButton} alt="deleteButton" />
                                    </button>
                                </div>
                            </td>


                        </tr>

                        {/* Content */}
                        <tr className="border-b-2">
                            <td className="text-start px-2 py-5">MB94873</td>
                            <td className="text-start px-2 py-5">
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <img src={rectangleBlack} alt="rectangle black" />
                                    </div>

                                    <p className="text-md text-mindfulBlack">Anti-aging Facial</p>
                                </div>
                            </td>
                            <td className="text-start px-2 py-5">Skin</td>
                            <td className="text-start px-2 py-5">Facials</td>
                            <td className="text-start px-2 py-5">2,200</td>
                            <td className="text-start px-2 py-5">30 mins</td>
                            <td className="text-start px-2 py-5">
                                <Button
                                    buttonType="button"
                                    buttonTitle={"InActive"}
                                    className="text-md text-mindfulRed font-semibold border-[1px] border-mindfulRed rounded-sm px-3 py-1"
                                />
                            </td>

                            <td className="px-2 py-5">
                                <div className="flex items-center space-x-5">
                                    <button onClick={openEditService}>
                                        <img src={editButton} alt="editButton" />
                                    </button>
                                    <button>
                                        <img src={deleteButton} alt="deleteButton" />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

            {showEditServicePopup && <EditServicePopup closePopup={closeEditService} />}
        </div>
    )
}
