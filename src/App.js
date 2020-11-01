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
import Companies from './components/Company/Companies';
import CompanyForm from './components/Company/CompanyForm';
import CompanyEdit from './components/Company/CompanyEdit';
import Procesos from './components/Process/Lists';
import ProcessForm from './components/Process/New';
import SingleProcess from './components/Process/Single';
import ProcessEdit from './components/Process/Edit';
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
           { /*cambiar path segun la ruta requerida 
              private route es un metodo custom que valida el token si no chutea al login
           */}
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
            <PrivateRoute path="/usuarios/new" exact={true}>
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
            <PrivateRoute path="/tareas/new" exact={true} > 
              <TaskForm/>
            </PrivateRoute>
            <PrivateRoute path="/tareas/:id" exact={true} > 
              <ShowTask/>
            </PrivateRoute>
            <PrivateRoute path="/tareas/:id/edit" exact={true} > 
              <TaskEdit/>
            </PrivateRoute>
            <PrivateRoute path="/procesos" exact={true} > 
              <Procesos/>
            </PrivateRoute>
            <PrivateRoute path="/procesos/new" exact={true} > 
              <ProcessForm/>
            </PrivateRoute>
            <PrivateRoute path="/procesos/:id" exact={true} > 
              <SingleProcess/>
            </PrivateRoute>
            <PrivateRoute path="/procesos/:id/edit" exact={true} > 
              <ProcessEdit/>
            </PrivateRoute>
            <PrivateRoute path="/cargos" exact={true} > 
              <Positions/>
            </PrivateRoute>
            <PrivateRoute path="/cargos/new" exact={true} > 
              <PostionForm/>
            </PrivateRoute>
            <PrivateRoute path="/cargos/:id/edit" exact={true} > 
              <PositionEdit/>
            </PrivateRoute>
            <PrivateRoute path="/empresas" exact={true} > 
              <Companies/>
            </PrivateRoute>
            <PrivateRoute path="/empresas/new" exact={true} > 
              <CompanyForm/>
            </PrivateRoute>
            <PrivateRoute path="/empresas/:id/edit" exact={true} > 
              <CompanyEdit/>
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;
