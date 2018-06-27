import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectFeed, removeFeed } from '../actions';

class FeedOverview extends Component {
    toggleSelected() {
        const { selected, feed } = this.props;
        if (selected === feed.title) {
            this.props.selectFeed({ title: '', url: '' });
        } else {
            this.props.selectFeed({ url: feed.url, title: feed.title });
        }
    }


    render() {
        const { feed } = this.props;
        if (!feed) {
            return <h1>Loading... </h1>;
        }

        const imageUrl = feed.image ? feed.image.url : '';

        return (
            <div className="col-12" style={styles.cardStyle}>
                <div className="row" style={styles.rowStyle}>
                    <div className="col-5">
                        <img src={imageUrl} alt="" style={{ maxHeight: 50 }} />
                        <h5>
                            {`${feed.title}  `}

                            <span
                                className="badge badge-primary"
                            >
                                    {feed.items ? feed.items.length : '0'} articles
                            </span>

                        </h5>
                    </div>

                    <div className="col-5">
                        <p className="card-text">{feed.description}</p>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <button
                                className="btn btn-outline-primary"
                                style={styles.buttonStyle}
                                onClick={() => this.toggleSelected()}
                            >View Articles</button>
                        </div>
                        <div className="row">
                            <button
                                className="btn btn-outline-danger"
                                style={styles.buttonStyle}
                                onClick={() => this.props.removeFeed({
                                    url: feed.url,
                                    title: feed.title
                                })}
                            >
                                Remove Feed
                            </button>
                        </div>

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
