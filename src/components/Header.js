import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLogout } from '../actions';

class Header extends Component {

    renderLogOutButton() {
        const { user } = this.props;
        if (user) {
            return (
                <li className="nav-item">
                    <button
                        className="btn btn-danger"
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
                    {/* <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link
                                className="nav-link"
                                to="/main"
                            >
                                    Home <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sample">Sample</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#">Disabled</Link>
                        </li>
                    </ul> */}
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

export default connect(mapStateToProps, { userLogout })(Header);
