import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { fetchStudentDetail, deleteStudentById } from '../services/studentApi';
import { Student } from '../types/student';
import EditIcon from '../../assets/icons/EditIcon';
import TrashIcon from '../../assets/icons/TrashIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetail'>;

export default function StudentDetailScreen({ navigation, route }: Props) {
  const studentId = route?.params?.studentId;
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await fetchStudentDetail(studentId);
        setStudent(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [studentId, student]);

  const deleteStudent = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this student?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteStudentById(studentId);
              Alert.alert('Deleted', 'Student was deleted successfully');
              // navigate back or refresh list
              navigation.goBack();
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete student');
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (loading)
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  if (error)
    return (
      <View style={styles.container}>
        <CustomText style={{ color: 'red' }}>{error}</CustomText>
      </View>
    );

  if (!student) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomText style={styles.title}>Student Detail</CustomText>

        <View style={styles.row}>
          <CustomText style={styles.label}>Student Name:</CustomText>
          <CustomText style={styles.value}>{student.studentName}</CustomText>
        </View>

        <View style={styles.row}>
          <CustomText style={styles.label}>Father Name:</CustomText>
          <CustomText style={styles.value}>{student.fatherName}</CustomText>
        </View>

        <View style={[styles.row, { marginBottom: 16 }]}>
          <CustomText style={styles.label}>Class:</CustomText>
          <CustomText style={styles.value}>{student.className}</CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StudentUpdate', { studentData: student })
            }
            style={{
              width: 40,
              height: 40,
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <EditIcon width={24} height={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteStudent(studentId)}
            style={{
              width: 40,
              height: 40,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <TrashIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Back"
          onPress={() => navigation.goBack()}
          backgroundColor="#2194f0"
          textColor="#fff"
          fontSize={18}
          borderRadius={16}
          paddingHorizontal={30}
        />
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
  row: { flexDirection: 'row', marginBottom: 16 },
  label: {
    width: '40%',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  value: { flex: 1, fontSize: 16, color: '#555' },
});
