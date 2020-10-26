import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';


function ToModal(props) {
    const laUrl = "/procesos"
    const [modelos, setModelo] = useState([]);
    useEffect(() => {
        const GetData = async () => {
            const result = await axios(API_BASE_URL + laUrl);
            setModelo(result.data);
        };
        GetData();
    }, []);

    function showSingle(id) {
		console.log(laUrl + "/" + id)
		props.history.push(laUrl + "/" + id);
	};

    function lister(dato) {
        console.log("el dato ES!")
        console.log(dato.length)
        if (dato != null && dato.length) {
            return (
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">empresa</th>
                            <th scope="col">proceso</th>
                            <th scope="col">inicio</th>
                            <th scope="col">termino</th>
                            <th scope="col">tareas</th>
                            <th scope="col">→</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dato.map(item => (

                            <tr key={item.ID_proceso}>
                                <td>{item.ID_proceso}</td>
                                <td>{item.empresa_ID}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.inicio}</td>
                                <td>{item.termino}</td>
                                <td><button className="btn btn-info" onClick={() => { showSingle(item.ID_usuario) }}>IR</button>  </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            )

        } else {
            return (<div className="jumbotron bg-secondary">No hay información en estos momentos.</div>)
        }
    }

    return (
        lister(modelos)
    )
}

export default withRouter(ToModal);