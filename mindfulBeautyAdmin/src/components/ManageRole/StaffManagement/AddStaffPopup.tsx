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
import { addStaff, staffBranchList, staffRoleList } from '@/api/apiConfig';

interface AddStaffPopupProps {
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

// Zod schema for form validation
const addStaffSchema = zod.object({
    name: zod.string().min(3, "Name is required"),
    role: zod.string().min(1, "Role is required"),
    branch: zod.string().min(1, "Branch is required"),
    // photo: zod.any().optional(), // Optional file input
});

type addStaffFormData = zod.infer<typeof addStaffSchema>;


export const AddStaffPopup: React.FC<AddStaffPopupProps> = ({ closePopup }) => {

    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [staffRoleListData, setStaffRoleListData] = useState<StaffRoleListDataProps[]>([]);

    const [loading, setLoading] = useState(false); // Start with true as data needs to be fetched
    const [error, setError] = useState<string | null>(null);

    // File states
    const [selectedPhoto, setSelectedPhoto] = useState<{ [key: string]: File | null }>({
        photo: null,
    });



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedPhoto((prev) => ({ ...prev, [fileKey]: file }));
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<addStaffFormData>({
        resolver: zodResolver(addStaffSchema),
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

                setStaffBranchListData(branchesData.results.data || []); // Fallback to an empty array if data is null
                console.log("Staff branch list data log for select field:", branchesData);


            } catch (error: any) {
                setError(error.message || 'Failed to fetch staff branch list');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        };

        // const fetchStaffRoleList = async () => {
        //     setLoading(true); // Set loading to true before fetching
        //     try {
        //         const data = await staffRoleList();
        //         setStaffRoleListData(data || []); // Fallback to an empty array if data is null
        //         console.log("Staff role list data log:", data);
        //     } catch (error: any) {
        //         setError(error.message || 'Failed to fetch staff role list');
        //     } finally {
        //         setLoading(false); // Ensure loading is false after fetching
        //     }
        // };

        // fetchStaffBranchList(), fetchStaffRoleList();
        fetchStaffBranchRoleList();
    }, []);


    const onSubmit = async (data: addStaffFormData) => {
        setLoading(true);
        setError(null);

        console.log("Submitted data:", data);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("role", data.role);
            formData.append("branch_id", data.branch);

            // Append selected files
            Object.keys(selectedPhoto).forEach((key) => {
                const file = selectedPhoto[key];
                if (file) {
                    formData.append(key, file);
                }
            });

            // Debugging: Log the FormData contents
            console.log("Add Staff popup FormData Contents:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value, "Hello Gopika");
            }

            // Call the taxInfo function
            const addStaffData = await addStaff(formData);

            console.log("Add Staff Details Submission Success:", addStaffData);

            closePopup(); // Close popup after submission

        }

        catch (error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }

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
                                <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
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
                                                    <p className="text-sm text-red-500">{errors.name.message}</p>
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
                                                    // options={[
                                                    //     { value: "kochi", label: "Kochi" },
                                                    //     { value: "trivandrum", label: "Trivandrum" },
                                                    //     { value: "kollam", label: "Kollam" },
                                                    //     { value: "thrissur", label: "Thrissur" },
                                                    // ]}
                                                    options={
                                                        staffRoleListData.length
                                                            ? staffRoleListData.map((role) => ({
                                                                key: role.role_id,  // key is used internally for React
                                                                value: role.role_id ? String(role.role_id) : "", // Convert role_id to string
                                                                label: role.role_name,
                                                            }))
                                                            : [{ value: "", label: "No roles available" }]
                                                    }
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("role")}
                                                />

                                                {errors.role && (
                                                    <p className="text-sm text-red-500">{errors.role.message}</p>
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
                                                    options={
                                                        staffBranchListData.length
                                                            ? staffBranchListData.map((branch) => ({
                                                                key: branch.branch_id,
                                                                value: branch.branch_id ? String(branch.branch_id) : "",
                                                                label: branch.branch_name,
                                                            }))
                                                            : [{ value: "", label: "No branch available" }]
                                                    }
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    {...register("branch")}
                                                />

                                                {errors.branch && (
                                                    <p className="text-sm text-red-500">{errors.branch.message}</p>
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
                                                                {/* Upload Files */}
                                                                {selectedPhoto["photo"]?.name || 'Upload Files'}

                                                            </label>
                                                            <input
                                                                id="upload-photo"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, "photo")}
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
