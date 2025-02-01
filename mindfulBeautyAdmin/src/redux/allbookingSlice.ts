import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingsList } from '@/api/apiConfig';

// Define TypeScript types
interface AllbookingItem {
    id: string;
    date: string;
    time: string;
    location: string;
    name: string;
    phone: string;
    services: Service[];
    amount: string;
    status: string;
    status_id?: string;
    modify_status: string;
    stylist: string;
    stylist_id?: string;
}

interface Service {
    name: string;
    price: number;
}

// Define initial state
interface AllbookingState {
    bookingListData: AllbookingItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: AllbookingState = {
    bookingListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching booking list with pagination and search
export const fetchBookingList = createAsyncThunk(
    'allbooking/fetchBookingList',
    async (
        { providerID, searchQuery, currentPage }:
            { providerID: number; searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await bookingsList(providerID, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch booking list');
        }
    }
);

// Create slice
const allbookingSlice = createSlice({
    name: 'allbooking',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingList.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchBookingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage } = allbookingSlice.actions;
export default allbookingSlice.reducer;
