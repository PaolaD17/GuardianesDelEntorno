import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Aquí se guarda el usuario
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Aquí se guarda el usuario que viene del backend
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
