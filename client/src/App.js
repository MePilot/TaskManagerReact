import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import React, { useState, useEffect } from 'react';
import Registration from './components/Registration';
import LoginPage from './components/LoginPage';
import axios from 'axios'
import ProfilePage from './components/ProfilePage';
import TasksPage from './components/TasksPage';

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('JWT') ? localStorage.getItem('JWT') : '');
  const [user, setUser] = useState('');
  
  const getToken = () => {
    return token
  }
  
  useEffect(() => {

    const auth = async () => {
      await axios.get('/users/me', { headers: { Authorization: token } }).then((res) => {
        setUser(res.data)
      }).catch((e)=>console.log(e))
    }
    auth()
  }, [token]);

  const logOut = async () => {
  
    await axios.post('/users/logout', { headers: { Authorization: token } }).then((res) => {
     
      localStorage.removeItem('JWT')
      setToken(null)
    }).catch((e) => console.log(e))
  }

  return (

    <div className="App">

      <Router>
        <NavBar user={user} logOut={logOut}></NavBar>
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} userToken={token} />} />
          <Route exact path="/about" render={props => <AboutPage  {...props} />} />
          <Route exact path="/registration" render={props => <Registration  {...props} setToken={setToken} />} />
          <Route exact path="/login" render={props => <LoginPage  {...props} setToken={setToken} />} />
          <Route exact path="/profile" render={props => <ProfilePage  {...props} user={user} getToken={getToken}/>} />
          <Route exact path="/mytasks" render={props => <TasksPage {...props} token={token} />} />
        </Switch>
      </Router>

    </div>
  )
}

export default App;
