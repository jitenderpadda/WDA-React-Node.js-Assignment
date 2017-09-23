import React, { Component } from 'react';
import './App.css';
import { Button, Jumbotron } from 'react-bootstrap';
import firebase from 'firebase';
import { Route, Redirect } from 'react-router';
import Dashboard from './components/Dashboard';
import Footer from "./Footer";
import Header from "./Header";

class App extends Component {
    state = {
        type: null,
        user: null
    }

    componentWillMount () {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
    }

    componentWillUnmount() {
        if(this.state.user !== null) {
            localStorage.setItem('type', this.state.type);
        }
    }

    handleClick = (type) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((success) => { this.handleCredentials(success.user) })
            .then(() => { this.handleLogin(type) });
    }

    handleCredentials = (params) => {
        console.log(params);
        this.setState({
            user: params,
            type: localStorage.getItem('type')
        });
    }

    handleLogin = (type) => {
        localStorage.setItem('type', type);
        this.setState({
            type: type
        });
        /* Add user to our mongodb database */
        /* MongoDB schema - will insert the user's details into the database */
        const user = {};
        user['user/' + this.state.user.uid] = {
            type: type,
            name: this.state.user.displayName,
            id: this.state.user.uid
        };
        firebase.database().ref().update(user)
    }
    render() {
        return (
            <div className="App">
                <Header user = {this.state.user} />
                <div className="container">
                    <Route exact path="/" render={() => (
                        this.state.user === null ? (
                                <Jumbotron className="text-center">
                                    <h1>Sign in to continue</h1>
                                    <p>
                                        Please select your account type:
                                    </p>

                                    <div className="text-center">
                                        <Button bsSize="large" bsStyle="primary" style={{marginRight:10}} onClick={() => this.handleClick('helpdesk')}><span className="glyphicon glyphicon-earphone"></span> Helpdesk User</Button>
                                        <Button bsSize="large" bsStyle="success" onClick={() => this.handleClick('tech')}> <span className="glyphicon glyphicon-user"></span> Tech User</Button>
                                    </div>
                                </Jumbotron>
                            )
                            : (
                                <Redirect to="/dashboard" />
                            )
                    )} />
                    <Route exact path="/dashboard" render={() => (
                        this.state.user !== null ? (
                                <Dashboard user={this.state.user} type={this.state.type} />
                            )
                            : (
                                <Redirect to="/" />
                            )
                    )} />
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default App;
