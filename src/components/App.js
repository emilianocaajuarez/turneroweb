import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import Route from './Route';
import Menu from './Menu';
import Bienvenida from './Bienvenida';
import InicioUsuario from './InicioUsuario';
import TurnosComercio from './TurnosComercio';
import TurnosCliente from './TurnosCliente'
import Turnero from './Turnero';
import 'semantic-ui-css/semantic.min.css';


class App extends React.Component {
    
    render() {
        return (
            <div className="ui grid" id="menu_general">
                
                <div id="banner" className="ui centered row">Turni!</div>
                <Route path={"/"}>
                    <Bienvenida />
                </Route>
                <div  className="ui row">
                


            <div id="menu_lateral" className="four wide column">
                <Menu  />
            </div>
            <div className="ten wide column">

                <Route path="/usuario/inicio">
                    <InicioUsuario />
                </Route>
                <Route path={"/usuario/inicio/"+window.location.pathname.split('inicio/')[1]}>
                    <Turnero />
                </Route>
                
                <Route path={"/comercio/turnos/"+window.location.pathname.split('turnos/')[1]}>
                    <TurnosComercio />
                </Route>

                <Route path={"/usuario/turnos/"+window.location.pathname.split('turnos/')[1]}>
                    <TurnosCliente />
                </Route>
            </div>
            </div>
            </div>
        )
    }
}

export default App;