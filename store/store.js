import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware } from "redux";
import storage from './storage';
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: 'root', 
  storage
};

// middleware
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => persistor;

export const wrapper = createWrapper(makeStore);