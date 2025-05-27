import {useSimilarMovies} from "@/hooks/useSimilarMovies";
import MovieRow from "@/components/MovieRow";

type Props = {
    title: string;
    movieId: number;
}

export default function SimilarMovieRow({title, movieId}: Props) {
    const {movies, loading, error} = useSimilarMovies(movieId);

    return <MovieRow title={title} movies={movies} loading={loading} error={error}/>;
}