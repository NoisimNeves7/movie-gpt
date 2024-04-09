import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import gptReducer from "./reducers/gptSlice";
import configReducer from './reducers/configSlice'

export const store = configureStore({
  reducer: { user: userReducer, gpt: gptReducer ,language: configReducer }
});
