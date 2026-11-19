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
  tutorName?: string;
}
