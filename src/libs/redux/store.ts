import { configureStore } from '@reduxjs/toolkit';
import soReducer from './reducers/soReducer';
export const store = configureStore({
    reducer: {
        so: soReducer
    },
});

export type RootState = ReturnType<typeof store.getState>; 