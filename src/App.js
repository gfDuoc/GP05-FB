import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import UserForm from './components/Users/UserForm';
import UserEdit from './components/Users/UserEdit';
import ShowUser from './components/Users/User';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [userName, updateUserName] = useState(null);
  return (
    <Router>
    <div className="">
      <Header title={title} userName={userName}/>
    
        <div className="container-fluid ">
          <Switch>
            <Route path="/" exact={true}>
            <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} updateUserName={updateUserName}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} updateUserName={updateUserName}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/usuarios" exact={true}> 
              <Users/>
            </PrivateRoute>
            <PrivateRoute path="/usuarios/nuevo" exact={true}>
              <UserForm/>
            </PrivateRoute>
            <PrivateRoute path="/usuarios/:id" exact={true}> 
              <ShowUser/>
            </PrivateRoute>
            <PrivateRoute path="/usuarios/:id/edit" exact={true} > 
              <UserEdit/>
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;
