import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addStudent } from '../services/studentApi';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<BottomTabParamList, 'Dashboard'>;

export default function StudentFormScreen({ navigation }: Props) {
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = async () => {
    if (!studentName || !fatherName || !className) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    try {
      const response = await addStudent({ studentName, fatherName, className });
      if (response?.error) {
        Alert.alert('Error', response.error);
      } else {
        Alert.alert('Success', 'Student added successfully!');
      }

      setStudentName('');
      setFatherName('');
      setClassName('');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save student');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#f2f2f2' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0} // offset for iOS if needed
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // allows pressing submit while keyboard is open
          showsVerticalScrollIndicator={false}
        >
          <CustomText style={styles.title}>Add Student</CustomText>
          <CustomText style={{ marginBottom: 8, fontSize: 16 }}>
            {'Enter Student Name'}
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Student Name"
            value={studentName}
            onChangeText={setStudentName}
            placeholderTextColor={'#d5d5d5'}
          />
          <CustomText style={{ marginBottom: 8, fontSize: 16 }}>
            {'Enter Father Name'}
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Father Name"
            value={fatherName}
            onChangeText={setFatherName}
            placeholderTextColor={'#d5d5d5'}
          />
          <CustomText style={{ marginBottom: 8, fontSize: 16 }}>
            {'Enter Class Name'}
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Class Name"
            value={className}
            onChangeText={setClassName}
            placeholderTextColor={'#d5d5d5'}
          />

          <CustomButton
            title="Submit"
            onPress={() => handleSubmit()}
            backgroundColor="#2194f0"
            textColor="#fff"
            fontSize={18}
            borderRadius={16}
            paddingHorizontal={30}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: 100, // extra space so content scrolls above keyboard
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 30,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#2194f0',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});
