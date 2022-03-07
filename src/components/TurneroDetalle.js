import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import '../styles/TurneroDetalle.css'
import Horarios from './Horarios';
import Opcion from './Opcion';
import ConfirmarReserva from './ConfirmarReserva';
import axios from 'axios';
import {estaAbierto, crearHorario, formatFecha, quitarTurnos, fechaPasada} from '../lib/crearHorario';
import _ from 'lodash';
import 'react-calendar/dist/Calendar.css';


const TurneroDetalle = ({comercio}) => {

    const [fecha, setFecha] = useState(new Date());
    const [horarios, setHorarios] =useState([]);
    const [turnos, setTurnos] = useState([]);
    const [horaElegida, setHoraElegida] = useState('no');
    const [horariosLibres , setHorariosLibres] = useState([]);
    const [idDetalle, setIdDetalle] = useState('0');
    const [encabezadoHora, setEncabezadoHora] = useState(<></>);
    const [encabezadoOpcion, setEncabezadoOpcion] = useState (<></>);
    const [botonConfirmar, setBotonConfirmar] = useState (<></>);
    const [cartelCerrado, setCartelCerrado] = useState (<></>);
    const [cartelFechaPasada, setCartelFechaPasada] = useState (<></>);
    var esquemaDias = [];

    //GET Turnos reservados de la DB
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:3001'+window.location.pathname+'/pendientes',
          );
        
          setTurnos(result.data);
          console.log(result.data);
        };
     
        fetchData();
        
      }, []);

    //Se genera arreglo con dias en que el local esta abierto
    useEffect(() => {
        comercio.map(com => {
            var esq = [com.idDetalleTurnero,com.domingo, com.lunes, com.martes, com.miercoles, com.jueves, com.viernes, com.sabado];
            
            esquemaDias.push(esq)
            //console.log(esquemaDias)
        })
    })

    const limpiarTodo = () => {
        setHorarios([])
        setHorariosLibres([])
        setHoraElegida('no')
        setEncabezadoHora(<></>)
        setEncabezadoOpcion(<></>)
        setBotonConfirmar(<></>);
        setCartelCerrado(<></>)
        setCartelFechaPasada(<></>)
    }
    //Cuando se selecciona una fecha en el calendario
    
    const meterFecha = (value) => {
        setFecha(value);
        if(!fechaPasada(value)) {
            if (estaAbierto(value, esquemaDias)) {
                setCartelFechaPasada(<></>)
                setCartelCerrado(<></>)
                setHorarios(crearHorario(comercio));
                setHorariosLibres(quitarTurnos(crearHorario(comercio), value, turnos))

                setEncabezadoHora(<div>
                <h4 class="ui horizontal divider header">
                <i class="clock outline outline icon"></i>
                Seleccione la Hora
                </h4>
                <br></br>
                </div>
                );
            }
            else {
                limpiarTodo();
                setCartelCerrado(
                    <div id = "cartelCerrado" class="ui card">
                <div class="content">
                    <div class="header">Local Cerrado</div>
                    <div class="meta">
                    </div>
                    
                    <p>El local no estará atendiendo en la fecha elegida, por favor seleccione otra.</p>
                </div>
                </div>
                )
            };
            console.log(horarios)
            console.log('COMERCIO')
            console.log(comercio)
        }
        else {
            limpiarTodo();
            setCartelFechaPasada(
                <div id="cartelInvalido" class="ui card">
                <div class="content">
                    <div class="header">Fecha Inválida</div>
                    <div class="meta">
                    </div>
                    
                    <p>La fecha seleccionada es anterior a la actual, seleccione otra.</p>
                </div>
                </div>
            )
        }
        
    }

    //Al seleccionar una hora se genera el encabezado y se muestran las opciones
    const horaSeleccionada = (h) => {
        setHoraElegida(h);
        setEncabezadoOpcion(
            <div>
                <h4 class="ui horizontal divider header">
                <i class="check circle outline outline icon"></i>
                Seleccione una Opción
                </h4>
                <br></br>
            </div>
        )

    }

    //Al seleccionar una opcion se genera el encabezado y se muestra el boton de confirmación
    const opcionSeleccionada = (op) => {
        setIdDetalle(op);
        setBotonConfirmar(<ConfirmarReserva fecha = {formatFecha(fecha)} horas = {horariosLibres} horaElegida = {horaElegida} idDetalle = {idDetalle} registrarTurno = {registrarTurno}/>)
    }

    //POST del turno generado
    const registrarTurno = (idDetalleTurnero) => {
        var duracion = 0;
        var capacidad = 0;
        comercio.map(com => {
            if (idDetalleTurnero == com.idDetalleTurnero) {
                duracion = com.duracionTurno;
                capacidad = com.capacidad;
            }
        })
        var params = new URLSearchParams();
        params.append('idUsuario', '2');
        params.append('perfilComercial', comercio[0].idPerfilComercial);
        params.append('detalleTurnero', idDetalleTurnero);
        params.append('fecha', formatFecha(fecha));
        params.append('duracion', duracion);
        params.append('hora', horaElegida+':00');
        params.append('cantidad', capacidad);
        

        axios.post('http://localhost:3001'+window.location.pathname, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {console.log("Respuesta: "+JSON.stringify(response))} )
        .catch(err => {
            console.log("Error: "+err)
        });

        window.location.pathname = '/usuario/turnos/2';
    }


    return (
        <div>
            <h4 class="ui horizontal divider header">
            <i class="calendar alternate outline icon"></i>
            Seleccione una Fecha
            </h4>
            <br></br>
            <div className="ui centered grid">
            <Calendar onChange={meterFecha}  value={fecha} />
            </div>

            
            <div className="ui centered grid">
                <br></br>
            {cartelFechaPasada}
            {cartelCerrado}
            </div>
            <br></br>
            {/* Hora */}
            {encabezadoHora}
            <Horarios horas = {horariosLibres} horaSeleccionada = {horaSeleccionada}/>

            {/* Opcion */}
            <br></br><br></br>
            {encabezadoOpcion}
            <Opcion horas = {horariosLibres} horaElegida = {horaElegida} opcionSeleccionada={opcionSeleccionada}/>

            {/* Confirmar */}
            <br></br>
            <h4 className="ui horizontal divider header"></h4>
            <div className="ui centered grid">
            {botonConfirmar}
            <br></br><br></br>
            </div>
            
        </div>
    )
}
export default TurneroDetalle;