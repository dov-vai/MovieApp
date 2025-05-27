import {Dimensions, Image, StyleSheet, Text, View} from "react-native";

type Props = {
    title: string
    posterPath: string
}

export default function MovieCard({title, posterPath}: Props) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
        <View style={styles.card}>
            <Image source={{uri: imageUrl}} style={styles.image}/>
            <Text style={styles.title} numberOfLines={2}>
                {title}
            </Text>
        </View>
    );
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.3;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        marginRight: 12,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH * 1.5,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        color: '#333',
        marginTop: 8,
        textAlign: 'center',
    },
});