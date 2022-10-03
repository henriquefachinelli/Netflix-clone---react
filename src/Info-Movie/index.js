import movieTrailer from 'movie-trailer';
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { buscaInfo, buscaInfoMovie } from '../Api';
import NavBar from '../Componentes/NavBar';

function InfoMovie() {

  const [data, setData] = React.useState({});
  const { id } = useParams();

  //pegando informações do filme/serie atraves do id na url
  const FetchMovie = async () => {
    try {
      const dataFilme = await (buscaInfo(id) || buscaInfoMovie(id));
      if (dataFilme.success === false) {
        const dataFilme2 = await (buscaInfoMovie(id));
        setData(dataFilme2);
      } else {
        setData(dataFilme);
      }
    } catch (error) {
      console.log('erro fetchMovie: ', error);
    }
  };


  useEffect(() => {
    FetchMovie(setData);
  }, []);

  let movieYear = new Date(data.first_air_date || data.release_date);

  let point = Number(data.vote_average).toFixed(1);

  let genres = [];
  for (let i in data.genres) {
    genres.push(data.genres[i].name);
  }

  //trailer do filme
  const [videoURL, setVideoURL] = React.useState('');

  const handleSearch = (movie) => {
    if (videoURL) {
      setVideoURL('');
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setVideoURL(url);
        })
        .catch((error) => {
          console.log('erro de trailer: ', error);
        });
    }
  };

  //styled components
  const Section = styled.section`background-color: #141414;`;
  const Movie = styled.div`height: 100vh; padding-top: 30px;`;

  const Img = styled.img`
  display: block;
  padding-top: 50px;
  margin-left: 47%;
  height: 400px;
  border-radius: 1.2vw;    
  -webkit-mask-image: linear-gradient(to right, transparent 1%, black 30%);`;

  const InfoMovie = styled.div` 
    position: relative;
    top: -380px;
    color: #fff;
    padding-left: 15px;`;

  const NameMovie = styled.div`font-size: 50px; font-weight: bold; max-width: 50%;`;
  const InfoMain = styled.div`display: flex; margin-right: 15px;`;
  const PointMovie = styled.div`color: #46d369; padding-right: 15px;`;
  const YearMovie = styled.div`padding-right: 15px;`;
  const Overview = styled.div`max-width: 32%; padding-top: 20px;`;
  const Genres = styled.div`padding-top: 15px; font-size: 14px; color:rgb(189, 183, 183)`;
  const ButtonTrailer = styled.div` padding-top: 15px; cursor: pointer;`;
  const A = styled.a`font-size: 18px; color: #fff; text-decoration: none; cursor: pointer;`;
  const ButtonVoltar = styled.div`padding-top: 10px;`;
  const Trailer = styled.div`float: left; position: fixed; top: 100px; right: 50px;`;

  return (
    <Section>
      <NavBar />
      <Movie>
        <Img
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path || data?.poster_path}`}
          alt={data.original_name}
          key={data.id}
        ></Img>

        <InfoMovie>
          <NameMovie>{data.name || data.title || data.original_name} </NameMovie>

          <InfoMain>
            <PointMovie>{point} pontos</PointMovie>
            <YearMovie>{movieYear?.getFullYear()}</YearMovie>
            <div>{data.number_of_seasons} temporada{data.number_of_seasons !== 1 ? 's' : ''}</div>
          </InfoMain>

          <Overview>{data?.overview}</Overview>

          <Genres><strong>Gêneros: </strong>{genres.join(', ')}</Genres>

          <ButtonTrailer>
            <A
              onClick={() => handleSearch(data)}
            >▶ Assistir trailer </A>
          </ButtonTrailer>
          <ButtonVoltar>
            <A href='/movies/' >❰ Voltar</A>
          </ButtonVoltar>

        </InfoMovie>
      </Movie>
      <Trailer>
        {videoURL && <ReactPlayer url={videoURL} playing={true}  controls={true} src="/assets/elephantsdream/descriptions.en.vtt" />}
      </Trailer>
    </Section>
  )
};

export default InfoMovie
