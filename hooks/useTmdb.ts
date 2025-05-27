import {useEffect, useMemo, useState} from "react";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

export const useTmdb = (endpoint: string, query?: Record<string, string | number | boolean | undefined>) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // memoized because record isn't recognized properly by react
    // and useEffect gets ran again even if query didn't change
    const memoQuery = useMemo(() => query, [JSON.stringify(query)]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!API_KEY) {
                throw new Error("API key not provided");
            }

            try {
                setLoading(true);

                const validParams = query ? Object.entries(query)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => [key, String(value)]) : undefined;

                const queryString = new URLSearchParams(validParams);

                queryString.append("api_key", API_KEY);

                const url = `${BASE_URL}${endpoint}?${queryString.toString()}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.results) {
                    setData(data.results);
                }

                if (!data.results && data) {
                    setData(data);
                }

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [endpoint, memoQuery]);

    return {data, loading, error};
}