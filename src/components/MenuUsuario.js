import React, { Component } from 'react'
import '../styles/App.css'

import { Menu } from 'semantic-ui-react'

export default class MenuExampleVerticalPointing extends Component {
  state = { activeItem: window.location.pathname.split('/usuario/')[1] }

  handleItemClick = (e, { name }) => {
      var adicional = '';
      if (name == 'turnos') adicional = '/2'
      window.location.pathname='/usuario/'+name+adicional;
      //this.setState({ activeItem: (window.location.pathname.split('/usuario/')[1]) })
      
      //console.log(this.state.activeItem);
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu id="menu_font" pointing vertical>
        <Menu.Item
          name='inicio'
          active={activeItem === 'inicio'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='turnos'
          active={activeItem === 'turnos'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='perfil'
          active={activeItem === 'perfil'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
