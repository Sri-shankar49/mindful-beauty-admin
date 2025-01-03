import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { branchList } from '@/api/apiConfig';

// Define initial state
interface BranchState {
    branchData: any[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    // totalItems: number;
}

const initialState: BranchState = {
    branchData: [],
    loading: false,
    error: null,
    searchQuery: '',
    // totalItems: 0,
};


// Async thunk for fetching staff list
// export const fetchStaffList = createAsyncThunk('staff/fetchStaffList', async (searchQuery: string, { rejectWithValue }) => {
//     try {
//         const response = await staffList(searchQuery);
//         return response;
//     } catch (error: any) {
//         return rejectWithValue(error.message || 'Failed to fetch staff list');
//     }
// }
// );


export const fetchBranchList = createAsyncThunk(
    'staff/fetchBranchList',
    async ({ searchQuery }: { searchQuery: string; }, { rejectWithValue }) => {
        try {
            // const response = await staffList(searchQuery, currentPage, itemsPerPage);
            const response = await branchList(searchQuery);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch branch list');
        }
    }
);

// Create slice
const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBranchList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranchList.fulfilled, (state, action) => {
                state.loading = false;
                state.branchData = action.payload.data || [];
                // state.totalItems = action.payload.count;
            })
            .addCase(fetchBranchList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery } = branchSlice.actions;
export default branchSlice.reducer;
