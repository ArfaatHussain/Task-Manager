import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Splash = ({ navigation }) => {
    return (
        <LinearGradient style={styles.container}
            colors={['#F77F00', '#F4C27F']}
        >
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <Image
                    source={{ uri: "https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_640.png" }}
                    style={{ height: 150, width: 150 }}
                    resizeMode='contain'
                />
                <Text style={{ marginTop: 20, fontSize: 22, width: '150%', textAlign: 'center' }}>
                    Get things Done with TODO
                </Text>
                <Text style={{ fontSize: 17, marginTop: 10 }}>Stay Focused, Stay Productive</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: '10%' }}>

                    <TouchableOpacity
                        style={{ borderRadius: 12,backgroundColor:'orange',marginHorizontal:18 }}
                        onPress={() => navigation.navigate("main")}
                    >
                        <Text style={{ color: 'white', paddingVertical: 14, textAlign: 'center', fontSize: 19, fontWeight: '600' }}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
              
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginHorizontal: 18,
    },
});

export default Splash;
