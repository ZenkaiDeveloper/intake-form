import React, { Component } from 'react';
import Vaccine from './Vaccine.js'

import {
  isSignInPending,
  loadUserData,
  Person,
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return (
      !isSignInPending() ?
      <div className="wrapper">
        <div className="panel-welcome" id="section-2">

          <div className="avatar-section">
            <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" />
          </div>

          <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              id="signout-button"
              onClick={ handleSignOut.bind(this) }
            >
              Logout
            </button>
            <button className="btn btn-primary btn-lg category-btn"> Vaccine</button>
            <button className="btn btn-primary btn-lg category-btn"> Surgery</button>
            <button className="btn btn-primary btn-lg category-btn"> Medication</button>
            <button className="btn btn-primary btn-lg category-btn"> Insurance</button>
          </p>
        </div>
        <div className="main">
          <Vaccine />
        </div>
      </div>


       : null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
