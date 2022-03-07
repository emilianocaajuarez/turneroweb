import React, {useState} from 'react';
import MenuUsuario from './MenuUsuario'
import MenuComercio from './MenuComercio'

const Menu = () => {

    var menu=<></>;
    if (window.location.pathname.includes('/comercio')) menu=<MenuComercio />;
    if (window.location.pathname.includes('/usuario')) menu =<MenuUsuario />;
    
    return (
    <div >{menu}</div>
    )
}

export default Menu;