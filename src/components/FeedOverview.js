import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectFeed, removeFeed } from '../actions';

class FeedOverview extends Component {


    getItemsWithPhotos() {
        const { feed } = this.props;
        const itemsWithPhotos = _.filter(feed.items, (item) => {
            if (item.enclosure) {
                return item.enclosure.type.search('image') >= 0;
            }
            return false;
        });
        return itemsWithPhotos.length;
    }

    toggleSelected() {
        const { selected, feed } = this.props;
        if (selected === feed.title) {
            this.props.selectFeed({ title: '', url: '' });
        } else {
            this.props.selectFeed({ url: feed.url, title: feed.title });
        }
    }

    removeFeed(event) {
        event.stopPropagation();
        this.props.removeFeed({
            url: this.props.feed.url,
            title: this.props.feed.title
        });
    }

    renderOldestAndNewest() {
        const { feed } = this.props;
        const sortedItems = _.sortBy(feed.items, (f) => (new Date(f.pubDate)));
        if (sortedItems.length > 0) {
            const oldest = new Date(sortedItems[0].pubDate);
            const newest = new Date(sortedItems[sortedItems.length - 1].pubDate);
            return (
                <div>
                    <p>Oldest Article: {oldest.toLocaleString()}</p>
                    <p>Newest Article: {newest.toLocaleString()}</p>
                </div>
            );
        }
    }

    render() {
        const { feed } = this.props;
        if (!feed) {
            return <h1>Loading... </h1>;
        }

        const imageUrl = feed.image ? feed.image.url : '';

        return (
            <div className="col-12" style={styles.cardStyle} onClick={() => this.toggleSelected()}>
                <div className="row" style={styles.rowStyle}>
                    <div className="col-5">
                        <img src={imageUrl} alt="" style={{ maxHeight: 50 }} />
                        <h5>
                            {`${feed.title}`}
                        </h5>
                        <h5>
                            <span
                                className="badge badge-primary"
                            >
                                    {feed.items ? feed.items.length : '0'} articles
                            </span>
                            <span>{'  '}</span>
                            <span
                                className="badge badge-warning"
                            >
                                    {feed.items ? this.getItemsWithPhotos() : '0'} with photos
                            </span>

                        </h5>

                        {this.renderOldestAndNewest()}
                    </div>

                    <div className="col-5">
                        <span className="align-middle">
                            <p className="align-middle">{feed.description}</p>
                        </span>
                    </div>

                    <div className="col-2">
                        <button
                            className="btn btn-outline-danger"
                            style={styles.buttonStyle}
                            onClick={this.removeFeed.bind(this)}
                        >
                            Remove Feed
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    cardStyle: {
        borderRadius: 5,
        border: '1px solid #ccc',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    rowStyle: {
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        width: '90%',
        marginBottom: 5
    }
};


const mapStateToProps = (state, ownProps) => {
    const { selected, feeds } = state.feeds;
    return {
        selected,
        feed: feeds[ownProps.title]
    };
};

export default connect(mapStateToProps, { selectFeed, removeFeed })(FeedOverview);
