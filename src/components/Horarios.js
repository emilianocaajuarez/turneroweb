import React from 'react';
import _ from 'lodash';

const Horarios = ({horas, horaSeleccionada}) => {

    const horasFiltradas = _.sortBy(_.uniq(_.flattenDeep(horas.map(item => {
        
        return item.slice(2);
    }))))

    const renderHoras = horasFiltradas.map(h => {
        return <div className="column"><button onClick={() => horaSeleccionada(h)} className="ui green basic button column">{h}</button></div>
    })

    return (
        <div className="grid">
            <div className="row">

            {console.log("HORAS FILTRADAS" + horasFiltradas)}
        <div className="ui eight column grid">
            {renderHoras}
        </div>
        </div>
        </div>
    )
}

export default Horarios;