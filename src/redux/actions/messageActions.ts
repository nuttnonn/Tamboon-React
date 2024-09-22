export const MessageActionTypes = {
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
}

export const updateMessage = (charityId: number, message: string) => ({
    type: MessageActionTypes.UPDATE_MESSAGE,
    payload: {
        charityId,
        message,
    },
})