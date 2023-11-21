import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/auths-slice';

export const store = configureStore({
    reducer: {
        authReducer: authReducer.reducer,
    },
    devTools: true,
});