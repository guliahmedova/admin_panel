import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://642a890bb11efeb7599b9a1d.mockapi.io/cars';

export const getCars = createAsyncThunk("carCrud/getCars", async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

export const addData = createAsyncThunk('carCrud/addData', async (newData) => {
    const response = await axios.post(BASE_URL, newData);
    return response.data;
});

export const deleteData = createAsyncThunk('carCrud/deleteData', async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
});

export const updateData = createAsyncThunk('carCrud/updateData', async ({ id, carData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, carData);
    return response.data;
});

export const carSlice = createSlice({
    name: "car",
    initialState: {
        cars: [],
        loading: false,
        error: null,
        status: 'idle'
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCars.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getCars.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.cars = action.payload;
            })
            .addCase(getCars.rejected, (state, action) => {
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
                state.cars.push(action.payload);
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
                state.cars = state.cars.filter((car) => car.id !== action.payload.id);
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
                state.cars = state.cars.map((car) => car.id === action.payload.id ? action.payload : car);
            })
            .addCase(updateData.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default carSlice.reducer;