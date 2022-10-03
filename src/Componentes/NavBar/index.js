import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding: 20px;
  z-index: 1;
  background: transparent;
  transition: all ease 0.5s;`;

const Logo = styled.img`
  position: fixed;
  padding-top: 5px;
  left: 20px;
  width: 120px;
  object-fit: contain;`;

const Avatar = styled.img`
  position: fixed;
  right: 30px;
  width: 30px;
  object-fit: contain;`;


function NavBar({black}) {
  return (
    <Header style={{background: black}}>
      <a href='/'>
      <Logo              
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt='Netflix'>
      </Logo>
      </a>

      <Avatar 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU"
        alt='Henrique'>            
      </Avatar>
    </Header>
  )
}

export default NavBar