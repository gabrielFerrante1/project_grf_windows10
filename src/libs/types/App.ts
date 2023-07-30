export type InstalledApp = {
    id: number;
    icon_code: 'calculator' | 'notepad' | 'browser';
    name: string;
}


export type InstalledAppReducer = InstalledApp & {
    options?: {
        minWidth?: string;
        minHeight?: string;
        maxWidth?: string;
        maxHeight?: string; 
    }
}