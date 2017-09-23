import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div>
                <p>Welcome {this.props.user.displayName}</p>
            </div>
        )
    }
}

export default Dashboard;