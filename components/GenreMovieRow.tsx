import {useGenreMovies} from "@/hooks/useGenreMovies";
import MovieRow from "@/components/MovieRow";

type Props = {
    title: string;
    genreId: number;
}

export default function GenreMovieRow({title, genreId}: Props) {
    const {movies, loading, error} = useGenreMovies(genreId);

    return <MovieRow title={title} movies={movies} loading={loading} error={error}/>;
}