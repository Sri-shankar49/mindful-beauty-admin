// allbookingSlice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingsList, scheduleList } from '@/api/apiConfig';

// Define initial state
interface ScheduleState {
    scheduleListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: ScheduleState = {
    scheduleListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

export const fetchScheduleList = createAsyncThunk(
    'schedule/fetchScheduleList',
    async ({ providerID, status, searchQuery, currentPage }: { providerID: number; status: number; searchQuery: string; currentPage: number; },
        { rejectWithValue }) => {
        try {
            // Ensure the correct parameters are passed
            const response = await scheduleList(providerID, 1, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch booking list');
        }
    }
);

// Create slice
const scheduleSlice = createSlice({ // Changed name to allBookingSlice for clarity
    name: 'schedule',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleList.pending, (state) => { // Use fetchAllBookingList
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScheduleList.fulfilled, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.scheduleListData = action.payload.results || [];
                state.totalItems = action.payload.count;
            })
            .addCase(fetchScheduleList.rejected, (state, action) => { // Use fetchAllBookingList
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = scheduleSlice.actions;
export default scheduleSlice.reducer;
