import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '@/common/InputField'
// import { Button } from '@/common/Button'
import { ShimmerTable } from 'shimmer-effects-react';
import { addServicesCheckbox, categories, editServicesAppointment, subCategories } from '@/api/apiConfig';


interface EditAppointmentPopupProps {
    closePopup: () => void;
    appointmentDetails: {
        id: string;
        date: string;
        time: string;
        location: string;
        name: string;
        phone: string;
        services: Service[];
        amount: string;
        status: string;
        status_id?: string;
        modify_status: string;
        stylist: string;
        stylist_id?: string;
    }
}

interface Service {
    service_id: number;
    name: string;
    price: number;
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

interface checkboxDataProps {
    service_id?: string;
    service_name: string;
}


export const EditAppSchedulePopup: React.FC<EditAppointmentPopupProps> = ({ closePopup, appointmentDetails }) => {

    const navigate = useNavigate();

    // ✅ State for Category, Subcategory & Services
    const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
    const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);
    const [checkboxData, setCheckboxData] = useState<checkboxDataProps[]>([]);

    // ✅ Selected Values
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

    // State to store selected checkbox IDs
    const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);
    const [selectedCheckboxNames, setSelectedCheckboxNames] = useState<string[]>([]);

    const [buttonState, setButtonState] = useState({ text: "Update Service", success: false });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // Fetch Categories Data, Sub Categories Data, Branch List Data, Active Packages Data
    useEffect(() => {
        const loadCategorySelect = async () => {
            setLoading(true);

            try {
                const loadCategoriesData = await categories();
                setcategoriesData(loadCategoriesData.data);
                console.log("Category list data log:", loadCategoriesData);
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

        setSelectedSubCategory(""); // Reset subcategory

        // 🔹 Clear category error
        setValidationErrors(prev => ({ ...prev, category: "" }));

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

    // Function to handle sub category change and fetch handle Check box List
    const handleCheckboxList = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedSubCategoryId = event.target.value; // Get the selected categoryId
        setSelectedSubCategory(selectedSubCategoryId); // Update state

        // 🔹 Clear subcategory error
        setValidationErrors(prev => ({ ...prev, subCategory: "" }));


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

    // Function to get the check box service ID's &  ✅ Handle Checkbox Selection for Services
    const handleCheckboxClick = (service_id: number, service_name: string) => {

        setSelectedCheckboxIDs((prevSelected) => {
            const updatedSelected = prevSelected.includes(service_id)
                ? prevSelected.filter((id) => id !== service_id) // Remove if already selected
                : [...prevSelected, service_id]; // Add if not already selected

            // Log the updated array here
            console.log("Updated Selected Service IDs:", updatedSelected);

            // 🔹 Clear services error when at least one checkbox is selected
            if (selectedCheckboxIDs.length === 0) {
                setValidationErrors(prev => ({ ...prev, services: "" }));
            }

            return updatedSelected;
        });

        // Log the clicked service ID
        console.log("Clicked Service ID:", service_id);

        // Log the updated array of selected IDs
        console.log("Selected Service IDs:", selectedCheckboxIDs);


        // Update selected service names
        setSelectedCheckboxNames((prevNames) => {
            const updatedNames = prevNames.includes(service_name)
                ? prevNames.filter((name) => name !== service_name) // Remove if already selected
                : [...prevNames, service_name]; // Add if not already selected

            // Log the updated names here
            console.log("Updated Selected Service Names:", updatedNames);

            return updatedNames;
        });

    }

    // ✅ Handle Checkbox Selection for Services
    // const handleCheckboxClick = (serviceId: string, serviceName: string) => {
    //     setSelectedCheckboxIDs(prev =>
    //         prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    //     );

    //     setSelectedCheckboxNames(prev =>
    //         prev.includes(serviceName) ? prev.filter(name => name !== serviceName) : [...prev, serviceName]
    //     );
    // };


    // State to manage form inputs
    const [formValues, setFormValues] = useState({
        category: "",
        subCategory: "",
        services: appointmentDetails.services.map(service => service.service_id), // Pre-fill from appointment
        price: appointmentDetails.amount,
    });

    // ✅ Sync selected category & subcategory with formValues
    useEffect(() => {
        setFormValues(prev => ({
            ...prev,
            category: selectedCategory,
            subCategory: selectedSubCategory,
        }));
    }, [selectedCategory, selectedSubCategory]);


    // ✅ State for Validation Errors
    const [validationErrors, setValidationErrors] = useState({
        category: "",
        subCategory: "",
        services: "",
        price: "",
    });

    // ✅ Validate Form Before Submission
    const validateForm = () => {
        const errors: any = {};

        if (!formValues.category) errors.category = "Category is required";
        if (!formValues.subCategory) errors.subCategory = "Subcategory is required";
        if (selectedCheckboxIDs.length === 0) errors.services = "At least one service must be selected.";
        if (!formValues.price) errors.price = "Price is required";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };


    // ✅ Submit Form
    const onSubmitUpdateServices = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop submission if validation fails

        setLoading(true);
        setButtonState({ text: "Updating...", success: false }); // Show loading state


        try {

            // Construct the FormData object for editing
            const formData = new FormData();

            // Merge existing and newly selected service IDs
            const allSelectedServiceIDs = [
                ...new Set([
                    ...appointmentDetails.services.map(s => s.service_id),
                    ...selectedCheckboxIDs
                ])
            ];


            formData.append('appointment_id', appointmentDetails.id);
            // formData.append('services', String(selectedCheckboxIDs));
            formData.append('services', String(allSelectedServiceIDs));       // Ensure correct format

            console.log("Submitting FormData:", Object.fromEntries(formData.entries())); // Debugging purposes

            const response = await editServicesAppointment(formData);
            console.log(response, "Service edited successfully");


            // Assuming the response contains a `status` or similar field to indicate success
            if (response?.status === "success") {
                console.log("Service edited successfully");

                // Update button UI to success state
                setButtonState({ text: "Services Updated Successfully!", success: true });

                // Perform actions on success
                // closePopup(); // Close the popup

                // ✅ Wait 2 seconds before closing popup
                setTimeout(() => {
                    closePopup(); // Close popup after success message is shown
                }, 2000);

                navigate(0);

                // Revert back to default state after 3 seconds
                setTimeout(() => {
                    setButtonState({ text: "Update Service", success: false });
                }, 3000);

            } else {
                throw new Error("Failed to update service.");
            }
        } catch (error: any) {
            setError(error.message || "Failed to update the services. Please try again.");
            setButtonState({ text: "Update Failed", success: false });

        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    {/* <div className="container mx-auto"> */}

                        <div className="relative bg-white rounded-[5px] w-7/12  mx-auto px-10 py-10 my-5 max-2xl:overflow-y-auto max-2xl:h-[75%]">


                            <div className="relative mb-10">
                                <h2 className="text-2xl text-mindfulBlack font-semibold">Edit Appointment</h2>
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


                            {loading ? (
                                <div>
                                    <ShimmerTable
                                        mode="light"
                                        row={6} // Adjust based on expected staff rows
                                        col={2} // Matches table columns
                                        border={1}
                                        borderColor={"#cbd5e1"}
                                        rounded={0.25}
                                        rowGap={16}
                                        colPadding={[15, 5, 15, 5]}
                                    />
                                </div>
                            ) : (

                                <div className="">
                                    <form onSubmit={onSubmitUpdateServices} method="post">

                                        <div className="bg-mindfulLightgrey rounded-sm px-5 py-5">
                                            <div className="grid grid-cols-2 gap-5">

                                                {/* Appointment ID */}
                                                <div className="space-y-5">
                                                    {/* Appointment ID */}
                                                    <div className="">
                                                        <label
                                                            htmlFor="appID"
                                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                                        >
                                                            Appointment ID
                                                        </label>
                                                        <InputField
                                                            label={''}
                                                            // type="number"
                                                            // name="appID"
                                                            id="appID"
                                                            placeholder="appointment ID"
                                                            className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            value={appointmentDetails.id}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="space-y-5">
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
                                                            // type="number"
                                                            // name="price"
                                                            id="price"
                                                            placeholder="price"
                                                            className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            value={appointmentDetails.amount}
                                                            readOnly
                                                        />

                                                    </div>
                                                </div>


                                                {/* Grid Column One */}
                                                <div className="space-y-5">
                                                    {/* City */}
                                                    {/* <div>
                                                    <label
                                                        htmlFor="city"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        City
                                                    </label>
                                                    <SelectField
                                                        label={''}
                                                        name="city"
                                                        id="city"
                                                        options={[
                                                            { value: "kochi", label: "Kochi" },
                                                            { value: "trivandrum", label: "Trivandrum" },
                                                            { value: "kollam", label: "Kollam" },
                                                            { value: "thrissur", label: "Thrissur" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
                                                </div> */}

                                                    {/* Category */}
                                                    <div>
                                                        <label
                                                            htmlFor="category"
                                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                                        >
                                                            Category
                                                        </label>
                                                        {/* <SelectField
                                                    label={''}
                                                    name="category"
                                                    id="category"
                                                    options={[
                                                        { value: "skin", label: "Skin" },
                                                        { value: "hair", label: "Hair" },

                                                    ]}
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                /> */}

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

                                                        {validationErrors.category && <p className="text-sm text-red-600">{validationErrors.category}</p>}

                                                    </div>
                                                </div>

                                                {/* Grid Column Two */}
                                                <div className="space-y-5">

                                                    {/* Branch */}
                                                    {/* <div>
                                                    <label
                                                        htmlFor="branch"
                                                        className="text-md text-mindfulBlack font-semibold mb-1"
                                                    >
                                                        Branch
                                                    </label>
                                                    <SelectField
                                                        label={''}
                                                        name="branch"
                                                        id="branch"
                                                        options={[
                                                            { value: "branch1", label: "Branch 1" },
                                                            { value: "branch2", label: "Branch 2" },
                                                        ]}
                                                        className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                    />
                                                </div> */}

                                                    {/* Sub Category */}
                                                    <div>
                                                        <label
                                                            htmlFor="subCategory"
                                                            className="text-md text-mindfulBlack font-semibold mb-1"
                                                        >
                                                            Sub Category
                                                        </label>
                                                        {/* <SelectField
                                                    label={''}
                                                    name="subCategory"
                                                    id="subCategory"
                                                    options={[
                                                        { value: "facials", label: "Facials" },
                                                        { value: "waxing", label: "Waxing" },
                                                    ]}
                                                    className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                /> */}


                                                        <select
                                                            // name="subCategory"
                                                            id="subCategory"
                                                            className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                            value={selectedSubCategory}
                                                            onChange={handleCheckboxList} // Call on change
                                                        >
                                                            <option value="" disabled>
                                                                {selectedCategory ? "Select Sub Category" : "Please select a category first"}
                                                            </option>

                                                            {subCategoriesData.map((subCategory) => (
                                                                <option key={subCategory.subcategory_id} value={subCategory.subcategory_id}>
                                                                    {subCategory.subcategory_name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {validationErrors.subCategory && <p className="text-sm text-red-600">{validationErrors.subCategory}</p>}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Services */}
                                        <div>

                                            <div>
                                                <h5 className="text-lg font-semibold py-5">Services</h5>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                                                {/* Services List */}
                                                {checkboxData.length > 0 ? (
                                                    checkboxData.map((service) => (
                                                        <div key={service.service_id} className="">
                                                            <label htmlFor={service.service_id} className="custom-checkbox">
                                                                <input
                                                                    id={service.service_id}
                                                                    // name="dummy"
                                                                    type="checkbox"
                                                                    value={service.service_id}
                                                                    className="mr-2"
                                                                    // onChange={(e) => console.log("Clicked Service ID:", service.service_id, "Checked:", e.target.checked)}
                                                                    onChange={() => handleCheckboxClick(Number(service.service_id), service.service_name)}
                                                                    checked={selectedCheckboxIDs.includes(Number(service.service_id))}
                                                                // checked={selectedCheckboxIDs.includes(Number(service.service_id)) ||
                                                                //     appointmentDetails.services.some(s => s.service_id === service.service_id)}
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
                                            {validationErrors.services && <p className="text-sm text-mindfulRed">{validationErrors.services}</p>}

                                        </div>

                                        <div className="pt-5">
                                            <div>
                                                <textarea
                                                    rows={3}
                                                    name=""
                                                    id=""
                                                    // value={appointmentDetails.services.map((val) => (val.name))}
                                                    value={[
                                                        ...new Set([
                                                            ...appointmentDetails.services.map((val) => val.name),
                                                            ...selectedCheckboxNames,
                                                        ]),
                                                    ].join(", ")}
                                                    className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"

                                                ></textarea>

                                                <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                                            </div>
                                        </div>


                                        {/* Update Service Button */}
                                        <div className="text-center mt-10">
                                            {/* <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">
                                                {loading ? "Updating..." : "Update Service"}
                                            </button> */}

                                            <button
                                                type='submit'
                                                className={`text-lg text-mindfulWhite rounded-sm px-8 py-2 
                                                 ${buttonState.success ? "bg-green-500" : "bg-main"}
                                                ${loading ? "bg-mindfulgrey" : ""} `}
                                                disabled={loading}
                                            >
                                                {loading ? "Loading..." : buttonState.text}
                                            </button>
                                        </div>

                                        {error && <p className="text-sm text-red-600">{error}</p>}
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
