import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import Header from './Header';
import Landing from './Landing';
import Main from './Main';

class AuthWrapper extends Component {

    componentWillMount() {
        const firebaseConfig = {
            apiKey: 'AIzaSyCX9XnOGo_yTNHfMJqcBFWLJiUXYtnNFx8',
            authDomain: 'rss-manager-41c1c.firebaseapp.com',
            databaseURL: 'https://rss-manager-41c1c.firebaseio.com',
            projectId: 'rss-manager-41c1c',
            storageBucket: '',
            messagingSenderId: '757295424085'
        };
        firebase.initializeApp(firebaseConfig);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <Route path='/main' component={Main} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default AuthWrapper;
