import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFeed, fetchFeeds } from '../actions';
import FeedOverview from './FeedOverview';

class Main extends Component {
    state = {
        newFeedUrl: '',
        selectedFeed: ''
    }

    componentWillMount() {
        this.props.fetchFeeds();
    }

    newFeedButtonPressed(event) {
        event.preventDefault();
        console.log(this.state.newFeedUrl);
        this.props.addFeed({ url: this.state.newFeedUrl });
    }

    feedSelected(title) {
        console.log(title);
        this.setState({ selectedFeed: title });
    }

    renderFeedList() {
        const feedList = _.map(this.props.feeds, (feed) => (
            <FeedOverview
                title={feed.title}
                key={feed.title}
            />
        ));
        return (
            <div className="row" style={{ marginTop: 20 }}>
                {feedList}
            </div>
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <div className="row">
                    <div className="col">
                        <div className="alert alert-danger" role="alert" style={{ marginTop: 25 }} >
                          {this.props.error}
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        if (!this.props.user) {
            console.log('Need to be authenticated!!!');
            return <Redirect to="/" />;
        }

        return (
            <div>
                <h1>Your Feed</h1>
                {this.renderError()}
                <form className="col">
                    <div className="form-group">
                        <label htmlFor="feedUrl">New Feed URL</label>
                        <input
                            id="feedUrl"
                            className="form-control"
                            type="text"
                            onChange={(e) => this.setState({ newFeedUrl: e.target.value })}
                            placeholder="RSS Feed URL"
                            value={this.state.newFeedUrl}
                        />
                    </div>

                    <button
                        className="btn btn-success"
                        onClick={this.newFeedButtonPressed.bind(this)}
                    >
                        Add Feed
                    </button>
                </form>
                {this.renderFeedList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { feeds, error } = state.feeds;
    return {
        user,
        feeds,
        error
     };
};

export default connect(mapStateToProps, { addFeed, fetchFeeds })(Main);
