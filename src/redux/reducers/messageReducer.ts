import { MessageActionTypes } from '../actions/messageActions'

interface MessageState {
    messages: { [key: number]: string };
}

interface MessageAction {
    type: string;
    payload: {
        charityId: number;
        message: string;
    };
}

const initialState: MessageState = {
    messages: {},
};

const messageReducer = (state = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
        case MessageActionTypes.UPDATE_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.charityId]: action.payload.message,
                },
            };
        default:
            return state;
    }
};

export default messageReducer;