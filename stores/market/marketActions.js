import axios from 'axios';

import { constants } from '../../constants';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';

export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN
});
export const getHoldingsSuccess = (holdings) => ({
    type: GET_HOLDINGS_SUCCESS,
    payload: {
        holdings
    }
});
export const getHoldingsFailure = (error) => ({
    type: GET_HOLDINGS_FAILURE,
    payload: {
        error
    }
});

export function getHoldings(holdings = [], currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePerc = '7d', perPage = 10, page = 1) {
        return async dispatch => {
            dispatch(getHoldingsBegin());

            const ids = holdings.map((item) => item.id).join(',');
            const apiUrl = constants.url.holdings(currency, orderBy, perPage, page, sparkline, priceChangePerc, ids);

            try {
                const response = await axios({
                    url: apiUrl,
                    method: 'GET',
                    header: {
                        Accept: 'application/json'
                    }
                });
                if (response.status === 200) {
                    // message data
                    const myHoldings = response.data.map((item_1) => {
                        // retrieve current holdings -> current qty
                        const coin = holdings.find(a => a.id === item_1.id);

                        // Price from 7days ago
                        const price7days = item_1.current_price / (1 + item_1.price_change_percentage_7d_in_currency * 0.01);

                        const data = {
                            id: item_1.id,
                            symbol: item_1.symbol,
                            name: item_1.name,
                            image: item_1.image,
                            current_price: item_1.current_price,
                            qty: coin.qty,
                            total: coin.qty * item_1.current_price,
                            price_change_percentage_7d_in_currency: item_1.price_change_percentage_7d_in_currency,
                            holding_value_change_7d: (item_1.current_price - price7days) * coin.qty,
                            sparkline_in_7d: {
                                value: item_1.sparkline_in_7d.price.map(price => price * coin.qty)
                            }
                        };
                        return data;
                    });
                    dispatch(getHoldingsSuccess(myHoldings));
                } else {
                    dispatch(getHoldingsFailure(response.data));
                }
            } catch (error_1) {
                dispatch(getHoldingsFailure(error_1));
            }
        }
}


// Coin MArket
export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
});
export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: {
        coins
    }
});
export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: {
        error
    }
});

export function getCoinMarket(currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePerc = '7d', perPage = 10, page = 1) {
    return async dispatch => {
        dispatch(getCoinMarketBegin());

        const apiUrl = constants.url.coinMarket(currency, orderBy, perPage, page, sparkline, priceChangePerc);

        try {
            const response = await axios({
                url: apiUrl,
                method: 'GET',
                header: {
                    Accept: 'application/json'
                }
            });
            if (response.status === 200) {
                dispatch(getCoinMarketSuccess(response.data));
            } else {
                dispatch(getCoinMarketFailure(response.data));
            }
        } catch (error_1) {
            dispatch(getCoinMarketFailure(error_1));
        }
    };
}