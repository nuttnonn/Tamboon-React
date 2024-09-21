export const DonateActionTypes = {
    UPDATE_TOTAL_DONATE: 'UPDATE_TOTAL_DONATE',
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

export const paymentRequest = () => ({
    type: DonateActionTypes.PAYMENT_REQUEST,
});

export const paymentSuccess = () => ({
    type: DonateActionTypes.PAYMENT_SUCCESS,
});

export const paymentFailure = () => ({
    type: DonateActionTypes.PAYMENT_FAILURE,
});

export const clearPaymentStatus = () => ({
    type: DonateActionTypes.CLEAR_PAYMENT_STATUS,
});