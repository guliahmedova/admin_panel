import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'https://642a890bb11efeb7599b9a1d.mockapi.io/roles';

export const getRoles = createAsyncThunk("roleCrud/getRoles", async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

export const addData = createAsyncThunk('roleCrud/addData', async (newData) => {
    const response = await axios.post(BASE_URL, newData);
    return response.data;
});

export const deleteData = createAsyncThunk('roleCrud/deleteData', async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
});

export const updateData = createAsyncThunk('roleCrud/updateData', async ({ id, roleData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, roleData);
    return response.data;
});

export const roleSlice = createSlice({
    name: "role",
    initialState: {
        roles: [],
        loading: false,
        error: null,
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(getRoles.rejected, (state, action) => {
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
                state.roles.push(action.payload);
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
                state.roles = state.roles.filter((role) => role.id !== action.payload.id);
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
                state.roles = state.roles.map((role) => role.id === action.payload.id ? action.payload : role);
            })
            .addCase(updateData.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default roleSlice.reducer;