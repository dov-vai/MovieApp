import {useRouter} from "expo-router";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Home() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"dark-content"}/>

            <Text style={styles.title}>Movie App</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/browse')}
                >
                    <Text style={styles.buttonText}>Browse</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/profile')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        color: '#333',
        marginBottom: 60,
    },
    buttonContainer: {
        width: '100%',
        gap: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
    },
});
