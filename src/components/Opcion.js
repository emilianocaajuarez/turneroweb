import React from 'react';

const Opcion = ({horas, horaElegida, opcionSeleccionada}) => {

    const renderOpciones = horas.map((opcion => {
        if(opcion.includes(horaElegida)) {
            return <div className="column"><button onClick={() => opcionSeleccionada(opcion[0])} className="ui red basic button column">{opcion[1]}</button></div>
        }
    }))

    return (
        <div className="grid">
        <div className="row">

        
    <div className="ui four column grid">
        {renderOpciones}
    </div>
    </div>
    </div>
    )
}

export default Opcion;