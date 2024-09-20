import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressCircle = ({ progress, title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Progress.Circle
            strokeCap='round'
                size={120}
                progress={progress} // Progress is now between 0 and 1
                thickness={10}
                showsText={true}
                color={'orange'}
                unfilledColor={'#F5EFEF'}
                borderWidth={0}
                textStyle={styles.progressText}
                formatText={() => `${Math.round(progress * 100)}%`} // Convert back to percentage for display
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressText: {
        fontSize: 16,
        color: '#000',
    },
});

export default ProgressCircle;
