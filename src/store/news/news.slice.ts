import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/Interfaces";
import {USER_STORAGE_KEY} from "../../constants";

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}'),
}

export const newsSlice = createSlice({
  name: "newsName",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user))
    },
    logoutUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      localStorage.removeItem(USER_STORAGE_KEY)
    },
  }
})

export const newsActions = newsSlice.actions
export const newsReducer = newsSlice.reducer