import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { staffList } from '@/api/apiConfig';
import { NotifyError } from '@/common/Toast/ToastMessage';

// Define initial state
interface StaffState {
    staffData: any[];
    loading: boolean;
    // error: string | null;
    searchQuery: string;
    totalItems: number;
}

const initialState: StaffState = {
    staffData: [],
    loading: false,
    // error: null,
    searchQuery: '',
    totalItems: 0,
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
export const fetchStaffList = createAsyncThunk(
    'staff/fetchStaffList',
    async ({ searchQuery, currentPage, pageSize }: { searchQuery: string; currentPage: number; pageSize: number },
        // { rejectWithValue }
    ) => {
        try {
            // const response = await staffList(searchQuery, currentPage, itemsPerPage);
            const response = await staffList(searchQuery, currentPage, pageSize);
            return response;
        } catch (error: any) {
            // return rejectWithValue(error.message || 'Failed to fetch staff list');
            NotifyError(error.message || "Failed to fetch staff list"); // Show error via toast
            throw error; // Throw error so it doesn't modify Redux state
        }
    }
);

// Create slice
const staffSlice = createSlice({
    name: 'staff',
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
            .addCase(fetchStaffList.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(fetchStaffList.fulfilled, (state, action) => {
                state.loading = false;
                state.staffData = action.payload.results.data || [];
                state.totalItems = action.payload.count;
            })
            // .addCase(fetchStaffList.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // });
            .addCase(fetchStaffList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchQuery, setLoading } = staffSlice.actions;
export default staffSlice.reducer;
