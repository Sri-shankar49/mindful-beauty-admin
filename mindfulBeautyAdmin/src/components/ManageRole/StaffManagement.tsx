import React, { useEffect, useState } from 'react'
import resetPasswordButton from "../../assets/icons/resetPasswordButton.png"
import editButton from "../../assets/icons/editButton.png"
import deleteButton from "../../assets/icons/deleteButton.png"
import { Button } from '@/common/Button'
import { AiOutlineUserAdd } from "react-icons/ai";
import { AddStaffPopup } from './StaffManagement/AddStaffPopup';
import { staffList } from '@/api/apiConfig'
import { EditStaffPopup } from './StaffManagement/EditStaffPopup'
import { Pagination } from '@/common/Pagination'
import { DeleteStaffPopup } from './StaffManagement/DeleteStaffPopup'

interface StaffManagementProps {
    staff?: number;
    name: string;
    role_id?: string;
    role_name: string;
    branch_id?: string;
    branch_name: string;
    status: string;
}


export const StaffManagement: React.FC<StaffManagementProps> = () => {


    const defaultEditStaffData = {
        staff: undefined,
        name: '',
        role_id: undefined,
        role_name: '',
        branch_id: undefined,
        branch_name: '',
        status: '',
    };

    const [staffListData, setStaffListData] = useState<StaffManagementProps[]>([]);
    const [loading, setLoading] = useState(true); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);
    const [selectedStaffID, setSelectedStaffID] = useState<number | null>(null);


    const [showAddStaffPopup, setShowAddStaffpopup] = useState(false);
    const [showEditStaffPopup, setShowEditStaffpopup] = useState(false);
    const [showDeleteStaffPopup, setShowDeleteStaffpopup] = useState(false);

    const openAddStaffPopup = () => {
        setShowAddStaffpopup(true);
    }

    const closeAddStaffPopup = () => {
        setShowAddStaffpopup(false);
    }

    const openEditStaffPopup = (staffID: number) => {
        // setShowEditStaffpopup(true);
        const selectedStaff = staffListData.find((staff) => staff.staff === staffID);
        console.log("Finding the selected object in an array", selectedStaff);

        if (selectedStaff) {
            setSelectedStaffID(staffID);
            setShowEditStaffpopup(true);
        }
        console.log("Edit the selected staff with ID:", staffID);
    }

    const closeEditStaffPopup = () => {
        setShowEditStaffpopup(false);
    }

    const openDeleteStaffPopup = (staffID: number) => {
        setShowDeleteStaffpopup(true);
        setSelectedStaffID(staffID);
        console.log("Delete the selected staff with ID:", staffID);
    }

    const closeDeleteStaffPopup = () => {
        setShowDeleteStaffpopup(false);
    }

    useEffect(() => {

        const fetchStaffList = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const data = await staffList();
                setStaffListData(data.results.data || []); // Fallback to an empty array if data is null
                console.log("Staff list data log:", data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        };

        fetchStaffList();
    }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-3xl font-semibold py-5">All Users (15)</h5>
                </div>

                {/* Add New Staff */}
                <div
                    onClick={openAddStaffPopup}
                    className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group">
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
                        {staffListData.length > 0 ? (
                            staffListData.map((staff) => (
                                <tr key={staff.staff} className="border-b-2">
                                    <td className="text-center px-2 py-2">
                                        <label className="cl-checkbox">
                                            <input type="checkbox" />
                                            <span></span>
                                        </label>
                                    </td>
                                    <td className="px-2 py-5">{staff.name}</td>
                                    <td className="text-center px-2 py-5">{staff.role_name}</td>
                                    <td className="text-center px-2 py-5">{staff.branch_name}</td>
                                    <td className="text-center px-2 py-5">{staff.status}</td>
                                    <td className="px-2 py-5">
                                        <div className="flex items-center space-x-5">
                                            <button>
                                                <img src={resetPasswordButton} alt="Reset Password" />
                                            </button>
                                            <button onClick={() => openEditStaffPopup(Number(staff.staff))}>
                                                <img src={editButton} alt="Edit" />
                                            </button>
                                            <button onClick={() => openDeleteStaffPopup(Number(staff.staff))}>
                                                <img src={deleteButton} alt="Delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-5">
                                    No staff data available.
                                </td>
                            </tr>
                        )}

                        {/* <tr className="border-b-2">

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
                                    <button
                                        className="bg-mindfulWhite text-md text-mindfulYellow border-2 border-mindfulYellow rounded-[6px] px-2 py-1">
                                        Reset Password
                                    </button>
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

                        </tr> */}

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div>
                <Pagination />
            </div>

            {showAddStaffPopup && <AddStaffPopup closePopup={closeAddStaffPopup} />}
            {/* {showEditStaffPopup && <EditStaffPopup closePopup={closeEditStaffPopup} editStaffData={staffListData} />} */}
            {showEditStaffPopup && selectedStaffID && (
                <EditStaffPopup
                    closePopup={closeEditStaffPopup}
                    editStaffData={staffListData.find((staff) => staff.staff === selectedStaffID) || defaultEditStaffData}
                />
            )}
            {showDeleteStaffPopup && <DeleteStaffPopup closePopup={closeDeleteStaffPopup} staffID={Number(selectedStaffID)} />}
        </div >
    )
}
