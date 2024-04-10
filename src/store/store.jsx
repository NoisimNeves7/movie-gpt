import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import gptReducer from "./reducers/gptSlice";
import configReducer from "./reducers/configSlice";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import peopleReducer from "./reducers/peopleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gpt: gptReducer,
    language: configReducer,
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer
  },
});
