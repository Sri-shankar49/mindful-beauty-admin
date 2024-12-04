import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyOTP } from '@/api/apiConfig';

interface loginState {
    token: string | null;
    phoneNumber: string | null;
    otpError: string | null;
}

const initialState: loginState = {
    token: null,
    phoneNumber: null,
    otpError: null,
}

// Thunk for OTP Validation
export const verifyOTPThunk = createAsyncThunk('login/verifyOTP', async ({ phoneNumber, otp }: { phoneNumber: string; otp: string },
    { rejectWithValue }) => {
    try {
        const response = await verifyOTP(phoneNumber, otp); // Call the API for OTP validation
        if (response.status === 'success') {
            return response.token; // Return the token on success
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
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
            sessionStorage.setItem('EnteredPhoneNumber', action.payload); // Sync with session storage
        },
        logout: state => {
            state.token = null;
            state.phoneNumber = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('EnteredPhoneNumber');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.token = action.payload;
                sessionStorage.setItem('token', action.payload); // Sync with session storage
                state.otpError = null; // Clear OTP error on success
            })
            .addCase(verifyOTPThunk.rejected, (state, action) => {
                state.otpError = action.payload as string; // Set OTP error
            });
    },
});

export const { setPhoneNumber, logout } = loginSlice.actions;
export default loginSlice.reducer;
