import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { selectFeed } from '../actions';

const FeedSidebar = (props) => {
    const { feeds, selected } = props;
    const listItems = _.map(feeds, (feed, i) => {
        const imageUrl = feed.image ? feed.image.url : '';
        return (
            <li
                className={feed.title === selected ? 'list-group-item active' : 'list-group-item'}
                onClick={() => props.selectFeed({ url: feed.url, title: feed.title })}
                style={{ cursor: 'pointer' }}
                key={i}
            >
                <div className="row">
                    <div className="col-2">
                        <img src={imageUrl} alt="" style={{ maxWidth: '100%', maxHeight: 30 }} />
                    </div>
                    <div className="col-8">
                        {feed.title}
                    </div>
                    <div className="col-2">
                        <span
                            className="badge badge-secondary"
                        >
                                {feed.items ? feed.items.length : '0'}
                        </span>
                    </div>
                </div>
            </li>
        );
    });
    return (
        <div
            className="col-sm"
            style={{ marginBottom: 20 }}
        >
            <ul className="list-group">
                {listItems}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { feeds, selected } = state.feeds;
    return { feeds, selected };
};

export default connect(mapStateToProps, { selectFeed })(FeedSidebar);
