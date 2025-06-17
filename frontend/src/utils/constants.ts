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
}