import { configureStore } from '@reduxjs/toolkit';
import serviceCartReducer from '../features/cart/ServiceCartSlice';
 import authReducer from '../features/auth/authSlice';
// import customerReducer from '../features/customers/customerSlice';

// import settingsReducer from '../features/settings/settingsSlice';
// import servicesReducer from '../features/services/servicesSlice';

export const store = configureStore({
  reducer: {
    serviceCart: serviceCartReducer,
     auth: authReducer,
    // customers: customerReducer,
    // invoices: invoiceReducer,
    // settings: settingsReducer,
    // services: servicesReducer,
  },
});
