import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputField } from '@/common/InputField'
import { SelectField } from '@/common/SelectField'
import { Button } from '@/common/Button'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import rectangleBlack from "../../assets/images/rectangleBlack.png"
import "./ServiceListing.css";
import editButton from "../../assets/icons/editButton.png";
import deleteButton from "../../assets/icons/deleteButton.png";
import { EditPackagesPopup } from './EditPackagesPopup';


export const PackagesList = () => {

    const [isActive, setIsActive] = useState(false); // State to track the toggle status

    const handleToggle = () => {
        setIsActive(!isActive); // Toggle the state on click
    };

    const [showEditPackagesPopup, setShowEditPackagesPopup] = React.useState(false);

    const openEditPackagesPopup = () => {
        setShowEditPackagesPopup(true);
    }

    const closeEditPackagesPopup = () => {
        setShowEditPackagesPopup(false);
    }
    return (
        <div>
            <div>
                <div className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="text-3xl font-semibold py-5">Packages List (01)</h5>
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

                                {/* <select
                                    // name=""
                                    id=""
                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                    value={selectedBranch}
                                    onChange={handleBranchChange} // Call on change

                                >
                                    <option value="" disabled>
                                        Select Branch
                                    </option>

                                    {staffBranchListData.map((branch) => (
                                        <option key={branch.branch_id} value={branch.branch_id}>
                                            {branch.branch_name}
                                        </option>
                                    ))}
                                </select> */}
                            </div>

                            {/* Add Service */}
                            <Link to="/ServiceListing/PackagesList/AddPackages">
                                <div
                                    // onClick={openBranchPopup}
                                    className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                                >
                                    <div>
                                        <MdFormatListBulletedAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                                    </div>

                                    <Button
                                        buttonType="button"
                                        buttonTitle="Add Package"
                                        className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                                    />
                                </div>
                            </Link>

                            {/* Search Field */}
                            <div className="flex items-center ">
                                <InputField
                                    label={''}
                                    placeholder="Search"
                                    className="w-72 rounded-[5px] border-2 border-mindfulgrey px-2 py-1 focus-within:outline-none"
                                />
                                {/* <MdSearch className="text-[22px] text-mindfulBlack absolute top-2 right-1 cursor-pointer" /> */}
                            </div>

                        </div>


                    </div>

                    <div>
                        <table className="w-full">
                            <thead className="bg-mindfulLightgrey">
                                <tr className="">
                                    <th className="text-start px-2 py-3">Package Title</th>
                                    <th className="text-start px-2 py-3">Services</th>
                                    <th className="text-start px-2 py-3">Pricing</th>
                                    <th className="text-start px-2 py-3">Status</th>
                                    <th className="text-start px-2 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <td className="w-96 text-start px-2 py-5">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <img src={rectangleBlack} alt="rectangle black" />
                                        </div>

                                        <p className="text-md text-mindfulBlack">Package 1</p>
                                    </div>
                                </td>
                                <td className="w-[36rem] text-start px-2 py-5">
                                    <p>Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure</p>
                                </td>
                                <td className="w-72 text-start px-2 py-5">7000</td>
                                <td className="w-52 text-start px-2 py-5">
                                    <div className="flex items-center">
                                        {/* Service Online */}
                                        <div>
                                            <p className={`text-md font-semibold
                                             ${isActive ? "text-mindfulBlack" : "text-mindfulgrey"}
                                            `}>
                                                {isActive ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>

                                        {/* Toggle Button */}
                                        <div>
                                            <div className={`toggle-switch-pkg ${isActive ? 'active' : 'inactive'}`}>
                                                <input
                                                    className="toggle-input-pkg"
                                                    id="toggle-pkg"
                                                    type="checkbox"
                                                    checked={isActive}
                                                    onChange={handleToggle}
                                                />

                                                <label className="toggle-label-pkg" htmlFor="toggle-pkg"></label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-start px-2 py-5">
                                    <div className="flex items-center space-x-5">
                                        <button
                                            onClick={openEditPackagesPopup}
                                        >
                                            <img src={editButton} alt="Edit" />
                                        </button>
                                        <button
                                        //  onClick={() => openDeleteStaffPopup(Number(staff.staff))}
                                        >
                                            <img src={deleteButton} alt="Delete" />
                                        </button>
                                    </div>
                                </td>

                            </tbody>
                        </table>
                    </div>
                </div>


                {showEditPackagesPopup && <EditPackagesPopup closePopup={closeEditPackagesPopup} />}
            </div>
        </div>
    )
}
