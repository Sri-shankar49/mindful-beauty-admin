import { useEffect, useState } from 'react';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField';
import { SelectField } from '@/common/SelectField'
import { PiCopySimpleLight } from "react-icons/pi";
import { IoCloseCircle } from 'react-icons/io5'
import { CopyServicesPopup } from './AddServices/CopyServicesPopup';
import { activeServices, addServices, addServicesCheckbox, categories, staffBranchList, subCategories, updateActiveServices } from '@/api/apiConfig';
import "./ServiceListing.css";
import { ShimmerTable } from "shimmer-effects-react";

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
    is_deleted: boolean;
    provider_service_id: number;
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
    const [checkboxData, setCheckboxData] = useState<checkboxDataProps[]>([]);
    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
    const [activeServicesData, setActiveServicesData] = useState<ActiveServicesListDataProps[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [selectedBranch, setSelectedBranch] = useState<string>("");

    // State to store selected checkbox IDs
    const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);

    const [buttonState, setButtonState] = useState({ text: "Add Service", success: false });
    const [updateButtonState, setUpdateButtonState] = useState({ text: "Update", success: false });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [servicesData, setServicesData] = useState<ActiveServicesListDataProps[]>([]);


    // Registration Provider ID
    const sessionProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Selected Provider ID from session storage", sessionProviderID);


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

    // Getting the copy of active services data & changing the state activeServicesData to set true or false
    useEffect(() => {
        // Initialize `servicesData` with a deep copy of `activeServicesData`
        setServicesData(JSON.parse(JSON.stringify(activeServicesData)));
    }, [activeServicesData]); // Only re-run when `activeServicesData` changes


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
            setCheckboxData(loadCheckboxData.data); // Update subcategories
            console.log("Checkbox list data log:", loadCheckboxData);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Function to get the check box service ID's
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

    // Converting the checkbox ID's to string
    const checkboxIDsString = selectedCheckboxIDs.join(","); // Converts array to string
    console.log("Changed to string value", checkboxIDsString);


    // Function call for Add services button based on category & sub category
    const onSubmitAddServices = async () => {
        setLoading(true); // Start loading state
        setError(null);   // Clear any previous errors


        try {
            const formData = new FormData();
            formData.append("provider_id", sessionProviderID || "");
            formData.append("branch_id", selectedBranch);
            // formData.append("category_id", data.category);
            formData.append("category_id", selectedCategory);
            formData.append("subcategory_id", selectedSubCategory);
            // formData.append("subcategory_id", data.subCategory);
            formData.append("service_ids", checkboxIDsString);

            // Call the taxInfo function
            const addServicesData = await addServices(formData);

            console.log("Add Service Details Submission Success:", addServicesData);

            if (addServicesData?.status === "success") {
                // Update button UI to success state
                setButtonState({ text: "Service Added Successfully!", success: true });

                // Clear all selected fields
                setSelectedBranch("");
                setSelectedCategory("");
                setSelectedSubCategory("");
                setSelectedCheckboxIDs([]);
                setCheckboxData([]); // If you need to clear the services list

                // Revert back to default state after 3 seconds
                setTimeout(() => {
                    setButtonState({ text: "Add Service", success: false });
                }, 3000);
            } else {
                throw new Error("Failed to add service.");
            }
        }
        catch (error: any) {
            setError(error.message || "Something went wrong.");
            setButtonState({ text: "Add Service", success: false });

        } finally {
            setLoading(false);
        }

    }



    // Function call for handling the input field change for price & timing in the active services data
    const handleInputChange = (serviceProviderID: string, field: string, value: string) => {
        setActiveServicesData((prevData) =>
            prevData.map((category) => ({
                ...category,
                subcategories: category.subcategories.map((subcategory) => ({
                    ...subcategory,
                    services: subcategory.services.map((service) =>
                        service.service_id === serviceProviderID ? { ...service, [field]: value } : service
                    ),
                })),
            }))
        );
    };


    // Function call for deleting the service data from the active service data
    const handleDeleteServiceData = (categoryId: any, subcategoryId: any, serviceProviderID: any) => {
        // Make a deep copy of the data (assuming it's stored in a state like `activeServicesData`)
        const updatedData = servicesData.map((category) => {
            if (category.category_id === categoryId) {
                return {
                    ...category,
                    subcategories: category.subcategories.map((subcategory) => {
                        if (subcategory.subcategory_id === subcategoryId) {
                            return {
                                ...subcategory,
                                services: subcategory.services.map((service) => {
                                    if (service.provider_service_id === serviceProviderID) {
                                        return { ...service, is_deleted: true }; // Set `is_deleted` to true
                                    }
                                    return service;
                                }),
                            };
                        }
                        return subcategory;
                    }),
                };
            }
            return category;
        });

        // Update the state with the modified data
        setServicesData(updatedData);
    };

    console.log("Updated Services Copy Data:", servicesData);

    // Function call for handling the active services change to the update button
    const onSubmitActiveServices = async () => {
        setLoading(true);
        setError(null);

        try {
            // Prepare the updated services data
            const updatedServices = servicesData.flatMap((category) =>
                category.subcategories.flatMap((subcategory) =>
                    subcategory.services.map((service) => ({
                        id: service.service_id,
                        price: service.price,
                        duration: service.service_time,
                        deleted: service.is_deleted
                    }))
                )
            );

            // Create FormData object
            const formData = new FormData();
            formData.append("services", JSON.stringify(updatedServices));

            setLoading(true);
            setUpdateButtonState((prev) => ({ ...prev, text: "Updating..." }));

            // Call the API
            const response = await updateActiveServices(formData);
            console.log("Update Services Data Submission Success:", response);

            if (response?.status === "success") {
                // alert("Services updated successfully!");

                // Clear all selected fields
                setSelectedBranch("");

                setUpdateButtonState({ text: "Updated Services Successfully!", success: true });

                // Revert back to default state after 3 seconds
                setTimeout(() => {
                    setUpdateButtonState({ text: "Update", success: false });
                }, 3000);

            } else {
                throw new Error("Failed to update service.");
            }

        } catch (error: any) {
            setError(error.message || "Something went wrong.");
            setButtonState({ text: "Update Failed.", success: false });

        } finally {
            setLoading(false);
        }
    };



    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error : {error}</div>;

    if (loading) return <div>
        <div>
            <ShimmerTable
                mode="light"
                row={13}
                col={4}
                border={1}
                borderColor={"#cbd5e1"}
                rounded={0.25}
                rowGap={16}
                colPadding={[15, 5, 15, 5]}
            />
        </div>
    </div>;



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
                                <form onSubmit={onSubmitAddServices}>

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
                                                    />

                                                    {/* {error.city && (
                                                        <p className="text-sm text-red-500">{error.city}</p>
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

                                                    >
                                                        <option value="" disabled>
                                                            Select Category
                                                        </option>

                                                        {categoriesData.map((category) => (
                                                            <option key={category.category_id} value={category.category_id}>
                                                                {category.category_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* {error.category && (
                                                        <p className="text-sm text-red-500">{error.category}</p>
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
                                                    <SelectField
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
                                                        value={selectedBranch}
                                                        onChange={handleBranchChange} // Call on change
                                                    // error="This field is required."
                                                    />

                                                    {/* <select
                                                        // name=""
                                                        id=""
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
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

                                                    {/* {error.branch && (
                                                        <p className="text-sm text-red-500">{error.branch}</p>
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
                                                    >
                                                        <option value="" disabled>
                                                            Select Sub Category
                                                        </option>

                                                        {subCategoriesData.map((subCategory) => (
                                                            <option key={subCategory.subcategory_id} value={subCategory.subcategory_id}>
                                                                {subCategory.subcategory_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* {error.subCategory && (
                                                        <p className="text-sm text-red-500">{error.subCategory}</p>
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

                                                                />
                                                                <span className="checkmark"></span>{service.service_name}
                                                            </label>

                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No services available</div>
                                                )}

                                                {/* {error.checkbox && (
                                                    <p className="text-sm text-red-500">{error.checkbox}</p>
                                                )} */}

                                            </div>

                                        </div>
                                    </div>


                                    {/* Add Service Button */}
                                    <div className="text-center mt-20">
                                        {/* <button
                                            className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                        >
                                           Add Service
                                        </button> */}
                                        <button
                                            type='submit'
                                            className={`text-lg text-mindfulWhite rounded-sm px-8 py-2 
                                                ${buttonState.success ? "bg-green-500" : "bg-main"}`}
                                            disabled={loading}
                                        >
                                            {loading ? "Adding..." : buttonState.text}
                                        </button>

                                        {/* Error response from the API */}
                                        {error && <p className="text-sm text-red-600">{error}</p>}
                                    </div>
                                </form>
                            </div>






                            {/* Whole Grid Column Two */}
                            {/* h-screen overflow-y-auto */}
                            <div className="border-l-2 pl-5">

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
                                                    <option value="" disabled>
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
                                    {servicesData.length > 0 ? (
                                        servicesData.map((activeData) => (
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
                                                                        {subcategory.services
                                                                            .filter((service: any) => !service.is_deleted) // Exclude services where `is_deleted` is true
                                                                            .map((service: any) => (
                                                                                <tr key={service.provider_service_id} className="border-b-2 border-dashed">
                                                                                    <td className="px-2 py-5">{service.sku_value || "N/A"}</td>
                                                                                    <td className="px-2 py-5">{service.service_name || "N/A"}</td>
                                                                                    <td className="px-2 py-5">
                                                                                        <InputField
                                                                                            label=""
                                                                                            placeholder={service.price?.toString() || "N/A"}
                                                                                            className="w-16 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                                                                            value={service.price}
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(
                                                                                                    service.service_id,
                                                                                                    "price",
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                    <td className="px-2 py-5">
                                                                                        <InputField
                                                                                            label=""
                                                                                            placeholder={service.service_time || "N/A"}
                                                                                            className="w-16 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                                                                            value={service.service_time}
                                                                                            onChange={(e) =>
                                                                                                handleInputChange(
                                                                                                    service.service_id,
                                                                                                    "service_time",
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                    <td className="px-2 py-5 text-center">
                                                                                        <div
                                                                                            className="w-fit mx-auto cursor-pointer"
                                                                                            onClick={() =>
                                                                                                handleDeleteServiceData(
                                                                                                    activeData.category_id,
                                                                                                    subcategory.subcategory_id,
                                                                                                    service.provider_service_id
                                                                                                )
                                                                                            }
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
                                    {/* <Button
                                        onClick={onSubmitActiveServices}
                                        buttonTitle={'Update'}
                                        className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2"
                                    /> */}
                                    <button
                                        onClick={onSubmitActiveServices}
                                        className={`text-lg text-mindfulWhite rounded-sm px-8 py-2
                                             ${updateButtonState.success ? "bg-green-500" : "bg-main"}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : updateButtonState.text}
                                    </button>
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
