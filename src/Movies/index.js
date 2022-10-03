import React, { useEffect } from 'react';
import Row from '../Componentes/Row';
import categorias from '../Api';
import Banner from '../Componentes/Banner';
import NavBar from '../Componentes/NavBar';
import{backgroundBlack,backgroundInicial} from '../Componentes/Ui/variaveis'

function Movies() {

  const [navblack, setNavblack] = React.useState(false);

    useEffect(()=>{
      const scrollListener = () => {
        if(window.scrollY > 10){
          setNavblack(backgroundBlack);
        } else {
          setNavblack(backgroundInicial);
        }
      }
  
      window.addEventListener('scroll', scrollListener);
  
      return() => {
        window.removeEventListener('scroll', scrollListener);
      }
    },[]);

  return (
    <div className='App'>

      <NavBar black = {navblack}/>
      <Banner />     
      
      {categorias.map((categoria, index)=>{
      return <Row  
        key={categoria.slug} 
        title={categoria.title} 
        path={categoria.path}
        isLarge={categoria.isLarge}
        />;
      })}
    </div>
  )
}

export default Movies