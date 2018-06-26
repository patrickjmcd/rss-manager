import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import feedReducer from './FeedReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    feeds: feedReducer
});

export default rootReducer;
