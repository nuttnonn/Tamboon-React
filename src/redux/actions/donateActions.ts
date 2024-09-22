import { CharityDonations } from '../../types';

export const DonateActionTypes = {
    UPDATE_TOTAL_DONATE: 'UPDATE_TOTAL_DONATE',
    UPDATE_CHARITY_DONATE: 'UPDATE_CHARITY_DONATE',
    PAYMENT_REQUEST: 'PAYMENT_REQUEST',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILURE: 'PAYMENT_FAILURE',
    CLEAR_PAYMENT_STATUS: 'CLEAR_PAYMENT_STATUS',
}

export const updateTotalDonate = (amount: number) => ({
    type: DonateActionTypes.UPDATE_TOTAL_DONATE,
    payload: {
        donate: amount,
    },
});

export const updateCharityDonate = (charityDonations: CharityDonations) => ({
    type: DonateActionTypes.UPDATE_CHARITY_DONATE,
    payload: {
        charityDonations,
    },
});

export const paymentRequest = () => ({
    type: DonateActionTypes.PAYMENT_REQUEST,
});

export const paymentSuccess = (charityId: number) => ({
    type: DonateActionTypes.PAYMENT_SUCCESS,
    payload: {
        charityId,
    },
});

export const paymentFailure = (charityId: number) => ({
    type: DonateActionTypes.PAYMENT_FAILURE,
    payload: {
        charityId,
    },
});

export const clearPaymentStatus = (charityId: number) => ({
    type: DonateActionTypes.CLEAR_PAYMENT_STATUS,
    payload: {
        charityId,
    },
});