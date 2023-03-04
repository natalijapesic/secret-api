
import { api } from '@/store/api';
import {
    combineReducers,
    configureStore,
    PreloadedState,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});
export const setUpStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        preloadedState,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore['dispatch'];