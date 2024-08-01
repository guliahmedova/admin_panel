import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/crud/userSlice';
import roleReducer from './features/crud/roleSlice';
import carReducer from './features/crud/carSlice';
import carCreateFormReducer from './features/crud/carCreateFormSlice';

import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    car: carReducer,
    carCreateForm: carCreateFormReducer
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['carCreateForm']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;