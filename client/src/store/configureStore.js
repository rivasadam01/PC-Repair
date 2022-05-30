import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import api from "./middleware/api"
import reducer from "./rootReducer"

export default function store() {
  return configureStore({
    middleware: [...getDefaultMiddleware(), api],
    reducer,
  })
}
