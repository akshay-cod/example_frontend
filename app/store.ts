// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import catagoryReducer from './features/catagory/catagorySlice';
import latestReducer from './features/reviews/reviewsSlice';
import itemsReducer from './features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category:catagoryReducer,
    latest_reviews:latestReducer,
    items:itemsReducer
  },
});

// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
