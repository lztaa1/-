import { create } from 'zustand';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
  progress?: number;
  target?: number;
}

interface AchievementState {
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getAchievementById: (achievementId: string) => Achievement | undefined;
}

// 定义成就列表
const initialAchievements: Achievement[] = [
  {
    id: 'first-course',
    name: '初学者',
    description: '完成第一个课程',
    icon: '🏆',
    unlocked: true,
    dateUnlocked: '2024-01-01'
  },
  {
    id: 'five-courses',
    name: '数据分析师',
    description: '完成5个数据分析课程',
    icon: '📊',
    unlocked: true,
    dateUnlocked: '2024-01-10'
  },
  {
    id: 'seven-day-streak',
    name: '连续学习',
    description: '连续学习7天',
    icon: '🔥',
    unlocked: true,
    dateUnlocked: '2024-01-14'
  },
  {
    id: 'ten-courses',
    name: '数据专家',
    description: '完成10个课程',
    icon: '🎓',
    unlocked: false,
    progress: 6,
    target: 10
  },
  {
    id: 'thirty-day-streak',
    name: '学习达人',
    description: '连续学习30天',
    icon: '🌟',
    unlocked: false,
    progress: 12,
    target: 30
  },
  {
    id: 'community-contributor',
    name: '社区贡献者',
    description: '在社区发布10个帖子',
    icon: '💬',
    unlocked: false,
    progress: 8,
    target: 10
  },
  {
    id: 'perfect-score',
    name: '满分达人',
    description: '在测验中获得满分',
    icon: '💯',
    unlocked: false
  },
  {
    id: 'fast-learner',
    name: '快速学习者',
    description: '在24小时内完成一个课程',
    icon: '⚡',
    unlocked: false
  }
];

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: initialAchievements,
  
  unlockAchievement: (achievementId) => set((state) => ({
    achievements: state.achievements.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true, dateUnlocked: new Date().toISOString().split('T')[0] }
        : achievement
    )
  })),
  
  updateAchievementProgress: (achievementId, progress) => set((state) => ({
    achievements: state.achievements.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, progress }
        : achievement
    )
  })),
  
  getUnlockedAchievements: () => {
    return get().achievements.filter(achievement => achievement.unlocked);
  },
  
  getLockedAchievements: () => {
    return get().achievements.filter(achievement => !achievement.unlocked);
  },
  
  getAchievementById: (achievementId) => {
    return get().achievements.find(achievement => achievement.id === achievementId);
  }
}));