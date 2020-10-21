import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import PrivateRoute from './utils/PrivateRoute';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import UserForm from './components/Users/UserForm';
import UserEdit from './components/Users/UserEdit';
import ShowUser from './components/Users/User';
import Tasks from './components/Tasks/Tasks';
import ShowTask from './components/Tasks/Task';
import TaskForm from './components/Tasks/TaskForm';
import TaskEdit from './components/Tasks/TaskEdit';
import Positions from './components/Position/Lists';
import PostionForm from './components/Position/New';
import PositionEdit from './components/Position/Edit';

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
            <PrivateRoute path="/tareas" exact={true} > 
              <Tasks/>
            </PrivateRoute>
            <PrivateRoute path="/tareas/nuevo" exact={true} > 
              <TaskForm/>
            </PrivateRoute>
            <PrivateRoute path="/tareas/:id" exact={true} > 
              <ShowTask/>
            </PrivateRoute>
            <PrivateRoute path="/tareas/:id/edit" exact={true} > 
              <TaskEdit/>
            </PrivateRoute>
            <PrivateRoute path="/cargos" exact={true} > 
              <Positions/>
            </PrivateRoute>
            <PrivateRoute path="/cargos/nuevo" exact={true} > 
              <PostionForm/>
            </PrivateRoute>
            <PrivateRoute path="/cargos/:id/edit" exact={true} > 
              <PositionEdit/>
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;
