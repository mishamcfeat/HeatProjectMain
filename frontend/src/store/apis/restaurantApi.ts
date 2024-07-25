import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

interface RestaurantResponse {
    id: string;
    name: string;
    owner: string;
    hours: {
        opening: string;
        closing: string;
    };
    location: string;
    cuisineType: string[];
    imageURL: string;
}

const restaurantApi = createApi({
    reducerPath: 'restaurants',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include',
    }),
    tagTypes: ['Restaurant'],
    endpoints: (builder) => ({
        createRestaurant: builder.mutation<RestaurantResponse, FormData>({
            query: (formData) => ({
                url: '/restaurants',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Restaurant', id: 'LIST' }],
        }),
        getRestaurantByCuisine: builder.query<RestaurantResponse[], string>({
            query: (cuisineType) => ({
                url: `restaurants?cuisineType=${cuisineType}`,
                method: 'GET',
            }),
            providesTags: (result, err, cuisineType) =>
                result ? result.map(({ id }) => ({ type: 'Restaurant', id })) : [],
        }),
    }),
});

export const { useCreateRestaurantMutation, useGetRestaurantByCuisineQuery } = restaurantApi;
export { restaurantApi };
