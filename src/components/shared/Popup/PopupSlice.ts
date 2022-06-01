import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export interface PopupState {
  isShowed: boolean;
  message: string;
  style: string;
  icon: IconDefinition;
}

const initialState: PopupState = {
  isShowed: false,
  message: null,
  style: null,
  icon: null,
};

export const popupSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<PopupState>) => {
      state.isShowed = true;
      state.message = action.payload.message;
      state.style = action.payload.style;
      state.icon = action.payload.icon;
    },
    updatePopup: (state, action: PayloadAction<PopupState>) => {
      state.isShowed = true;
      state.message = action.payload.message;
      state.style = action.payload.style;
      state.icon = action.payload.icon;
    },
    hidePopup: (state) => {
      state.isShowed = false;
    },
  },
});

export const { showPopup, updatePopup, hidePopup } = popupSlice.actions;

export const selectPopup = (state: RootState) => state.popup;

export default popupSlice.reducer;
