import React, { useEffect, useState } from 'react'
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField';
import { IoCloseCircle } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';
import { PiCamera } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { editStaff, staffBranchList, staffRoleList } from '@/api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { ShimmerTable } from 'shimmer-effects-react';


interface EditStaffPopupProps {
    editStaffData: {
        staff?: string | number; // Allow both string and number
        name: string;
        role_id?: string;
        role_name: string;
        branch_id?: string;
        branch_name: string;
        status: string;
        phone: string;
        photo: string;

    };

    closePopup: () => void;
}

interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

interface StaffRoleListDataProps {
    role_id?: number;
    role_name: string;
    status: string;
}


// Zod schema for validation
const editStaffSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    role: zod.string().min(1, "Role is required"),
    branch: zod.string().min(1, "Branch is required"),
    staffPhoneNumber: zod.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

});

type EditStaffFormData = zod.infer<typeof editStaffSchema>;


export const EditStaffPopup: React.FC<EditStaffPopupProps> = ({ closePopup, editStaffData }) => {

    const navigate = useNavigate();

    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [staffRoleListData, setStaffRoleListData] = useState<StaffRoleListDataProps[]>([]);

    const [loading, setLoading] = useState(false); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);

    const [photo, setPhoto] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string>(editStaffData.photo ? editStaffData.photo.split('/').pop() || '' : ''); // Extract file name if it's a path

    console.log("photoName", photoName)

    const { register, handleSubmit, formState: { errors } } = useForm<EditStaffFormData>({
        resolver: zodResolver(editStaffSchema),
        defaultValues: {
            name: editStaffData.name || '',
            role: String(editStaffData.role_id) || '',
            branch: String(editStaffData.branch_id) || '',
            staffPhoneNumber: String(editStaffData.phone) || '',
        },
    });


    useEffect(() => {

        const fetchStaffBranchRoleList = async () => {
            setLoading(true); // Set loading to true before fetching
            try {

                const rolesData = await staffRoleList();
                const branchesData = await staffBranchList();

                // const data = await staffBranchList();
                setStaffRoleListData(rolesData.data || []); // Fallback to an empty array if data is null
                console.log("Staff role list data log for select field:", rolesData);

                setStaffBranchListData(branchesData.data || []); // Fallback to an empty array if data is null
                console.log("Staff branch list data log for select field:", branchesData.data);


            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff branch list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        };

        fetchStaffBranchRoleList();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // setPhoto(event.target.files[0]);
            const file = event.target.files[0];
            setPhoto(file); // Update the photo state with the new file
            setPhotoName(file.name); // Update the photo name state with the new file name

        }
    };

    const onSubmit = async (data: EditStaffFormData) => {
        console.log("Updated Staff Data:", data);

        try {
            const formData = new FormData();
            // formData.append('staff_id', editStaffData.staff || '');
            formData.append('staff_id', editStaffData.staff?.toString() || '');
            formData.append('name', data.name);
            formData.append('role', data.role);
            formData.append('branch_id', data.branch);
            // formData.append('branchManager', data.branchManager);
            // formData.append('branchAddress', data.branchAddress);
            // formData.append('location', data.branch);
            formData.append('phone', data.staffPhoneNumber);

            if (photo) {
                formData.append('photo', photo);
            }

            // if (file) {
            //     formData.append('logo', file); // Append file if uploaded
            // }

            const editingStaff = await editStaff(formData); // Assuming editBranch can handle FormData
            console.log(editingStaff, "Staff edited successfully");

            // closePopup();
            if (editingStaff.status === "success") {
                closePopup(); // Close popup after deletion
                navigate(0);
                // refreshData(); // Refresh data after deletion
            }

        } catch (error: any) {
            console.error("Error editing staff:", error.message);
            setError(error.message || "Failed to update the staff. Please try again.");
        } finally {
            setLoading(false);
        }
        closePopup(); // Close popup after submission
    };


    // if (loading) return <div>Loading...</div>;
    // if (loading) return <div>
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // </div>;
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    {/* <div className="container mx-auto"> */}

                    <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5 my-5 max-2xl:overflow-y-auto max-2xl:h-[75%]">


                        <div className="relative mb-10">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Staff</h2>
                            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                            </div>
                        </div>

                        {/* Close Button */}
                        <div
                            onClick={closePopup}
                            className="absolute top-5 right-5 w-fit cursor-pointer"
                        >
                            <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                        </div>

                        {loading ? (<div>
                            <ShimmerTable
                                mode="light"
                                row={6}
                                col={1}
                                border={1}
                                borderColor={"#cbd5e1"}
                                rounded={0.25}
                                rowGap={16}
                                colPadding={[15, 5, 15, 5]}
                            />
                        </div>) : (
                            <div className="">
                                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="">

                                        {/* Add Staff Form */}
                                        <div className="space-y-5">

                                            {/* City */}
                                            <div className="">
                                                <label
                                                    htmlFor="name"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Name
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    // name="name"
                                                    id="name"
                                                    placeholder="Name"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("name")}
                                                />

                                                {errors.name && (
                                                    <p className="text-sm text-red-600">{errors.name.message}</p>
                                                )}
                                            </div>

                                            {/* Role */}
                                            <div>
                                                <label
                                                    htmlFor="role"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Role
                                                </label>

                                                <SelectField
                                                    label={''}
                                                    // name="role"
                                                    id="role"
                                                    options={staffRoleListData.map((role) => ({
                                                        value: role.role_id?.toString() || '', // Ensure value is a string
                                                        label: role.role_name,
                                                    }))}
                                                    // defaultValue={editStaffData.role_name} // Set the default value to the role name
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("role")}
                                                />

                                                {errors.role && (
                                                    <p className="text-sm text-red-600">{errors.role.message}</p>
                                                )}
                                            </div>

                                            {/* Branch */}
                                            <div>
                                                <label
                                                    htmlFor="branch"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Branch
                                                </label>

                                                <SelectField
                                                    label={''}
                                                    // name="branch"
                                                    id="branch"
                                                    options={staffBranchListData.map((branch) => ({
                                                        value: branch.branch_id?.toString() || '', // Ensure value is a string
                                                        label: branch.branch_name || 'Unknown',   // Provide a fallback label
                                                    }))}
                                                    // defaultValue={editStaffData.branch_name} // Set the default value to the branch name
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("branch")}
                                                />

                                                {errors.branch && (
                                                    <p className="text-sm text-red-600">{errors.branch.message}</p>
                                                )}
                                            </div>


                                            {/* Phone */}
                                            <div className="">
                                                <label
                                                    htmlFor="phone"
                                                    className="text-md text-mindfulBlack font-semibold mb-1"
                                                >
                                                    Phone Number
                                                </label>
                                                <InputField
                                                    label={''}
                                                    type="text"
                                                    // name="name"
                                                    id="phone"
                                                    placeholder="Phone Number"
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("staffPhoneNumber")}
                                                />

                                                {errors.staffPhoneNumber && (
                                                    <p className="text-sm text-red-600">{errors.staffPhoneNumber.message}</p>
                                                )}

                                                {error && <p className="text-sm text-red-600">{error}</p>}
                                            </div>


                                            {/* Upload Photo */}
                                            <div className="flex items-end justify-between max-2xl:flex-wrap max-2xl:gap-2">

                                                <div>

                                                    <label
                                                        htmlFor="uploadPhoto"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Upload Photo
                                                    </label>

                                                    <div className="relative">
                                                        <InputField
                                                            label={''}
                                                            placeholder="Take a Photo"
                                                            className="w-40 rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        />
                                                        <PiCamera className="text-[22px] text-mindfulBlack absolute top-2 right-2 cursor-pointer" />
                                                    </div>
                                                </div>

                                                <div>
                                                    {/* File Upload Area */}
                                                    <div>
                                                        <div className="">
                                                            <label
                                                                htmlFor="upload-photo"
                                                                className="w-72 mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer max-2xl:w-auto"
                                                            >

                                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                                {photoName || 'Upload Files'}
                                                            </label>
                                                            <input
                                                                id="upload-photo"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>


                                    {/* Buttons */}
                                    <div className="pt-10">
                                        <div className="flex items-center justify-center space-x-5">
                                            {/* Cancel Button */}
                                            <Button
                                                onClick={closePopup}
                                                buttonType="button"
                                                buttonTitle="Cancel"
                                                className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            />

                                            {/* Submit Button */}
                                            <Button
                                                buttonType="submit"
                                                buttonTitle="Update"
                                                className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}


