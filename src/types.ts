export interface RootState {
    donate: {
        donate: number;
    };
    message: {
        message: string;
    };
}

export interface Charity {
    id: number;
    name: string;
    image: string;
    currency: string;
}