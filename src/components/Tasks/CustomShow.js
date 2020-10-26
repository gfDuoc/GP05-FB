import React from 'react';
import { withRouter } from 'react-router-dom';

function ShowTaskCustom(props) {

	function showTask(id) {
		props.history.push('/tareas/' + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function taskExist(data) {
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div id= {data.ID_tarea}>
					<div className="card">
						<div className="card-header">
							<b>ID:</b> {data.ID_tarea} <b>Nombre</b> {data.nombre}
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>Incio:</b>{data.inicio}</p>
									<p><b>Termino:</b>{data.termino}</p>
								</div>
								<div className="col">
									<p><b>Registrado:</b>{data.inicioRegistrado}</p>
									<p><b>Registrado:</b>{data.terminoRegistrado}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>nivel:</b>{data.nivel}</p>
									<p><b>observaciones:</b>{data.observaciones}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showTask(data.ID_tarea) }}>Editar Tarea</button></div>
								<div className="col"><button type="button" className="btn btn-secondary" onClick={() => { goBack() }}>Volver</button></div></div>
						</div>

					</div>
				</div>
			</div>)
		} else {
			return (<div>
				<h1>La tarea no Existe</h1>
			</div>)
		}
	}

	return (
		<div className="row">
					<div className="col-md-12">
						{taskExist(props)}
					</div>
		</div>
	)
}


export default withRouter(ShowTaskCustom);