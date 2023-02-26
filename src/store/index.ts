import {configureStore} from "@reduxjs/toolkit";
import {newsApi} from "./news/news.api";
import {newsReducer} from "./news/news.slice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    data: newsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(newsApi.middleware)
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>


