import { DonateActionTypes } from '../actions/donateActions'

interface DonateState {
    donate: number;
    isLoading: boolean;
    isPaymentSuccess: boolean | null;
}

interface DonateAction {
    type: string;
    payload: {
        donate: number;
    };
}

const initialState: DonateState = {
    donate: 0,
    isLoading: false,
    isPaymentSuccess: null,
};

const donateReducer = (state = initialState, action: DonateAction): DonateState => {
    switch (action.type) {
        case DonateActionTypes.UPDATE_TOTAL_DONATE:
            return {
                ...state,
                donate: action.payload.donate,
            };
        case DonateActionTypes.PAYMENT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case DonateActionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isPaymentSuccess: true,
            };
        case DonateActionTypes.PAYMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isPaymentSuccess: false,
            };
        case DonateActionTypes.CLEAR_PAYMENT_STATUS:
            return {
                ...state,
                isPaymentSuccess: null,
            };
        default:
            return state;
    }
};

export default donateReducer;