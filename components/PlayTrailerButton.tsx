import {useMovieVideos} from "@/hooks/useMovieVideos";
import {useRouter} from "expo-router";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

type Props = {
    movieId: number;
}

export function PlayTrailerButton({movieId}: Props) {
    const router = useRouter();
    const {videos} = useMovieVideos(movieId);

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

    const hasTrailer = videos ? videos.some((video: any) =>
        video.type === 'Trailer' && video.site === 'YouTube'
    ) : false;

    return (
        <View>
            {hasTrailer && (
                <TouchableOpacity style={styles.playButton} onPress={handlePlayTrailer}>
                    <Text style={styles.playButtonText}>Play Trailer</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
})