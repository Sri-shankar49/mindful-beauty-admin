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
    throw new Error("Unable to register. Please try again later.");
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
export const dashBoardBookingList = async (providerID: number) => {

  try {
    const response = await apiAxios.get(`/api/bookings/`, {
      params: {
        provider_id: providerID,
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
// POST Method from the API
export const bookingAction = async (appointmentID: number, actionID: number) => {

  try {
    const response = await apiAxios.post(`/api/provider-booking-action/`, {
      appointment_id: appointmentID,
      action_id: actionID
    });

    console.log("Booking action POST Method response", response.data);

    if (!response.data || response.status !== 200) {
      throw new Error("Unexpected response from the server.");
    }

    return response.data;

  }
  catch (error: any) {
    console.error("Error in booking Action:", error.message || error);
    throw new Error(error.response?.data?.message || "Unable to process booking action. Please try again later.");
  }
}





// Manage Role Page -- --> Staff Management
// GET Method from the API
export const staffList = async () => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/staff-list/2/`);

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
    const response = await apiAxios.get(`/provider-api/staff-list/2/`);

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
    const response = await apiAxios.get(`/provider-api/staff-list/2`);

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
export const fetchSelectedBranch = async (branchID: number) => {

  // Login Provider ID
  const sessionLoginProviderID = sessionStorage.getItem("loginProviderID");
  console.log("Login Provider ID from session storage", sessionLoginProviderID);

  try {
    const response = await apiAxios.get(`/provider-api/branch/`, {
      branch_id: branchID,
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
export const editBranch = async (formData: FormData): Promise<unknown> => {

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
export const addStaff = async (formData: FormData): Promise<unknown> => {
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
export const editStaff = async (formData: FormData): Promise<unknown> => {

  try {
    const response = await apiAxios.put(`/provider-api/staff/`, formData, {

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
    if (!response.data || response.status !== 204) {
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

  try {
    const response = await apiAxios.get(`/provider-api/branches-list/`);

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
export const addBranch = async (formData: FormData): Promise<unknown> => {
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
    if (!response.data || response.status !== 204) {
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
export const servicesList = async (providerID: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/provider-services/`, {
      params: {
        provider_id: providerID,
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
// DELETE Method from the API
export const deleteService = async (serviceID: number) => {

  try {
    const response = await apiAxios.delete(`/provider-api/provider-services/delete/`, {
      data: {
        provider_service_id: serviceID   // Include provider_service_id in the data property
      },

    });

    console.log("Service list DELETE Method response:", response.data);   // Log the response data for debugging purposes

    // Validate HTTP status
    if (!response.data || response.status !== 204) {
      throw new Error("Failed to delete service. Invalid server response.");
    }

    return response.data; // Return the actual response data
  }
  catch (error: any) {
    console.error("Error deleting service:", error.response?.data?.message || error.message || error);
    throw new Error(error.response?.data?.message || "Unable to delete service. Please try again later.");
  }

}





// Service Management Page -- --> All Booking
// GET Method from the API
export const bookingsList = async (providerID: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
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
export const scheduleList = async (providerID: number, status: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
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
export const inprogressList = async (providerID: number, status: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
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
export const completedList = async (providerID: number, status: number) => {

  try {
    const response = await apiAxios.get(`/provider-api/appointments/`, {
      params: {
        provider_id: providerID,
        status: status,
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
    throw new Error(error.response?.data?.message || "Unable to fetch schedule completed booking list. Please try again later.");
  }
}





// Ratings & Reviews Page -- --> Branch Management
// GET Method from the API
export const reviewsList = async () => {

  try {
    const response = await apiAxios.get(`/provider-api/reviews/`);

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