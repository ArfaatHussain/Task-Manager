// TaskModal.js
import React from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const categories = ["Work", "Personal", "Other"]
const TaskModal = ({ modalVisible, setModalVisible, taskTitle, setTaskTitle, taskDescription, setTaskDescription, onSave, setTaskCategory, taskCategory }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Change Task</Text>

                    <View style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 10,
                        marginBottom: 15,
                        backgroundColor: '#fff',
                        height:55
                    }} >

                   
                    <Picker
                        selectedValue={taskCategory}
                        onValueChange={(itemValue) => setTaskCategory(itemValue)}
                        style={{ width: '100%' }}
                    >
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>
                    </View>
                    <TextInput
                        placeholder="Task Title"
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Task Description"
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        style={styles.input}
                    />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }} >

                        <TouchableOpacity style={styles.saveButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.saveButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 55,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize:16
    },
    saveButton: {
        backgroundColor: '#F4C27F',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '45%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TaskModal;
