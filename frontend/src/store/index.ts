import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { userApi } from './apis/userApi';
import { restaurantApi } from './apis/restaurantApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [restaurantApi.reducerPath]: restaurantApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userApi.middleware, restaurantApi.middleware);
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { useGetUserQuery, useLoginUserMutation, useSignupUserMutation, useUpdateUserMutation, useRemoveUserMutation } from './apis/userApi';
export { useCreateRestaurantMutation, useGetRestaurantByCuisineQuery } from './apis/restaurantApi';
