import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFeed, fetchFeeds, selectFeed } from '../actions';
import FeedSidebar from './FeedSidebar';
import FeedList from './FeedList';
import FeedDetail from './FeedDetail';


class Main extends Component {


    componentWillMount() {
        this.props.fetchFeeds();
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
        const { selected } = this.props;
        if (!this.props.user) {
            console.log('Need to be authenticated!!!');
            return <Redirect to="/" />;
        }

        const sidebar = selected ? <FeedSidebar /> : null;
        const feed = selected ? <FeedDetail title={selected} /> : <FeedList />;
        return (
            <div className="container-fluid">
                <h1>Your Feed</h1>
                {this.renderError()}
                <div className="row" style={{ marginTop: 20 }} >
                    {sidebar}
                    {feed}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { error, selected } = state.feeds;
    return {
        user,
        error,
        selected
     };
};

export default connect(mapStateToProps, { addFeed, fetchFeeds, selectFeed })(Main);
