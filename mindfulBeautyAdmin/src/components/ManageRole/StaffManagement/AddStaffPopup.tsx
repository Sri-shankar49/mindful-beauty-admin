import React, { useState, useEffect } from 'react'
import { Button } from '@/common/Button';
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField';
import { IoCloseCircle } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';
import { PiCamera } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { staffList } from '@/api/apiConfig';

interface AddStaffPopupProps {
    closePopup: () => void;
}

interface StaffManagementProps {
    id: number;
    name: string;
    role_name: string;
    branch_name: string;
    status: string;
}

// Zod schema for form validation
const addStaffSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    role: zod.string().min(1, "Role is required"),
    branch: zod.string().min(1, "Branch is required"),
    photo: zod.any().optional(), // Optional file input
});

type addStaffFormData = zod.infer<typeof addStaffSchema>;


export const AddStaffPopup: React.FC<AddStaffPopupProps> = ({ closePopup }) => {

    const [staffListData, setStaffListData] = useState<StaffManagementProps[]>([]);

    const [loading, setLoading] = useState(true); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<addStaffFormData>({
        resolver: zodResolver(addStaffSchema),
    });

    useEffect(() => {

        const fetchStaffList = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const data = await staffList();
                setStaffListData(data || []); // Fallback to an empty array if data is null
                console.log("Staff list data log:", data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        };

        fetchStaffList();
    }, []);


    const onSubmit = (data: addStaffFormData) => {
        console.log("Submitted data:", data);
        closePopup(); // Close popup after submission
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Add Staff</h2>
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

                            <div className="">
                                <form action="" method="post" onClick={handleSubmit(onSubmit)}>
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
                                                    // options={[]}
                                                    // options={[
                                                    //     { value: "kochi", label: "Kochi" },
                                                    //     { value: "trivandrum", label: "Trivandrum" },
                                                    //     { value: "kollam", label: "Kollam" },
                                                    //     { value: "thrissur", label: "Thrissur" },
                                                    // ]}
                                                    options={staffListData.map((staff) => (
                                                        { value: staff.role_name, label: staff.role_name }
                                                    ))}
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
                                                    // options={[
                                                    //     { value: "kochi", label: "Kochi" },
                                                    //     { value: "trivandrum", label: "Trivandrum" },
                                                    //     { value: "kollam", label: "Kollam" },
                                                    //     { value: "thrissur", label: "Thrissur" },
                                                    // ]}
                                                    options={staffListData.map((staff) => (
                                                        { value: staff.branch_name, label: staff.branch_name }
                                                    ))}
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("branch")}
                                                />

                                                {errors.branch && (
                                                    <p className="text-sm text-red-600 ">{errors.branch.message}</p>
                                                )}
                                            </div>

                                            {/* Upload Photo */}
                                            <div className="flex items-end justify-between">

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
                                                                className="w-fit mx-auto text-sm text-mindfulWhite uppercase flex items-center bg-mindfulSecondaryBlue rounded-sm px-4 py-[0.6rem] cursor-pointer"
                                                            >

                                                                <MdCloudUpload className="text-[18px] text-mindfulWhite mr-2" />
                                                                Upload Files
                                                            </label>
                                                            <input
                                                                id="upload-photo"
                                                                type="file"
                                                                accept="image/*"
                                                                // onChange={handleFileChange}
                                                                className="hidden"
                                                            // {...register("photo")}
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
                                                buttonTitle="Submit"
                                                className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
