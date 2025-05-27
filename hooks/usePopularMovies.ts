import {useTmdb} from "@/hooks/useTmdb";

export const usePopularMovies = () => {
    const {data, loading, error} = useTmdb("/movie/popular");

    return {movies: data as any[], loading, error};
};