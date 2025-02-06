import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';

export const fundingApi = createApi({
  reducerPath: 'fundingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['funding'],
  endpoints: (builder) => ({
    addFundingPlan: builder.mutation({
      query: (data) => ({
        url: '/funding/plan',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getFundingPlans: builder.query({
      query: () => ({
        url: '/funding/plan',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddFundingPlanMutation, useGetFundingPlansQuery } = fundingApi;
