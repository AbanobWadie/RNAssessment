import { configureStore } from "@reduxjs/toolkit"
import languageSlice from "./LanguageSlice"
import AppearanceSlice from "./AppearanceSlice"

export const store = configureStore({
  reducer: {
    language: languageSlice,
    appearance: AppearanceSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
