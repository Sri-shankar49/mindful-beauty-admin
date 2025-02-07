import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { scheduleList } from '@/api/apiConfig';

// Define TypeScript types
interface ScheduleItem {
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
interface ScheduleState {
    scheduleListData: ScheduleItem[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: ScheduleState = {
    scheduleListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching schedule list with pagination and search
export const fetchScheduleList = createAsyncThunk(
    'schedule/fetchScheduleList',
    async (
        { providerID, status, searchQuery, currentPage }:
            { providerID: number; status: number; searchQuery: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await scheduleList(providerID, status, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch schedule list');
        }
    }
);

// Create slice
const scheduleSlice = createSlice({
    name: 'schedule',
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
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Reset loading on error
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchScheduleList.fulfilled, (state, action) => {
                state.loading = false;
                state.scheduleListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
            })
            .addCase(fetchScheduleList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading, setError } = scheduleSlice.actions;
export default scheduleSlice.reducer;
