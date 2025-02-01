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
    // throw new Error(error.response?.data?.message || "Unable to register. Please try again later.");
    // throw new Error(error.response?.data?.errors?.phone || "Unable to register. Please try again later.");
    // Extract specific error messages
    const emailError = error.response?.data?.errors?.email?.[0] || null;
    const phoneError = error.response?.data?.errors?.phone?.[0] || null;

    // Combine the error messages for display
    const combinedError = [emailError, phoneError].filter(Boolean).join(" & ");
    if (combinedError) {
      throw new Error(combinedError);
    } else {
      throw new Error("Unable to register. Please try again later.");
    }

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






// Dashboard --> DashBoardData Page
// POST Method from the API
export const onlineAction = async (branchID: number, serviceStatus: string) => {

  try {
    const response = await apiAxios.post(`/provider-api/update-service-status/`, {
      branch_id: branchID,
      service_status: serviceStatus
    });

    console.log("Online Action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data; // Ensure the entire response data is returned
  } catch (error: any) {
    console.error("Error in online Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process online action. Please try again later.");
  }
};





// Dashboard Page -- --> Bookings
// GET Method from the API
export const dashBoardBookingList = async (
  providerID: number,
  // sortOrder: string
) => {

  try {
    const response = await apiAxios.get(`/api/bookings/`, {
      params: {
        provider_id: providerID,
        // sort_order: sortOrder
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
    // const response = await apiAxios.get(`/provider-api/beauticians/`, {
    const response = await apiAxios.get(`/provider-api/stylists/`, {
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
export const declineMessageAction = async (formData: FormData) => {

  try {
    const response = await apiAxios.post(`/api/message/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Decline Message Action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data;
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
export const staffList = async (searchByName: string, pageNumber: number) => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/staff-list/${sessionLoginProviderID}/`, {
      params: {
        // Add any additional parameters as needed
        search: searchByName,
        page: pageNumber,

      },
    });
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
export const branchList = async (searchByName: string) => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/branches-list/${sessionLoginProviderID}`, {
      params: {
        search: searchByName,
      },
    });

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
export const servicesList = async (providerID: number, branchID: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider-services/`, {
      params: {
        provider_id: providerID,
        branch_id: branchID,
        search: searchQuery,
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





// Service Listing Page -- --> Service List
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



// Service Listing Page -> Service List
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




// Service Listing Page -- --> Copy Services
// POST Method from the API
export const copyServices = async (sourceBranchId: number, targetBranchIds: string, providerId: number) => {
  try {
    const response = await apiAxios.post(`/provider-api/copy-services/`, {
      source_branch_id: sourceBranchId,
      target_branch_id: targetBranchIds,
      provider_id: providerId
    });

    console.log("Copy Services API response", response.data);

    // Check for both status code and response data
    if (!response.data || (response.status !== 200 && response.status !== 201)) {
      throw new Error(response.data?.message || "Failed to copy services");
    }

    return response.data;
  }
  catch (error: any) {
    console.error("Error copying services:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Unable to copy services. Please try again later.");
  }
}



// Service Listing Page -- --> Packages Tab
// GET Method from the API
// export const packagesList = async (providerID: number, pageNumber: number) => {

//   try {
//     const response = await apiAxios.get(`/provider-api/packages-list/`, {
//       params: {
//         provider_id: providerID,
//         page: pageNumber,
//       },
//     });

//     console.log("Packages list GET Method response", response.data);

//     if (!response.data || response.status !== 200) {
//       throw new Error("Failed to fetch packages list");
//     }

//     return response.data;

//   }
//   catch (error: any) {
//     console.error("Error fetching packages list:", error.message || error);
//     throw new Error(error.response?.data?.message || "Unable to fetch packages list. Please try again later.");
//   }
// }

export const packagesList = async (providerID: number, branchID: string, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/packages-list/`, {
      params: {
        provider_id: providerID,
        branch_id: branchID,
        search: searchQuery,
        page: pageNumber
      }
    });

    console.log("Packages list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch packages list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching packages list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch packages list. Please try again later.");
  }
}



// Service Listing Page -- --> Packages Tab 
// POST Method from the API
export const packageStatusAction = async (packageID: number, statusName: string) => {

  try {
    const response = await apiAxios.post(`/provider-api/toggle-service-status/`, {
      service_id: packageID,
      status: statusName
    });

    console.log("Status Action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data; // Ensure the entire response data is returned
  } catch (error: any) {
    console.error("Error in status Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process status action. Please try again later.");
  }
};




// Service Listing Page -- --> Packages Tab
// DELETE Method from the API
export const deletePackage = async (packageID: number) => {

  try {
    const response = await apiAxios.delete(`/provider-api/delete-package/`, {
      data: { service_id: packageID }, // Include branch_id in the data property

    });

    console.log("Package list DELETE Method response:", response.data);   // Log the response data for debugging purposes

    // Validate HTTP status
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to delete package. Invalid server response.");
    }

    return response.data; // Return the actual response data
  }
  catch (error: any) {
    console.error("Error deleting package:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to delete package. Please try again later.");
  }

}


// Service Listing Page -> Active Packages List
export const activePackages = async (providerID: number, branchID: number) => {

  try {
    const response = await apiAxios.get('/provider-api/active-packages/', {
      params: {
        provider_id: providerID, // Replace with the actual category ID
        branch_id: branchID, // Replace with the actual branch ID
      },
    });
    console.log("Active Packages List response", response.data);

    // Assuming the API returns an object with a `status` field and a `data` field
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch Active Packages list");
    }

    return response.data; // Adjust based on the actual response structure

  } catch (error: any) {
    console.error("Error fetching active packages list:", error.message || error);
    throw new Error("Unable to fetch active packages list. Please try again later.");
  }
};





// Service Listing Page -> Service List
export const addPackages = async (formData: FormData): Promise<any> => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following add packages FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await apiAxios.post(`/provider-api/add-package-service/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },
    });

    console.log("Packages list added POST Method response:", response.data);

    // Validate HTTP status
    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add packages. Invalid server response.");
    }

    return response.data; // Return the actual response data

  }
  catch (error: any) {
    console.error("Error adding packages:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add packages. Please try again later.");
  }
}


// Service Listing -- --> Packages -- --> Active Packages
// PUT Method from the API
export const updateActivePackages = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/update-packages/`, formData, {

      headers: {
        // "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
        "Content-Type": "application/json",
      },

    });

    console.log("Update Active Packages PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit update Active Packages");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error updating active packages:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to updating active packages. Please try again later.");
  }
}




// Service Listing Page -- --> Service List
// PUT Method from the API
export const editPackages = async (formData: FormData): Promise<any> => {

  try {
    const response = await apiAxios.put(`/provider-api/edit-package/`, formData, {

      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server recognizes file uploads
      },

    });

    console.log("Edit Selected Package PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to edit selected package");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error editing selected package:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to edit selected package. Please try again later.");
  }
}




// Service Management Page -- --> All Booking List
// GET Method from the API
export const bookingsList = async (providerID: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        search: searchQuery,
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





// Service Management Page -- --> Schedule List
// GET Method from the API
export const scheduleList = async (providerID: number, status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        search: searchQuery,
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




// Service Management Page -- --> Inprogress List
// GET Method from the API
export const inprogressList = async (providerID: number, status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        search: searchQuery,
        page: pageNumber,

      }
    });

    console.log("Inprogress Booking list GET Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch inprogress list");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error fetching inprogress booking list:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch inprogress list. Please try again later.");
  }
}




// Service Management Page -- --> Completed List
// GET Method from the API
export const completedList = async (providerID: number, status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        search: searchQuery,
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




// Service Management Page -- --> Cancelled List
// GET Method from the API
export const cancelledList = async (providerID: number, status: number, searchQuery: string, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
        search: searchQuery,
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



// Service Management -- --> Payment Status
// POST Method from the API
export const paymentStatus = async (appointmentID: number, paymentStatus: string) => {

  try {
    const response = await apiAxios.post(`/provider-api/update-payment-status/`, {
      appointment_id: appointmentID,
      payment_status: paymentStatus,
    });

    console.log("Payment Status PUT Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to payment Status");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error payment status:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to payment status. Please try again later.");
  }
}


// Service Management -- --> Completed --> InvoicePopup
// GET Method from the API
export const invoiceDetails = async (appointmentId: number) => {
  try {
    const response = await apiAxios.get(`provider-api/invoice/?appointment_id=${appointmentId}`);

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
};




// Sales & Transactions Page
// GET Method from the API
export const salesTransactionsList = async (providerID: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/sales-transactions/`, {
      params: {
        provider_id: providerID,
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
    throw new Error(error.response?.data?.message || "Unable to fetch sales & transactions list. Please try again later.");
  }
}






// Sales & Transactions Page - Sales & Transactions List includes Search Functionality
// GET Method from the API
export const fetchSalesTransactionsByFilters = async (
  filters: {
    providerID: number
    orderID: string;
    customerMobile: string;
    providerName: string;
    startDate: string;
    endDate: string;
  }
) => {
  try {
    const response = await apiAxios.get(`/provider-api/sales-transactions/`, {
      params: {
        provider_id: filters.providerID,
        appointment_id: filters.orderID,
        customer_query: filters.customerMobile,
        branch_query: filters.providerName,
        start_date: filters.startDate,
        end_date: filters.endDate,
      },
    });

    console.log("Sales Transactions by Filters response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch sales transactions by filters");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching sales transactions by filters:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch sales transactions by filters. Please try again later.");
  }
};





// Ratings & Reviews Page
// GET Method from the API
export const reviewsList = async (providerID: number, pageNumber: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/reviews/`, {
      params: {
        provider_id: providerID,
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


// Ratings & Reviews Page 
// POST Method from the API
export const reviewAction = async (reviewID: number, statusID: number, userID: number) => {

  try {
    const response = await apiAxios.post(`/provider-api/approve-review/`, {
      review_id: reviewID,
      status: statusID,
      user_id: userID,
    });

    console.log("Review Action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data; // Ensure the entire response data is returned
  } catch (error: any) {
    console.error("Error in review Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process review action. Please try again later.");
  }
};


// My Account Page
// GET Method from the API
export const fetchProviderTransactions = async (providerId: number) => {
  try {
    const response = await apiAxios.get(`/provider-api/provider-transactions/`, {
      params: {
        provider_id: providerId
      }
    });

    console.log("Provider Transactions response:", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch provider transactions");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching provider transactions:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch provider transactions. Please try again later.");
  }
};




// My Account Page -- --> Wallet Tab --> Wallet Balance
// POST Method from the API
export const getWalletCredits = async (provider_id: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/wallet-credits/`, {
      params: {
        provider_id,
      },
    });

    console.log("Wallet credits response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch wallet credits");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching wallet credits:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch wallet credits. Please try again later.");
  }
};



// My Account Page -- --> Wallet Tab --> Credit Popup
// POST Method from the API
export const addWalletTransaction = async (provider_id: number, amount: number) => {

  try {
    const response = await apiAxios.post(`/provider-api/add-wallet-transaction/`, {
      provider_id,
      amount,
    });

    console.log("Add Wallet Transaction response:", response.data);

    if (!response.data || response.status !== 201) {
      throw new Error("Failed to add wallet transaction.");
    }

    return response.data; // Return the successful response data
  } catch (error: any) {
    console.error("Error adding wallet transaction:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to add wallet transaction. Please try again later.");
  }
};





// My Account Page -- --> General Info Tab --> Credit Popup
// GET Method from the API
export const fetchGeneralInfoDetails = async (provider_id: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/general_info/`, {
      params: {
        provider_id,
      },
    });
    console.log("general info response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch general info");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching general info:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to fetch general info. Please try again later.");
  }
};





// My Account Page -- --> General Info Tab --> Credit Popup
// POST Method from the API
export const updateGeneralInfo = async (data: any) => {
  console.log("general info data load params ==>", data)
  try {
    const response = await apiAxios.put(`/provider-api/update-provider-details/`, data);
    console.log("Update General Info response:", response.data);

    return response.data; // Return the successful response data
  } catch (error: any) {
    console.error("Error adding General Info:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to update General Info. Please try again later.");
  }
};




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



