import React from 'react';

const ComercioItem = ({comercio }) => {
    return (
        <div  className="ui card">
            <div className="image">
                <img alt={comercio.nombre} src={comercio.logoURL}/>
            </div>
            <div className="content">
                <a href={window.location.href+'/'+comercio.idPerfilComercial} className="header">{comercio.nombre}</a>
                <div className="meta">
                <span className="date">{comercio.calle + ' ' + comercio.numero}</span>
                </div>
                <div className="description">
                </div>
            </div>
            
                <a href={window.location.href+'/'+comercio.idPerfilComercial} className="ui primary button">
                
                    Reservar
                
                </a>
            
        </div>
    )
}

export default ComercioItem;