import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Check, Plus, Pencil, Trash2 } from 'lucide-react-native';
import TaskModal from '../components/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeCompleteStatus, deleteTask_Action, updateTask_Action } from '../redux/action';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['All', 'Work', 'Personal', 'Other'];

const TaskList = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]); // New state for original tasks
    const [selectedCategory, setSelectedCategory] = useState(0); // Default to "All"
    const [modalVisible, setModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [idOfTask, setIdOfTask] = useState();
    const dispatch = useDispatch();
    const tasksRedux = useSelector((state) => state.tasks);

    useEffect(() => {
        if (tasksRedux.length) {
            setOriginalTasks(tasksRedux); // Set original tasks
            getNotCompletedTasks();
        }
    }, [tasksRedux]);

    useEffect(() => {
        filterByCategory();
    }, [selectedCategory, originalTasks]); // Re-run filter when selectedCategory or originalTasks change

    function filterByCategory() {
        let category = "";
    
        if (selectedCategory === 0) {
            category = "All";
        } else if (selectedCategory === 1) {
            category = "Work";
        } else if (selectedCategory === 2) {
            category = "Personal";
        } else {
            category = "Other";
        }
    
        let categorizedTasks = originalTasks.filter((task) => {
            // Check completion status: include only not completed tasks
            const isCompleted = !task.completed;
    
            // Filter tasks based on category and completion status
            if (category === "All") {
                return isCompleted; // Include all not completed tasks if category is "All"
            }
            return task.category === category && isCompleted; // Filter by specific category and not completed
        });
    
        setTasks(categorizedTasks);
    }
    

    function getNotCompletedTasks() {
        let filteredTasks = originalTasks.filter((task) => !task.completed);
        setTasks(filteredTasks);
    }

    function updateTask() {
        dispatch(updateTask_Action(idOfTask, taskTitle, taskCategory, taskDescription));
    }

    const handleSave = () => {
        updateTask();
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity
                onPress={() => {
                    dispatch(changeCompleteStatus(item.id));
                }}
            >
                <Check color={'green'} size={27} />
            </TouchableOpacity>
            <View style={{ width: '60%', marginRight: 10 }}>
                <Text style={[styles.taskText, { fontWeight: 'bold' }]}>{item.title}</Text>
                <Text style={styles.taskText}>{item.description}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setTaskTitle(item.title);
                    setTaskCategory(item.category);
                    setTaskDescription(item.description);
                    setIdOfTask(item.id);
                    setModalVisible(true);
                }}
            >
                <Pencil color={'#F4C27F'} size={22} />
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                    dispatch(deleteTask_Action(item.id));
                }}
            >
                <Trash2 color={'#F4C27F'} size={25} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{flex:1}} >

       
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/035/997/315/small_2x/ai-generated-cheerful-business-woman-standing-isolated-free-photo.jpg' }} // Replace with real image URL
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Monica Gamage</Text>
                <Text style={styles.profileHandle}>@monicagamage</Text>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.subContainer} nestedScrollEnabled={true}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15, marginTop: 25 }}>
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryBtn, { backgroundColor: index === selectedCategory ? "orange" : "#F5EFEF" }]}
                            onPress={() => setSelectedCategory(index)}
                        >
                            <Text style={{ fontSize: 17, color: selectedCategory === index ? "white" : "black", fontWeight: '500' }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.taskListContainer}>
                    <Text style={styles.taskListTitle}>Tasks List</Text>
                    {tasks.length ? (
                        <FlatList
                            data={tasks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View>
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>You have no tasks yet</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("AddTask")}
                    style={styles.addButton}
                >
                    <Plus color={'white'} size={25} />
                </TouchableOpacity>
            </ScrollView>

            <TaskModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                onSave={handleSave}
                setTaskCategory={setTaskCategory}
                taskCategory={taskCategory}
            />
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4C27F',
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        marginTop: 30,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileHandle: {
        color: '#CC6666',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    taskListContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },
    taskListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#F5EFEF',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
    },
    taskText: {
        fontSize: 14,
        marginLeft: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 50,
    },
    categoryBtn: {
        backgroundColor: '#F5EFEF',
        marginRight: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
});

export default TaskList;
