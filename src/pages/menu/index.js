import React from 'react'
import MenuHead from '../../components/menu/MenuHead';
import MenuCard from '../../components/menuCard';


const Menu = () => {
  return (
    <>
      <MenuHead />
      <MenuCard parent="menu" />
    </>
  )
}

export default Menu;