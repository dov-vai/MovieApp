import {useMovieDetails} from '@/hooks/useMovieDetails';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SimilarMovieRow from "@/components/SimilarMovieRow";
import {PlayTrailerButton} from "@/components/PlayTrailerButton";

export default function MovieDetails() {
    const {id} = useLocalSearchParams();
    const navigation = useNavigation();
    const {movie, loading, error} = useMovieDetails(Number(id));

    useEffect(() => {
        if (movie) {
            navigation.setOptions({
                headerTitle: movie.title,
            });
        }
    }, [movie, navigation]);

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
                        <PlayTrailerButton movieId={Number(id)}/>

                        <TouchableOpacity style={styles.libraryButton}>
                            <Text style={styles.libraryButtonText}>Add To Library</Text>
                        </TouchableOpacity>
                    </View>

                    <SimilarMovieRow
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