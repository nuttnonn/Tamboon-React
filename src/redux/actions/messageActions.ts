export const MessageActionTypes = {
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
}

export const updateMessage = (message: string) => ({
    type: MessageActionTypes.UPDATE_MESSAGE,
    payload: {
        message: message,
    },
})