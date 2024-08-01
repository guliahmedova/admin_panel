import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    image: "",
    price: 0,
    carCreatedDate: new Date(),
};

export const carCreateForm = createSlice({
    name: 'carCreateForm',
    initialState,
    reducers: {
        addCar: (state, action) => {
            if (action.payload.name.length > 0) {
                state.name = action.payload.name;
                state.price = action.payload.price;
                state.image = action.payload.image;
                state.carCreatedDate = action.payload.carCreatedDate;
            }
        },
        deleteCar: (state, action) => {
            state.name = '';
            state.price = 0;
            state.image = '';
            state.carCreatedDate = new Date();
        }
    }
});

export const { addCar, deleteCar } = carCreateForm.actions;
export default carCreateForm.reducer;