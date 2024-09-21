export interface RootState {
    donate: {
        donate: number;
        isLoading: boolean;
        isPaymentSuccess: boolean | null;
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