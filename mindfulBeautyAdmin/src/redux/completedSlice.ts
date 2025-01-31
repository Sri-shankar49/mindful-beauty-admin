// completedSlice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { completedList } from '@/api/apiConfig';

// Define initial state
interface CompletedState {
    completedListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: CompletedState = {
    completedListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

export const fetchCompletedList = createAsyncThunk(
    'inprogress/fetchCompletedList',
    async ({ providerID, status, searchQuery, currentPage }: { providerID: number; status: number; searchQuery: string; currentPage: number; },
        { rejectWithValue }) => {
        try {
            // Ensure the correct parameters are passed
            const response = await completedList(providerID, 3, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch completed list');
        }
    }
);

// Create slice
const completedSlice = createSlice({ // Changed name to allBookingSlice for clarity
    name: 'inprogress',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletedList.pending, (state) => { // Use fetchAllBookingList
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedList.fulfilled, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.completedListData = action.payload.results || [];
                state.totalItems = action.payload.count;
            })
            .addCase(fetchCompletedList.rejected, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = completedSlice.actions;
export default completedSlice.reducer;