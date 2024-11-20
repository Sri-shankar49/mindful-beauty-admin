import { useState } from "react";
import editButton from "../../assets/icons/editButton.png"
import deleteButton from "../../assets/icons/deleteButton.png"
import rectangleBlack from "../../assets/images/rectangleBlack.png"
import { EditServicePopup } from "./AddServices/EditServicePopup";
import { Button } from "@/common/Button";
import { Pagination } from "@/common/Pagination";
import { Link, NavLink } from "react-router-dom";
import { SelectField } from "@/common/SelectField";
import { MdFormatListBulletedAdd, MdSearch } from "react-icons/md";
import { InputField } from "@/common/InputField";


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
                <div className="bg-mindfulLightPink h-dvh px-5 py-5" >

                    <div className="bg-mindfulWhite px-5 py-5">

                        <div className="pb-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <NavLink to="ServiceList">
                                        <h5 className="text-3xl font-semibold">Services List (85)</h5>
                                    </NavLink>
                                </div>

                                {/* Select, Add Service & Search */}
                                <div className="flex items-center space-x-5">

                                    {/* Branch Select Field */}
                                    <div>
                                        <SelectField
                                            label=""
                                            name="branch"
                                            // required
                                            className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                            options={[
                                                { value: "kochi", label: "Kochi" },
                                                { value: "trivandrum", label: "Trivandrum" },
                                                { value: "kollam", label: "Kollam" },
                                                { value: "thrissur", label: "Thrissur" },
                                            ]}
                                        // error="This field is required."
                                        />
                                    </div>

                                    {/* Add Service */}
                                    <Link to="/ServiceListing/AddServices">
                                        <div
                                            // onClick={openBranchPopup}
                                            className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                                        >
                                            <div>
                                                <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                                            </div>

                                            <Button
                                                buttonType="button"
                                                buttonTitle="Add Service"
                                                className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                                            />
                                        </div>
                                    </Link>

                                    {/* Search Field */}
                                    <div className="flex items-center relative">
                                        <InputField
                                            label={''}
                                            placeholder="Search"
                                            className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                        />
                                        <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" />
                                    </div>

                                </div>

                            </div>
                        </div>
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
                        {/* Pagination */}
                        <div>
                            <Pagination />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
