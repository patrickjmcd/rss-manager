import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectFeed, removeFeed } from '../actions';

class FeedDetail extends Component {
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
