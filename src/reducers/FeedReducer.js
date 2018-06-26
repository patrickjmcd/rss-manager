import _ from 'lodash';
import {
    FEED_LIST_UPDATED,
    FEED_REMOVED,
    FEED_SELECTED,
    FEED_PARSED,
    FEED_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    feeds: {},
    selected: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FEED_LIST_UPDATED:
            return { ...state, feeds: { ...state.feeds, [action.payload.title]: action.payload } };

        case FEED_REMOVED:
            return { ...state, feeds: _.omit(state.feeds, action.payload) };

        case FEED_SELECTED:
            return { ...state, selected: action.payload };

        case FEED_ERROR:
            return { ...state, error: action.payload };

        case FEED_PARSED:
            return {
                ...state,
                feeds: {
                    ...state.feeds,
                    [action.payload.title]:
                        {
                            ...state.feeds[action.payload.title],
                            items: action.payload.articles
                        }
                }
            };

        default:
            return state;
    }
};
