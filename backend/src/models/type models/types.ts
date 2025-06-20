export type UserRole = "student" | "teacher";
export type UserStatus = "active" | "inactive";

export interface User {
  _id: string; 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface SubjectType {
  _id: string;
  name: string;
  topics: string[];
}

export type QuestionResult = {
  questionText: string;
  selectedOption: string | null;
  correctAnswer: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  status: "correct" | "wrong" | "unattempted";
  isCorrect: boolean;
};


export type ResultType = {
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  marks: number;
  questions: QuestionResult[];
};