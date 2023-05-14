import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { INewsItem } from "shared/types"
import { AppDispatch } from "store"

export interface NewsState {
  news: INewsItem[]
  loading: boolean
}

const initialState: NewsState = {
  news: [],
  loading: false,
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<INewsItem[]>) => {
      state.news = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const fetchNews = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  try {
    const fetchedNews = await axios.get("http://localhost:5000/api/news")
    dispatch(setNews(fetchedNews.data))
  } catch (e) {
    console.log("fetchNews", e)
  }
  dispatch(setLoading(false))
}

export const { setNews, setLoading } = newsSlice.actions

export default newsSlice.reducer
