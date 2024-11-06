import React from 'react'
import deleteButton from "../../assets/icons/deleteButton.png"
import addUser from "../../assets/icons/addUser.svg"
import resetPasswordButton from "../../assets/icons/resetPasswordButton.png"
import editButton from "../../assets/icons/editButton.png"
import { Button } from '@/common/Button'
import { AiOutlineUserAdd } from "react-icons/ai";
export const StaffManagement = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-3xl font-semibold py-5">All Users (15)</h5>
                </div>

                {/* Add New Staff */}
                <div className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group">
                    <div>
                        <AiOutlineUserAdd className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                    </div>

                    <Button
                        buttonType="button"
                        buttonTitle="Add New Staff"
                        className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                    />
                </div>
            </div>

            <div>
                <table className="w-full">
                    <thead className="bg-mindfulLightgrey">
                        <tr className="">
                            <th className="text-center px-2 py-2">
                                <label className="cl-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                            </th>
                            <th className="w-[25%] text-start px-2 py-3">Name</th>
                            <th className="w-[15%] px-2 py-3">Role</th>
                            <th className="w-[15%] px-2 py-3">Branch</th>
                            <th className="w-[15%] px-2 py-3">Status</th>
                            <th className="w-[30%] text-start px-2 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Heading */}
                        {/* <tr>
                            <th colSpan={4} className="bg-mindfulLightgrey text-start px-2 py-4">Heading 1</th>
                        </tr> */}

                        {/* Content & Checkbox */}
                        <tr className="border-b-2">
                            <td className="text-center px-2 py-2">
                                <label className="cl-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                            </td>

                            <td className="px-2 py-5">Paul Williams</td>
                            <td className="text-center px-2 py-5">Admin</td>
                            <td className="text-center px-2 py-5">Kochi</td>
                            <td className="text-center px-2 py-5">Active</td>

                            <td className="px-2 py-5">
                                <div className="flex items-center space-x-5">
                                    {/* <button
                                        className="bg-mindfulWhite text-md text-mindfulYellow border-2 border-mindfulYellow rounded-[6px] px-2 py-1">
                                        Reset Password
                                    </button> */}
                                    <button>
                                        <img src={resetPasswordButton} alt="resetPasswordButton" />
                                    </button>
                                    <button>
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
        </div>
    )
}
