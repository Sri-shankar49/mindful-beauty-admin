import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyOTP } from '@/api/apiConfig';

interface loginState {
    token: string | null;
    phoneNumber: string | null;
    otpError: string | null;
    loginProviderID: number | null;
    permissions: { [key: string]: boolean } | null;
    loginBranchID: number | null;
    providerLogo: string | null;
    providerOnlineStatus: number | null;
    freelancer: boolean | null;
    mainBranch: boolean | null;
}

const initialState: loginState = {
    token: null,
    phoneNumber: null,
    otpError: null,
    loginProviderID: null,
    permissions: null,
    loginBranchID: null,
    providerLogo: null,
    providerOnlineStatus: null,
    freelancer: null,
    mainBranch: null,
}

// Thunk for OTP Validation
export const verifyOTPThunk = createAsyncThunk('login/verifyOTP', async ({ phoneNumber, otp }: { phoneNumber: string; otp: string },
    { rejectWithValue }) => {
    try {
        const response = await verifyOTP(phoneNumber, otp); // Call the API for OTP validation
        console.log("Login ==>", response)
        if (response.status === 'success') {
            // return response.token; // Return the token on success

            return {
                token: response.token,
                loginProviderID: response.provider_id,
                permissions: response.permissions, // Get permissions dynamically
                loginBranchID: response.branch_id,
                providerLogo: response.image_url,
                providerOnlineStatus: response.branch_online_status,
                freelancer: response.freelancer,
                mainBranch: response.main_branch,
                // permissions: {
                //     "dashboard": true,
                //     "manage_role": true,
                //     "service_listing": true,
                //     "service_management": false,
                //     "sales_transactions": false,
                //     "ratings_reviews": false,
                //     "report_details": false,
                //     "roles_management": false,
                //     "staff_management": false,
                //     "branch_management": true,
                //     "all_booking": false,
                //     "schedule": true,
                //     "inprogress": true,
                //     "completed": true,
                //     "cancelled": false
                // }
            }; // Return both token and loginProviderID & loginBranchID & providerLogo & providerOnlineStatus & freelancer & mainBranch
        } else {
            return rejectWithValue(response.message || 'Invalid OTP'); // Use API's message if available
        }
    } catch (error: any) {
        return rejectWithValue(error.message || 'OTP validation failed'); // Handle API errors
    }
}
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // setProviderID: (state, action: PayloadAction<string>) => {
        //     state.phoneNumber = action.payload;
        //     sessionStorage.setItem('LoginProviderID', action.payload); // Sync with session storage
        // },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
            sessionStorage.setItem('EnteredPhoneNumber', action.payload); // Sync with session storage
        },
        logout: state => {
            state.token = null;
            state.phoneNumber = null;
            state.loginProviderID = null;
            state.permissions = null;
            state.loginBranchID = null;
            state.providerLogo = null;
            state.providerOnlineStatus = null;
            state.freelancer = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('EnteredPhoneNumber');
            sessionStorage.removeItem('loginProviderID');
            sessionStorage.removeItem('permissions');
            sessionStorage.removeItem('loginBranchID');
            sessionStorage.removeItem('providerLogo');
            sessionStorage.removeItem('providerOnlineStatus');
            sessionStorage.removeItem('freelancer');
            sessionStorage.removeItem('mainBranch');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<{ token: string; loginProviderID: number; loginBranchID: number; providerLogo: string; providerOnlineStatus: number; freelancer: boolean; mainBranch: boolean; permissions: { [key: string]: boolean }; }>) => {
                state.token = action.payload.token;
                state.loginProviderID = action.payload.loginProviderID;
                state.permissions = action.payload.permissions;        // Update permissions dynamically
                state.loginBranchID = action.payload.loginBranchID;
                state.providerLogo = action.payload.providerLogo;
                state.providerOnlineStatus = action.payload.providerOnlineStatus;
                state.freelancer = action.payload.freelancer;
                state.mainBranch = action.payload.mainBranch;
                sessionStorage.setItem('token', action.payload.token); // Sync token with session storage
                sessionStorage.setItem('loginProviderID', String(action.payload.loginProviderID)); // Sync loginProviderID with session storage
                sessionStorage.setItem('permissions', JSON.stringify(action.payload.permissions));
                sessionStorage.setItem('loginBranchID', String(action.payload.loginBranchID)); // Sync loginBranchID with session storage
                sessionStorage.setItem('providerLogo', String(action.payload.providerLogo)); // Sync providerLogo with session storage
                sessionStorage.setItem('providerOnlineStatus', String(action.payload.providerOnlineStatus)); // Sync providerOnlineStatus with session storage
                sessionStorage.setItem('freelancer', String(action.payload.freelancer)); // Sync freelancer with session storage
                sessionStorage.setItem('mainBranch', String(action.payload.mainBranch)); // Sync mainBranch with session storage
                state.otpError = null; // Clear OTP error on success
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.otpError = action.payload as string; // Set OTP error
            });
    },
});

export const { setPhoneNumber, logout } = loginSlice.actions;
export default loginSlice.reducer;
