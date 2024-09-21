export const MessageActionTypes = {
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
}

export const updateTotalDonate = (amount: number) => ({
    type: MessageActionTypes.UPDATE_MESSAGE,
    payload: {
        donate: amount,
    },
})