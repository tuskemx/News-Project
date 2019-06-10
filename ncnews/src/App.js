import React, { Component } from 'react';
import './App.css';
import { Router, navigate } from "@reach/router";
import Header from './components/Header';
import ArticlesList from './components/ArticleComponents/ArticlesList'
import LoginPage from './components/LoginPage';
import { getUser } from './api'
import TopicsList from './components/TopicsComponents/topicsList'
import { Error } from './components/Error'
import SignupComponent from './components/signupComponent';
import UserPage from './components/UserPage';


class App extends Component {
  state = {
    currentUserLogin: null,
    err: null,
    avater_url: '',
    name: ''
  };



  render() {
    const { err, currentUserLogin } = this.state;
    if (err) return <Error />
    return (
      <div>

        <Header currentUserLogin=
          {this.state.currentUserLogin} />
        <LoginPage changeLogin={this.changeLogin} currentUserLogin={this.state.currentUserLogin} changeLogin={this.changeLogin} />
        <Router>
          <Error default />
          <ArticlesList path="/*" currentUserLogin={this.state.currentUserLogin} />
          <TopicsList path="/topics/*" currentUserLogin={this.state.currentUserLogin} />
          <SignupComponent updateAppUser={this.updateAppUser} path="/sign-up" />
          <UserPage userinfo={this.state}  path="/user" />
        </Router>


      </div>
    );
  }

  changeLogin = (event) => {

    if (!event) //is null set in LoginPage if current login state !== current user value 
    {
      return this.setState({ currentUserLogin: null })
    } else {
      getUser(event).then((res) => {
        if (res) {
          this.setState({
            currentUserLogin: res.username,
            avatar_url: res.avatar_url,
            name: res.name
          })
          console.log(res);

        }

      }).catch((err) => {
        this.setState({ err });
      })
    }
  }
  updateAppUser = (user) => {
    this.setState({ currentUserLogin: user });
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/`);
  };
}

export default App;


