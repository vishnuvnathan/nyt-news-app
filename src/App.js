import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import AuthRouter from './Components/AuthRouter/AuthRouter';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import SavedNews from './Pages/SavedNews/SavedNews';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
      <Switch>
        <AuthRouter exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path='/profile' component ={Profile}/>
        <Route exact path='/saved_news/:id' component ={SavedNews}/>
      </Switch>
    </div>
    </Router>

  );
}

export default App;
