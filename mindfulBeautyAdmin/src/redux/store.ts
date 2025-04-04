// store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice'; // Updated import
import staffReducer from './staffSlice';
import branchReducer from './branchSlice';
import allbookingReducer from './allbookingSlice'
import scheduleReducer from './scheduleSlice'
import inprogressReducer from './inprogressSlice'
import completedReducer from './completedSlice'
import cancelledReducer from './cancelledSlice'
import serviceReducer from './servicesListSlice';
import packageReducer from './packagesListSlice';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Root key for persisting data
    storage,     // Use localStorage to persist
    whitelist: ['login'], // Only persist the cart slice
};

// Combine reducers
const rootReducer = combineReducers({
    login: loginReducer, // Add other reducers here if necessary
    staff: staffReducer,
    branch: branchReducer,
    allbooking: allbookingReducer,
    schedule: scheduleReducer,
    inprogress: inprogressReducer,
    completed: completedReducer,
    cancelled: cancelledReducer,
    service: serviceReducer,
    package: packageReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,

    // Add middleware for redux-persist if necessary (not mandatory in newer redux-persist versions)
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore these actions for serializability checks
    //     },
    //   }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore non-serializable actions from redux-persist
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/FLUSH',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }),

});


// Set up persistor to persist the store
const persistor = persistStore(store);

export { store, persistor };


// TypeScript types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;