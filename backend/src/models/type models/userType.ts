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
