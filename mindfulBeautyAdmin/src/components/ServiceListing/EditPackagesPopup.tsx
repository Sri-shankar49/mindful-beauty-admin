import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import { Button } from '@/common/Button'
import { InputField } from '@/common/InputField'
import { SelectField } from '@/common/SelectField';
import { addServicesCheckbox, categories, staffBranchList, subCategories, editPackage, editPackageUpdate } from '@/api/apiConfig';
import { ShimmerTable } from 'shimmer-effects-react';

interface EditPackagesPopupProps {
    providerPackageID: number
    closePopup: () => void;
}

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

interface StaffBranchListDataProps {
    branch_id?: number;
    branch_name: string;
}

interface checkboxDataProps {
    service_id?: string;
    service_name: string;
}

export const EditPackagesPopup: React.FC<EditPackagesPopupProps> = ({ providerPackageID, closePopup }) => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({
        city: '',
        packageTitle: '',
        branch: '',
        price: '',
        category: '',
        subCategory: '',
        services: '',
    }); // To store validation errors

    const [formValues, setFormValues] = useState({ packageTitle: "", price: "" });

    const [checkboxData, setCheckboxData] = useState<checkboxDataProps[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);
    const [selectedCheckboxNames, setSelectedCheckboxNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
    const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<number>(0);
    const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));


        // Clear the error for this specific field if validation is met
        if (name === "packageTitle" && value.trim()) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                packageTitle: "",
            }));
        }

        if (name === "price" && Number(value) > 0) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                price: "",
            }));
        }
    };

    // Registration Provider ID
    const sessionProviderID = sessionStorage.getItem("loginProviderID");
    console.log("Selected Provider ID from session storage", sessionProviderID);
    console.log("service id check ==>", providerPackageID);

    useEffect(() => {
        const loadCategorySelect = async () => {
            setLoading(true);

            try {
                const loadCategoriesData = await categories();
                const branchesData = await staffBranchList();
                console.log("branchesData GET Method response", branchesData);

                console.log("Selected branch ==>", selectedBranch, loadCategoriesData);
                setcategoriesData(loadCategoriesData.data);

                setStaffBranchListData(branchesData.data || []);        // Fallback to an empty array if data is null

                // if (branchesData.data && branchesData.data.length > 0) {
                //   setSelectedBranch(branchesData.data[0].branch_id);    // Set the first branch as default if needed
                // }
                // const foundBranch = branchesData.data.find(branch => branch.branch_id === branchId);
                console.log("Category list data log:", loadCategoriesData);

                console.log("Staff branch list data log for select field:", branchesData);

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

    useEffect(() => {
        const loadPackageData = async () => {
            setLoading(true);
            try {
                const response = await editPackage(providerPackageID);
                const branchesData = await staffBranchList()
                // Handle the response as needed
                console.log("Package edited responses ====> ", response.data.branch_id);
                const foundBranch = branchesData.data.find((branch: { branch_id: number }) => branch.branch_id === response.data.branch_id);
                console.log("foundBranch in response ====> ", foundBranch.branch_id);
                setSelectedBranch(foundBranch.branch_id);
                // Set form values with the new response data
                setFormValues({
                    packageTitle: response.data.package_name,
                    price: response.data.price
                });

                // Ensure `name` is always an array
                const services = typeof response.data.package_services === 'string'
                    ? response.data.package_services.split(',').map((item: string) => item.trim())  // Specify item type
                    : Array.isArray(response.data.package_services)
                        ? response.data.package_services
                        : [];

                const servicesIds = typeof response.data.package_services_ids === 'string'
                    ? response.data.package_services_ids.split(',').map((item: string) => Number(item.trim()))  // Specify item type
                    : Array.isArray(response.data.package_services_ids)
                        ? response.data.package_services_ids
                        : [];

                setSelectedCheckboxNames(services);
                setSelectedCheckboxIDs(servicesIds);
                console.log("services responses ====> ", services);
                console.log("servicesIds responses ====> ", servicesIds);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (providerPackageID) {
            loadPackageData();
        }
    }, [providerPackageID]); // Dependency array includes providerPackageID

    const validateForm = () => {
        const errors: any = {};
        if (!formValues.packageTitle) errors.packageTitle = "Package title is required.";
        if (!formValues.price || Number(formValues.price) <= 0) errors.price = "Price must be a positive number.";
        if (!selectedBranch) errors.branch = "Branch selection is required.";
        // if (!selectedCategory) errors.category = "Category selection is required.";
        // if (!selectedSubCategory) errors.subCategory = "Sub-category selection is required.";
        // if (selectedCheckboxIDs.length === 0) errors.services = "At least one service must be selected.";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmitAddPackages = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form from refreshing the page

        if (!validateForm()) return; // Validate form before submission
        //     setLoading(true);
        // setError(null);
        const checkboxIDsString = selectedCheckboxIDs.join(","); // Converts array to string
        console.log("Changed to string value", checkboxIDsString, selectedCheckboxIDs);
        console.log("Selected all ID", providerPackageID, formValues.packageTitle, Number(formValues.price), selectedBranch, selectedCheckboxNames);
        try {
            const response = await editPackageUpdate(
                providerPackageID,
                formValues.packageTitle,
                Number(formValues.price),
                selectedBranch,
                checkboxIDsString
            );
            console.log("response ===>", response);
            if (response?.status === "success") {
                closePopup();
                navigate(0);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Function to handle category change and fetch subcategories
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = event.target.value; // Get the selected categoryId
        setSelectedCategory(selectedCategoryId); // Update state

        // Clear the error if a category is selected
        if (selectedCategoryId) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                category: "",
            }));
        }

        try {
            // setLoading(true);
            const loadSubCategoriesData = await subCategories(selectedCategoryId); // Pass categoryId to API
            setSubCategoriesData(loadSubCategoriesData.data); // Update subcategories
            console.log("Sub Category list data log:", loadSubCategoriesData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    }

    // Function to handle sub category change and fetch handle Check box List
    const handleCheckboxList = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedSubCategoryId = event.target.value; // Get the selected categoryId
        setSelectedSubCategory(selectedSubCategoryId); // Update state

        // Clear the error if a sub-category is selected
        if (selectedSubCategoryId) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                subCategory: "",
            }));
        }

        try {
            // setLoading(true);

            const loadCheckboxData = await addServicesCheckbox(selectedCategory, selectedSubCategoryId); // Pass categoryId to API
            setCheckboxData(loadCheckboxData.data); // Update subcategories
            console.log("Checkbox list data log:", loadCheckboxData);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // const handleCheckboxClick = (service_id: number, service_name: string) => {
    //   setSelectedCheckboxIDs((prevSelected) => {
    //     const serviceIdStr = service_id.toString(); // Ensure it's a string

    //     const updatedSelected = prevSelected.includes(serviceIdStr)
    //       ? prevSelected.filter((id) => id !== serviceIdStr) // Remove if already selected
    //       : [...prevSelected, serviceIdStr]; // Add if not already selected

    //     // Clear the error if at least one service is selected
    //     if (updatedSelected.length > 0) {
    //       setValidationErrors((prevErrors) => ({
    //         ...prevErrors,
    //         services: "",
    //       }));
    //     }

    //     return updatedSelected;
    //   });

    //   // Update selected service names
    //   setSelectedCheckboxNames((prevNames) => {
    //     const updatedNames = prevNames.includes(service_name)
    //       ? prevNames.filter((name) => name !== service_name) // Remove if already selected
    //       : [...prevNames, service_name]; // Add if not already selected

    //     return updatedNames;
    //   });

    //   console.log("Updated Selected IDs: ", selectedCheckboxIDs);
    // };

    // const handleCheckboxClick = (service_id: number, service_name: string) => {
    //   // setSelectedCheckboxIDs((prevSelected) => {
    //   //   const serviceIdStr = service_id.toString();

    //   const updatedSelected = prevSelected.includes(serviceIdStr)
    //     ? prevSelected.filter((id) => id !== serviceIdStr) // Remove if already selected
    //     : [...prevSelected, serviceIdStr]; // Add if not already selected

    const handleCheckboxClick = (service_id: number, service_name: string) => {
        setSelectedCheckboxIDs((prevSelected) => {
            if (prevSelected.includes(service_id)) {
                return prevSelected.filter((id) => id !== service_id); // Remove number if already selected
            } else {
                return [...prevSelected, service_id]; // Add number if not selected
            }
        });


        //   if (updatedSelected.length > 0) {
        //     setValidationErrors((prevErrors) => ({
        //       ...prevErrors,
        //       services: "",
        //     }));
        //   }

        //   return updatedSelected;
        // });

        setSelectedCheckboxNames((prevNames) => {
            return prevNames.includes(service_name)
                ? prevNames.filter((name) => name !== service_name)
                : [...prevNames, service_name];
        });
    };


    const handleBranchChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchId = event.target.value; // Get the selected branch ID
        setSelectedBranch(Number(selectedBranchId)); // Update branch selection state

        console.log("Hello Branch ID", selectedBranchId);

    }

    return (
        // loading ? <div>Loading...</div> :
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">

                            {/* {loading ? (
                                // <div className="text-center py-10">
                                //     <p className="text-lg font-semibold">Loading...</p>
                                // </div>
                                <div>
                                    <ShimmerTable
                                        mode="light"
                                        row={8}
                                        col={2}
                                        border={1}
                                        borderColor={"#cbd5e1"}
                                        rounded={0.25}
                                        rowGap={16}
                                        colPadding={[15, 5, 15, 5]}
                                    />
                                </div>
                            ) : ( */}
                            <div className="relative mb-5">

                                <div className="">
                                    <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Package</h2>
                                </div>
                                <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                </div>

                                {/* Close Button */}
                                <div
                                    onClick={closePopup}
                                    className="absolute top-0 right-0 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>
                            </div>

                            {/* Close Button */}
                            {loading ? (

                                <div>
                                    <ShimmerTable
                                        mode="light"
                                        row={8}
                                        col={2}
                                        border={1}
                                        borderColor={"#cbd5e1"}
                                        rounded={0.25}
                                        rowGap={16}
                                        colPadding={[15, 5, 15, 5]}
                                    />
                                </div>) : (
                                <>
                                    <form onSubmit={onSubmitAddPackages} method="post">
                                        <div className="py-5">
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

                                                        </div>

                                                        {/* Package Title */}
                                                        <div>
                                                            <label
                                                                htmlFor="packageTitle"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Package Title
                                                            </label>

                                                            <InputField
                                                                label={''}
                                                                name="packageTitle"
                                                                id="packageTitle"
                                                                placeholder=""
                                                                value={formValues.packageTitle}
                                                                onChange={handleInputChange}
                                                                className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            />
                                                            {validationErrors.packageTitle && (
                                                                <p className="text-red-600 text-sm italic">
                                                                    {validationErrors.packageTitle}
                                                                </p>
                                                            )}
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
                                                            {/* {validationErrors.branch && (
                                                                    <p className="text-red-600 text-sm italic">
                                                                                {validationErrors.branch}
                                                                    </p>
                                                                )} */}
                                                        </div>

                                                        {/* Price */}
                                                        <div>
                                                            <label
                                                                htmlFor="Price"
                                                                className="text-md text-mindfulBlack font-semibold mb-1"
                                                            >
                                                                Price (Rs.)
                                                            </label>

                                                            <InputField
                                                                label={''}
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                min={0}
                                                                value={formValues.price}
                                                                onChange={handleInputChange}
                                                                placeholder="7000"
                                                                className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            />
                                                            {validationErrors.price && (
                                                                <p className="text-red-600 text-sm italic">
                                                                    {validationErrors.price}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            {/* Category & Sub Category */}
                                            <div className="px-5 py-5">
                                                <div className="grid grid-cols-2 gap-5">

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

                                                        {validationErrors.category && (
                                                            <p className="text-red-600 text-sm italic">
                                                                {validationErrors.category}
                                                            </p>
                                                        )}

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

                                                        {validationErrors.subCategory && (
                                                            <p className="text-red-600 text-sm italic">
                                                                {validationErrors.subCategory}
                                                            </p>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-5 py-5">

                                                <div>
                                                    <h5 className="text-lg font-semibold py-5">Services</h5>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                                                    {/* Services List */}
                                                    {checkboxData.length > 0 ? (
                                                        checkboxData.map((service) => (
                                                            <div key={service.service_id} className="">
                                                                <label htmlFor={service.service_id} className="custom-checkbox">
                                                                    {/* <input
                                                                            id={service.service_id}
                                                                            // name="dummy"
                                                                            type="checkbox"
                                                                            value={service.service_id}
                                                                            className="mr-2"
                                                                            checked={selectedCheckboxNames.includes(service.service_name)}
                                                                            // onChange={(e) => console.log("Clicked Service ID:", service.service_id, "Checked:", e.target.checked)}
                                                                            onChange={() => handleCheckboxClick(Number(service.service_id), service.service_name)}

                                                                        /> */}
                                                                    <input
                                                                        id={service.service_id}
                                                                        type="checkbox"
                                                                        value={service.service_id}
                                                                        className="mr-2"
                                                                        checked={selectedCheckboxNames.includes(service.service_name)}
                                                                        onChange={() => handleCheckboxClick(Number(service.service_id), service.service_name)}
                                                                    />
                                                                    <span className="checkmark"></span>{service.service_name}
                                                                </label>

                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="col-span-3 text-center">No services available</div>
                                                        // Takes the full row if no data
                                                    )}

                                                </div>

                                                {/* {validationErrors.services && (
                                                        <p className="text-red-600 text-sm italic mt-5">{validationErrors.services}</p>
                                                    )} */}

                                            </div>
                                        </div>
                                        <div className="px-5">
                                            <div>
                                                <textarea
                                                    rows={3}
                                                    name=""
                                                    id=""
                                                    value={selectedCheckboxNames.join(", ")}
                                                    className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                                                ></textarea>

                                                <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                                            </div>
                                        </div>
                                        {/* </div> */}



                                        <div className="px-5 py-3">
                                            {/* Error response from the API */}
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                        </div>


                                        {/* Button */}
                                        <div className="px-5 text-center">
                                            <Button
                                                buttonType="submit"
                                                buttonTitle="Update"
                                                className="bg-main text-md text-mindfulWhite font-semibold rounded-sm px-8 py-2.5 focus-within:outline-none"
                                            />
                                        </div>


                                    </form>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
