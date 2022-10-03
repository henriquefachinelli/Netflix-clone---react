import React, { useEffect } from 'react'
import Categorias, { buscaFilmes, buscaInfo } from '../../Api';
import styled from 'styled-components';

const imageBase = 'https://image.tmdb.org/t/p/original';

function Banner() {
  const [movie, setMovie] = React.useState({});

  const fetchDestaque = async () => {
    try {
      //pegando lista de filmes Originals
      const originalsLista = Categorias.find((categoria) => categoria.slug === 'netflixOriginals');
      const data = await buscaFilmes(originalsLista.path);
      const movies = data?.results;
      // pegando ID aleatorio e buscando info do filme
      const randomMovie = Math.floor(Math.random() * (movies.length - 1));
      const movieID = movies[randomMovie].id;
      const dataInfo = await buscaInfo(movieID);
      setMovie(dataInfo);

    } catch (error) {

      console.log('erro fetchDestaq: ', error);
    }
  };

  useEffect(() => {
    fetchDestaque();
  }, []);

  //pegar apenas ano da data
  let movieYear = new Date(movie.first_air_date);

  //arredondar pontos
  let point = Number(movie.vote_average).toFixed(1);

  //lista de generos
  let genres = [];
  for (let i in movie.genres) {
    genres.push(movie.genres[i].name);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  // Styled componentes
  const Section = styled.section`
    height: 60ch;
    object-fit: contain; 
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    background-position: center;
    background-size: cover;
    background-image: url(${imageBase}${movie?.backdrop_path || movie?.poster_path});`

  const Name = styled.div`
    font-size: 50px;
    font-weight: bold;
    max-width: 52%;`;

  const Info = styled.div`
    display: flex;
    margin-top: 15px;
    font-weight: 700;`;

  const InfoDados = styled.div`display: inline-block;
  margin-right: 15px;`;
  const Seasons = styled.div`display: inline-block;
  margin-right: 15px; color: #46d369;`;

  const Overview = styled.div`max-width: 32%;
  padding-top: 20px;`;

  const Buttons = styled.div`padding-top: 25px;`;

  const Assistir = styled.a`
    cursor: pointer;
    color: #000;
    outline: none;
    border: none;
    font-weight: bold;
    border-radius: 0.2vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 1rem;
    padding-top: 0.5rem;
    background-color: #e6e6e6;
    padding-bottom: 0.5rem;
    transition: all 150ms linear;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
      transition: all 0.2s;}`;
    
  
    const MinhaLista = styled.a`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: bold;
    border-radius: 0.2vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 1rem;
    padding-top: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
    transition: all 150ms linear;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
      transition: all 0.2s;}`;

  const Genres = styled.div`padding-top: 15px; font-size: 18px;`;

  return (
    <Section>
      <Name>{movie?.title || movie?.name || movie?.original_name}</Name>

      <Info>
        <InfoDados>{point} pontos </InfoDados>
        <InfoDados>{movieYear?.getFullYear()}</InfoDados>
        <Seasons>{movie.number_of_seasons} temporada{movie.number_of_seasons !== 1 ? 's' : ''}</Seasons>
      </Info>

      <Overview>{truncate(movie?.overview, 120)}</Overview>

      <Buttons>
        <Assistir href={`/movies/${movie.id}`}>▶ Assistir</Assistir>
        <MinhaLista href={'/movies/'} className="banner-button-minha-lista">+ Minha Lista</MinhaLista>
      </Buttons>

      <Genres><strong>Gêneros: </strong>{genres.join(', ')}</Genres>

    </Section>
  );
}

export default Banner
