import moment from 'moment';

export function estaAbierto (dia, esquema) {
    var abierto = false;
    var day = dia.getDay();
    esquema.map(e => {
        if (e[day+1] == 1) abierto = true;
    })
    return abierto;
}

export function crearHorario (comercio, dia, turnos) {
    //Se asigna el primer horario de apertura
    var apertura1 = comercio[0].horaApertura1.split(':');
    var horaInicio1 = new Date(2000,0,1,apertura1[0],apertura1[1]);

    //Se verifica si tiene segundo horario de apertura y se asigna.
    var dobleHorario = false;
    if(comercio[0] !== undefined) {
        
        if (comercio[0].horaApertura2 != null) {
            dobleHorario = true;
            var apertura2 = comercio[0].horaApertura2.split(':');
            var horaInicio2 = new Date(2000,0,1,apertura2[0],apertura2[1]);
        }
    }

    var horarios = [];
    comercio.map(com => {
        var horarioDetalle = [com.idDetalleTurnero, com.descripcion];
        var copiaHoraInicio1 = horaInicio1;
        var hCierre1 = com.horaCierre1.split(':');
        var mCierre1 = com.horaCierre1.split(':');
        
        //Se incrementan los minutos basados en Hora de cierre
        while(moment(copiaHoraInicio1).hours() !== parseInt(hCierre1[0])){
            let horaFormateada = (moment(copiaHoraInicio1).hours()+':'+moment(copiaHoraInicio1).minutes())
            horarioDetalle.push(formatHora(horaFormateada));
            copiaHoraInicio1 = moment(copiaHoraInicio1).add(com.duracionTurno,'m').toDate();
           
        }

        //Se consideran los minutos de la ultima hora antes del cierre
        console.log("MINUTOS CIERRE "+mCierre1[1]);
        if(moment(copiaHoraInicio1).minutes() < parseInt(hCierre1[1])) {
            let horaFormateada = (moment(copiaHoraInicio1).hours()+':'+moment(copiaHoraInicio1).minutes())
            horarioDetalle.push(formatHora(horaFormateada));
            copiaHoraInicio1 = moment(copiaHoraInicio1).add(com.duracionTurno,'m').toDate();
        }

        if (dobleHorario) {
            var copiaHoraInicio2 = horaInicio2;
            var hCierre2 = com.horaCierre2.split(':');
            var mCierre2 = com.horaCierre2.split(':');
        

            while(moment(copiaHoraInicio2).hours() !== parseInt(hCierre2[0])){
                let horaFormateada = (moment(copiaHoraInicio2).hours()+':'+moment(copiaHoraInicio2).minutes())
                horarioDetalle.push(formatHora(horaFormateada));
                copiaHoraInicio2 = moment(copiaHoraInicio2).add(com.duracionTurno,'m').toDate();
                }

                if(moment(copiaHoraInicio2).minutes() < parseInt(hCierre2[1])) {
                    let horaFormateada = (moment(copiaHoraInicio2).hours()+':'+moment(copiaHoraInicio2).minutes())
                    horarioDetalle.push(formatHora(horaFormateada));
                    copiaHoraInicio2 = moment(copiaHoraInicio2).add(com.duracionTurno,'m').toDate();
                }    
        
            }
        horarios.push(horarioDetalle);
        
    })


    return (horarios);
}

export function formatFecha(f) {
    return moment(f).format().split('T')[0];
}


export function quitarTurnos(horarios, fecha, turnos) {

    var turnosDia = turnos.filter(t => formatFecha(fecha) == formatFecha(t.fechaTurno));
    //console.log('HORARIOS FUNCION: '+JSON.stringify(horarios))
    var nuevoHorario = [];
    //console.log('TURNOS DIA' + turnosDia.length)
    if (turnosDia.length == 0) nuevoHorario = horarios;
    else{
    turnosDia.map(td => {
        var idDetTurn = 0;
        horarios.map((h,i) => {
            
            if(i != -1)  idDetTurn = h[0];
            //console.log("DETALLE TURNERO:"+idDetTurn + ' el turno vale: '+td.idDetalleTurnero)
            if(idDetTurn == td.idDetalleTurnero) {
                //console.log("ENTRO AL IF")
                //console.log(h.filter(hora => hora != formatHora(td.horaTurno)))
                horarios[i]=(h.filter(hora => hora != formatHora(td.horaTurno)));
            }
            else horarios[i] = h;

        })
    })}
    
    //console.log('NUEVO HORARIO')
    //console.log(horarios)
    //console.log('HASTA ACA')
return horarios;
}


export function fechaPasada(fecha) {
    var fecha_formateada = formatFecha(fecha);
    var fecha_actual = formatFecha(new Date());
    return (fecha_formateada<fecha_actual);

}

function formatHora (h) {
    var hora = h.split(':') [0];
    var minuto = h.split(':') [1];
    if(hora.length <= 1) hora = '0'+hora;
    if (minuto.length <= 1) minuto = '0'+minuto;
    //console.log('RECIBO '+h+' - DEVUELVO '+hora+':'+minuto);
    return (hora+':'+minuto)
}