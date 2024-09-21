export const DonateActionTypes = {
    UPDATE_TOTAL_DONATE: 'UPDATE_TOTAL_DONATE',
}

export const updateTotalDonate = (amount: number) => ({
    type: DonateActionTypes.UPDATE_TOTAL_DONATE,
    payload: {
        donate: amount,
    },
})