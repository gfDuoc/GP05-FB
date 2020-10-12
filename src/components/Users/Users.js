import React, { useEffect,useState } from 'react';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';  

export default function Users(props){
	const [data, setData] = useState([]);  
	useEffect(() => {  
		const GetData = async () => {  
			const result = await axios(API_BASE_URL+"/usuarios");  
			setData(result.data);  
		};  
		GetData();  
	}, []);  

	const ShowUser = (id) => {
		console.log('/usuarios/' + id  )  
		this.props.history.push( '/usuarios/' + id );  
	};  
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
					<th scope="col">ver</th>
	              </tr>
	            </thead> 
	            <tbody>

	            {data.map(item => (

	              <tr key={item.ID_usuario}>
	                <td>{item.ID_usuario}</td>
	                <td>{item.nombreUsuario}</td>
	                <td>{item.nombre} {item.apellidos}</td>
	                <td>{item.correo}</td>
	                <td><button className="btn btn-info" onClick={() => { ShowUser(item.ID_usuario) }}>IR</button>  </td>
	              </tr>

	            ))}

	            </tbody>

	          </table>

	        </div>

	      </div>
        
    	</div>

	)
}