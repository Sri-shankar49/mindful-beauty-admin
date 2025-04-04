import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cancelledList } from '@/api/apiConfig';
import { NotifyError } from '@/common/Toast/ToastMessage';

// Define TypeScript types
interface CancelledItem {
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
    reference_image?: any;
}

interface Service {
    name: string;
    price: number;
}

// Define initial state
interface CancelledState {
    cancelledListData: CancelledItem[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: CancelledState = {
    cancelledListData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching cancelled list with pagination and search
export const fetchCancelledList = createAsyncThunk(
    'cancelled/fetchCancelledList',
    async (
        { providerID, status, branchID, searchQuery, currentPage, pageSize }:
            { providerID: number; status: number; branchID: number; searchQuery: string; currentPage: number; pageSize: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await cancelledList(providerID, status, branchID, searchQuery, currentPage, pageSize);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch cancelled list');
            NotifyError(error.message || "Failed to fetch cancelled list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const cancelledSlice = createSlice({
    name: 'cancelled',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // setError: (state, action) => {
        //     state.error = action.payload;
        //     state.loading = false; // Reset loading on error
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCancelledList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchCancelledList.fulfilled, (state, action) => {
                state.loading = false;
                state.cancelledListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchCancelledList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchCancelledList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading } = cancelledSlice.actions;
export default cancelledSlice.reducer;
