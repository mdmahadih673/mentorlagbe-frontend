export type TuitionLearningMode = "Online" | "Offline";

export type TuitionSubject =
  | "Mathematics"
  | "English"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "ICT"
  | "Other";

export type TuitionClassLevel =
  | "Class 6"
  | "Class 7"
  | "Class 8"
  | "Class 9"
  | "Class 10"
  | "HSC"
  | "Admission"
  | "Other";

export interface TuitionFormValues {
  teacherId: string;
  tuitionId?: string;
  title: string;
  subject: TuitionSubject | "";
  classLevel: TuitionClassLevel | "";
  mode: TuitionLearningMode;
  meetingLink: string;
  location: string;
  daysPerWeek: 1 | 2 | 3 | 4 | 5 | 6 | "";
  preferredTime: string;
  monthlyFee: number | "";
  description: string;
  bannerUrl: string;
  _id?: string;
  id?: string;
  approvalStatus?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tutorName?: string;
  tutorEmail?: string;
}

export type TuitionApplicationStatus = "pending" | "accepted" | "rejected";

export interface TuitionApplication {
  _id: string;
  teacherId: string;
  tuitionId: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  tuitionTitle?: string;
  tutorName?: string;
  tutorEmail?: string;
  subject?: string;
  monthlyFee?: number | string;
  message?: string;
  preferredTime?: string;
  status?: TuitionApplicationStatus;
  createdAt?: string;
}

export interface StudentApplicationInput {
  tuitionId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  studentPhone: string;
  preferredTime: string;
  message?: string;
}
