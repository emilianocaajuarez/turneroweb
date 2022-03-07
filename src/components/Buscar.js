import React from 'react';

const Buscar = ({buscar}) => {
    return (
    <div>
        <div className="ui search">
        <div className="ui icon input">
            <input id="searchbar" onKeyDown={()=>buscar(document.getElementById('searchbar').value)} className="prompt" type="text" placeholder="Buscar local. . ."/>
            <i className="search icon"></i>
        </div>
        <div className="results"></div>
        </div>
    </div>
    )
}

export default Buscar;