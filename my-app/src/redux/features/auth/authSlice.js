import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/api';

export const login = createAsyncThunk('auth/login', async (data) => {
    const { username, password } = data;
    console.log(password, 'password');
    console.log(username, 'username');
    const response = await axios.get(`users?username=${username}&password=${password}`);
    localStorage.setItem("accessToken", JSON.stringify(response.data[0].accessToken));
    localStorage.setItem("role", JSON.stringify(response.data[0].role));
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action?.payload?.message;
            })
    }
})

export default authSlice.reducer;