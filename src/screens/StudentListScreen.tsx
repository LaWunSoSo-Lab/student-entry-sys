import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  fetchStudentDetail,
  getAllStudents,
  getStudents,
} from '../services/studentApi';
import { Student } from '../types/student';
import CustomText from '../components/CustomText';
import { BottomTabParamList, RootStackParamList } from '../navigation/types';
import DetailIcon from '../../assets/icons/DetailIcon';

type Props = BottomTabScreenProps<BottomTabParamList, 'Form'>;

export default function StudentListScreen({ navigation }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const PAGE_SIZE = 10;

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setPage(0);
      setHasMore(true);
      fetchStudents(0);
    }, []),
  );

  // Fetch students
  const fetchStudents = async (nextPage = 0) => {
    // Stop fetching if no more pages
    if (!hasMore && nextPage !== 0) return;
    setLoading(true);
    try {
      const data = await getAllStudents(nextPage, PAGE_SIZE);

      if (nextPage === 0) {
        setStudents(data.content); // first page
      } else {
        setStudents(prev => [...prev, ...data.content]); // append next pages
      }

      setPage(nextPage + 1);

      // If returned items < PAGE_SIZE → no more pages
      setHasMore(data?.content?.length === PAGE_SIZE);
    } catch (err) {
      console.error('Failed to fetch students', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {students.length > 0 ? (
        <>
          <CustomText
            style={{
              fontSize: 20,
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {'Students List'}
          </CustomText>

          <FlatList
            data={students}
            keyExtractor={item => item.id?.toString() ?? item.studentName}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemTxtGroup}>
                  <CustomText style={styles.name}>
                    {item.studentName}
                  </CustomText>
                  <CustomText style={styles.subText}>
                    Father: {item.fatherName}
                  </CustomText>
                  <CustomText style={styles.subText}>
                    Class: {item.className}
                  </CustomText>
                </View>
                {/* To widen touchable area for user convenience */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
                  style={{ width: 40, height: 40, alignItems: 'flex-end' }}
                >
                  <DetailIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
            )}
            onEndReached={() => fetchStudents(page)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? <ActivityIndicator style={{ margin: 16 }} /> : null
            }
            ListEmptyComponent={
              !loading ? <CustomText>No students found.</CustomText> : null
            }
          />
        </>
      ) : (
        <CustomText
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {'Currently, there is no student. \nYou can add student in Form Tab!'}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  itemCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTxtGroup: {
    width: '80%',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
