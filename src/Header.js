import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import firebase from 'firebase';

class Header extends Component {

    constructor(props){
        super(props);
    }

    handleSignout = () => {
        const vm = this;
        vm.setState({
            user: null,
            type: null
        });
        localStorage.setItem('type', null);
        firebase.auth().signOut();
    }

    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Ticket System</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    {this.props.user !== null &&
                    <NavItem onClick={this.handleSignout}>Sign out</NavItem>
                    }
                </Nav>
            </Navbar>
        );
    }
}

export default Header;