import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch,useSelector } from 'react-redux';
import { addTask } from '../redux/action';
const categories = ['Work', 'Personal', 'Other']; // Example categories

const AddTask = ({ navigation }) => {
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState(categories[0]); // Default to first category
  const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useDispatch();
  const tasks = useSelector((state)=>state.tasks);


  const handleSaveTask = () => {
    if (!taskTitle.trim() || !taskDescription.trim()) {
        Alert.alert("Error", "Task title and description are required.");
        return;
    }

    let newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    dispatch(addTask(newId, taskTitle, taskCategory, taskDescription));
    navigation.goBack();
};


  return (
    <SafeAreaView style={{flex:1}} >

    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create a New Task</Text>

      {/* Task Title Input */}
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Enter task title"
      />

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={taskCategory}
          onValueChange={(itemValue) => setTaskCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/* Task Description Input */}
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Enter task description"
        multiline={true}
        numberOfLines={5}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE1CC',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android to align text at the top in multiline inputs
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
  },
  saveButton: {
    width: '100%',
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTask;
