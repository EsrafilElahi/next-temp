import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, Draft } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types";

enum STATUS {
  IDLE = "IDLE",
  LOADING = "LOADING",
}

export interface InitialInternalState {
  users: null | string | User[];
  name: string | null;
  family: string | null;
  age?: number | null;
  error: unknown | null;
  loading: STATUS;
}

const internalInitialState: InitialInternalState = {
  users: null,
  name: null,
  family: null,
  age: 25,
  error: null,
  loading: STATUS.IDLE,
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: internalInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = STATUS.LOADING;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = STATUS.IDLE;
      state.error = null;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = usersSlice.actions;
