import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

interface RestaurantResponse {
    _id: string; // Mongoose uses _id for the primary key
    name: string;
    owner: string;
    items: string[]; // Array of object IDs
    hours: {
        opening: string;
        closing: string;
    };
    location: string;
    cuisineType: string[];
    imageUrl: string;
}

const restaurantApi = createApi({
    reducerPath: 'restaurants',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/restaurants',
        credentials: 'include',
    }),
    tagTypes: ['Restaurant'],
    endpoints: (builder) => ({
        createRestaurant: builder.mutation<RestaurantResponse, FormData>({
            query: (formData) => ({
                url: '/create',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Restaurant', id: 'LIST' }],
        }),
        getRestaurantByCuisine: builder.query<RestaurantResponse[], string>({
            query: (cuisineType) => ({
                url: `?cuisineType=${cuisineType}`,
                method: 'GET',
            }),
            providesTags: (result, err, cuisineType) =>
                result ? result.map(({ _id }) => ({ type: 'Restaurant', id: _id })) : [],
        }),
    }),
});

export const { useCreateRestaurantMutation, useGetRestaurantByCuisineQuery } = restaurantApi;
export { restaurantApi };
