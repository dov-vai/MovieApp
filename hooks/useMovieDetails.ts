import {useTmdb} from "./useTmdb";

export const useMovieDetails = (movieId: number) => {
    const {data, loading, error} = useTmdb(`/movie/${movieId}`)

    return {movie: data, loading, error};
};