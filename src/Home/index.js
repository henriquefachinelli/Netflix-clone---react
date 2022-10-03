import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(/img/Netflix-home.jpg);
  background-size:cover;`;

const Img = styled.img`
  width: 140px;
  height: 30px;
  padding: 30px;`;

const Button = styled.a`
  font-size: 20px;
  color: #fff;
  cursor: default;
  font-weight: 700;
  text-decoration: none;
  position: fixed;   
  top: 30px;    
  cursor: pointer; `;

const Content = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 10%;`;

const H1 = styled.h1`
  margin-left: auto;
  margin-right: auto;
  font-size: 3.125rem;
  width: 15em;
  font-weight: bold;`;
const H2 = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;`;

const H3 = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;`;

function Home() {
  return (
    <Section> 
            <Img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt='Netflix'>
            </Img>
          <Button  href='/Movies'>Movies</Button>
      <Content>
        <H1>Filmes, séries e muito mais. Sem limites.</H1>
        <H2>Assista onde quiser. Cancele quando quiser.</H2>
        <H3>Pronto para assistir? Informe seu email para criar ou reiniciar sua assinatura.</H3>
      </Content>
    </Section>  
  )
}

export default Home