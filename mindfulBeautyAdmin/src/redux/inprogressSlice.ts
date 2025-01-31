// inprogressSlice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { inprogressList } from '@/api/apiConfig';

// Define initial state
interface InprogressState {
    inprogressListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: InprogressState = {
    inprogressListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

export const fetchInprogressList = createAsyncThunk(
    'inprogress/fetchInprogressList',
    async ({ providerID, status, searchQuery, currentPage }: { providerID: number; status: number; searchQuery: string; currentPage: number; },
        { rejectWithValue }) => {
        try {
            // Ensure the correct parameters are passed
            const response = await inprogressList(providerID, 2, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch inprogress list');
        }
    }
);

// Create slice
const inprogressSlice = createSlice({ // Changed name to allBookingSlice for clarity
    name: 'inprogress',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInprogressList.pending, (state) => { // Use fetchAllBookingList
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInprogressList.fulfilled, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.inprogressListData = action.payload.results || [];
                state.totalItems = action.payload.count;
            })
            .addCase(fetchInprogressList.rejected, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = inprogressSlice.actions;
export default inprogressSlice.reducer;