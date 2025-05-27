import {useTmdb} from "./useTmdb";

export const useMovieVideos = (movieId: number) => {
    const {data, loading, error} = useTmdb(`/movie/${movieId}/videos`);

    return {videos: data as any[], loading, error};
};