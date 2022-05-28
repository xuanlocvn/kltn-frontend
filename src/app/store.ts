import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signInReducer from '../pages/sign-in/SignInSlice';
import headerReducer from 'src/components/shared/Header/HeaderSlice';

export const store = configureStore({
  reducer: {
    web3: signInReducer,
    role: headerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['web3.value'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
