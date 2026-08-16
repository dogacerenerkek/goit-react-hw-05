import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    }
}

export const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Trend filmler
export const fetchTrendingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results;
}

// Film ara
export const searchMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie?query=${query}`, options);
    return response.data.results;
}

// Film detayları 
export const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
    return response.data;
}

// Film kadroları 
export const fetchMovieCast = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
    return response.data.cast;
}

// Film incelemeleri
export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
    return response.data.results;
};