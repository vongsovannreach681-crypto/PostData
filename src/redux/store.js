import { configureStore } from "@reduxjs/toolkit";
import {counterSlice} from './features/counter/counterSlice'
// set up store 
export const store = configureStore({
//    store always has reducer
  reducer: {
    counter: counterSlice.reducer
  }
})