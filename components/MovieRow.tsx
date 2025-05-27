import {useMovies} from '@/hooks/useMovies';
import {useSimilarMovies} from '@/hooks/useSimilarMovies';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MovieCard from './MovieCard';

type Props = {
    title: string,
    genreId?: number,
    movieId?: number
}

export default function MovieRow({title, genreId, movieId}: Props) {
    const {movies, loading, error} = movieId ? useSimilarMovies(movieId) : useMovies(genreId);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.error}>Error loading movies</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard id={item.id} title={item.title} posterPath={item.poster_path}/>}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
    loading: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingVertical: 20,
    },
    error: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        paddingVertical: 20,
    },
});