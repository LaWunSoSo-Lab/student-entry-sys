export type BottomTabParamList = {
  Dashboard: undefined;
  Form: undefined;
};

export type RootStackParamList = {
  StudentList: undefined;               // No params needed
  StudentForm: undefined;               // No params needed
  StudentDetail: { studentId: number }; // Expects a student ID to fetch detail
  StudentUpdate: { studentId: number };
};