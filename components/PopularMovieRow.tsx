import MovieRow from "@/components/MovieRow";
import {usePopularMovies} from "@/hooks/usePopularMovies";

type Props = {
    title: string;
}

export default function PopularMovieRow({title}: Props) {
    const {movies, loading, error} = usePopularMovies();

    return <MovieRow title={title} movies={movies} loading={loading} error={error}/>;
}