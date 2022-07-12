import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from './storage';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: 'root', 
  version: 1,
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  })}
);

export const persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => persistor;

export const wrapper = createWrapper(makeStore);