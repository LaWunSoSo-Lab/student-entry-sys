import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addStudent } from '../services/studentApi';

export default function StudentFormScreen() {
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = async () => {
    if (!studentName || !fatherName || !className) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    try {
      const response = await addStudent({
        studentName,
        fatherName,
        className,
      });
      console.log("resonse", response);

      if (response?.error) {
        Alert.alert("Error", response?.error);
      }

      // Clear form data
      setStudentName('');
      setFatherName('');
      setClassName('');
    } catch (error) {
      console.error(error);
      console.log('Error', 'Failed to save student');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Student Name"
        value={studentName}  
        onChangeText={text => setStudentName(text.trim())}
      />
      <TextInput
        placeholder="Father Name"
        value={fatherName}  
        onChangeText={text => setFatherName(text.trim())}
      />
      <TextInput
        placeholder="Class"
        value={className}  
        onChangeText={text => setClassName(text.trim())}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
