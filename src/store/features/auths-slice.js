import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        session: null,
    },
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },
        removeSession: (state) => {
            state.session = null;
        },
    }
});

export const { setSession, removeSession } = authReducer.actions;
export const selectSession = (state) => state.auth.session;