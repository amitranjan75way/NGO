import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['payment'],
  endpoints: (builder) => ({
    addPaymentMethos: builder.mutation({
      query: (data) => ({
        url: '/payment/method',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getPaymentMethods: builder.query({
      query: () => ({
        url: '/payment/method',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    deletePaymentMethod: builder.mutation({
      query: (data) => ({
        url: '/payment/method',
        method: 'DELETE',
        body: data,
        credentials: 'include',
      }),
    }),

    payAndSubsribePlan: builder.mutation({
      query: (data) => ({
        url: `/subscription/${data.fundingPlanId}/${data.paymentMethodId}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    })



  }),
});

export const {
  useAddPaymentMethosMutation,
  useGetPaymentMethodsQuery,
  useDeletePaymentMethodMutation,
  usePayAndSubsribePlanMutation
} = paymentApi;
