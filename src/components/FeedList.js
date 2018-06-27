import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import FeedOverview from './FeedOverview';

const FeedList = (props) => {
    if (_.isEmpty(props.feeds)) {
        return (
            <div className="col-12" style={{ marginTop: 20 }}>
                <h2>You haven't stored any feeds yet...</h2>
                <p>Input a URL above to start!</p>
            </div>
        );
    }
    const feedList = _.map(props.feeds, (feed) => (
        <FeedOverview
            title={feed.title}
            key={feed.title}
        />
    ));

    return (
        <div className="col-12" style={styles.listStyle}>
            {feedList}
        </div>
    );
};

const styles = {
    listStyle: {
        marginBottom: 20,
        marginRight: 200
    }
};

const mapStateToProps = (state) => {
    const { feeds, selected } = state.feeds;
    return { feeds, selected };
};

export default connect(mapStateToProps, {})(FeedList);
