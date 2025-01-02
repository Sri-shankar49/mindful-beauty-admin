import { apiAxios } from './apiUrl';

// Root Page --> Login Form
export const fetchLogin = async (phoneNumber: number) => {
  try {
    const response = await apiAxios.post(`/provider-api/login/`, {
      phone: phoneNumber
    },
    );
    console.log("Login API response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Login API");
    }

    return response.data;
  }
  catch (error: any) {
    console.error("Error fetching Login API:", error.response.data.message || error);
    throw new Error(error.response.data.message || "Unable to fetch Login API. Please try again later.");
  }
}


// Root Page --> Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string) => {
  try {
    const response = await apiAxios.post("/provider-api/login/verify-otp/",
      {
        phone: phoneNumber,
        otp: otp, // Convert the OTP array to a string
      },
    );
    console.log("OTP response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Invalid OTP response");
    }

    return response.data;
  }
  catch (error: any) {
    console.error("Error validating OTP:", error.response.data.message || error);
    throw new Error(error.response.data.message || "Unable to validate OTP. Please try again later.");
  }
}


// Root Page --> New to Mindful Beauty
export const loginRegister = async (userName: string, userEmail: string, userPhoneNumber: number, serviceType: number, userLocation: string) => {
  try {
    const response = await apiAxios.post(`/provider-api/register/`, {
      name: userName,
      email: userEmail,
      phone: userPhoneNumber,
      service_type: serviceType,
      location: userLocation
    });

    console.log("Login Register response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to register");
    }

    return response.data; // Adjust based on the actual response structure

  }
  catch (error: any) {
    console.error("Error registering:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to register. Please try again later.");
    // throw new Error(error.response?.data?.errors?.phone || "Unable to register. Please try again later.");
  }
}



// General Information Form Page
export const generalInfo = async (
  ownerName: string,
  salonName: string,
  contactNumber: number,
  emailAddress: string,
  salonLocation: string,
  establishedOn: string,
  salonAddress: string,
  servicesOffered: string,
  businessHours: string,
  staffInformation: string,
  salonFacilities: string,
  cancellationPolicy: string
) => {
  try {

    // Registration Provider ID
    const sessionProviderID = sessionStorage.getItem("providerID");
    console.log("Selected Provider ID from session storage", sessionProviderID);

    const response = await apiAxios.post(`/provider-api/register_general_info/${sessionProviderID}/`, {

      // Add the required fields here
      owner_name: ownerName,
      salon_name: salonName,
      phone: contactNumber,
      email: emailAddress,
      saloon_location: salonLocation,
      established_on: establishedOn,
      saloon_address: salonAddress,
      services_offered: servicesOffered,
      working_hours: businessHours,
      staff_information: staffInformation,
      salon_facilities: salonFacilities,
      cancellation_policy: cancellationPolicy,
    });

    console.log("General Information response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to register general information");
    }
    return response.data; // Adjust based on the actual response structure
  }

  catch (error: any) {
    console.error("Error registering general information:", error.message || error);
    throw new Error("Unable to register general information. Please try again later.");
  }

}



// General Information Form Page
export const generalInfoFreelance = async (formData: FormData) => {

  try {
    // Debugging: Log the FormData contents
    console.log("Sending the following FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Registration Provider ID
    const sessionProviderID = sessionStorage.getItem("providerID");
    console.log("Selected Provider ID from session storage", sessionProviderID);

    const response = await apiAxios.post(`/provider-api/register_general_info/${sessionProviderID}/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("General Information Freelance response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to register general freelance information");
    }
    return response.data; // Adjust based on the actual response structure
  }

  catch (error: any) {
    console.error("Error registering general freelance information:", error.message || error);
    throw new Error("Unable to register general freelance information. Please try again later.");
  }

}



// Bank Account Information Form
export const bankAccInfo = async (
  providerID: number,
  bankAccHolderName: string,
  bankName: string,
  bankAccountNumber: string,
  accountType: string,
  bankBranch: string,
  ifscCode: string

) => {
  try {
    const response = await apiAxios.post(`/provider-api/register_bank_info/`, {

      // Add the required fields here
      provider: providerID,
      account_holder_name: bankAccHolderName,
      bank_name: bankName,
      bank_account_number: bankAccountNumber,
      account_type: accountType,
      bank_branch: bankBranch,
      ifsc_code: ifscCode,
    });

    console.log("Bank Account Information response", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to submit bank information");
    }

    return response.data; // Adjust based on the actual response structure

  }

  catch (error: any) {
    console.error("Error submitting bank account information:", error.message || error);
    throw new Error("Unable to submit bank account information. Please try again later.");
  }

}



// Tax Information Form
export const taxInfo = async (formData: FormData): Promise<unknown> => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following taxInfo FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await apiAxios.post(`/provider-api/register_tax_info/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("Tax Information response:", response.data);

    // Validate HTTP status
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to register tax information");
    }

    return response.data; // Return the actual response data
  }

  catch (error: any) {
    console.error("Error registering tax information:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to register tax information. Please try again later.");
  }
};






// Dashboard Page -- --> Bookings
// GET Method from the API
export const dashBoardBookingList = async (providerID: number, sortOrder: string) => {

  try {
    const response = await apiAxios.get(`/api/bookings/`, {
      params: {
        provider_id: providerID,
        sort_order: sortOrder
      }
    });

    console.log("Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching staff list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch booking list. Please try again later.");
  }
}




// Dashboard Page -- --> Bookings
// GET Method from the API
export const beauticiansList = async (providerID: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/beauticians/`, {
      params: {
        provider_id: providerID,
      }
    });

    console.log("Beauticians list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch beauticians list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching beauticians list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch beauticians list. Please try again later.");
  }
}




// Dashboard Page -> Bookings
export const fetchDeclineMessages = async () => {
  try {
    const response = await apiAxios.get('/api/messages/');
    console.log("Decline Messages List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Decline Messages list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Decline Messages list:", error.message || error);
    throw new Error("Unable to fetch Decline Messages list. Please try again later.");
  }
};




// Dashboard Page -- --> Bookings
// POST Method from the API
export const declineMessageAction = async (appointmentID: number, messageID: number) => {

  try {
    const response = await apiAxios.post(`/api/message/`, {
      appointment_id: appointmentID,
      message_id: messageID,
    });

    console.log("Decline Message Action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data; // Ensure the entire response data is returned
  } catch (error: any) {
    console.error("Error in Decline Message Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process Decline Message Action. Please try again later.");
  }
};




// Dashboard Page -- --> Bookings
// POST Method from the API
export const bookingAction = async (appointmentID: number, stylistID: number, actionID: number) => {

  try {
    const response = await apiAxios.post(`/api/provider-booking-action/`, {
      appointment_id: appointmentID,
      stylist_id: stylistID,
      action_id: actionID
    });

    console.log("Booking action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data; // Ensure the entire response data is returned
  } catch (error: any) {
    console.error("Error in booking Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process booking action. Please try again later.");
  }
};





// Manage Role Page -- --> Role Management
// GET Method from the API
export const roleList = async () => {

  try {
    const response = await apiAxios.get(`/provider-api/provider_roles/`);

    console.log("Role list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch role list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching role list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch role list. Please try again later.");
  }
}





// Function to call the permissions API
export const addPermissions = async (
  role: number,
  provider: number,
  dashboard: boolean,
  manageRole: boolean,
  service_listing: boolean,
  service_management: boolean,
  sales_transactions: boolean,
  ratings_reviews: boolean,
  report_details: boolean,
  all_booking: boolean,
  schedule: boolean,
  inprogress: boolean,
  completed: boolean,
  cancelled: boolean,
  roles_management: boolean,
  staff_management: boolean,
  branch_management: boolean
) => {
  try {
    const response = await apiAxios.post(`/provider-api/permissions/`, {
      role,
      provider,
      dashboard,
      manage_role: manageRole,
      roles_management,
      staff_management,
      branch_management,
      service_listing,
      service_management,
      sales_transactions,
      ratings_reviews,
      report_details,
      all_booking,
      schedule,
      inprogress,
      completed,
      cancelled,

    });

    console.log("Permissions API response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to add permissions");
    }

    return response.data; // Return the API response for further use

  }

  catch (error: any) {
    console.error("Error adding permissions:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add permissions. Please try again later.");
  }
};




// Function to get provider permissions
export const getProviderPermissions = async (providerId: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider_permissions/${providerId}/`);
    console.log("Provider Permissions Response:", response.data);

    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to retrieve provider permissions");
    }

    return response.data.data; // Return the permissions data
  } catch (error: any) {
    console.error("Error fetching provider permissions:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch permissions. Please try again later.");
  }
};



// Manage Role Page -- --> Staff Management
// GET Method from the API
export const staffList = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/staff-list/${sessionLoginProviderID}/`);
    // const response = await apiAxios.get(`/provider-api/staff-list/2/`);

    console.log("Staff list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch staff list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching staff list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch staff list. Please try again later.");
  }
}




// Manage Role Page -- --> Staff Management
// GET Method from the API
export const fetchSelectedStaff = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/staff-list/${sessionLoginProviderID}/`);
    // const response = await apiAxios.get(`/provider-api/staff-list/2/`);

    console.log("Selected Staff GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch selected staff");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching selected staff:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch selected staff. Please try again later.");
  }
}




// Manage Role Page -- --> Add Staff Popup Branch Select Option
// GET Method from the API
export const staffBranchList = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    // const response = await apiAxios.get(`/provider-api/staff_branches/${sessionLoginProviderID}`);
    const response = await apiAxios.get(`/provider-api/staff-branches/${sessionLoginProviderID}/`);
    // const response = await apiAxios.get(`/provider-api/staff-list/2`);

    console.log("Staff branch list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch staff branch list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching staff branch list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch staff branch list. Please try again later.");
  }
}




// Manage Role Page -- --> Branch Management
// GET Method from the API
export const fetchSelectedBranch = async (
  // branchID: number
) => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/branch/`, {
      // branch_id: branchID,
    });

    console.log("Selected Branch GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch selected branch");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching selected branch:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch selected branch. Please try again later.");
  }
}



// Manage Role Page -- --> Branch Management
// PUT Method from the API
export const editBranch = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/branch/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("Edit Selected Branch PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit selected branch");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error editing selected branch:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to edit selected branch. Please try again later.");
  }
}




// Manage Role Page -- --> Add Staff Popup Branch Select Option
// GET Method from the API
export const staffRoleList = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    // const response = await apiAxios.get(`/provider-api/provider_roles/${sessionLoginProviderID}`);
    const response = await apiAxios.get(`/provider-api/provider_roles/`);

    console.log("Staff role list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch staff role list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching staff role list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch staff role list. Please try again later.");
  }
}



// Manage Role Page -- --> Staff Management
// POST Method from the API
export const addStaff = async (formData: FormData): Promise<any> => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following add staff FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await apiAxios.post(`/provider-api/staff-list/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Staff list POST Method response:", response.data);

    // Validate HTTP status
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add staff. Invalid server response.");
    }

    return response.data; // Return the actual response data

  }
  catch (error: any) {
    console.error("Error adding staff:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add staff. Please try again later.");
  }
}




// Manage Role Page -- --> Branch Management
// PUT Method from the API
export const editStaff = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/staff-edit-delete/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("Edit Selected Staff PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit selected staff");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error editing selected staff:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to edit selected staff. Please try again later.");
  }
}




// Manage Role Page -- --> Staff Management
// DELETE Method from the API
export const deleteStaff = async (staffID: number) => {

  try {
    const response = await apiAxios.delete(`/provider-api/staff-edit-delete/`, {
      data: { staff_id: staffID }, // Include staff_id in the data property

    });

    console.log("Staff list DELETE Method response:", response.data);   // Log the response data for debugging purposes

    // Validate HTTP status
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to add staff. Invalid server response.");
    }

    return response.data; // Return the actual response data
  }
  catch (error: any) {
    console.error("Error deleting staff:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to delete staff. Please try again later.");
  }


}



// Manage Role Page -- --> Branch Management
// GET Method from the API
export const branchList = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/branches-list/${sessionLoginProviderID}`);

    console.log("Branch list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch branch list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching branch list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch branch list. Please try again later.");
  }
}



// Manage Role Page -- --> Branch Management
// POST Method from the API
export const addBranch = async (formData: FormData): Promise<any> => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following add branch FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await apiAxios.post(`/provider-api/branches/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Branch list POST Method response:", response.data);

    // Validate HTTP status
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add branch. Invalid server response.");
    }

    return response.data; // Return the actual response data

  }
  catch (error: any) {
    console.error("Error adding branch:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add branch. Please try again later.");
  }
}



// Manage Role Page -- --> Branch Management
// DELETE Method from the API
export const deleteBranch = async (branchID: number) => {

  try {
    const response = await apiAxios.delete(`/provider-api/branch/`, {
      data: { branch_id: branchID }, // Include branch_id in the data property

    });

    console.log("Branch list DELETE Method response:", response.data);   // Log the response data for debugging purposes

    // Validate HTTP status
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete branch. Invalid server response.");
    }

    return response.data; // Return the actual response data
  }
  catch (error: any) {
    console.error("Error deleting branch:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to delete branch. Please try again later.");
  }

}



// Service Listing Page -- --> Services List
// GET Method from the API
export const servicesList = async (providerID: number, branchID: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider-services/`, {
      params: {
        provider_id: providerID,
        branch_id: branchID,
        page: pageNumber
      }
    });

    console.log("Service list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch services list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching services list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch services list. Please try again later.");
  }
}





// Manage Role Page -- --> Branch Management
// PUT Method from the API
export const editServices = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/provider-services/edit/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("Edit Selected Service PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit selected branch");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error editing selected branch:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to edit selected branch. Please try again later.");
  }
}




// Service Listing Page -- --> Service List
// DELETE Method from the API
export const deleteService = async (providerServiceID: number) => {

  try {
    const response = await apiAxios.delete(`/provider-api/provider-services/delete/`, {
      data: {
        provider_service_id: providerServiceID   // Include provider_service_id in the data property
      },

    });

    console.log("Service list DELETE Method response:", response.data);   // Log the response data for debugging purposes

    // Validate HTTP status
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete service. Invalid server response.");
    }

    return response.data; // Return the actual response data
  }
  catch (error: any) {
    console.error("Error deleting service:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to delete service. Please try again later.");
  }

}




// Service Listing Page -> Category List
export const categories = async () => {
  try {
    const response = await apiAxios.get('/provider-api/categories/');
    console.log("Category List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Category list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Category list:", error.message || error);
    throw new Error("Unable to fetch Category list. Please try again later.");
  }
};




// Service Listing Page -> Sub Category List
export const subCategories = async (categoryID: string) => {

  try {
    const response = await apiAxios.get('/provider-api/subcategories/', {
      params: {
        category_id: categoryID, // Replace with the actual category ID
      },
    });
    console.log("Sub category List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Sub category list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Sub Category list:", error.message || error);
    throw new Error("Unable to fetch Sub Category list. Please try again later.");
  }
};




// Service Listing Page -> Checkbox Services list
export const addServicesCheckbox = async (categoryID: string, subCategoryID: string) => {

  try {
    const response = await apiAxios.get('/provider-api/provider_services/', {
      params: {
        category_id: categoryID, // Replace with the actual category ID
        subcategory_id: subCategoryID, // Replace with the actual category ID
      },
    });
    console.log("Checkbox List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Checkbox list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Checkbox list:", error.message || error);
    throw new Error("Unable to fetch Checkbox list. Please try again later.");
  }
};




export const addServices = async (formData: FormData): Promise<any> => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following add services FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await apiAxios.post(`/provider-api/add-services/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Services list added POST Method response:", response.data);

    // Validate HTTP status
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add services. Invalid server response.");
    }

    return response.data; // Return the actual response data

  }
  catch (error: any) {
    console.error("Error adding services:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add services. Please try again later.");
  }
}





// Service Listing Page -> Active Services List
export const activeServices = async (providerID: number, branchID: number) => {

  try {
    const response = await apiAxios.get('/provider-api/active-services/', {
      params: {
        provider_id: providerID, // Replace with the actual category ID
        branch_id: branchID, // Replace with the actual branch ID
      },
    });
    console.log("Active Services List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Active Services list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching active services list:", error.message || error);
    throw new Error("Unable to fetch active services list. Please try again later.");
  }
};






// Service Listing -- --> AddServices
// PUT Method from the API
export const updateActiveServices = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/update-active-services/`, formData, {

      headers: {
        // "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
        "Content-Type": "application/json",
      },

    });

    console.log("Update Active Services PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit update Active Services");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error updating active services:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to updating active services. Please try again later.");
  }
}





// Service Management Page -- --> All Booking
// GET Method from the API
export const bookingsList = async (providerID: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        page: pageNumber,
      }
    });

    console.log("Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch booking list. Please try again later.");
  }
}





// Service Listing Page -- --> Services List
// GET Method from the API
export const scheduleList = async (providerID: number, status: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        page: pageNumber,
      }
    });

    console.log("Schedule Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch schedule booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching schedule booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch schedule booking list. Please try again later.");
  }
}




// Service Listing Page -- --> Services List
// GET Method from the API
export const inprogressList = async (providerID: number, status: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        page: pageNumber,

      }
    });

    console.log("Inprogress Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch schedule inprogress list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching inprogress booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch schedule inprogress list. Please try again later.");
  }
}




// Service Listing Page -- --> Services List
// GET Method from the API
export const completedList = async (providerID: number, status: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        page: pageNumber,
      }
    });

    console.log("Completed Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch completed booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching completed booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch completed booking list. Please try again later.");
  }
}




// Service Listing Page -- --> Services List
// GET Method from the API
export const cancelledList = async (providerID: number, status: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        page: pageNumber,
      }
    });

    console.log("Cancelled Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch cancelled booking list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching cancelled booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch cancelled booking list. Please try again later.");
  }
}




// Service Management Page -> All Booking, Schedule, Inprogress, Cancelled
export const fetchStatus = async () => {
  try {
    const response = await apiAxios.get('/provider-api/status/');
    console.log("Status List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Status list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching Status list:", error.message || error);
    throw new Error("Unable to fetch Status list. Please try again later.");
  }
};




// Service Management -- --> All Booking, Schedule, Inprogress, Completed, Cancelled
// PUT Method from the API
export const modifyStatus = async (appointmentID: number, statusID: number) => {

  try {
    const response = await apiAxios.put(`/provider-api/modify-status/`, {
      appointment_id: appointmentID,
      status_id: statusID,
    });

    console.log("Modify Status PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to Modify Status");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error modify status:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to modify status. Please try again later.");
  }
}




// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsList = async (pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/sales-transactions/`, {
      params: {
        page: pageNumber,
      },
    });

    console.log("Sales & Transactions list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales & transactions list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching sales & transactions list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions list. Please try again later.");
  }
}




// Ratings & Reviews Page
// GET Method from the API
export const reviewsList = async (pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/reviews/`, {
      params: {
        page: pageNumber,
      },
    });

    console.log("Reviews list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch reviews list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching reviews list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch reviews list. Please try again later.");
  }
}






// Fetch Messages
// export const fetchMessages = async () => {
//   try {
//     const response = await apiAxios.get(`/api/messages/`);
//     console.log("Messages API response", response.data);

//     // Assuming the API returns an object with a `status`, `message`, and `data` field
//     if (!response.data || response.status !== 200) {
//       throw new Error("Failed to fetch Messages API");
//     }

//     return response.data;
//   } catch (error: any) {
//     console.error("Error fetching Messages API:", error.response?.data?.message || error);
//     throw new Error(error.response?.data?.message || "Unable to fetch Messages API. Please try again later.");
//   }
// };


// export const sendMessage = async (appointmentId: string, messageId: string) => {
//   try {
//     // Send a POST request to the API with the dynamic parameters
//     const response = await apiAxios.post(`/api/messages/`, {
//       appointment_id: appointmentId,
//       message_id: messageId,
//     });

//     console.log("Messages API Response:", response.data);

//     // Validate response status and data
//     if (response.status !== 200 || !response.data) {
//       throw new Error("Failed to send message");
//     }

//     return response.data; // Return the response data for further use
//   } catch (error: any) {
//     console.error("Error sending message:", error.response?.data?.message || error.message || error);
//     throw new Error(error.response?.data?.message || "Unable to send message. Please try again later.");
//   }
// };