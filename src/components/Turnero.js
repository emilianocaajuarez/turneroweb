import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TurneroDetalle from './TurneroDetalle';

const Turnero = () => {

    const [comercio, setComercio] = useState([]); //Listado de comercios
    const [datos, setDatos] = useState([]);

    //GET turnero comercio de la DB
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:3001'+window.location.pathname,
          );
        
          setComercio(result.data);
          setDatos(result.data[0]);
          //console.log(datos)
        };
     
        fetchData();
        
      }, []);


    return(
        <div>
            <h3 className="ui header">{datos.nombre}</h3>
            <div className="ui divider"></div>

            {/* BANNER */}
            <div className="ui grid">
                <div className="row">
                    {/* IMAGEN */}
                    <div className="four wide column">
                        <img src={datos.logoURL}/>
                        </div>
                    {/* DESCRIPCION */}
                    <div className="ten wide column">
                        <div className="ui list">
                            <div className="item">
                                <i className="marker icon"></i>
                                <div className="content">
                                {datos.calle+' '+datos.numero+' '+datos.departamento}
                                </div>
                            </div>
                            <div className="item">
                                <i className="phone icon"></i>
                                <div className="content">
                                {datos.telefono}
                                </div>
                            </div>
                            <div className="item">
                                <i className="mail icon"></i>
                                <div className="content">
                                {datos.mail}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TURNERO */}
            {/* Fecha */}
            
            <TurneroDetalle comercio={comercio}/>

            
            

    </div>
    )
}

export default Turnero;