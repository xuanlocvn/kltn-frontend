import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signInReducer from '../pages/sign-in/SignInSlice';
import headerReducer from '../components/shared/Header/HeaderSlice';
import popupReducer from '../components/shared/Popup/PopupSlice';

export const store = configureStore({
  reducer: {
    web3: signInReducer,
    role: headerReducer,
    popup: popupReducer,
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
