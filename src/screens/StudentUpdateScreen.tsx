import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { updateStudentById } from '../services/studentApi';
import { Student } from '../types/student';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateStudent'>;

export default function UpdateStudentScreen({ navigation, route }: Props) {
  const oldStudentData: Student = route?.params?.studentData;
  console.log('NAVIGATION ::: ', navigation);
  console.log('ROUTE ::::', route);
  //   return;

  const [studentName, setStudentName] = useState(oldStudentData.studentName);
  const [fatherName, setFatherName] = useState(oldStudentData.fatherName);
  const [className, setClassName] = useState(oldStudentData.className);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!studentName || !fatherName || !className) {
      Alert.alert('Validation', 'All fields are required');
      return;
    }
    console.log('STUDENT OLD DATA :::: ', oldStudentData);

    console.log('STUDENT NAME :::: ', studentName);
    console.log('FATHER NAME :::: ', fatherName);
    console.log('CLASS NAME :::: ', className);
    console.log('ID  :::: ', oldStudentData.id);
    // return;

    setLoading(true);
    try {
      //   await updateStudent(oldStudentData.id, { name, fatherName, className });
      const response = await updateStudentById(oldStudentData?.id, {
        studentName,
        fatherName,
        className,
      });
      console.log('RESPONE UPDATE ::: ', response);
      Alert.alert('Success', 'Student updated successfully');
      navigation.goBack(); // go back to detail screen
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomText style={styles.title}>Update Student</CustomText>

        {/* <CustomInput label="Student Name" value={name} onChangeText={setName} />
      <CustomInput label="Father Name" value={fatherName} onChangeText={setFatherName} />
      <CustomInput label="Class" value={className} onChangeText={setClassName} /> */}

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

        {loading ? (
          <ActivityIndicator />
        ) : (
          <CustomButton
            title="Update"
            onPress={handleUpdate}
            backgroundColor="#2194f0"
            textColor="#fff"
            fontSize={16}
            borderRadius={16}
            paddingHorizontal={30}
            style={{ marginTop: 16 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 24,
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
});
