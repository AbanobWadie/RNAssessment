import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LanguageState {
  value: string
}

const initialState: LanguageState = {
  value: "en",
}

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    updateLanguage(state, language: PayloadAction<string>) {
      state.value = language.payload
    },
  },
})

export const { updateLanguage } = languageSlice.actions
export default languageSlice.reducer
