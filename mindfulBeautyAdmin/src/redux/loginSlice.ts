import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyOTP } from '@/api/apiConfig';

interface loginState {
    token: string | null;
    phoneNumber: string | null;
    otpError: string | null;
    loginProviderID: number | null;
}

const initialState: loginState = {
    token: null,
    phoneNumber: null,
    otpError: null,
    loginProviderID: null,
}

// Thunk for OTP Validation
export const verifyOTPThunk = createAsyncThunk('login/verifyOTP', async ({ phoneNumber, otp }: { phoneNumber: string; otp: string },
    { rejectWithValue }) => {
    try {
        const response = await verifyOTP(phoneNumber, otp); // Call the API for OTP validation
        if (response.status === 'success') {
            // return response.token; // Return the token on success
            return { token: response.token, loginProviderID: response.provider_id }; // Return both token and loginProviderID
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
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('EnteredPhoneNumber');
            sessionStorage.removeItem('loginProviderID');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<{ token: string; loginProviderID: number }>) => {
                state.token = action.payload.token;
                state.loginProviderID = action.payload.loginProviderID;
                sessionStorage.setItem('token', action.payload.token); // Sync token with session storage
                sessionStorage.setItem('loginProviderID', String(action.payload.loginProviderID)); // Sync providerID with session storage
                state.otpError = null; // Clear OTP error on success
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.otpError = action.payload as string; // Set OTP error
            });
    },
});

export const { setPhoneNumber, logout } = loginSlice.actions;
export default loginSlice.reducer;
