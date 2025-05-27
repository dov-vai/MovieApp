import {useTmdb} from "./useTmdb";

export const useSimilarMovies = (movieId: number) => {
    const {data, loading, error} = useTmdb(`/movie/${movieId}/similar`);

    return {movies: data as any[], loading, error};
};