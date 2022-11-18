import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slilce";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
