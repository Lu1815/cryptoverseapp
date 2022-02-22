import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'a20d1cd41emshb75c88dd3c38750p175179jsn4f37c55b8095'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

//RETURNING THE BASE URL AND THE HEADERS TO PUT THEM TOGETHER AUTOMATICALLY IN THE REQUEST
const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl}), //BASICALLY A JS FETCH BUT WITH REDUX
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) =>  createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`)
        })
    })
});

//HOOKS CREATED FROM THE REQUEST FROM THE ENDPOINTS OPTIONS ABOVE
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;