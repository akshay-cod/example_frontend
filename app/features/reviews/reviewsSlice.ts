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

export const fetchReviewsLatest = createAsyncThunk<any>(
  'category/fetchReviewsLatest',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/reviews/good');
      return response.data.reviews;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

const reviewsSlice = createSlice({
  name: 'latestReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsLatest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsLatest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewsLatest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewsSlice.reducer;
