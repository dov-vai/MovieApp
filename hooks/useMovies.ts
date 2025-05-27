import {useEffect, useState} from "react";

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