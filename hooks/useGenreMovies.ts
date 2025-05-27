import {useTmdb} from "./useTmdb";

export const useGenreMovies = (genreId: number) => {
    const {data, loading, error} = useTmdb("/discover/movie", {"with_genres": genreId});

    return {movies: data as any[], loading, error};
};