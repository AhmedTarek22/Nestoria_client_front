import EN from "../Lang/EN";
import AR from "../Lang/AR";
import { createSlice } from "@reduxjs/toolkit";

const translation = {
  en: EN,
  ar: AR,
};

const INITIAL_STATE = {
  myLang: "en",
  translation: translation["en"],
};

const language = createSlice({
  name: "language",
  initialState: INITIAL_STATE,
  reducers: {
    setLanguage(state, action) {
      state.myLang = action.payload;
      state.translation = translation[action.payload];
    },
  },
});

export default language.reducer;

export const { setLanguage } = language.actions;
