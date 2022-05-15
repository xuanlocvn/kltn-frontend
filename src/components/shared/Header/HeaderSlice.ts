import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export interface RoleState {
  account: string;
  role: string;
}

const initialState: RoleState = {
  account: null,
  role: null,
};

export const headerSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<RoleState>) => {
      state.account = action.payload.account;
      state.role = action.payload.role;
      console.log('Role: ', action.payload.role);
      console.log('Account: ', action.payload.account);
    },
    removeRole: (state) => {
      state.role = null;
      state.account = null;
    },
  },
});

export const { addRole, removeRole } = headerSlice.actions;

export const selectRole = (state: RootState) => state.role;

export default headerSlice.reducer;
