import React from 'react'

const Bienvenida = () => {


    return (
        <div className="ui centered seven wide column">
            <br></br>
        <div className="ui centered grid">
            <h2 class="ui header">
            <i class="settings icon"></i>
            <div class="content">
                Bienvenido a Turni!
                <div class="sub header">Seleccione el Usuario con el cual desea ingresar al sitio.</div>
            </div>
            </h2>
            
            </div>
            <br></br> <br></br>
            
            <div class="ui segment">
                <div class="ui two column very relaxed grid">
                    <div class="column">
                        <h4 className="ui header">Clientes</h4>
                        <div className="ui divider"></div>
                    <a href="http://localhost:3000/usuario/inicio" className="ui primary button">Peralta M.</a>
                    </div>
                    <div class="column">
                    <h4 className="ui header">Comercios</h4>
                    <div className="ui divider"></div>
                    <a href="http://localhost:3000/comercio/turnos/1" className="ui primary button">Mildred Travel</a>
                    <a href="http://localhost:3000/comercio/turnos/2" className="ui primary button">Moderno</a>
                    <a href="http://localhost:3000/comercio/turnos/3" className="ui primary button">Servicios Médicos Rubí</a>
                    <a href="http://localhost:3000/comercio/turnos/4" className="ui primary button">Pastelería Corona</a>
                    <a href="http://localhost:3000/comercio/turnos/5" className="ui primary button">Berna</a>
                    <a href="http://localhost:3000/comercio/turnos/6" className="ui primary button">Cuatro Caminos</a>
                    </div>
                </div>
                <div class="ui vertical divider">
                    <i className="user icon"/>
                </div>
                </div>
            </div>
        
        
    )
}

export default Bienvenida;