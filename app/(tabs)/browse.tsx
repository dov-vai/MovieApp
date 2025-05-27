import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopularMovieRow from "@/components/PopularMovieRow";
import GenreMovieRow from "@/components/GenreMovieRow";

export default function Browse() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Browse</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <PopularMovieRow title="Popular Movies"/>
                <GenreMovieRow title="Action Movies" genreId={28}/>
                <GenreMovieRow title="Comedy Movies" genreId={35}/>
                <GenreMovieRow title="Drama Movies" genreId={18}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollView: {
        flex: 1,
        paddingTop: 20,
    },
});