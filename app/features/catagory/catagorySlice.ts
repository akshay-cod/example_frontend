// features/category/categorySlice.ts
import axiosInstance from '@/axios/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface CategoryState<T = any> {
    data: T[];
    loading: boolean;
    error: string | null;
  }

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<any>(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/category');
      return response.data.category;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
