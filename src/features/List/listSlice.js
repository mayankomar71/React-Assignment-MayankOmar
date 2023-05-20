import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};
// Generates pending , fulfilled, rejected action types
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (pageNumber) => {
    const res = await axios.get(
      `https://reqres.in/api/users?page=${pageNumber}&per_page=5`
    );
    const users = res.data;
    return users;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
