import React, { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5'
import { InputField } from '@/common/InputField'
// import { Button } from '@/common/Button'
import { SelectField } from '@/common/SelectField';
import { addServicesCheckbox, categories, subCategories } from '@/api/apiConfig';

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


export const EditAppAllBookingPopup: React.FC<EditAppointmentPopupProps> = ({ closePopup, appointmentDetails }) => {

    const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
    const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);
    const [checkboxData, setCheckboxData] = useState<checkboxDataProps[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    // State to store selected checkbox IDs
    const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);
    const [selectedCheckboxNames, setSelectedCheckboxNames] = useState<string[]>([]);


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

        // Clear the error if a category is selected
        // if (selectedCategoryId) {
        //     setValidationErrors((prevErrors) => ({
        //         ...prevErrors,
        //         category: "",
        //     }));
        // }

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
    const handleCheckboxClick = (service_id: number, service_name: string) => {

        setSelectedCheckboxIDs((prevSelected) => {
            const updatedSelected = prevSelected.includes(service_id)
                ? prevSelected.filter((id) => id !== service_id) // Remove if already selected
                : [...prevSelected, service_id]; // Add if not already selected

            // Log the updated array here
            console.log("Updated Selected Service IDs:", updatedSelected);

            // Clear the error if at least one service is selected
            // if (updatedSelected.length > 0) {
            //     setValidationErrors((prevErrors) => ({
            //         ...prevErrors,
            //         services: "",
            //     }));
            // }

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
    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">

                        <div className="relative bg-white rounded-[5px] w-7/12 mx-auto px-10 py-10">


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



                            <div className="">
                                <form action="" method="post">

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
                                                    // {...register("appID")}

                                                    />
                                                    {/* {errors.appID && (
                                                    <p className="text-sm text-red-600">{errors.appID.message}</p>
                                                )} */}
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
                                                    // {...register("price")}

                                                    />
                                                    {/* {errors.price && (
                                                    <p className="text-sm text-red-600">{errors.price.message}</p>
                                                )} */}
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

                                                    {/* {validationErrors.category && (
                                                        <p className="text-red-600 text-sm italic">
                                                            {validationErrors.category}
                                                        </p>
                                                    )} */}

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
                                                            Select Sub Category
                                                        </option>

                                                        {subCategoriesData.map((subCategory) => (
                                                            <option key={subCategory.subcategory_id} value={subCategory.subcategory_id}>
                                                                {subCategory.subcategory_name}
                                                            </option>
                                                        ))}
                                                    </select>
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
                                    </div>

                                    <div className="pt-5">
                                        <div>
                                            <textarea
                                                rows={3}
                                                name=""
                                                id=""
                                                // value={selectedCheckboxNames.join(", ")}
                                                value={appointmentDetails.services.map((val) => (val.name))}
                                                className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"

                                            ></textarea>

                                            <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                                        </div>
                                    </div>


                                    {/* Add Service Button */}
                                    <div className="text-center mt-10">
                                        <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">
                                            Update Service
                                        </button>
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
