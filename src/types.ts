export interface Charity {
    id: number;
    name: string;
    image: string;
    currency: string;
}

export interface Payment {
    charitiesId: number;
    amount: number;
    currency: string;
    id: number;
}

export interface CharityDonation {
    name: string;
    donations: Payment[];
    total: number;
}

export interface CharityDonations {
    [key: number]: CharityDonation;
}

export interface RootState {
    donate: {
        donate: number;
        charityDonations: CharityDonations;
        isLoading: boolean;
        isPaymentSuccess: { [charityId: number]: boolean | null };
    };
    message: {
        messages: { [charityId: number]: string };
    };
}