import * as marketActions from './marketActions';

const INIT_STATE = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_HOLDINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                myHoldings: action.payload.holdings
            }

        case marketActions.GET_HOLDINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case marketActions.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_COIN_MARKET_SUCCESS:
            return {
                ...state,
                loading: false,
                coins: action.payload.coins
            }

        case marketActions.GET_COIN_MARKET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

            default:
                return state
    }
};

export default marketReducer;