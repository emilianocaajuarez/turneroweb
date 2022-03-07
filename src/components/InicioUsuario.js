import React,{useState, useEffect} from 'react';
import Buscar from './Buscar';
import axios from 'axios';
import ComercioItem from './ComercioItem';



const InicioUsuario = () => {

    const [comercios, setComercios] = useState([]); //Listado de comercios
    const [busqueda, setBusqueda] = useState(''); //Parametro de busqueda
    const [encontrados, setEncontrados] = useState([]); //Comercios que cumplen con el parametro de busqueda

    //GET comercios de la DB
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:3001/usuario/inicio',
          );
        
          setComercios(result.data);
          
        };
     
        fetchData();
      }, []);

      //Asigna el parametro al campo de busqueda
      const buscarComercio = (parametro) => {
        setBusqueda(parametro);
      }

      //Se genera el listado de comercios.
      const renderComercios = comercios.map((comercio, i) => {
          //SI HAY PARAMETRO DE BUDQUEDA
          if(busqueda != '') {
              if(comercio.nombre.toLowerCase().includes(busqueda.toLowerCase())||comercio.tipo.toLowerCase().includes(busqueda.toLowerCase())) {
                  return <div key={i} className="column"> <ComercioItem comercio={comercio}/> </div>
              }
          }
          //SI NO HAY PARAMETRO DE BUSQUEDA
          else {
              return <div key={i} className="column"> <ComercioItem comercio={comercio}/> </div>
          }
      })

    return (
        <div>
            <Buscar buscar={buscarComercio}/>
            <div className="ui divider"></div>
            <div className="ui three column grid">
                {renderComercios}
            </div>

        </div>
    )
}

export default InicioUsuario;