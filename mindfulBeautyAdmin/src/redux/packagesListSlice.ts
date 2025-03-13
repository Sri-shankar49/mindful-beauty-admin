import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { packagesList } from '@/api/apiConfig';
import { NotifyError } from '@/common/Toast/ToastMessage';

// Define initial state
interface PackagesState {
    packageListData: any[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    currentPage: number;
    totalItems: number;
}

const initialState: PackagesState = {
    packageListData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    currentPage: 1,
    totalItems: 0,
};

// Async thunk for fetching packages list with pagination
export const fetchPackagesList = createAsyncThunk(
    'packages/fetchPackagesList',
    async (
        { providerID, branchID, searchQuery, currentPage, pageSize }:
            { providerID: number; branchID: string; searchQuery: string; currentPage: number, pageSize: number },
        // { rejectWithValue }
    ) => {
        try {
            const response = await packagesList(providerID, branchID, searchQuery, currentPage, pageSize);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch packages list');
            NotifyError(error.message || "Failed to fetch packages list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const packagesListSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackagesList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchPackagesList.fulfilled, (state, action) => {
                state.loading = false;
                state.packageListData = action.payload.results.data || [];
                state.totalItems = action.payload.count || 0;
            })
            // .addCase(fetchPackagesList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchPackagesList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setCurrentPage, setLoading } = packagesListSlice.actions;
export default packagesListSlice.reducer;
