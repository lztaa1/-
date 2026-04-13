import { create } from 'zustand';
import { User, Course, Lesson, Progress, Discussion, Question, Share, Achievement, Certificate } from '../types';
import { supabase } from '../lib/supabase';

// 用户状态
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await get().fetchUserProfile();
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        // 创建用户资料
        await supabase.from('user_profiles').insert({
          id: data.user.id,
          name,
          email
        });
        await get().fetchUserProfile();
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('user_profiles').update(data)
        .eq('id', get().user?.id);
      if (error) throw error;
      await get().fetchUserProfile();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase.from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        set({ user: { ...profile, email: user.email } });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

// 课程状态
export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  lessons: Lesson[];
  progress: Progress[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseDetails: (id: number) => Promise<void>;
  fetchLessons: (courseId: number) => Promise<void>;
  fetchProgress: (courseId: number) => Promise<void>;
  updateProgress: (lessonId: number, completed: boolean) => Promise<void>;
  enrollCourse: (courseId: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  lessons: [],
  progress: [],
  loading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      set({ courses: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchCourseDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
      if (error) throw error;
      set({ currentCourse: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchLessons: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');
      if (error) throw error;
      set({ lessons: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchProgress: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId);
        if (error) throw error;
        set({ progress: data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  updateProgress: async (lessonId, completed) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('progress')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            completed,
            last_accessed: new Date().toISOString()
          })
          .select();
        if (error) throw error;
        set({ progress: data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  enrollCourse: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from('enrollments')
          .insert({
            user_id: user.id,
            course_id: courseId
          });
        if (error) throw error;
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

// 社区状态
export interface CommunityState {
  discussions: Discussion[];
  questions: Question[];
  shares: Share[];
  loading: boolean;
  error: string | null;
  fetchDiscussions: () => Promise<void>;
  fetchQuestions: () => Promise<void>;
  fetchShares: () => Promise<void>;
  createDiscussion: (title: string, content: string, category: string) => Promise<void>;
  createQuestion: (title: string, content: string, tags: string[]) => Promise<void>;
  createShare: (title: string, content: string, media_url?: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  discussions: [],
  questions: [],
  shares: [],
  loading: false,
  error: null,
  
  fetchDiscussions: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('discussions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ discussions: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchQuestions: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('questions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ questions: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchShares: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('shares').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      set({ shares: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  createDiscussion: async (title, content, category) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('discussions').insert({
          user_id: user.id,
          title,
          content,
          category
        }).select();
        if (error) throw error;
        set({ discussions: [data[0], ...get().discussions] });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  createQuestion: async (title, content, tags) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('questions').insert({
          user_id: user.id,
          title,
          content,
          tags
        }).select();
        if (error) throw error;
        set({ questions: [data[0], ...get().questions] });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  createShare: async (title, content, media_url) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('shares').insert({
          user_id: user.id,
          title,
          content,
          media_url
        }).select();
        if (error) throw error;
        set({ shares: [data[0], ...get().shares] });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

// 成就状态
export interface AchievementState {
  achievements: Achievement[];
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  fetchAchievements: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: [],
  certificates: [],
  loading: false,
  error: null,
  
  fetchAchievements: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('unlocked_at', { ascending: false });
        if (error) throw error;
        set({ achievements: data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchCertificates: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('certificates')
          .select('*, courses(title, cover_image_url)')
          .eq('user_id', user.id)
          .order('issued_at', { ascending: false });
        if (error) throw error;
        set({ certificates: data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));
