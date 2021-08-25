const marketTabs = [
    {
        id: 1,
        title: "Cryptoassets",
    },
    {
        id: 2,
        title: "Exchanges",
    },
]

const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets?';

const URL = {
    holdings: (currency, orderBy, perPage, page, sparkline, priceChangePerc, ids) => `${baseUrl}vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`,
    coinMarket: (currency, orderBy, perPage, page, sparkline, priceChangePerc) => `${baseUrl}vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`,
};

//API
// My Holdings
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}

// Coin Market
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}

const constants = {
    marketTabs,
    url: URL
};

export default constants;