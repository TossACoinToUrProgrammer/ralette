import { configureStore } from "@reduxjs/toolkit"
import updatesReducer from "./slices/updatesSlice"
import newsReducer from "./slices/newsSlice"

export const store = configureStore({
  reducer: {
    updates: updatesReducer,
    news: newsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
