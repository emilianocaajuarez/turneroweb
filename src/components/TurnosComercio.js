import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {formatFecha} from '../lib/crearHorario';
import '../styles/TurnosComercio.css';

const TurnosComercio = () => {

    const [turnos, setTurnos] = useState([])
    //GET Turnos reservados de la DB
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:3001'+window.location.pathname,
          );
        
          setTurnos(result.data);
          console.log(result.data);
        };
     
        fetchData();
        
      }, []);

    const cancelarTurno = (idTurno) => {
      //console.log(idTurno)
      var params = new URLSearchParams();
        params.append('idTurno', idTurno);
        

        axios.post('http://localhost:3001'+window.location.pathname, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {console.log("Respuesta: "+JSON.stringify(response))} )
        .catch(err => {
            console.log("Error: "+err)
        });
        window.location.reload(false);
    }

    const renderTurnos = turnos.map(turno => {
        
        return(     <div id={'estado'+turno.idEstadoTurno} className="card">
                    <div className="content">
                      <div className="header">
                        {turno.apellido + ' ' +turno.nombre}
                      </div>
                      <div className="ui blue label">
                        {turno.descripcion}
                      </div>
                      <div className="description">
                        <p>Fecha: {formatFecha(turno.fechaTurno)} </p>
                        <p>Hora: {turno.horaTurno} </p>
                        <p>Duración: {turno.duracion} min</p>
                        <p>Cantidad: {turno.cantidad} </p>
                      </div>
                    </div>
                    <div className="extra content">
                      <div className="ui two buttons">
                        
                        <button onClick={() => cancelarTurno(turno.idTurno)} className="ui basic red button">Cancelar</button>
                      </div>
                    </div>
                  </div>
                )
    })
    return (
        <div>
            <h3 className="ui header">Turnos</h3>
            <div className="ui divider"></div>
        <div class="ui cards">
                {renderTurnos}
            </div>
        </div>
    )
}
export default TurnosComercio;