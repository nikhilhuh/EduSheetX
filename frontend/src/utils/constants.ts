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

export type SignUpUser = {
  firstName: string;
  lastName: string;
  role: "student";
  email: string;
  password: string;
};

export type SignInUser = {
  email: User["email"];
  password: string;
  guestId?: string;
};

export type Subject = {
  _id: string;
  name: string;
  topics: string[];
};

export type Question = {
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
};

export type Test = {
  _id: string;
  isDone: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  name: string;
  subject: string;
  topic: string;
  timeLimit: number;
  questions: Question[];
};

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