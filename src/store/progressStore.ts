import { create } from 'zustand';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  lastAccessed: string;
  lessonsCompleted: number;
  totalLessons: number;
}

interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  progress: number;
  lastAccessed: string;
}

interface ProgressState {
  courseProgress: CourseProgress[];
  moduleProgress: ModuleProgress[];
  addCourseProgress: (course: CourseProgress) => void;
  updateCourseProgress: (courseId: string, progress: number, lessonsCompleted: number) => void;
  addModuleProgress: (module: ModuleProgress) => void;
  updateModuleProgress: (moduleId: string, progress: number) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  getAllCourseProgress: () => CourseProgress[];
  getAllModuleProgress: () => ModuleProgress[];
}

// 模拟数据
const initialCourseProgress: CourseProgress[] = [
  {
    courseId: '1',
    courseName: 'Python数据分析基础',
    progress: 75,
    lastAccessed: '2024-01-15',
    lessonsCompleted: 6,
    totalLessons: 8
  },
  {
    courseId: '2',
    courseName: '机器学习入门',
    progress: 45,
    lastAccessed: '2024-01-14',
    lessonsCompleted: 3,
    totalLessons: 7
  },
  {
    courseId: '3',
    courseName: '数据可视化实战',
    progress: 90,
    lastAccessed: '2024-01-12',
    lessonsCompleted: 9,
    totalLessons: 10
  }
];

const initialModuleProgress: ModuleProgress[] = [
  {
    moduleId: 'vocabulary',
    moduleName: '单词记忆',
    progress: 60,
    lastAccessed: '2024-01-15'
  },
  {
    moduleId: 'grammar',
    moduleName: '语法练习',
    progress: 40,
    lastAccessed: '2024-01-14'
  },
  {
    moduleId: 'speaking',
    moduleName: '口语跟读',
    progress: 20,
    lastAccessed: '2024-01-13'
  },
  {
    moduleId: 'listening',
    moduleName: '听力训练',
    progress: 30,
    lastAccessed: '2024-01-12'
  }
];

export const useProgressStore = create<ProgressState>((set, get) => ({
  courseProgress: initialCourseProgress,
  moduleProgress: initialModuleProgress,
  
  addCourseProgress: (course) => set((state) => ({
    courseProgress: [...state.courseProgress, course]
  })),
  
  updateCourseProgress: (courseId, progress, lessonsCompleted) => set((state) => ({
    courseProgress: state.courseProgress.map(course => 
      course.courseId === courseId 
        ? { ...course, progress, lessonsCompleted, lastAccessed: new Date().toISOString().split('T')[0] }
        : course
    )
  })),
  
  addModuleProgress: (module) => set((state) => ({
    moduleProgress: [...state.moduleProgress, module]
  })),
  
  updateModuleProgress: (moduleId, progress) => set((state) => ({
    moduleProgress: state.moduleProgress.map(module => 
      module.moduleId === moduleId 
        ? { ...module, progress, lastAccessed: new Date().toISOString().split('T')[0] }
        : module
    )
  })),
  
  getCourseProgress: (courseId) => {
    return get().courseProgress.find(course => course.courseId === courseId);
  },
  
  getModuleProgress: (moduleId) => {
    return get().moduleProgress.find(module => module.moduleId === moduleId);
  },
  
  getAllCourseProgress: () => {
    return get().courseProgress;
  },
  
  getAllModuleProgress: () => {
    return get().moduleProgress;
  }
}));