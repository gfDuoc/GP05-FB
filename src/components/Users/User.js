import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';

function useUsuarios (props){
	const [users, setUsers] = useState ([])
	console.log(props)

    useEffect(() => { 
        fetch(API_BASE_URL+"/usuarios")
        .then(response => response.json())
        .then(datos => {
			setUsers(datos)
		})
    }, [])
    
    return users
}

function ShowUser(props){
	console.log(props);
	const users = useUsuarios()
	console.log(users)
     if (users.size){
    return (

		<div className="container mt-5" align="center">
      
	      <h4>usaurios registrados</h4>
	        
	      <div className="row">

	        <div className="col-md-12">

	          <table className="table table-bordered">
	            <thead className="thead-dark">
	              <tr>
	                <th scope="col">ID</th>
	                <th scope="col">usuario</th>
	                <th scope="col">Nombre</th>
	                <th scope="col">Correo</th>
					<th scope="col">Ver</th>
	              </tr>
	            </thead> 
	            <tbody>

	            {users.map(item => (

	              <tr key={item.ID_usuario}>
	                <td>{item.ID_usuario}</td>
	                <td>{item.nombreUsuario}</td>
	                <td>{item.nombre} {item.apellidos}</td>
	                <td>{item.correo}</td>
	                <td>LINK</td>
	              </tr>

	            ))}

	            </tbody>

	          </table>

	        </div>

	      </div>
      
		</div>
		)} else {
			return( <h2>No existe usuario</h2>)
	}	
}


export default withRouter(ShowUser);