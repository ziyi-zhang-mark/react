import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authreducer from "./auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authreducer },
});

export default store;
