import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/api';

export const getUsers = createAsyncThunk('userCrud/getUsers', async () => {
    const response = await axios.get('users');
    return response.data;
});

export const getUserById = createAsyncThunk('userCrud/getUserById', async (id) => {
    const response = await axios.get(`users/${id}`);
    return response.data;
});

export const addData = createAsyncThunk('userCrud/addData', async (newData) => {
    const response = await axios.post('users', newData);
    return response.data;
});

export const deleteData = createAsyncThunk('userCrud/deleteData', async (id) => {
    const response = await axios.delete(`users/${id}`);
    return response.data;
});

export const updateData = createAsyncThunk('userCrud/updateData', async ({ id, userData }) => {
    const response = await axios.put(`users/${id}`, userData);
    return response.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
        error: null,
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })


            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })


            .addCase(addData.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(addData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addData.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteData.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload.id);
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(updateData.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user);
            })
            .addCase(updateData.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default userSlice.reducer;