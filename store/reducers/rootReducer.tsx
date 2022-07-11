import { combineReducers } from 'redux';
import artworkReducer from './artworkReducer';

const rootReducer = combineReducers({
    artwork: artworkReducer
});

export default rootReducer;