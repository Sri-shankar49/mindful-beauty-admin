import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyOTP } from '@/api/apiConfig';

interface loginState {
    token: string | null;
    phoneNumber: string | null;
    otpError: string | null;
    loginProviderID: number | null;
    permissions: { [key: string]: boolean } | null;
    loginBranchID: number | null;
}

const initialState: loginState = {
    token: null,
    phoneNumber: null,
    otpError: null,
    loginProviderID: null,
    permissions: null,
    loginBranchID: null,
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
                loginBranchID: response.branch_id
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
            }; // Return both token and loginProviderID & loginBranchID
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
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('EnteredPhoneNumber');
            sessionStorage.removeItem('loginProviderID');
            sessionStorage.removeItem('permissions');
            sessionStorage.removeItem('loginBranchID');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<{ token: string; loginProviderID: number; loginBranchID: number; permissions: { [key: string]: boolean }; }>) => {
                state.token = action.payload.token;
                state.loginProviderID = action.payload.loginProviderID;
                state.permissions = action.payload.permissions;        // Update permissions dynamically
                state.loginBranchID = action.payload.loginBranchID;
                sessionStorage.setItem('token', action.payload.token); // Sync token with session storage
                sessionStorage.setItem('loginProviderID', String(action.payload.loginProviderID)); // Sync providerID with session storage
                sessionStorage.setItem('permissions', JSON.stringify(action.payload.permissions));
                sessionStorage.setItem('loginBranchID', String(action.payload.loginBranchID)); // Sync providerID with session storage
                state.otpError = null; // Clear OTP error on success
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.otpError = action.payload as string; // Set OTP error
            });
    },
});

export const { setPhoneNumber, logout } = loginSlice.actions;
export default loginSlice.reducer;
