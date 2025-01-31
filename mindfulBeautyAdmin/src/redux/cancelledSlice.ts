// cancelledSlice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cancelledList, inprogressList } from '@/api/apiConfig';

// Define initial state
interface CancelledState {
    cancelledListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: CancelledState = {
    cancelledListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

export const fetchCancelledList = createAsyncThunk(
    'inprogress/fetchCancelledList',
    async ({ providerID, status, searchQuery, currentPage }: { providerID: number; status: number; searchQuery: string; currentPage: number; },
        { rejectWithValue }) => {
        try {
            // Ensure the correct parameters are passed
            const response = await cancelledList(providerID, 4, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch cancelled list');
        }
    }
);

// Create slice
const cancelledSlice = createSlice({ // Changed name to allBookingSlice for clarity
    name: 'cancelled',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCancelledList.pending, (state) => { // Use fetchAllBookingList
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCancelledList.fulfilled, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.cancelledListData = action.payload.results || [];
                state.totalItems = action.payload.count;
            })
            .addCase(fetchCancelledList.rejected, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = cancelledSlice.actions;
export default cancelledSlice.reducer;