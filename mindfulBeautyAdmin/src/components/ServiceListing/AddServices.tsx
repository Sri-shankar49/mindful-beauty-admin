import { useEffect, useState } from 'react';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField'
import { PiCopySimpleLight } from "react-icons/pi";
import { IoCloseCircle } from 'react-icons/io5'
import { CopyServicesPopup } from './AddServices/CopyServicesPopup';
import { activeServices, addServices, addServicesCheckbox, categories, staffBranchList, subCategories, updateActiveServices } from '@/api/apiConfig';
import "./ServiceListing.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Zod schema for form validation
const addServicesSchema = zod.object({
    // city: zod.string().min(3, "Name is required"),
    // branch: zod.string().min(1, "Branch is required"),
    // category: zod.string().min(1, "Category is required"),
    // subCategory: zod.string().min(1, "Sub Category is required"),
    // checkbox: zod.array(zod.string()).min(1, "At least one service must be selected"),
});

type addServicesFormData = zod.infer<typeof addServicesSchema>;


interface categoriesDataProps {
    category_id?: string;
    category_name: string;
    status: string;
    image: string;
}

interface SubCategoriesDataProps {
    subcategory_id?: string;
    subcategory_name: string;
    category?: number;
    status: string;
}

interface checkboxDataProps {
    service_id?: string;
    service_name: string;
}

interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

interface Subcategories {
    subcategory_id?: string;
    subcategory: string;
    services: Services[]
}

interface Services {
    service_id?: string;
    service_name: string;
    sku_value: string;
    price: string;
    service_time: string;
}

interface ActiveServicesListDataProps {
    category: string;
    category_id: number;
    subcategories: Subcategories[];
}




export const AddServices: React.FC = () => {

    const [showCopyServicesPopup, setShowCopyServicesPopup] = useState(false);

    const openCopyServicesPopup = () => {
        setShowCopyServicesPopup(true);
    }

    const closeCopyServicesPopup = () => {
        setShowCopyServicesPopup(false);
    }

    const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
    const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);
    const [checkboxData, setcheckboxData] = useState<checkboxDataProps[]>([]);
    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [activeServicesData, setActiveServicesData] = useState<ActiveServicesListDataProps[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [selectedBranch, setSelectedBranch] = useState<string>("");

    // State to store selected checkbox IDs
    const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Registration Provider ID
    const sessionProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Selected Provider ID from session storage", sessionProviderID);

    const { register, handleSubmit, formState: { errors } } = useForm<addServicesFormData>({
        resolver: zodResolver(addServicesSchema),
    });


    useEffect(() => {
        const loadCategorySelect = async () => {
            setLoading(true);

            try {
                const loadCategoriesData = await categories();
                const branchesData = await staffBranchList();
                // const activeServicesListData = await activeServices(Number(sessionProviderID), 1);
                const activeServicesListData = await activeServices(Number(sessionProviderID), 0);

                setcategoriesData(loadCategoriesData.data);

                setStaffBranchListData(branchesData.data || []); // Fallback to an empty array if data is null

                setActiveServicesData(activeServicesListData)

                console.log("Category list data log:", loadCategoriesData);

                console.log("Staff branch list data log for select field:", branchesData);

                console.log("Active Services list data log:", activeServicesListData);


                // if (loadCategoriesData.status == "success") {
                //     // sessionStorage.setItem("categoryID", loadCategoriesData.data[0].category_id);
                //     sessionStorage.setItem("categoryID", loadCategoriesData.data.map((category: any) => (category.category_id)));
                // }
            }

            catch (error: any) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        loadCategorySelect();
    }, []);


    // Function to handle category change and fetch subcategories
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = event.target.value; // Get the selected categoryId
        setSelectedCategory(selectedCategoryId); // Update state

        try {
            setLoading(true);
            const loadSubCategoriesData = await subCategories(selectedCategoryId); // Pass categoryId to API
            setSubCategoriesData(loadSubCategoriesData.data); // Update subcategories
            console.log("Sub Category list data log:", loadSubCategoriesData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    const handleBranchChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchId = event.target.value; // Get the selected branch ID
        setSelectedBranch(selectedBranchId); // Update branch selection state


        try {
            setLoading(true);

            // Fetch active services for the selected branch and category
            // const activeServicesListData = await activeServices(Number(selectedCategory), Number(selectedBranchId));
            const activeServicesListData = await activeServices(Number(sessionProviderID), Number(selectedBranchId));

            // Update the active services data
            setActiveServicesData(activeServicesListData);

            console.log("Updated Active Services Data for Branch:", activeServicesListData);
        } catch (error: any) {
            setError(error.message || "Failed to fetch active services for the selected branch");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle sub category change and fetch handle Check box List
    const handleCheckboxList = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedSubCategoryId = event.target.value; // Get the selected categoryId
        setSelectedSubCategory(selectedSubCategoryId); // Update state

        try {
            setLoading(true);
            const loadCheckboxData = await addServicesCheckbox(selectedCategory, selectedSubCategoryId); // Pass categoryId to API
            setcheckboxData(loadCheckboxData.data); // Update subcategories
            console.log("Checkbox list data log:", loadCheckboxData);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCheckboxClick = (service_id: number) => {

        setSelectedCheckboxIDs((prevSelected) => {
            const updatedSelected = prevSelected.includes(service_id)
                ? prevSelected.filter((id) => id !== service_id) // Remove if already selected
                : [...prevSelected, service_id]; // Add if not already selected

            // Log the updated array here
            console.log("Updated Selected Service IDs:", updatedSelected);

            return updatedSelected;
        });

        // Log the clicked service ID
        console.log("Clicked Service ID:", service_id);

        // Log the updated array of selected IDs
        console.log("Selected Service IDs:", selectedCheckboxIDs);

    }

    // const joinedServiceIDs = `"${selectedCheckboxIDs.join(" ,")}"`;
    // console.log("Joined service IDs:", joinedServiceIDs);


    const onSubmitAddServices = async (data: addServicesFormData) => {
        setLoading(true);
        setError(null);

        // Add logic to handle form submission
        console.log("Submitted data:", data);

        try {
            const formData = new FormData();
            formData.append("provider_id", sessionProviderID || "");
            formData.append("branch_id", selectedBranch);
            // formData.append("category_id", data.category);
            formData.append("category_id", selectedCategory);
            formData.append("subcategory_id", selectedSubCategory);
            // formData.append("subcategory_id", data.subCategory);
            formData.append("service_ids", selectedCheckboxIDs || "");

            // Call the taxInfo function
            const addServicesData = await addServices(formData);

            console.log("Add Staff Details Submission Success:", addServicesData);

            if (data.status === "success") {
                // Set the success message

            }
        }
        catch (error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }

    }


    // const handleDeleteServiceData = (service_id: number) => {
    //     console.log("Delete service ID:", service_id);

    // }

    // Function to handle deletion of a service
    const handleDeleteServiceData = (categoryId: string, subcategoryId: string, serviceId: string) => {

        console.log("Delete service ID:", serviceId);

        setActiveServicesData((prevData) =>
            prevData.map((category) =>
                category.category === categoryId
                    ? {
                        ...category,
                        subcategories: category.subcategories.map((subcategory) =>
                            subcategory.subcategory_id === subcategoryId
                                ? {
                                    ...subcategory,
                                    services: subcategory.services.filter(
                                        (service) => service.service_id !== serviceId
                                    ),
                                }
                                : subcategory
                        ),
                    }
                    : category
            )
        );
    }


    // const onSubmitActiveServices = async (data) => {
    //     setLoading(true);
    //     setError(null);

    //     // Add logic to handle form submission
    //     console.log("Submitted data:", data);

    //     try {
    //         const formData = new FormData();

    //         // Call the taxInfo function
    //         const updateServicesData = await updateActiveServices(formData);

    //         console.log("Update Services Data Details Submission Success:", updateServicesData);
    //     }
    //     catch (error: any) {
    //         setError(error.message || "Something went wrong.");
    //     } finally {
    //         setLoading(false);
    //     }

    // }

    const handleInputChange = (serviceId: string, field: string, value: string) => {
        setActiveServicesData((prevData) =>
            prevData.map((category) => ({
                ...category,
                subcategories: category.subcategories.map((subcategory) => ({
                    ...subcategory,
                    services: subcategory.services.map((service) =>
                        service.service_id === serviceId ? { ...service, [field]: value } : service
                    ),
                })),
            }))
        );
    };

    const onSubmitActiveServices = async () => {
        setLoading(true);
        setError(null);

        try {
            // Prepare the updated services data
            const updatedServices = activeServicesData.flatMap((category) =>
                category.subcategories.flatMap((subcategory) =>
                    subcategory.services.map((service) => ({
                        id: service.service_id,
                        price: service.price,
                        duration: service.service_time,
                    }))
                )
            );

            // Create FormData object
            const formData = new FormData();
            formData.append("services", JSON.stringify(updatedServices));

            // Call the API
            const response = await updateActiveServices(formData);
            console.log("Update Services Data Submission Success:", response);

            alert("Services updated successfully!");
        } catch (error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <div className="bg-mindfulLightPink px-5 py-5" >

                <div className="bg-mindfulWhite px-5 py-5">
                    <div className="">
                        <div>
                            <h5 className="text-3xl font-semibold py-5">Add Services</h5>
                        </div>


                        <div className="grid grid-cols-2 gap-5">

                            {/* Whole Grid Column One */}
                            <div className="">
                                <form onSubmit={handleSubmit(onSubmitAddServices)} action="" method="post">

                                    <div className="bg-mindfulLightgrey rounded-sm px-5 py-5">
                                        <div className="grid grid-cols-2 gap-5">

                                            {/* Grid Column One */}
                                            <div className="space-y-5">
                                                {/* City */}
                                                <div>
                                                    <label
                                                        htmlFor="city"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        City
                                                    </label>

                                                    <SelectField
                                                        label={''}
                                                        // name="city"
                                                        id="city"
                                                        options={[
                                                            { value: "kochi", label: "Kochi" },
                                                            { value: "trivandrum", label: "Trivandrum" },
                                                            { value: "kollam", label: "Kollam" },
                                                            { value: "thrissur", label: "Thrissur" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    // {...register("city")}
                                                    />

                                                    {/* {errors.city && (
                                                        <p className="text-sm text-red-500">{errors.city.message}</p>
                                                    )} */}
                                                </div>

                                                {/* Category */}
                                                <div>
                                                    <label
                                                        htmlFor="category"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Category
                                                    </label>

                                                    <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        value={selectedCategory}
                                                        onChange={handleCategoryChange} // Call on change
                                                    // {...register("category")}

                                                    >
                                                        <option value="" selected disabled>
                                                            Select Category
                                                        </option>

                                                        {categoriesData.map((category) => (
                                                            <option key={category.category_id} value={category.category_id}>
                                                                {category.category_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* {errors.category && (
                                                        <p className="text-sm text-red-500">{errors.category.message}</p>
                                                    )} */}
                                                </div>
                                            </div>

                                            {/* Grid Column Two */}
                                            <div className="space-y-5">

                                                {/* Branch */}
                                                <div>
                                                    <label
                                                        htmlFor="branch"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Branch
                                                    </label>
                                                    {/* <SelectField
                                                        label=""
                                                        name="branch"
                                                        // required
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"

                                                        options={
                                                            staffBranchListData.length
                                                                ? staffBranchListData.map((branch) => ({
                                                                    key: branch.branch_id,
                                                                    value: branch.branch_id ? String(branch.branch_id) : "",
                                                                    label: branch.branch_name,
                                                                }))
                                                                : [{ value: "", label: "No branch available" }]
                                                        }
                                                    // error="This field is required."
                                                    /> */}

                                                    <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        value={selectedBranch}
                                                        onChange={handleBranchChange} // Call on change

                                                    >
                                                        <option value="" selected disabled>
                                                            Select Branch
                                                        </option>

                                                        {staffBranchListData.map((branch) => (
                                                            <option key={branch.branch_id} value={branch.branch_id}>
                                                                {branch.branch_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* {errors.branch && (
                                                        <p className="text-sm text-red-500">{errors.branch.message}</p>
                                                    )} */}
                                                </div>

                                                {/* Sub Category */}
                                                <div>
                                                    <label
                                                        htmlFor="subCategory"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Sub Category
                                                    </label>

                                                    <select
                                                        // name="subCategory"
                                                        id="subCategory"
                                                        className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                        value={selectedSubCategory}
                                                        onChange={handleCheckboxList} // Call on change
                                                    // {...register("subCategory")}
                                                    >
                                                        <option value="" selected disabled>
                                                            Select Sub Category
                                                        </option>

                                                        {subCategoriesData.map((subCategory) => (
                                                            <option key={subCategory.subcategory_id} value={subCategory.subcategory_id}>
                                                                {subCategory.subcategory_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* {errors.subCategory && (
                                                        <p className="text-sm text-red-500">{errors.subCategory.message}</p>
                                                    )} */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div>

                                        <div>
                                            <h5 className="text-lg font-semibold py-5">Services</h5>
                                        </div>

                                        <div className="grid grid-cols-1">

                                            {/* Grid Column One */}
                                            <div className="space-y-5">

                                                {/* Services List */}
                                                {checkboxData.length > 0 ? (
                                                    checkboxData.map((service) => (
                                                        <div key={service.service_id}>
                                                            <label htmlFor={service.service_id} className="custom-checkbox">
                                                                <input
                                                                    id={service.service_id}
                                                                    // name="dummy"
                                                                    type="checkbox"
                                                                    value={service.service_id}
                                                                    // onChange={(e) => console.log("Clicked Service ID:", service.service_id, "Checked:", e.target.checked)}
                                                                    onChange={() => handleCheckboxClick(Number(service.service_id))}
                                                                // {...register("checkbox")}

                                                                />
                                                                <span className="checkmark"></span>{service.service_name}
                                                            </label>

                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No services available</div>
                                                )}

                                                {/* {errors.checkbox && (
                                                    <p className="text-sm text-red-500">{errors.checkbox.message}</p>
                                                )} */}

                                            </div>

                                        </div>
                                    </div>


                                    {/* Add Service Button */}
                                    <div className="text-center mt-20">
                                        <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">Add Service</button>
                                    </div>
                                </form>
                            </div>

                            {/* Whole Grid Column Two */}
                            <div className="border-l-2 pl-5 h-screen overflow-y-auto">

                                <div className="border-b-2">
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h5 className="text-2xl font-semibold py-3">Active Services</h5>
                                        </div>

                                        <div className="flex items-center space-x-5">

                                            {/* Copy Services */}
                                            <div
                                                onClick={openCopyServicesPopup}
                                                className="flex items-center bg-mindfulBlue border-[1px] border-mindfulBlue rounded-[5px] px-3 py-1.5 cursor-pointer hover:bg-mindfulWhite hover:border-mindfulBlue group"
                                            >
                                                <div>
                                                    <PiCopySimpleLight className="text-[18px] text-mindfulWhite group-hover:text-mindfulBlue" />
                                                </div>

                                                <Button
                                                    buttonType="button"
                                                    buttonTitle="Copy Services"
                                                    className="bg-mindfulBlue text-mindfulWhite pl-2 group-hover:bg-mindfulWhite group-hover:text-mindfulBlue"
                                                />
                                            </div>

                                            {/* Branch Select Field */}
                                            <div>
                                                {/* <SelectField
                                                    label=""
                                                    name="branch"
                                                    // required
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={selectedBranch}
                                                    onChange={handleBranchChange} // Call on change
                                                    options={
                                                        staffBranchListData.length
                                                            ? staffBranchListData.map((branch) => ({
                                                                key: branch.branch_id,
                                                                value: branch.branch_id ? String(branch.branch_id) : "",
                                                                label: branch.branch_name,
                                                            }))
                                                            : [{ value: "", label: "No branch available" }]
                                                    }
                                                // error="This field is required."
                                                /> */}

                                                <select
                                                    // name=""
                                                    id=""
                                                    className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    value={selectedBranch}
                                                    onChange={handleBranchChange} // Call on change

                                                >
                                                    <option value="" selected disabled>
                                                        Select Branch
                                                    </option>

                                                    {staffBranchListData.map((branch) => (
                                                        <option key={branch.branch_id} value={branch.branch_id}>
                                                            {branch.branch_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Content */}
                                <>
                                    {activeServicesData.length > 0 ? (
                                        activeServicesData.map((activeData) => (
                                            <div key={activeData.category_id}>
                                                {/* Category Heading */}
                                                <div className="border-b-[1px] py-3">
                                                    <h5 className="text-md text-mindfulBlack font-semibold">{activeData.category}</h5>
                                                </div>

                                                {/* Subcategories and Services */}
                                                {activeData.subcategories.map((subcategory) => (
                                                    <div key={subcategory.subcategory_id} className="border-b-2 px-5 pb-5">
                                                        {/* Subcategory Heading */}
                                                        <div className="py-3">
                                                            <p className="text-md text-mindfulBlack font-semibold">{subcategory.subcategory}</p>
                                                        </div>

                                                        {/* Pricing Table */}
                                                        {subcategory.services.length > 0 ? (
                                                            <div>
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <tr className="border-b-[1px] border-dashed">
                                                                            <th className="text-sm text-start text-mindfulgrey font-normal px-2 py-2">SKU ID</th>
                                                                            <th className="w-72 text-sm text-start text-mindfulgrey font-normal px-2 py-2">Service</th>
                                                                            <th className="text-sm text-start text-mindfulgrey font-normal px-2 py-2">Prices (Rs)</th>
                                                                            <th className="text-sm text-start text-mindfulgrey font-normal px-2 py-2">Timing</th>
                                                                            <th className="text-sm text-center text-mindfulgrey font-normal px-2 py-2">Action</th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        {subcategory.services.map((service: any) => (
                                                                            <tr key={service.service_id} className="border-b-2 border-dashed">
                                                                                <td className="px-2 py-5">{service.sku_value || "N/A"}</td>
                                                                                <td className="px-2 py-5">{service.service_name || "N/A"}</td>
                                                                                <td className="px-2 py-5">
                                                                                    <div>
                                                                                        <InputField
                                                                                            label={''}
                                                                                            placeholder={service.price || "N/A"}
                                                                                            className="w-16 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                                                                            value={service.price || "N/A"}
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(service.service_id, "price", e.target.value)  // Update price
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-2 py-5">
                                                                                    <div>
                                                                                        {/* <SelectField
                                                                                            label={''}
                                                                                            options={[
                                                                                                { value: "15mins", label: "15 mins" },
                                                                                                { value: "30mins", label: "30 mins" },
                                                                                                { value: "45mins", label: "45 mins" },
                                                                                                { value: "60mins", label: "60 mins" },
                                                                                            ]}
                                                                                            // options={
                                                                                            //     [{ value: "", label: "No roles available" }]
                                                                                            // }
                                                                                            className="w-28 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(service.service_id, "service_time", e.target.value)
                                                                                            }
                                                                                        /> */}
                                                                                        <InputField
                                                                                            label={''}
                                                                                            placeholder={service.service_time || "N/A"}
                                                                                            className="w-16 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                                                                            value={service.service_time || "N/A"}
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(service.service_id, "service_time", e.target.value) // Update service time
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </td>

                                                                                <td className="px-2 py-5">
                                                                                    <div
                                                                                        onClick={() => handleDeleteServiceData(
                                                                                            activeData.category_id,
                                                                                            subcategory.subcategory_id!,
                                                                                            service.service_id!
                                                                                        )}
                                                                                        className="w-fit mx-auto cursor-pointer"
                                                                                    >
                                                                                        <IoCloseCircle className="text-[28px] text-mindfulRed" />
                                                                                    </div>
                                                                                </td>

                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="py-3 text-sm text-mindfulgrey">No services available</div>
                                                        )}
                                                    </div>
                                                ))}


                                            </div>

                                        ))
                                    ) : (
                                        <div>No active services available</div>
                                    )}
                                </>

                                {/* Update Button */}
                                <div className="my-5" >
                                    <Button
                                        onClick={onSubmitActiveServices}
                                        buttonTitle={'Update'}
                                        className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                    />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

                {showCopyServicesPopup && <CopyServicesPopup closePopup={closeCopyServicesPopup} />}
            </div>
        </div >
    )
}
