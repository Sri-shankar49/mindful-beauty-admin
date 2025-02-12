import { useState, useEffect } from "react";
import { InputField } from "@/common/InputField"
import { SelectField } from "@/common/SelectField"
import { Button } from "@/common/Button"
import { IoCloseCircle } from "react-icons/io5"
import { activePackages, addPackages, addServicesCheckbox, categories, staffBranchList, subCategories, updateActivePackages } from "@/api/apiConfig";


interface StaffBranchListDataProps {
  branch_id?: number;
  branch_name: string;
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

interface ActivePackagesListDataProps {
  // service_id: number;
  package_id: number;
  package_name: string;
  package_services: string;
  price: string;
  status: string;
  is_deleted: boolean; // Change this to boolean
}


export const AddPackages = () => {

  const [categoriesData, setcategoriesData] = useState<categoriesDataProps[]>([]);
  const [subCategoriesData, setSubCategoriesData] = useState<SubCategoriesDataProps[]>([]);
  const [checkboxData, setCheckboxData] = useState<checkboxDataProps[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [staffBranchListData, setStaffBranchListData] = useState<StaffBranchListDataProps[]>([]);
  const [activePackagesData, setActivePackagesData] = useState<ActivePackagesListDataProps[]>([]);

  // State to store selected checkbox IDs
  const [selectedCheckboxIDs, setSelectedCheckboxIDs] = useState<number[]>([]);
  const [selectedCheckboxNames, setSelectedCheckboxNames] = useState<string[]>([]);


  const [buttonState, setButtonState] = useState({ text: "Add Package", success: false });
  const [updateButtonState, setUpdateButtonState] = useState({ text: "Update", success: false });
  const [updatePackagesloading, setUpdatePackagesLoading] = useState<boolean>(false);



  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copyPackagesData, setCopyPackagesData] = useState<ActivePackagesListDataProps[]>([]);

  // Registration Provider ID
  const sessionProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Selected Provider ID from session storage", sessionProviderID);


  // Fetch Categories Data, Sub Categories Data, Branch List Data, Active Packages Data
  useEffect(() => {
    const loadCategorySelect = async () => {
      setLoading(true);

      try {
        const loadCategoriesData = await categories();
        const branchesData = await staffBranchList();

        console.log("Selected branch ==>", selectedBranch, loadCategoriesData);
        setcategoriesData(loadCategoriesData.data);

        setStaffBranchListData(branchesData.data || []);        // Fallback to an empty array if data is null

        if (branchesData.data && branchesData.data.length > 0) {
          setSelectedBranch(branchesData.data[0].branch_id);    // Set the first branch as default if needed
        }

        const loadActivePackagesData = await activePackages(Number(sessionProviderID), Number(branchesData.data[0].branch_id));

        setActivePackagesData(loadActivePackagesData.data || []);// Fallback to an empty array if data is null

        console.log("Category list data log:", loadCategoriesData);

        console.log("Staff branch list data log for select field:", branchesData);

        console.log("Active Packages list data log:", loadActivePackagesData);

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


  // Refreshing the active packages data when the added new package
  const refreshActivePackages = async () => {
    try {
      const loadActivePackagesData = await activePackages(Number(sessionProviderID), Number(selectedBranch));
      setCopyPackagesData(loadActivePackagesData.data || []);// Fallback to an empty array if data is null

      console.log("Active Packages list refreshed:", loadActivePackagesData);
    } catch (error: any) {
      console.error("Error refreshing active services:", error.message);
    }
  };

  // Getting the copy of active services data & changing the state activeServicesData to set true or false
  useEffect(() => {
    // Initialize `servicesData` with a deep copy of `activeServicesData`
    setCopyPackagesData(JSON.parse(JSON.stringify(activePackagesData)));
  }, [activePackagesData]); // Only re-run when `activeServicesData` changes


  // Handle Branch Change
  const handleBranchChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBranchId = event.target.value; // Get the selected branch ID
    setSelectedBranch(selectedBranchId); // Update branch selection state

    console.log("Hello Branch ID", selectedBranchId);

    // Clear the error if a branch is selected
    if (selectedBranchId) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        branch: "",
      }));
    }

    try {
      setLoading(true);

      // Fetch active packages for the selected branch and category
      const loadActivePackagesData = await activePackages(Number(sessionProviderID), Number(selectedBranchId));

      // Update the active services data
      setActivePackagesData(loadActivePackagesData.data);

      console.log("Updated Active Packages Data for Branch:", loadActivePackagesData);
    } catch (error: any) {
      setError(error.message || "Failed to fetch active packages for the selected branch");
    } finally {
      setLoading(false);
    }
  };


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

    // Clear the error if a sub-category is selected
    if (selectedSubCategoryId) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        subCategory: "",
      }));
    }

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
      if (updatedSelected.length > 0) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          services: "",
        }));
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

  // State to manage form inputs
  const [formValues, setFormValues] = useState({ price: "", packageTitle: "", });
  const [validationErrors, setValidationErrors] = useState({
    city: '',
    packageTitle: '',
    branch: '',
    price: '',
    category: '',
    subCategory: '',
    services: '',
  }); // To store validation errors

  // Handle input value from Package Title & Price
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


  // Form validation logic
  const validateForm = () => {
    const errors: any = {};
    if (!formValues.packageTitle) errors.packageTitle = "Package title is required.";
    if (!formValues.price || Number(formValues.price) <= 0) errors.price = "Price must be a positive number.";
    if (!selectedBranch) errors.branch = "Branch selection is required.";
    if (!selectedCategory) errors.category = "Category selection is required.";
    if (!selectedSubCategory) errors.subCategory = "Sub-category selection is required.";
    if (selectedCheckboxIDs.length === 0) errors.services = "At least one service must be selected.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };


  // Converting the checkbox ID's to string
  const checkboxIDsString = selectedCheckboxIDs.join(","); // Converts array to string
  console.log("Changed to string value", checkboxIDsString);


  // On Submit handler on clicking Add Package
  const onSubmitAddPackages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!validateForm()) return; // Validate form before submission

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("provider", sessionProviderID || "");
      formData.append("branch_id", selectedBranch);

      // formData.append("category_id", selectedCategory);
      // formData.append("subcategory_id", selectedSubCategory);

      formData.append("package_name", formValues.packageTitle || "");
      formData.append("price", formValues.price || "");
      // formData.append("selected_service_ids", selectedCheckboxIDs.join(",")); // Combine selected services into a comma-separated string
      formData.append("selected_service_ids", checkboxIDsString); // Combine selected services into a comma-separated string
      // Call the taxInfo function
      const addPackagesData = await addPackages(formData);

      console.log("Package added successfully:", addPackagesData);

      if (addPackagesData?.status === "success") {
        // Update button UI to success state
        setButtonState({ text: "Package Added Successfully!", success: true });

        // Clear all selected fields
        // setSelectedBranch("");
        setFormValues({ packageTitle: "", price: "" });  // Properly reset form values
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedCheckboxIDs([]);
        setCheckboxData([]); // If you need to clear the services list


        // Refresh active services list
        await refreshActivePackages();

        // Revert back to default state after 3 seconds
        setTimeout(() => {
          setButtonState({ text: "Add Package", success: false });
        }, 3000);

      } else {
        throw new Error("Failed to add service.");
      }
    }

    catch (error: any) {
      setError(error.message || "Something went wrong while adding the package.");
      setButtonState({ text: "Add Package", success: false });

    } finally {
      setLoading(false);
    }
  }



  // Function to delete package data from the active packages data
  // const handleDeletePackageData = (package_id: number) => {
  //   // Make a deep copy of the data to ensure immutability
  //   const updatedPackagesData = copyPackagesData.map((pkg) =>
  //     pkg.package_id === package_id
  //       ? { ...pkg, is_deleted: true } // Mark the package as deleted
  //       : pkg
  //   );

  //   // Update the state with the modified data
  //   setCopyPackagesData(updatedPackagesData);

  //   console.log("Updated Packages Copy Data:", updatedPackagesData);
  // };


  // Function to get price of package
  const handlePriceChange = (package_id: number, value: string) => {
    setCopyPackagesData((prevData) =>
      prevData.map((item) =>
        item.package_id === package_id
          ? { ...item, price: value } // Update price for the specific service
          : item
      )
    );
  };

  // Function to delete package data from the active packages data
  const handleDeletePackageData = (package_id: number) => {
    //   // Make a deep copy of the data to ensure immutability
    setCopyPackagesData((prevData) =>
      prevData.map((pkg) =>
        pkg.package_id === package_id
          ? { ...pkg, is_deleted: true } // Mark as deleted
          : pkg
      )
    );
  };


  // Function call for handling the active packages change to the update button
  const onUpdateActivePackages = async () => {
    setUpdatePackagesLoading(true);  // Set loading state
    setError(null);                  // Reset error state

    try {

      // Prepare the updated packages data (only include necessary fields)
      const updatedPackages = copyPackagesData.map((pkg) => ({
        package_id: pkg.package_id,
        price: pkg.price,
        is_deleted: pkg.is_deleted, // Convert boolean to string,
      }));

      console.log("Submitting Data:", updatedPackages);

      // Create FormData object
      const formData = new FormData();
      formData.append("packages", JSON.stringify(updatedPackages));

      console.log("Submitting FormData:", Object.fromEntries(formData.entries())); // Debugging purposes


      // Call the API
      const response = await updateActivePackages(formData);
      console.log("Update Services Data Submission Success:", response);

      if (response?.status === "success") {
        setUpdatePackagesLoading(false);
        setUpdateButtonState({ text: "Updated Packages Successfully!", success: true });

        // Revert back to default state after 3 seconds
        setTimeout(() => {
          setUpdateButtonState({ text: "Update", success: false });
        }, 3000);

      } else {
        throw new Error("Failed to update package.");
      }

    } catch (error: any) {
      console.error("Error Updating Packages:", error);
      setError(error.message || "Something went wrong.");
      setUpdateButtonState({ text: "Update Failed.", success: false });

    } finally {
      setUpdatePackagesLoading(false);
    }
  };


  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* <div className="bg-mindfulLightPink px-5 py-5"> */}

      {/* <div className="bg-mindfulWhite px-5 py-5"> */}
      <div>
        <div>
          <div className="">
            <div>
              <h5 className="text-3xl font-semibold py-5">Add Package</h5>
            </div>


            <div className="grid grid-cols-2 gap-5">
              {/* Whole Grid Column One */}
              <div className="">
                <form onSubmit={onSubmitAddPackages} action="" method="post">

                  {/* Render validation errors */}
                  {/* {Object.values(validationErrors).map((error, idx) => (
                    <p key={idx} className="text-red-600 text-sm italic">
                      {error}
                    </p>
                  ))} */}

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
                            value={formValues.packageTitle}
                            onChange={handleInputChange}
                            placeholder=""
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
                          {/* <SelectField
                            label={''}
                            name="branch"
                            id="branch"
                            options={[
                              { value: "branch1", label: "Branch 1" },
                              { value: "branch2", label: "Branch 2" },
                            ]}
                            className="w-full rounded-sm border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
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
                          {validationErrors.branch && (
                            <p className="text-red-600 text-sm italic">
                              {validationErrors.branch}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div>
                          <label
                            htmlFor="price"
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
                      {/* <div>
                        <label
                          htmlFor="category"
                          className="text-md text-mindfulBlack font-semibold mb-1"
                        >
                          Category
                        </label>
                        <SelectField
                          label={''}
                          name="category"
                          id="category"
                          options={[
                            { value: "skin", label: "Skin" },
                            { value: "hair", label: "Hair" },

                          ]}
                          className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
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

                        {/* {error.category && (
                                <p className="text-sm text-red-600">{error.category}</p>
                            )} */}
                      </div>


                      {/* Sub Category */}
                      {/* <div>
                        <label
                          htmlFor="subCategory"
                          className="text-md text-mindfulBlack font-semibold mb-1"
                        >
                          Sub Category
                        </label>
                        <SelectField
                          label={''}
                          name="subCategory"
                          id="subCategory"
                          options={[
                            { value: "facials", label: "Facials" },
                            { value: "waxing", label: "Waxing" },
                          ]}
                          className="w-full rounded-[5px] border-[1px] border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
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

                        {validationErrors.subCategory && (
                          <p className="text-red-600 text-sm italic">
                            {validationErrors.subCategory}
                          </p>
                        )}

                        {/* {error.subCategory && (
                                <p className="text-sm text-red-600">{error.subCategory}</p>
                            )} */}
                      </div>
                    </div>
                  </div>

                  {/* Services */}
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
                    {validationErrors.services && (
                      <p className="text-red-600 text-sm italic mt-5">{validationErrors.services}</p>
                    )}
                  </div>


                  <div className="pt-5">
                    <div>
                      <textarea
                        rows={3}
                        name=""
                        id=""
                        // value="Bridal Glow Facial, Full Arm Waxing, Hair Spa, Aroma Pedicure, Aroma Manicure"
                        value={selectedCheckboxNames.join(", ")}
                        className="w-full rounded-sm bg-blue-50 border-[1px] border-mindfulgrey px-3 py-3 focus-within:outline-none"
                      ></textarea>

                      <p className="text-sm text-mindfulRed italic">Note: Use comma (,) to type more services</p>

                    </div>
                  </div>


                  {/* Add Service Button */}
                  <div className="text-center mt-20">
                    {/* <button className="bg-main text-lg text-mindfulWhite rounded-sm px-8 py-2">Add Package</button> */}
                    <button
                      type='submit'
                      className={`text-lg text-mindfulWhite rounded-sm px-8 py-2 
                                    ${buttonState.success ? "bg-green-500" : "bg-main"}
                                    ${loading ? "bg-mindfulgrey" : ""}
                                      `}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : buttonState.text}
                    </button>

                    {/* Error response from the API */}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                  </div>
                </form>
              </div>

              {/* Whole Grid Column Two */}
              <div className="border-l-2 pl-5">

                <div className="border-b-2 mb-4">
                  <div className="flex items-center justify-between">

                    <div>
                      <h5 className="text-2xl font-semibold py-3">Active Packages</h5>
                    </div>

                    <div className="flex items-center space-x-5">
                      {/* Copy Services
                      <div
                        // onClick={openBranchPopup}
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
                      </div> */}

                      {/* Branch Select Field */}
                      {/* <div>
                        <SelectField
                          label=""
                          name="branch"
                          // required
                          className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                          options={[
                            { value: "kochi", label: "Kochi" },
                            { value: "trivandrum", label: "Trivandrum" },
                            { value: "kollam", label: "Kollam" },
                            { value: "thrissur", label: "Thrissur" },
                          ]}
                        // error="This field is required."
                        />
                      </div> */}

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


                {/* Content */}
                <div>
                  {/* <div className="border-b-[1px] py-3">
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-md text-mindfulBlack font-semibold">Bridal Pack</h5>

                      <div className="">
                        <IoCloseCircle className="text-[28px] text-mindfulRed" />
                      </div>
                    </div>
                  </div> */}

                  {copyPackagesData.length > 0 ? (
                    copyPackagesData.map((activeData) => (
                      <div
                        key={activeData.package_id}
                        // className="border-b-2 pb-5"
                        className={`border-b-2 pb-5 ${activeData.is_deleted ? "hidden" : ""}`}
                      >

                        {/* Heading */}
                        <div className="bg-mindfulLightgrey px-3 py-3">
                          <div className="flex items-center justify-between">
                            <p className="text-md text-mindfulBlack font-semibold">{activeData.package_name}</p>

                            <div
                              className="cursor-pointer"
                              onClick={() => handleDeletePackageData(activeData.package_id)}
                            >
                              <IoCloseCircle className="text-[28px] text-mindfulRed" />
                            </div>
                          </div>

                        </div>

                        {/* Pricing Table */}
                        <div>
                          <table className="w-full">
                            <thead>
                              <tr className="border-b-[1px] border-dashed">
                                <th className="w-10/12 text-sm text-start text-mindfulgrey font-normal px-2 py-2">Service</th>
                                <th className="text-sm text-start text-mindfulgrey font-normal px-2 py-2">Pricing (Rs)</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="border-b-2 border-dashed">
                                <td className="px-2 py-5">
                                  <p>{activeData.package_services}</p>
                                </td>
                                <td className="px-2 py-5">
                                  <div>
                                    <InputField
                                      label={''}
                                      placeholder={activeData.price || "N/A"}
                                      value={activeData.price}
                                      onChange={(e) => handlePriceChange(activeData.package_id, e.target.value)}
                                      className="w-32 text-sm text-mindfulBlack border-2 rounded-sm px-2 py-1 focus-within:outline-none"
                                    // disabled={activeData.is_deleted} // Disable if the package is marked as deleted
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="border-b-2 pb-5">
                      <p className="px-2 py-5">No active packages found</p>
                    </div>
                  )}



                  {/* Update Button */}
                  <div className="my-5" >
                    <Button
                      onClick={onUpdateActivePackages}
                      buttonTitle={updatePackagesloading ? "Updating..." : updateButtonState.text}
                      className={`text-lg text-mindfulWhite rounded-sm px-8 py-2
                        ${updateButtonState.success ? "bg-green-500" : "bg-main"}`}
                      disabled={updatePackagesloading} // Optional: disable while loading
                    />
                  </div>

                </div>


              </div>

            </div>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* </div> */}
    </div >
  )
}
