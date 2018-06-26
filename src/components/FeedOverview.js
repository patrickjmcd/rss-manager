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

    renderDetail() {
        const { selected, feed } = this.props;
        if (selected === feed.title) {
            const feedMap = _.map(feed.items, (item, i) => (
                <tr key={i}>
                    <td>{item.title}</td>
                    <td>{item.pubDate}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.content }} />
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
            ));
            return (
                <div>
                    <hr />
                    <table className="table">
                        <tbody>
                            {feedMap}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render() {
        const { feed } = this.props;
        if (!feed) {
            return <h1>Loading...</h1>;
        }
        return (
            <div className="col-12" style={styles.cardStyle}>
                <div className="row" style={styles.rowStyle}>
                    <div className="col-4">
                        <img src={feed.image.url} alt="" style={{ maxHeight: 50 }} />
                        <h5>{feed.title}</h5>
                    </div>

                    <div className="col-2">
                        <h5>
                            <span
                                className="badge badge-primary"
                            >
                                    {feed.items ? feed.items.length : '0'} articles
                            </span>
                        </h5>
                    </div>

                    <div className="col-3">
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

                    <div className="col-1">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.toggleSelected()}
                        >V</button>
                    </div>
                </div>
                {this.renderDetail()}
            </div>
        );
    }
}

const styles = {
    cardStyle: {
        borderRadius: 10,
        border: '2px solid #ccc',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    rowStyle: {
        paddingTop: 10,
        paddingBottom: 10
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
