import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import List from './components/pages/List';
import Matches from './components/pages/Matches';
import Footer from './components/Footer';

firebase.initializeApp({

  apiKey: "AIzaSyBeQ1OlPOh5wUyyyFj2IwyW16KXFYY2ESg",
  authDomain: "pawmates-72d84.firebaseapp.com",
  databaseURL: "https://pawmates-72d84.firebaseio.com"
})

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <>
          <Router>
            <Navbar />
            <Switch>
            <Route path='/' exact component={Home} />
                <Route path='/list' component={List} />
                <Route path='/matches' component={Matches} />
            </Switch>
            </Router>
          </>
          /*<span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>*/
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App
