import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { servicesList } from '@/api/apiConfig';

// Define initial state
interface ServicesState {
    serviceListData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: ServicesState = {
    serviceListData: [],
    loading: false,
    error: null,
    searchQuery: '',
    totalItems: 0,
};

// Async thunk for fetching services list
export const fetchServicesList = createAsyncThunk(
    'services/fetchServicesList',
    async ({
        providerID,
        branchID,
        searchQuery,
        currentPage
    }: {
        providerID: number;
        branchID: number;
        searchQuery: string;
        currentPage: number;
    }, { rejectWithValue }) => {
        try {
            const response = await servicesList(providerID, branchID, searchQuery, currentPage);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch services list');
        }
    }
);

// Create slice
const servicesListSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.loading = true;
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
            .addCase(fetchServicesList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServicesList.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceListData = action.payload.results || [];
                state.totalItems = action.payload.count || 0;
                state.error = null;
            })
            .addCase(fetchServicesList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                if (!state.serviceListData.length) {
                    state.serviceListData = [];
                    state.totalItems = 0;
                }
            });
    },
});

export const { setSearchQuery, setLoading, setError } = servicesListSlice.actions;
export default servicesListSlice.reducer;
