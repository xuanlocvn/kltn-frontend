import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'src/app/store';
import Web3 from 'web3';

export interface Web3State {
  value: Web3;
}

const initialState: Web3State = {
  value: null,
};

export const headerSlice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<Web3>) => {
      state.value = action.payload;
      console.log('Injected Web3');
    },
    disconnect: (state) => {
      state.value = null;
    },
  },
});

export const { connect, disconnect } = headerSlice.actions;

export const selectWeb3 = (state: RootState) => state.web3.value;

export const connectWeb3 =
  (web3: Web3): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectWeb3(getState());
    if (currentValue == null) {
      dispatch(connect(web3));
    }
  };

export default headerSlice.reducer;
