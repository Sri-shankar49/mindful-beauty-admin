import { useState } from 'react'
import userAdmin from "../../../assets/icons/userAdmin.svg"
import managerImg from "../../../assets/images/managerImg.png"
import imgRounded from "../../../assets/images/imgRounded.png"
import { MdMoreVert } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


export const BranchCard = () => {

    const [moreHover, setMoreHover] = useState(false);

    const handleMouseEnter = () => {
        setMoreHover(true);
    };

    const handleMouseLeave = () => {
        setMoreHover(false);
    };
    return (
        <div className="w-full shadow-lg px-5 py-5">

            {/* Branch Name */}
            <div className="flex items-center space-x-2 mb-5">
                <div>
                    <img src={userAdmin} alt="" />
                </div>

                <h5 className="text-lg text-mindfulBlack font-semibold">Ashtamudi Wellness</h5>
            </div>

            {/* Manager Image & Details */}
            <div className="flex items-center space-x-5 mb-5">
                {/* Manager Image */}
                <div>
                    <img src={managerImg} alt="manager image" />
                </div>

                <div>
                    <h5 className="text-sm text-mindfulBlack font-semibold">Paul Williams</h5>
                    <p>Manager</p>
                    <p>+91 98847 19615</p>
                </div>
            </div>

            {/* Location & Status */}
            <div className="flex items-center justify-between mb-5">
                {/* Location */}
                <div>
                    <p className="text-sm text-mindfulAsh">Location</p>
                    <p>Kochi</p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-sm text-mindfulAsh">Status</p>
                    <p className="bg-mindfulGreen text-sm text-mindfulWhite rounded-full px-3 py-0.5">Active</p>
                </div>
            </div>

            {/* Members */}
            <div>
                <p className="text-sm text-mindfulAsh">Members</p>

                <div className="flex items-center justify-between">
                    <div className="profile-image-group">
                        <div className="profile-image">
                            <img src={imgRounded} alt="Profile 1" />
                        </div>
                        <div className="profile-image">
                            <img src={imgRounded} alt="Profile 2" />
                        </div>
                        <div className="profile-image">
                            <img src={imgRounded} alt="Profile 3" />
                        </div>
                        <div className="profile-image extra">
                            +3
                        </div>
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <MdMoreVert
                            className="text-[36px] text-mindfulgrey font-semibold cursor-pointer"

                        />

                        {/* More Options */}
                        <div>
                            {moreHover && (
                                <div className="absolute top-[-6.5rem] right-5 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-20">
                                    <Link to="">
                                        <div className="flex items-center px-4 py-2 text-mindfulBlack hover:bg-gray-100">
                                            <IoEyeOutline className="text-[18px] text-mindfulBlack mr-2" />
                                            View
                                        </div>
                                    </Link>

                                    <Link to="">
                                        <div className="flex items-center px-4 py-2 text-mindfulBlack hover:bg-gray-100">
                                            <MdModeEdit className="text-[18px] text-mindfulBlack mr-2" />
                                            Edit
                                        </div>
                                    </Link>

                                    <Link to="">
                                        <div className="flex items-center px-4 py-2 text-mindfulBlack hover:bg-gray-100">
                                            <MdDeleteForever className="text-[18px] text-mindfulBlack mr-2" />
                                            Delete
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}
