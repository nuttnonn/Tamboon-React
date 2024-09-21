import { DonateActionTypes } from '../actions/donateActions'

interface DonateState {
    donate: number;
}

interface DonateAction {
    type: string;
    payload: {
        donate: number;
    };
}

const initialState: DonateState = {
    donate: 0,
};

const donateReducer = (state = initialState, action: DonateAction): DonateState => {
    switch (action.type) {
        case DonateActionTypes.UPDATE_TOTAL_DONATE:
            return {
                ...state,
                donate: action.payload.donate,
            };
        default:
            return state;
    }
};

export default donateReducer;