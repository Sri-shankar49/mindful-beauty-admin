// allbookingSlice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingsList } from '@/api/apiConfig';

// Define initial state
interface AllBookingState {
    bookingListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: AllBookingState = {
    bookingListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

export const fetchAllBookingList = createAsyncThunk(
    'allbooking/fetchAllBookingList',
    async ({ providerID, searchQuery, currentPage }: { providerID: number; searchQuery: string; currentPage: number; },
        { rejectWithValue }) => {
        try {
            // Ensure the correct parameters are passed
            const response = await bookingsList(providerID, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch booking list');
        }
    }
);

// Create slice
const allBookingSlice = createSlice({ // Changed name to allBookingSlice for clarity
    name: 'allBooking',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBookingList.pending, (state) => { // Use fetchAllBookingList
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBookingList.fulfilled, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.bookingListData = action.payload.results || [];
                state.totalItems = action.payload.count;
            })
            .addCase(fetchAllBookingList.rejected, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = allBookingSlice.actions;
export default allBookingSlice.reducer;
