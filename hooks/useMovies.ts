import {useTmdb} from "./useTmdb";

export const useMovies = (genreId?: number) => {
    const endpoint = !genreId ? "/movie/popular" : "/discover/movie";

    const {data, loading, error} = useTmdb(endpoint, {"with_genres": genreId});

    return {movies: data as any[], loading, error};
};