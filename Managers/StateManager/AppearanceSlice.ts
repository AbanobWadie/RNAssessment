import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface AppearanceState {
  value: string
}

const initialState: AppearanceState = {
  value: "light",
}
export const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    updateAppearance(state, appearance: PayloadAction<string>) {
      state.value = appearance.payload
    },
  },
})

export const updateAppearance = appearanceSlice.actions
export default appearanceSlice.reducer
