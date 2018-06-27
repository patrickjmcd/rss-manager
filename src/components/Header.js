import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLogout, addFeed } from '../actions';

class Header extends Component {
    state = {
        newFeedUrl: ''
    }

    newFeedButtonPressed(event) {
        event.preventDefault();
        console.log(this.state.newFeedUrl);
        this.props.addFeed({ url: this.state.newFeedUrl });
        this.setState({ newFeedUrl: '' });
    }

    renderForm() {
        const { user } = this.props;
        if (user) {
            return (
                <form className="form-inline ml-auto my-2 my-lg-0">
                    <input
                        id="feedUrl"
                        className="form-control mr-sm-2"
                        type="text"
                        onChange={(e) => this.setState({ newFeedUrl: e.target.value })}
                        placeholder="RSS Feed URL"
                        value={this.state.newFeedUrl}
                    />

                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        onClick={this.newFeedButtonPressed.bind(this)}
                    >
                        Add Feed
                    </button>
                </form>
            );
        }
    }

    renderLogOutButton() {
        const { user } = this.props;
        if (user) {
            return (
                <li className="nav-item">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => this.props.userLogout()}
                    >Logout {user.user.email}</button>
                </li>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/main">RSS Reader</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {this.renderForm()}
                    <ul className="navbar-nav ml-auto">
                        {this.renderLogOutButton()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
        return {
            user
        };
};

export default connect(mapStateToProps, { userLogout, addFeed })(Header);
