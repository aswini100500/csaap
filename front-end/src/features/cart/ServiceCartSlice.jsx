import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  totalQty: 0,
  totalAmount: 0,
};

const serviceCartSlice = createSlice({
  name: 'serviceCart',
  initialState,
  reducers: {
    addService: (state, action) => {
      const service = action.payload;
      const existing = state.services.find(s => s.id === service.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.services.push({ ...service, quantity: 1 });
      }

      state.totalQty += 1;
      state.totalAmount += service.rate;
    },

    removeService: (state, action) => {
      const id = action.payload;
      const existing = state.services.find(s => s.id === id);
      if (existing) {
        state.totalQty -= existing.quantity;
        state.totalAmount -= existing.rate * existing.quantity;
        state.services = state.services.filter(s => s.id !== id);
      }
    },
  },
});

export const { addService, removeService } = serviceCartSlice.actions;
export default serviceCartSlice.reducer;
