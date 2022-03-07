import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import '../styles/App.css'


export default class MenuExampleVerticalPointing extends Component {
  state = { activeItem: window.location.pathname.split('/comercio/')[1] }

  handleItemClick = (e, { name }) => {
      window.location.pathname='/comercio/'+name;
      this.setState({ activeItem: (window.location.pathname.split('/comercio/')[1]) })
      
      //console.log(this.state.activeItem);
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu id="menu_font" pointing vertical>
        <Menu.Item
          name='turnos'
          active={activeItem === 'turnos'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='turnero'
          active={activeItem === 'turnero'}
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