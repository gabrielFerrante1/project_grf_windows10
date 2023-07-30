import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { installedApps } from '../../InstalledApps';

export const slice = createSlice({
    name: 'so',
    initialState: {
        installedApps: installedApps,
        openApps: [] as number[],
        minimizedApps: [] as number[]
    },
    reducers: {
        setOpenApp: (state, action: PayloadAction<number>) => {
            if (!state.openApps.find((id) => id === action.payload)) {
                state.openApps = [...state.openApps, action.payload]
            }
        },
        setCloseApp: (state, action: PayloadAction<number>) => {
            state.openApps = state.openApps.filter((id) => id !== action.payload)
        },
        setToggleMinimizeApp: (state, action: PayloadAction<number>) => {
            if (state.minimizedApps.find(id => id === action.payload)) {
                state.minimizedApps = state.minimizedApps.filter(id => id !== action.payload)
            } else {
                state.minimizedApps = [...state.minimizedApps, action.payload]
            }
        }
    }
});

//Exportando ações do reducer
export const {
    setOpenApp,
    setCloseApp,
    setToggleMinimizeApp
} = slice.actions;

export default slice.reducer;