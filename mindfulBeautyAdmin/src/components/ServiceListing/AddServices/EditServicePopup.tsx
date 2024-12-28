import { InputField } from '@/common/InputField'
import { Button } from '@/common/Button';
import { IoCloseCircle } from 'react-icons/io5'
import { useEffect, useState } from 'react';
import { editServices, staffBranchList } from '@/api/apiConfig';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// import { SelectField } from '@/common/SelectField';


interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

interface EditServicePopupProps {
    editServiceData: {
        provider_service_id: string;
        price: string;
        service_time: string;
    };
    closePopup: () => void;
}

// Zod schema for validation
const editServiceSchema = zod.object({
    provider_service_id: zod.string().optional(),
    price: zod.string().min(1, "Price is required"),
    service_time: zod.string().min(1, "Duration is required"),
});

type EditServiceFormData = zod.infer<typeof editServiceSchema>;

export const EditServicePopup: React.FC<EditServicePopupProps> = ({ editServiceData, closePopup }) => {

    // const [serviceListData, setServiceListData] = useState<ServiceListProps[]>([]);
    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Login Provider ID
    const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Login Provider ID from session storage", sessionLoginProviderID);

    // Pagination state
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [itemsPerPage, setItemsPerPage] = useState(10);


    const { register, handleSubmit, formState: { errors } } = useForm<EditServiceFormData>({
        resolver: zodResolver(editServiceSchema),
        defaultValues: {
            price: editServiceData.price,
            service_time: editServiceData.service_time,
        },
    });

    useEffect(() => {
        // Fetch data from API
        const fetchServiceBranchData = async () => {

            try {
                setLoading(true);

                const data = await staffBranchList();
                setStaffBranchListData(data.data || []);
                console.log("Fetched Services List: ", data.data);

                // setServiceListData(data.results || []);
                // setTotalItems(data.count);

                console.log("Fetched Service List data log:", data);
                console.log("Fetched Booking List pagination count data log :", data.count);

            } catch (error: any) {
                setError(error.message || "Failed to fetch service list data.");
            } finally {
                setLoading(false);
            }
        };

        fetchServiceBranchData();
    }, []);



    // Handle the form submission
    // Handle the form submission
    const onSubmit = async (data: EditServiceFormData) => {
        console.log("Updated Service Data:", data);

        try {
            setLoading(true);

            // Construct the FormData object for editing
            const formData = new FormData();
            formData.append('provider_service_id', String(editServiceData.provider_service_id));
            formData.append('price', data.price);
            formData.append('service_time', data.service_time);

            await editServices(formData); // Assuming editServices can handle FormData
            console.log("Service edited successfully");

            // Close the popup after successful submission
            closePopup();
        } catch (error: any) {
            console.error("Error editing service:", error.message);
            setError(error.message || "Failed to update the service. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="container mx-auto">

                    <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">


                        <div className="relative mb-16">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Service</h2>
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
                            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-2 gap-x-5 items-center">

                                    {/* Grid Column One */}
                                    <div className="space-y-5">

                                        {/* City */}
                                        {/* <div className="">
                                            <label
                                                htmlFor="city"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Service
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                // name="city"
                                                id="city"
                                                placeholder="City"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                // {...register("name")}
                                                readOnly
                                            />

                                        </div> */}

                                        {/* Category */}
                                        {/* <div className="">
                                            <label
                                                htmlFor="category"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Category
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                // name="category"
                                                id="category"
                                                placeholder="Skin"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                // {...register("category")}
                                                readOnly

                                            />
                                        </div> */}

                                        {/* Price */}
                                        <div className="">
                                            <label
                                                htmlFor="price"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Price
                                            </label>
                                            <InputField
                                                label={''}
                                                type="number"
                                                // name="price"
                                                id="price"
                                                placeholder="price"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                {...register("price")}

                                            />
                                            {errors.price && (
                                                <p className="text-sm text-red-500">{errors.price.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Grid Column two */}
                                    <div className="space-y-5">
                                        {/* Add Branch */}
                                        {/* <div className="">
                                            <label
                                                htmlFor="branch"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Add Branch
                                            </label>
                        
                                            <SelectField
                                                label={''}
                                                // name="branch"
                                                id="branch"
                                                options={staffBranchListData.map((branch) => ({
                                                    value: branch.branch_id?.toString() || '', // Ensure value is a string
                                                    label: branch.branch_name || 'Unknown',   // Provide a fallback label
                                                }))}
                                                defaultValue={editStaffData.branch_name} // Set the default value to the branch name
                                                className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                disabled
                                            />
                                        </div> */}

                                        {/* Sub Category */}
                                        {/* <div className="">
                                            <label
                                                htmlFor="subCategory"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Sub Category
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                // name="subCategory"
                                                id="subCategory"
                                                placeholder="subCategory"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                // {...register("subcategory")}
                                                readOnly


                                            />
                                        </div> */}

                                        {/* Duration */}
                                        <div className="">
                                            <label
                                                htmlFor="time"
                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                            >
                                                Duration
                                            </label>
                                            <InputField
                                                label={''}
                                                type="text"
                                                // name="time"
                                                id="time"
                                                placeholder="time"
                                                className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                {...register("service_time")}
                                            />
                                            {errors.service_time && (
                                                <p className="text-sm text-red-500">{errors.service_time.message}</p>
                                            )}
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
                                            buttonTitle="Save"
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
    )
}
