import { InstalledAppReducer } from "./types/App";

export const installedApps = [
    {
        id: 1,
        name: 'Navegador',
        icon_code: 'browser',
        options: {}
    },
    {
        id: 2,
        name: 'Calculadora',
        icon_code: 'calculator',
        options: {
            minWidth: '400px',
            minHeight: '720px',
            maxWidth: '1000px',
            maxHeight: '750px'
        }
    },
    {
        id: 3,
        name: 'Bloco de notas',
        icon_code: 'notepad',
        options: {}
    }
] as InstalledAppReducer[]