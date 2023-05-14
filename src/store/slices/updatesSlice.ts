import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { IUpdatesItem } from "shared/types"
import { AppDispatch } from "store"

export interface UpdatesState {
  updates: IUpdatesItem[]
  loading: boolean
}

const initialState: UpdatesState = {
  updates: [],
  loading: false,
}

export const updatesSlice = createSlice({
  name: "updates",
  initialState,
  reducers: {
    setUpdates: (state, action: PayloadAction<IUpdatesItem[]>) => {
      state.updates = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const fetchUpdates = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  try {
    const fetchedUpdates = await axios.get("http://localhost:5000/api/updates")
    dispatch(setUpdates(fetchedUpdates.data))
  } catch (e) {
    console.log("fetchUpdates", e)
  }
  dispatch(setLoading(false))
}

export const { setUpdates, setLoading } = updatesSlice.actions

export default updatesSlice.reducer
