import { api } from "@/store/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import examReducer from "./exam/index";
import userReducer from "./user/index";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  exam: examReducer,
  user: userReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
