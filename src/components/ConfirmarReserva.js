import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmarReserva extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

    confirmado = () => {
        this.setState({ open: false })
        this.props.registrarTurno(this.props.idDetalle);
        //console.log("Y eia?")
    }
  render() {
    return (
      <div>
          {console.log(this.props)}
        <Button primary onClick={this.open}>Confirmar</Button>
        <Confirm
          open={this.state.open}
          content={'Desea confirmar la reserva el: '+this.props.fecha+' a las: '+this.props.horaElegida +'hs ?'}
          cancelButton='Cancelar'
          confirmButton='Confirmar'
          onCancel={this.close}
          onConfirm={
              this.confirmado
            }
        />
      </div>
    )
  }
}

export default ConfirmarReserva










/*import React,{useState} from 'react'
import { Button, Confirm } from 'semantic-ui-react'

const ConfirmarReserva = ({horas, horaElegida, idDetalle, registrarTurno}) => {

return (
        <div>
            <button onClick={() => registrarTurno(idDetalle)} className="ui primary button">
                Confirmar
                </button>
        </div>
    )
}
export default ConfirmarReserva;*/