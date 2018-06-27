import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectFeed, removeFeed } from '../actions';

class FeedDetail extends Component {
    state = {
        sortKey: 'pubDate',
        sortDir: 'asc'
    }

    setSort(key) {
        if (this.state.sortKey === key) {
            this.setState({ sortDir: this.state.sortDir === 'asc' ? 'desc' : 'asc' });
        } else {
            this.setState({ sortKey: key, sortDir: 'asc' });
        }
    }

    renderSortIndicator(key) {
        if (this.state.sortKey === key) {
            if (this.state.sortDir === 'asc') {
                return ' [asc]';
            }
            return ' [desc]';
        }
    }

    renderOldestAndNewest() {
        const { feed } = this.props;
        const sortedItems = _.sortBy(feed.items, (f) => (new Date(f.pubDate)));
        if (sortedItems.length > 0) {
            const oldest = moment(sortedItems[0].pubDate);
            const newest = moment(sortedItems[sortedItems.length - 1].pubDate);
            return (
                <div>
                    <p>Oldest Article: {oldest.format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p>Newest Article: {newest.format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
            );
        }
    }


    renderDetail() {
        const { selected, feed } = this.props;
        if (selected === feed.title) {
            let sortedItems = _.sortBy(feed.items, (item) => {
                switch (this.state.sortKey) {
                    case 'pubDate':
                        return new Date(item.pubDate);
                    case 'title':
                        return item.title;
                    case 'content':
                        return item.contentSnippet;
                    default:
                        return new Date(item.pubDate);
                }
            });
            if (this.state.sortDir === 'desc') {
                sortedItems = sortedItems.reverse();
            }
            const itemsRows = _.map(sortedItems, (item, i) => {
                let image = null;
                if (item.enclosure) {
                    if (item.enclosure.type.search('image') >= 0) {
                        image = <img className="img-fluid" src={item.enclosure.url} alt="item.title" />;
                    }
                }
                return (
                    <tr key={i}>
                        <td>{item.title}</td>
                        <td>{moment(item.pubDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        <td dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                        <td>{image}</td>
                        <td>
                            <a
                                className="btn btn-primary"
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Go to Article
                            </a>
                        </td>
                    </tr>
                );
            });

            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th
                                    onClick={() => this.setSort('title')}
                                    style={styles.sortKey}
                                >Title{this.renderSortIndicator('title')}</th>
                                <th
                                    onClick={() => this.setSort('pubDate')}
                                    style={styles.sortKey}
                                >Published{this.renderSortIndicator('pubDate')}</th>
                                <th
                                    onClick={() => this.setSort('content')}
                                    style={styles.sortKey}
                                >Summary{this.renderSortIndicator('content')}</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {itemsRows}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render() {
        const { feed } = this.props;

        if (!feed) {
            return <h1>Loading</h1>;
        }

        const imageUrl = feed.image ? feed.image.url : '';

        return (
            <div className="col-lg-9 col-xs-12" style={styles.cardStyle}>
                <div className="row">
                    <div className="col-1 offset-11" style={styles.closeButton}>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={() => this.props.selectFeed({})}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row" style={styles.rowStyle}>
                    <div className="col-5">
                        <img src={imageUrl} alt="" style={{ maxHeight: 50 }} />
                        <h5>{feed.title}</h5>
                        {this.renderOldestAndNewest()}
                    </div>

                    <div className="col-5">
                        <p className="card-text">{feed.description}</p>
                    </div>

                    <div className="col-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => this.props.removeFeed({
                                url: feed.url,
                                title: feed.title
                            })}
                        >
                            Remove Feed
                        </button>
                    </div>
                </div>
                {this.renderDetail()}
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
    closeButton: {
        textAlign: 'right',
        marginTop: 15
    },
    sortKey: {
        cursor: 'pointer'
    }
};


const mapStateToProps = (state, ownProps) => {
    const { selected, feeds } = state.feeds;
    return {
        selected,
        feed: feeds[ownProps.title]
    };
};

export default connect(mapStateToProps, { selectFeed, removeFeed })(FeedDetail);
