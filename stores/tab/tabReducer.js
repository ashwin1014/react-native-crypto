import * as tabActionTypes from './tabActions';

const INIT_STATE = {
    isTradeModalVisible: false
};

const tabReducer = (state = INIT_STATE, action) => {
   switch (action.type) {
    case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
        return {
            ...state,
            isTradeModalVisible: action.payload.isVisible
        }
    default:
        return state
   }
};

export default tabReducer;