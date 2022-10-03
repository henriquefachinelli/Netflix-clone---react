import React, { useEffect, useRef } from 'react'
import { buscaFilmes } from '../../Api';
import styled from 'styled-components';

const imageBase = 'https://image.tmdb.org/t/p/w300/';

function Row({ title, path, isLarge }) {

  const [movies, setMovies] = React.useState([]);
  const carousel = useRef(null);

  const fetchMovies = async (_path) => {
    try {
      const data = await buscaFilmes(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log('erro fetchMovies: ', error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  //carousel
  const Left = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= (carousel.current.offsetWidth * 0.7);
  }

  const Right = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += (carousel.current.offsetWidth * 0.7);
  }
  //passar id do filme clicado

  const MovieClick = (e) => {
    window.location.href = `/movies/${e.target.id}`;
    console.log(e.target.id);
  }

  const Container = styled.section`
    position: relative;
    margin-left: 20px;
    margin: 0 auto;
    height: 250px;
    color: white;`;

  const ButtonPrevius = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    right: auto;
    bottom: 0;
    font-size: 25px;
    width: 45px;
    color: #fff;
    transition: all 600ms ease-in-out;
    background: linear-gradient(to left, transparent 0%, black 200%);
    cursor: pointer;
    border: none;`;
  const ButtonNext = styled.button`
    position: absolute;
    text-align: right;
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    font-size: 25px;
    width: 45px;
    color: #fff;
    transition: all 600ms ease-in-out;
    background: linear-gradient(to right, transparent 0%, black 200%);
    cursor: pointer;
    border: none;`;

  const H3 = styled.h3`padding-top: 15px;`;

  const Carousel = styled.div`
    display: flex;
    background-color: #111;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
    gap: 5px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;}`;

  const Img = styled.img`
    object-fit: contain;
    max-height: 190px;
    margin-bottom: 10px;
    transition:  100ms ;
    cursor: pointer;
    &:hover{transform: scale(1.2);}`;


  return (

    <Container>

      <ButtonPrevius onClick={Left} aria-label="Previous image">◀</ButtonPrevius>
      <ButtonNext onClick={Right} aria-label="Next Image">▶</ButtonNext>

      <H3>{title}</H3>

      <Carousel ref={carousel} >

        {movies.map((filme) => {
          return (
            <Img
              id={filme.id}
              onClick={MovieClick}
              key={filme.id}
              src={`${imageBase}${isLarge ? filme.backdrop_path : filme.poster_path}`}
              alt={filme.name || filme.original_name} >
            </Img>
          )
        })}

      </Carousel>

    </Container>
  )

}

export default Row;
