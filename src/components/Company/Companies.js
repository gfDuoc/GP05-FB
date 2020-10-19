import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'; 
import SideBar from '../Sidebar/SiderBar'; 

function Companies(props){
    const laUrl = "/empresas"
	const [data, setData] = useState([]);  	console.log(props)
	useEffect(() => {  
		const GetData = async () => {  
			const result = await axios(API_BASE_URL+laUrl);  
			setData(result.data);  
		};  
		GetData();  
	}, []);  

	function ShowCompany(id) {
		console.log( laUrl+'/'+id+'/edit') 
		props.history.push( laUrl+'/'+id+'/edit');  
	};  
    return (
		<div className="row">
        <div className="col-2"><SideBar/></div>

		<div className="container mt-5" align="center">
      
	  <h4>Empresas Registradas</h4>
	        
	      <div className="row">

	        <div className="col-md-12">

	          <table className="table table-bordered">
	            <thead className="thead-dark">
	              <tr>
	                <th scope="col">ID</th>
	                <th scope="col">Razon Sociak</th>
	              </tr>
	            </thead> 
	            <tbody>
	            {data.map(item => (

	              <tr key={item.ID_empresa}>
	                <td>{item.ID_empresa}</td>
                    <td>{item.razonSocial}</td>
	                <td><button className="btn btn-info" onClick={() => { ShowCompany(item.ID_empresa) }}>Editar</button>  </td>
	              </tr>

	            ))}
	            </tbody>
	          </table>
	        </div>
	      </div>
        </div>
    	</div>

	)
}


export default withRouter(Companies);