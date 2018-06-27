import RSSParser from 'rss-parser';
import firebase from 'firebase/app';
import _ from 'lodash';

import {
    FEED_LIST_UPDATED,
    FEED_ERROR,
    FEED_REMOVED,
    FEED_SELECTED
} from './types';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const parser = new RSSParser();

export const fetchFeeds = () => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        return {
            type: 'no_user'
        };
    }
    return (dispatch) => {
        firebase.database().ref(`feeds/${currentUser.uid}`)
            .on('value', snapshot => {
                // dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
                _.forEach(snapshot.val(), ({ url }) => {
                    updateFeed({ url, dispatch });
                });
            });
    };
};

const updateFeed = ({ url, dispatch }) => {
    parser.parseURL(CORS_PROXY + url, (err, feed) => {
        if (err) {
            dispatch({
                type: FEED_ERROR
            });
        } else {
            const { title, description, image, items, link: urllink } = feed;
            const feedObj = {
                title,
                description,
                image,
                urllink,
                url,
                items
            };

            dispatch({
                type: FEED_LIST_UPDATED,
                payload: feedObj
            });
        }
    });
};

const checkFeed = (url, cb) => {
    parser.parseURL(CORS_PROXY + url, (err, feed) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, feed);
        }
    });
};

const firebaseify = (rawString) => {
    return rawString.replace(/[.#$\[\]]/g, '|');
}


export const addFeed = ({ url }) => {
    console.log('adding url', url);

    const { currentUser } = firebase.auth();
    return (dispatch) => {
        checkFeed(url, (err, feed) => {
            if (err) {
                dispatch({
                    type: FEED_ERROR,
                    payload: 'You did not enter the URL for an RSS feed!'
                });
            } else {
                firebase.database().ref(`feeds/${currentUser.uid}`)
                .child(firebaseify(feed.title)).set({ url })
                .then(() => {
                    dispatch({
                        type: FEED_LIST_UPDATED,
                        payload: feed
                    });
                    dispatch({
                        type: FEED_SELECTED,
                        payload: feed.title
                    });
                });
            }
        });
    };
};

export const removeFeed = ({ url, title }) => {
    console.log('removing url', url);
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`feeds/${currentUser.uid}`)
            .child(firebaseify(title)).remove()
            .then(() => {
                dispatch({
                    type: FEED_REMOVED,
                    payload: title
                });
            });
    };
};

export const selectFeed = ({ title, url }) => {
    console.log('selecting', title);
    return (dispatch) => {
        dispatch({
            type: FEED_SELECTED,
            payload: title
        });
        updateFeed({ url, dispatch });
    };
};
