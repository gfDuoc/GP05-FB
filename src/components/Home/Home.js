import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios'
import SideBar from '../Sidebar/SiderBar';
import ShowTaskCustom from '../Tasks/CustomShow.js';

function Home(props) {
  console.log(props)
  const [jason, setJason] = useState(null);
  useEffect(() => {
    axios.post(API_BASE_URL_ALT + '/home/', { 'idUsuario': localStorage.getItem("idUsuario")  }, {
      headers:
        { ACCESS_TOKEN_NAME: ACCESS_TOKEN_NAME },
      data: { 'idUsuario':  localStorage.getItem("idUsuario") },
      responseType: "application/json"
    })
      .then(function (response) {
        console.log(response);
        setJason(response.data)
        if (response.status !== 200) {
          redirectToLogin()
        }
      })
      .catch(function (error) {
        console.log(error)
        redirectToLogin()
      });
  }, [])

  function redirectToLogin() {
    props.history.push('/login')
  }

  function weHadTask(lista) {
    if (lista === 'null') {
      return (<div> error al cargar</div>)
    } else if (Array.isArray(lista) && lista.length === 0) {
      return (<div> no tiene tareas pendientes</div>)
    } else if (Array.isArray(lista) && lista.length > 0) {
      return (<div><p>hay tareas pendientes</p>{lista.map(t => (ShowTaskCustom(t)))}</div>)
    } else {
      return (<div>Error desconocido!</div>)
    }
  }

  return (
    <div className="row ">
      <SideBar />
      <div className="col" align="center">
        <br></br>
        <div className="card  ">
          <div className="card-header">
            <h3>Bienvenido a Process S.A.</h3>
          </div>
          <br />
          <div className="card-body">
            <p>Mi progreso.</p>
            <br />
            <p>Mis tareas</p>
            {weHadTask(jason)}
          </div>
          <div className="card-footer">
            -
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home);