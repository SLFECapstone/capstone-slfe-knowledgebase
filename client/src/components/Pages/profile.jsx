import React, { Component } from 'react'
import Profile from '../PageComponents/Profile'


class profile extends Component {
  componentDidMount() {
    document.title = "SLFE - User Profile";
  }

  render() {
    const { match } = this.props;

    return (
      <div >
        <Profile username={match.params.username} />
      </div>
    )
  }
}

export default profile;
