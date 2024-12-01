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
    console.error("Error fetching Login API:", error.message || error);
    throw new Error(error.response.data.message || "Unable to fetch Login API. Please try again later.");
  }
}


// Root Page --> Verify OTP
// Login page -> OTP API
export const verifyOTP = async (phoneNumber: string, otp: string) => {
  try {
    const response = await apiAxios.post("/provider-api/verify-otp/",
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
    console.error("Error validating OTP:", error.message || error);
    throw new Error("Unable to validate OTP. Please try again later.");
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
export const taxInfo = async (formData: FormData) => {
  try {

    // Debugging: Log the FormData contents
    console.log("Sending the following FormData:");
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




