import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, CircleCheckBig } from 'lucide-react-native';
import ProgressCircle from '../components/Progress';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const CompletedTasks = () => {

    const tasks = useSelector((state) => state.tasks);
    const [progress, setProgress] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);

    const navigation = useNavigation();

    // Use useEffect to react to changes in the tasks array
    useEffect(() => {
        if (tasks.length) {
            findCompletedTasks();
            calculateProgress();
        } else {
            // Reset progress and completed tasks when no tasks exist
            setCompletedTasks([]);
            setProgress(0);
        }
    }, [tasks]);

    function findCompletedTasks() {
        const filteredTasks = tasks.filter(task => task.completed);
        setCompletedTasks(filteredTasks);
    }

    // Function to calculate the progress percentage
    function calculateProgress() {
        const totalTasks = tasks.length;
        const completedTaskCount = tasks.filter(task => task.completed).length;

        const userProgress = (completedTaskCount / totalTasks) * 100;

        console.log('Total Tasks: ', totalTasks);
        console.log('Completed Tasks: ', completedTaskCount);

        setProgress(userProgress);
    }

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <CircleCheckBig color={'green'} size={27} />
            <View>
                <Text style={styles.taskText}>{item.title}</Text>
                <Text style={styles.taskText}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{flex:1}} >
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <TouchableOpacity
                    style={{
                        backgroundColor: 'orange',
                        padding: 7,
                        borderRadius: 50,
                    }}
                    onPress={()=>navigation.goBack()}
                >
                    <ArrowLeft color={'white'} size={26} />
                </TouchableOpacity>
                <Text style={{ fontSize: 26, fontWeight: '500' }} >Your Progress</Text>

                <View style={{ borderWidth: 2, borderColor: '#FFA500', borderRadius: 100 }} >
                    <Image
                        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/035/997/315/small_2x/ai-generated-cheerful-business-woman-standing-isolated-free-photo.jpg' }}
                        style={{ height: 40, width: 40, borderRadius: 100 }}
                        resizeMode='cover'
                    />
                </View>
            </View>
            <ProgressCircle progress={progress / 100} />
            <Text style={styles.title}>Completed Tasks</Text>
            {completedTasks.length > 0 ? (
                <FlatList
                    data={completedTasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noTasks}>No completed tasks yet.</Text>
            )}
        </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCE1CC',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
        marginLeft: 10,
    },
    noTasks: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 50,
        color: '#999',
    },
});

export default CompletedTasks;
