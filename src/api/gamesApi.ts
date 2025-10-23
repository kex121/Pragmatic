import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Game } from '../types';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    listGames: builder.query<{ data: Game[]; error?: string }, void>({
      query: () => 'pragmatic/game/list?partner_name=belparyaj',
      transformResponse: (response: ApiResponse) => {
        if (response.status === 0 && Array.isArray(response.result)) {
          return { data: response.result };
        }
        if (response.status > 0 && response.error_message) {
          return { data: [], error: response.error_message };
        }
        return { data: [] };
      },
    }),
  }),
});

export const { useListGamesQuery } = gamesApi;
