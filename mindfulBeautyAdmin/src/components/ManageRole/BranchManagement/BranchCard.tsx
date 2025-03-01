import { useState } from 'react'
import userAdmin from "../../../assets/icons/userAdmin.svg"
// import managerImg from "../../../assets/images/managerImg.png"
import profileThumbnail from "../../../assets/images/profileThumbail.webp"
// import imgRounded from "../../../assets/images/imgRounded.png"
import { MdMoreVert } from "react-icons/md";
// import { Link } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { EditBranchPopup } from './EditBranchPopup';
import { ViewBranchPopup } from './ViewBranchPopup';
import { DeleteBranchPopup } from './DeleteBranchPopup';

interface BranchPropsCard {
    branchID?: string;
    branchName: string;
    phone: string;
    location: string;
    logo: string;
}


export const BranchCard: React.FC<BranchPropsCard> = ({ branchID, branchName, phone, location, logo }) => {

    const [moreHover, setMoreHover] = useState(false);

    const handleMouseEnter = () => {
        setMoreHover(true);
    };

    const handleMouseLeave = () => {
        setMoreHover(false);
    };

    const [showViewBranchPopup, setShowViewBranchPopup] = useState(false);
    const [showEditBranchPopup, setShowEditBranchPopup] = useState(false);
    const [showDeleteBranchPopup, setShowDeleteBranchpopup] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<BranchPropsCard | null>(null);
    const [selectedBranchID, setSelectedBranchID] = useState<number | null>(null);


    const openViewBranchPopup = () => {
        setShowViewBranchPopup(true);

        setSelectedBranch({ branchID, branchName, phone, location, logo }); // Pass branch data
        console.log("Finding the selected branch object in an array", selectedBranch);
    }

    const closeViewBranchPopup = () => {
        setShowViewBranchPopup(false);
    }

    const openEditBranchPopup = () => {
        setShowEditBranchPopup(true);
        setSelectedBranch({ branchID, branchName, phone, location, logo }); // Pass branch data
        console.log("Finding the selected branch object in an array", selectedBranch);

        // if (selectedBranch) {
        //     setSelectedBranchID(branchID);
        //     setShowEditBranchPopup(true);
        // }
        console.log("Edit the selected staff with ID:", branchID);
    }

    const closeEditBranchPopup = () => {
        setShowEditBranchPopup(false);
    }

    const openDeleteBranchPopup = (branchID: number) => {
        setShowDeleteBranchpopup(true);
        setSelectedBranchID(branchID);
        console.log("Delete the selected branch with ID:", branchID);
    }

    const closeDeleteBranchPopup = () => {
        setShowDeleteBranchpopup(false);
    }


    return (
        <div key={branchID} className="w-full shadow-lg px-5 py-5">

            {/* Branch Name */}
            <div className="flex items-center space-x-2 mb-5">
                <div>
                    <img src={userAdmin} alt="" />
                </div>

                {/* <h5 className="text-lg text-mindfulBlack font-semibold">Ashtamudi Wellness</h5> */}
                <h5 className="text-lg text-mindfulBlack font-semibold">{branchName}</h5>
            </div>

            {/* Manager Image & Details */}
            <div className="flex items-center space-x-5 mb-5">
                {/* Manager Image */}
                <div>
                    <img
                        src={logo || profileThumbnail}
                        alt="manager image"
                        className="w-12 h-12 rounded-full"
                    />
                </div>

                <div>
                    {/* <h5 className="text-sm text-mindfulBlack font-semibold">Paul Williams</h5> */}
                    {/* <p>Manager</p> */}
                    {/* <p>+91 98847 19615</p> */}
                    <p>{phone}</p>
                </div>
            </div>

            {/* Location & Status */}
            <div className="flex items-center justify-between mb-5">
                {/* Location */}
                <div>
                    <p className="text-sm text-mindfulAsh">Location</p>
                    {/* <p>Kochi</p> */}
                    <p>{location}</p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-sm text-mindfulAsh">Status</p>
                    <p className="bg-mindfulGreen text-sm text-mindfulWhite rounded-full px-3 py-0.5">Active</p>
                </div>
            </div>

            {/* Members */}
            <div>
                {/* <p className="text-sm text-mindfulAsh">Members</p> */}

                <div className="flex items-center justify-end">
                    {/* <div className="profile-image-group">
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
                    </div> */}

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
                                    {/* <Link to=""> */}
                                    <div onClick={openViewBranchPopup} className="flex items-center px-4 py-2 text-mindfulBlack cursor-pointer hover:bg-gray-100">
                                        <IoEyeOutline className="text-[18px] text-mindfulBlack mr-2" />
                                        View
                                    </div>
                                    {/* </Link> */}

                                    {/* <Link to=""> */}
                                    <div onClick={openEditBranchPopup} className="flex items-center px-4 py-2 text-mindfulBlack cursor-pointer hover:bg-gray-100">
                                        <MdModeEdit className="text-[18px] text-mindfulBlack mr-2" />
                                        Edit
                                    </div>
                                    {/* </Link> */}

                                    {/* <Link to=""> */}
                                    <div onClick={() => openDeleteBranchPopup(Number(branchID))} className="flex items-center px-4 py-2 text-mindfulBlack cursor-pointer hover:bg-gray-100">
                                        <MdDeleteForever className="text-[18px] text-mindfulBlack mr-2" />
                                        Delete
                                    </div>
                                    {/* </Link> */}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {showViewBranchPopup && selectedBranch && <ViewBranchPopup closePopup={closeViewBranchPopup} branchData={selectedBranch} />}

            {/* {showEditBranchPopup && <EditBranchPopup closePopup={closeEditBranchPopup} />}
             */}
            {/* Show Edit Popup */}
            {showEditBranchPopup && selectedBranch && (
                <EditBranchPopup
                    closePopup={closeEditBranchPopup}
                    branchData={selectedBranch}
                />
            )}
            {showDeleteBranchPopup && <DeleteBranchPopup closePopup={closeDeleteBranchPopup} branchID={Number(selectedBranchID)} />}



        </div>
    )
}
