import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLoginData = createAsyncThunk(
  "login/fetchLoginData",
  async () => {
    try {
      const response = await axios.get(
        "https://658e97192871a9866e796bee.mockapi.io/v1/userinfo"
      );
      const userData = response.data[0];

      localStorage.setItem("userName", JSON.stringify(userData.name));
      localStorage.setItem("userAvatar", JSON.stringify(userData.avatar));

      return userData;
    } catch (error) {
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoginData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLoginData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
