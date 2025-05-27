import { useEffect, useState } from "react";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

export const useMovies = (genreId?: number) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const url = genreId
                    ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
                    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.results) {
                    setMovies(data.results);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genreId]);

    return {movies, loading, error};
};

export const useMovieDetails = (movieId: number) => {
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
                const data = await response.json();
                setMovie(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    return {movie, loading, error};
};

export const useSimilarMovies = (movieId: number) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
                const data = await response.json();

                if (data.results) {
                    setMovies(data.results);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchSimilarMovies();
        }
    }, [movieId]);

    return {movies, loading, error};
};

export const useMovieVideos = (movieId: number) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
                const data = await response.json();

                if (data.results) {
                    setVideos(data.results);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchVideos();
        }
    }, [movieId]);

    return { videos, loading, error };
};