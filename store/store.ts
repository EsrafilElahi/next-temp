import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { WebStorage, persistReducer, persistStore } from "redux-persist";
import { counterSlice } from "./slices/counterSlice";
import { usersSlice } from "./slices/userSlice";

type PersistConfig = {
  key: string;
  storage: WebStorage;
};

const persistConfig: PersistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  usersReducer: usersSlice.reducer,
  counterReducer: counterSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk] as const,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

type Store = ReturnType<typeof store.dispatch>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
