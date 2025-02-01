import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { inprogressList } from '@/api/apiConfig';

// Define TypeScript types
interface InprogressItem {
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
interface InprogressState {
    inprogressListData: InprogressItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: InprogressState = {
    inprogressListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching inprogress list with pagination and search
export const fetchInprogressList = createAsyncThunk(
    'inprogress/fetchInprogressList',
    async (
        { providerID, status, searchQuery, currentPage }:
            { providerID: number; status: number; searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await inprogressList(providerID, status, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch inprogress list');
        }
    }
);

// Create slice
const inprogressSlice = createSlice({
    name: 'inprogress',
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
            .addCase(fetchInprogressList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInprogressList.fulfilled, (state, action) => {
                state.loading = false;
                state.inprogressListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchInprogressList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage } = inprogressSlice.actions;
export default inprogressSlice.reducer;
