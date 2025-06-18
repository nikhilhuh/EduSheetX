export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
  role: "student" | "teacher";
  status: "active" | "inactive";
  studentClass?: string;  
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpUser = {
  firstName: string;
  lastName: string;
  role: "student";
  email: string;
  password: string;
  studentClass: string;
};

export type SignInUser = {
  email: User["email"];
  role: User["role"];
  password: string;
};

export type Subject = {
  _id?: string;
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
  createdAt?: string;
  isDone: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  name: string;
  subject: string;
  topic: string;
  updatedAt?: string;
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