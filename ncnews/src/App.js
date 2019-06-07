import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router";
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import LoginPage from './components/LoginPage';
import { getUser } from './api'
import TopicsList from './components/topicsList'
import { Error } from './components/Error'



class App extends Component {
  state = {
    currentUserLogin: null,
    err: null
  };



  render() {
    const { err, currentUserLogin } = this.state;
    if (err) return <Error />
    return (
      <div>

        <Header />
        <LoginPage changeLogin={this.changeLogin} currentUserLogin={this.state.currentUserLogin} changeLogin={this.changeLogin} />
        <Router>
          <Error default /> 
          <ArticlesList path="/*" currentUserLogin={this.state.currentUserLogin} />
          <TopicsList path="/topics/*" />
        </Router>


      </div>
    );
  }

  changeLogin = (input) => {

    if (!input) //is null set in LoginPage if current login state !== current user value 
    {
      return this.setState({ currentUserLogin: null })
    } else {
      getUser(input).then((res) => {
        if (res) {
          this.setState({ currentUserLogin: res.username })

        }

      }).catch((err) => {
        this.setState({ err });
      })
    }
  }
}

export default App;


