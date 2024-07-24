import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice'
import { userApi } from './apis/userApi';


export const store = configureStore({
    reducer: {
        // add reducer for authentication slice
        auth: authReducer,
        // Add the generated reducer as a specific top-level slice
        [userApi.reducerPath]: userApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userApi.middleware);
    },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>; //type of the store to import for type safety
export type AppDispatch = typeof store.dispatch; //type of the dispatch function
export { useGetUserQuery, useLoginUserMutation, useSignupUserMutation, useUpdateUserMutation, useRemoveUserMutation } from './apis/userApi';

