const API_KEY = 'd80cb45061c60c508d68bf52b58cb49e'
const API_BASE = 'https://api.themoviedb.org/3'

const categorias = [
    {
        slug: 'trending',
        title: 'Em alta',
        path: `/trending/all/week?&language=pt-BR&api_key=${API_KEY}`,
        isLarge: true
    },
    {
        slug: 'netflixOriginals',
        title: 'Original Netflix',
        path: `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`,
        isLarge: false
    },
    {
        slug: 'popular',
        title: 'Populares',
        path: `/movie/popular?&language=en-US&api_key=${API_KEY}`,
        isLarge: false
    } ,
    {
        slug: 'action',
        title: 'Ação',
        path: `/discover/movie?with_genres=28&api_key=${API_KEY}`,
        isLarge: false
    },
    {
        slug: "comedy",
        title: "Comédias",
        path: `/discover/movie?with_genres=35&api_key=${API_KEY}`,
        isLarge: false,
    },
    {
        slug: "documentaries",
        title: "Documentários",
        path: `/discover/movie?with_genres=99&api_key=${API_KEY}`,
        isLarge: false,
    },  
    
]

export const buscaFilmes = async (path) => {
    try{
        let url = `${API_BASE}${path}`;
        const response = await fetch(url);
        return await response.json();

    }catch (error) {
        console.log('error busca filmes', error);
    }
}

//função para buscar informação do filme Original Netflix
export const buscaInfo = async (movieID) => {
    try{
        let path = `/tv/${movieID}?api_key=${API_KEY}&language=pt-BR`;
        let url = `${API_BASE}${path}`;
        const response = await fetch(url);
        return await response.json(); 
    }catch (error) {
        console.log('error busca info', error);
    }
}

//função para buscar informação do filmes
export const buscaInfoMovie = async (movieID) => {
    try{
        let path = `/movie/${movieID}?api_key=${API_KEY}&language=pt-BR`;
        let url = `${API_BASE}${path}`;
        const response = await fetch(url);
        return await response.json();

    }catch (error) {
        console.log('error busca info', error);
    }
}

export default categorias;