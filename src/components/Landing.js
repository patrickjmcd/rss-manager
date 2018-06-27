import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userLogin } from '../actions';

class Landing extends Component {
    state = {
        email: '',
        password: ''
    };

    loginUserPressed(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.userLogin({ email, password });
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
        const { from } = this.props.location.state || { from: { pathname: '/main' } };

        if (this.props.user) {
            console.log('I\'m authenticated!!!');
            return <Redirect to={from} />;
        }
        return (
            <div style={{ marginTop: 15 }} className="container" >
                <h1>Welcome!</h1>
                <p>You've found the best RSS Parser on the web since Google Reader!</p>
                <p>If you've been here before, enter your email address and password below to login</p>
                <p>New user? Enter your email address and intended password and you'll automatically be signed up!</p>
                <hr />
                {this.renderError()}
                <div className="row" style={{ marginTop: 15 }} >
                    <form className="col">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                className="form-control"
                                type="email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                placeholder="steve@apple.com"
                                value={this.state.email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                value={this.state.password}
                            />
                        </div>
                        <button
                            className="btn btn-success login"
                            onClick={this.loginUserPressed.bind(this)}
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { email, user, error } = state.auth;
        return {
            email,
            user,
            error
        };
};

export default connect(mapStateToProps, { userLogin })(Landing);
