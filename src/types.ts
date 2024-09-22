export interface RootState {
    donate: {
        donate: number;
        isLoading: boolean;
        isPaymentSuccess: { [charityId: number]: boolean | null };
    };
    message: {
        messages: { [charityId: number]: string };
    };
}

export interface Charity {
    id: number;
    name: string;
    image: string;
    currency: string;
}