import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { branchList } from '@/api/apiConfig';
import { NotifyError } from '@/common/Toast/ToastMessage';

// Define initial state
interface BranchState {
    branchData: any[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    // totalItems: number;
}

const initialState: BranchState = {
    branchData: [],
    loading: false,
    // error: null,
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
    async ({ searchQuery }: { searchQuery: string; },
        // { rejectWithValue }

    ) => {
        try {
            // const response = await staffList(searchQuery, currentPage, itemsPerPage);
            const response = await branchList(searchQuery);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch branch list');
            NotifyError(error.message || "Failed to fetch branch list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
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
            .addCase(fetchBranchList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchBranchList.fulfilled, (state, action) => {
                state.loading = false;
                state.branchData = action.payload.data || [];
                // state.totalItems = action.payload.count;
            })
            // .addCase(fetchBranchList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchBranchList.rejected, (state) => {
                state.loading = false; // Keep UI responsive but no error in state
            });
    },
});

export const { setSearchQuery, setLoading } = branchSlice.actions;
export default branchSlice.reducer;
