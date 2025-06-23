# EduSheetX

**EduSheetX** is a modern, scalable, and feature-rich online quiz/test platform tailored for Class 10 students. It enables teachers to create tests and students to take them through a clean and responsive interface. The application also includes intelligent test generation from uploaded images or PDFs, along with personalized dashboards for both teachers and students.

---

## 🚀 Features

- 🎯 Online quizzes/tests for various Class 10 subjects  
- 🧑‍🏫 Teacher and 👨‍🎓 Student dashboards  
- ➕ Teachers can add tests  
- 🖼️ Upload test images or PDFs and convert them into editable questions using AI  
- 📊 Track test results and performance analytics  
- 🔐 Role-based authentication (Student / Teacher)  
- 🌐 Responsive UI built with Tailwind CSS  
- ⚡ Socket.io support integrated (real-time features planned)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React** with **TypeScript**
- 🎨 **Tailwind CSS**
- 🔀 **React Router**
- 📦 Zustand, React Query, and other utility libraries
- 🧠 AI-based question extraction (via image/PDF upload)

### Backend
- 🖥️ **Node.js** with **Express**
- 🧾 **TypeScript**
- 🗃️ **MongoDB** with Mongoose
- 🔌 **Socket.io** (integrated but not used yet)

---

## 📷 Image/PDF to Question Feature

EduSheetX includes a smart feature that allows teachers to upload an image or PDF of a test. The app processes the file and extracts:

- Questions  
- Multiple-choice options  
- Correct answers  

Teachers can then review and modify these before publishing the test.

---

## 🔐 Authentication & Authorization

- Login and Signup students 
- Only Login for teachers 
- Protected routes based on user roles  
- Separate dashboard views for students and teachers

---

## 🧪 Test Flow

1. Teacher adds a test (manually or by uploading a file)  
2. Students view and attempt available tests  
3. System automatically evaluates responses  
4. Students can view results, scores, and statistics

---

## 📈 Dashboards

### For Teachers
- Leaderboard of students in their tests  
- View all tests added , average marks, average percentage, how many students attempted their tests 
- View recent tests uploaded by them

### For Students
- Leaderboard of students and their ranking  
- Track personal performance and history  
- View progress charts and recent activity

---

## 🚧 Future Enhancements

- 🧠 AI-based question suggestions  
- 💬 Real-time chat and notifications (via Socket.io)  
- 📅 Schedule-based tests with time limits  
- 📊 Detailed analytics and report cards

---

## 🧑‍💻 Developers

- **Frontend**: React + TypeScript + Tailwind CSS + Zustand + React Router  
- **Backend**: Node.js + Express + TypeScript + MongoDB  
- **AI File Parsing**: (e.g., OpenAI Vision / OCR integration)  
- **Real-time**: Socket.io integration ready (for future use)

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/nikhilhuh/EduSheetX.git
cd EduSheetX
```

### 2. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup backend

```bash
cd backend
npm install
npm run dev
```

Ensure MongoDB is running locally or update the Mongo URI in .env
and also add all the required .env variables in backend and frontend

---

## 📄 License

Cuurently **No License**        .

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to:

- ⭐ Star the repository to show your support
- 🐛 Report bugs or request features via [issues](../../issues)
- 🔧 Submit pull requests for improvements or new features

Please ensure your code adheres to the existing style and includes relevant tests if applicable.
