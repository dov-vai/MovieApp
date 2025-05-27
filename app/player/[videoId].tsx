import {useLocalSearchParams} from 'expo-router';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function VideoPlayer() {
    const {videoId} = useLocalSearchParams();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.videoContainer}>
                <YoutubePlayer videoId={videoId} height={250} play/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});