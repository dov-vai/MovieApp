import MovieRow from '@/components/MovieRow';
import {useMovieDetails} from '@/hooks/useMovieDetails';
import {useMovieVideos} from '@/hooks/useMovieVideos';
import {useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function MovieDetails() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const {movie, loading, error} = useMovieDetails(Number(id));
    const {videos} = useMovieVideos(Number(id));

    useEffect(() => {
        if (movie) {
            navigation.setOptions({
                headerTitle: movie.title,
            });
        }
    }, [movie, navigation]);

    const handlePlayTrailer = () => {
        if (!videos)
            return;

        const trailer: any = videos.find((video: any) =>
            video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailer) {
            router.push(`/player/${trailer.key}`);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loading}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !movie) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.error}>Error loading movie details</Text>
                </View>
            </SafeAreaView>
        );
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const hasTrailer = videos ? videos.some((video: any) =>
        video.type === 'Trailer' && video.site === 'YouTube'
    ) : false;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: imageUrl}} style={styles.movieImage}/>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Movie Details</Text>
                        <Text style={styles.description}>
                            {movie.overview || 'No description available.'}
                        </Text>

                        <View style={styles.movieInfo}>
                            <Text style={styles.infoText}>Release Date: {movie.release_date}</Text>
                            <Text style={styles.infoText}>Rating: {movie.vote_average}/10</Text>
                            <Text style={styles.infoText}>Runtime: {movie.runtime} minutes</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        {hasTrailer && (
                            <TouchableOpacity style={styles.playButton} onPress={handlePlayTrailer}>
                                <Text style={styles.playButtonText}>Play Trailer</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.libraryButton}>
                            <Text style={styles.libraryButtonText}>Add To Library</Text>
                        </TouchableOpacity>
                    </View>

                    <MovieRow
                        title="Similar Movies"
                        movieId={Number(id)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        fontSize: 16,
        color: '#666',
    },
    error: {
        fontSize: 16,
        color: '#ff4444',
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#f8f8f8',
    },
    movieImage: {
        width: width * 0.6,
        height: width * 0.9,
        borderRadius: 12,
    },
    contentContainer: {
        padding: 20,
    },
    detailsSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    movieInfo: {
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        gap: 15,
        marginBottom: 30,
    },
    playButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    playButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    libraryButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    libraryButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});