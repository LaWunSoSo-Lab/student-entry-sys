import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { getStudents } from '../services/studentApi';
import { Student } from '../types/student';

export default function StudentListScreen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getStudents();

      console.log('DATA ::::', data);

      setStudents(data);
    } catch (err: any) {
      console.error('Failed to fetch students', err);

      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchStudents} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={item => item.id?.toString() ?? item.studentName}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.studentName}</Text>
            <Text>Father: {item.fatherName}</Text>
            <Text>Class: {item.className}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No students found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginBottom: 12,
    fontSize: 16,
  },
});