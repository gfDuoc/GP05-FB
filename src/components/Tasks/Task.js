import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function Task(props) {
    console.log(props)
    const [tarea, setTarea] = useState(props);

    return (
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
                <div className="card-footer"><b>observaciones:</b>{tarea.observaciones}</div>
            </div>
        </div>
    )
}

export default withRouter(Task);