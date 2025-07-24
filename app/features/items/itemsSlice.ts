

// features/category/categorySlice.ts
import axiosInstance from '@/axios/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface FetchItemsParams {
    skip?: number;
    limit?: number;
    searchKey?: string;
  }

interface CategoryState<T = any> {
    data: T[];
    allItems: T[];
    allItemsLoading: boolean;
    loading: boolean;
    error: string | null;
  }

const initialState: CategoryState = {
  data: [],
  allItems: [],
  allItemsLoading: false,
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<any>(
  'category/fetchItems',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/items/trending');
      return response.data.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch items');
    }
  }
);

export const fetchAllItems = createAsyncThunk<any, FetchItemsParams>(
    'category/fetchAllItems',
    async (params, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/items', {
          params: {
            skip: params.skip || 0,
            limit: params.limit || 10,
            search: params.searchKey || '',
          },
        });
        return response.data.items;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Failed to fetch items');
      }
    }
  );

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
          // Handle /items
      .addCase(fetchAllItems.pending, (state) => {
        state.allItemsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.allItems = action.payload;
        state.allItemsLoading = false;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.allItemsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default itemsSlice.reducer;
