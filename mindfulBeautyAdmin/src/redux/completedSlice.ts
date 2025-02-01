import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { completedList } from '@/api/apiConfig';

// Define TypeScript types
interface CompletedItem {
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
interface CompletedState {
    completedListData: CompletedItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: CompletedState = {
    completedListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching completed list with pagination and search
export const fetchCompletedList = createAsyncThunk(
    'completed/fetchCompletedList',
    async (
        { providerID, status, searchQuery, currentPage }:
            { providerID: number; status: number; searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await completedList(providerID, status, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch completed list');
        }
    }
);

// Create slice
const completedSlice = createSlice({
    name: 'completed',
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
            .addCase(fetchCompletedList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedList.fulfilled, (state, action) => {
                state.loading = false;
                state.completedListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchCompletedList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage } = completedSlice.actions;
export default completedSlice.reducer;
