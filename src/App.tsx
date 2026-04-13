import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import Community from './pages/Community';
import DiscussionList from './pages/community/DiscussionList';
import QuestionList from './pages/community/QuestionList';
import ShareList from './pages/community/ShareList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const { fetchUserProfile } = useUserStore();

  useEffect(() => {
    // 检查用户登录状态
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="courses/:id/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="community" element={<Community />}>
            <Route index element={<Navigate to="discussions" replace />} />
            <Route path="discussions" element={<DiscussionList />} />
            <Route path="questions" element={<QuestionList />} />
            <Route path="shares" element={<ShareList />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
