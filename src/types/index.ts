// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  learning_goals?: string;
  skill_level?: string;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// 课程相关类型
export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  category: string;
  cover_image_url?: string;
  price: number;
  is_premium: boolean;
  duration?: number;
  rating: number;
  enroll_count: number;
  created_at: string;
  updated_at: string;
  outline?: {
    chapter: string;
    topics: string[];
  }[];
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  content_type: string;
  content_url?: string;
  duration?: number;
  order_index: number;
  created_at: string;
}

export interface Progress {
  id: number;
  user_id: string;
  course_id: number;
  lesson_id: number;
  completed: boolean;
  last_accessed: string;
}

// 社区相关类型
export interface Discussion {
  id: number;
  user_id: string;
  title: string;
  content: string;
  category?: string;
  view_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  user_id: string;
  discussion_id: number;
  content: string;
  created_at: string;
  user?: User;
}

export interface Question {
  id: number;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  view_count: number;
  answer_count: number;
  is_solved: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  answers?: Answer[];
}

export interface Answer {
  id: number;
  user_id: string;
  question_id: number;
  content: string;
  is_accepted: boolean;
  created_at: string;
  user?: User;
}

export interface Share {
  id: number;
  user_id: string;
  title: string;
  content: string;
  media_url?: string;
  media_type?: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  user?: User;
}

// 成就相关类型
export interface Achievement {
  id: number;
  user_id: string;
  type: string;
  name: string;
  description?: string;
  badge_url?: string;
  unlocked_at: string;
}

export interface Certificate {
  id: number;
  user_id: string;
  course_id: number;
  certificate_url: string;
  issued_at: string;
  course?: Course;
}
