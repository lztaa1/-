import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import LessonDetail from "@/pages/LessonDetail";
import Profile from "@/pages/Profile";
import Community from "@/pages/Community";
import DiscussionList from "@/pages/community/DiscussionList";
import QuestionList from "@/pages/community/QuestionList";
import ShareList from "@/pages/community/ShareList";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import InteractiveLearning from "@/pages/InteractiveLearning";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/discussions" element={<DiscussionList />} />
          <Route path="/community/questions" element={<QuestionList />} />
          <Route path="/community/shares" element={<ShareList />} />
          <Route path="/interactive-learning" element={<InteractiveLearning />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
