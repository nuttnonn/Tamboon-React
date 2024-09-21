import { MessageActionTypes } from '../actions/messageActions'

interface MessageState {
    message: string;
}

interface MessageAction {
    type: string;
    payload: {
        message: string;
    }
}

const initialState: MessageState = {
    message: '',
};

const messageReducer = (state = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
        case MessageActionTypes.UPDATE_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state;
    }
};

export default messageReducer;