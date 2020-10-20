import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import axios from 'axios';  

//ID_proceso: 0,
//descripcion: "",
//modelo: "",
//inicio: "",
//termino: "",
//detalle: "",
//empresa_ID: 0

function Procesos(props){
    const laUrl = "/procesos"
    const [data, setData] = useState([]);  	console.log(props)

	useEffect(() => {  
		const GetData = async () => {  
			const result = await axios(API_BASE_URL+laUrl);  
			setData(result.data);  
		};  
		GetData();  
	}, []);  

	function showSingle(id) {
		console.log(laUrl+ "/" + id  ) 
		props.history.push(laUrl + "/"+ id );  
	};  

    function Lister(datos){
		return(
			<div>
				<div className="card">
					<div className="card-header">
						<b>ID:</b> {tarea.ID_tarea} <b>Nombre</b> {tarea.nombre}
					</div>
					<div className="card-body">
						<div className="row">
							<div className="col">
								<p><b>estimado inicio:</b>{tarea.terminoRegistrado}</p>
								<p><b>reail incio:</b>{tarea.terminoRegistrado}</p>
							</div>
							<div className="col">
								<p><b>estimado cierre:</b> {tarea.terminoRegistrado}</p>
						
                        		<p><b>Real cierre:</b> {tarea.terminoRegistrado}</p>
							</div>
						</div>
					</div>
					<div className="card-footer"><b>observaciones:</b>{tarea.observaciones}
						<br/>
						<button type="button" className="btn btn-primary btn-block "  onClick={() => { showSingle(tarea.ID_tarea) }}>ver tarea</button>
					</div>
				</div>
			</div>
		)
	};

    function weHadData(lista){
        if (lista === 'null'){
         return( <div> error al cargar</div>)
        } else if ( Array.isArray(lista ) && lista.length === 0 ){
         return( <div> no tiene tareas pendientes</div>)
        } else if ( Array.isArray(lista ) && lista.length > 0){
          return(<div><p>hay traeas pendientes</p>{lista.map(t =>(Lister(t)))}</div>)
        } else {
          return(<div>Error desconocido!</div>)
        }
      };

    return (
        <div className="row">
        <div className="col-2"><SideBar/></div>
		<div className="container mt-5" align="center">
      
	  <h4>Tareas registradas</h4>
	        
	      <div className="row">

	        <div className="col-md-12">

	            {
                weHadData(data)
                }

	      </div>
        
    	</div>
		</div>
	</div>
	)
}


export default withRouter(Procesos);