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
  courses: [
    {
      id: 1,
      title: '商务数据分析基础',
      description: '掌握商务数据分析的核心理论基础，包括统计学基础和业务理解能力',
      level: '入门',
      category: '数据分析',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20fundamentals%20education%20background&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 120,
      rating: 4.8,
      enroll_count: 1200,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：数据分析概述',
          topics: [
            '数据分析的定义和重要性',
            '数据分析的基本流程',
            '数据分析师的角色和职责',
            '数据驱动决策的价值'
          ]
        },
        {
          chapter: '第二章：统计学基础',
          topics: [
            '描述性统计：均值、中位数、众数、标准差等基本概念',
            '数据分布：正态分布、偏态分布等',
            '推断统计：假设检验、置信区间',
            '相关性分析：皮尔逊相关系数'
          ]
        },
        {
          chapter: '第三章：业务理解能力',
          topics: [
            '如何理解业务流程和业务目标',
            '识别关键业务指标（KPI）',
            '行业分析方法和工具',
            '业务问题的转化为数据问题'
          ]
        },
        {
          chapter: '第四章：数据与业务的结合',
          topics: [
            '数据质量评估和提升',
            '数据采集和预处理',
            '数据分析结果的业务解释',
            '数据驱动的业务决策案例'
          ]
        }
      ]
    },
    {
      id: 2,
      title: '数据采集与处理技术',
      description: '学习从内部系统和外部渠道采集数据，以及数据清洗、转换与整合的技术',
      level: '中级',
      category: '数据处理',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20collection%20and%20processing%20techniques&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 180,
      rating: 4.6,
      enroll_count: 850,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：数据采集技术',
          topics: [
            '内部数据采集：数据库、ERP、CRM等系统',
            '外部数据采集：API、爬虫、市场调研等',
            '数据采集的 ethical considerations',
            '数据采集工具和技术'
          ]
        },
        {
          chapter: '第二章：数据清洗与转换',
          topics: [
            '数据质量问题识别',
            '缺失值处理方法',
            '异常值检测和处理',
            '数据类型转换和标准化'
          ]
        },
        {
          chapter: '第三章：数据质量与标准化',
          topics: [
            '数据质量评估指标',
            '数据标准化方法',
            '数据验证和校验',
            '数据质量管理最佳实践'
          ]
        },
        {
          chapter: '第四章：数据整合与存储',
          topics: [
            '数据集成方法',
            '数据仓库和数据湖概念',
            'ETL流程设计',
            '数据存储方案选择'
          ]
        }
      ]
    },
    {
      id: 3,
      title: '数据分析与建模方法',
      description: '掌握描述性、诊断性、预测性和规范性分析方法，以及关键分析模型的应用',
      level: '高级',
      category: '数据分析',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analysis%20and%20modeling%20methods&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 240,
      rating: 4.9,
      enroll_count: 620,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：分析方法概述',
          topics: [
            '描述性分析：总结现状',
            '诊断性分析：找出问题原因',
            '预测性分析：预测未来趋势',
            '规范性分析：提供优化建议'
          ]
        },
        {
          chapter: '第二章：回归分析',
          topics: [
            '线性回归模型',
            '逻辑回归模型',
            '多元回归分析',
            '回归模型的评估和优化'
          ]
        },
        {
          chapter: '第三章：聚类分析',
          topics: [
            'K-means聚类算法',
            '层次聚类',
            'DBSCAN算法',
            '聚类结果的解释和应用'
          ]
        },
        {
          chapter: '第四章：分类与预测模型',
          topics: [
            '决策树算法',
            '随机森林',
            '支持向量机',
            '模型评估指标和方法'
          ]
        }
      ]
    },
    {
      id: 4,
      title: '数据可视化与商业智能',
      description: '学习数据可视化技巧和商业智能工具的使用，将分析结果转化为有说服力的报告',
      level: '中级',
      category: '数据可视化',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20and%20business%20intelligence&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 150,
      rating: 4.7,
      enroll_count: 780,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：数据可视化基础',
          topics: [
            '数据可视化的原则和最佳实践',
            '图表类型的选择和应用',
            '色彩和布局设计',
            '数据可视化的常见误区'
          ]
        },
        {
          chapter: '第二章：商业智能工具',
          topics: [
            'Tableau的基本操作和功能',
            'Power BI的使用方法',
            'Excel高级图表和数据透视表',
            '工具选择的考量因素'
          ]
        },
        {
          chapter: '第三章：数据故事讲述',
          topics: [
            '如何构建有说服力的数据故事',
            '数据叙事的结构和技巧',
            '面向不同受众的沟通策略',
            '数据故事的视觉设计'
          ]
        },
        {
          chapter: '第四章：仪表盘设计',
          topics: [
            '仪表盘的设计原则',
            '关键指标的选择和展示',
            '交互式仪表盘的构建',
            '仪表盘的性能优化'
          ]
        }
      ]
    },
    {
      id: 5,
      title: '商务数据分析实践',
      description: '通过实际业务场景应用，掌握销售数据分析、客户行为分析、财务与风险分析等技能',
      level: '高级',
      category: '实践应用',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20practice%20case%20study&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 300,
      rating: 4.9,
      enroll_count: 450,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：销售数据分析',
          topics: [
            '销售业绩分析方法',
            '销售趋势和预测',
            '产品和区域销售分析',
            '销售漏斗分析'
          ]
        },
        {
          chapter: '第二章：客户行为分析',
          topics: [
            '客户分群方法',
            '客户生命周期价值分析',
            '客户流失预测',
            '客户行为路径分析'
          ]
        },
        {
          chapter: '第三章：财务与风险分析',
          topics: [
            '财务报表分析',
            '成本分析和控制',
            '风险评估方法',
            '财务预测模型'
          ]
        },
        {
          chapter: '第四章：运营优化分析',
          topics: [
            '供应链分析',
            '库存优化',
            '运营效率分析',
            'A/B测试设计和分析'
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'SQL与数据库基础',
      description: '掌握SQL查询语言和数据库基础，为数据分析提供强大的工具支持',
      level: '入门',
      category: '数据库',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SQL%20and%20database%20fundamentals&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 120,
      rating: 4.5,
      enroll_count: 920,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：数据库基础',
          topics: [
            '数据库概念和类型',
            '关系型数据库原理',
            '表结构设计原则',
            '数据完整性约束'
          ]
        },
        {
          chapter: '第二章：SQL基础查询',
          topics: [
            'SELECT语句基础',
            'WHERE子句和条件查询',
            'ORDER BY和排序',
            'LIMIT和分页'
          ]
        },
        {
          chapter: '第三章：SQL高级查询',
          topics: [
            'JOIN操作和表连接',
            'GROUP BY和聚合函数',
            'SUBQUERY子查询',
            '窗口函数的使用'
          ]
        },
        {
          chapter: '第四章：数据库管理',
          topics: [
            '数据库设计和规范化',
            '索引的创建和优化',
            '视图和存储过程',
            '数据库性能优化'
          ]
        }
      ]
    },
    {
      id: 7,
      title: 'Python数据分析',
      description: '学习使用Python进行数据处理、分析和可视化，提高数据分析效率',
      level: '中级',
      category: '编程',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20programming&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 200,
      rating: 4.8,
      enroll_count: 750,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：Python基础',
          topics: [
            'Python环境搭建',
            '基本语法和数据类型',
            '控制流和函数',
            '模块和包的使用'
          ]
        },
        {
          chapter: '第二章：数据处理库',
          topics: [
            'NumPy数组操作',
            'Pandas数据结构',
            '数据清洗和预处理',
            '数据聚合和分组'
          ]
        },
        {
          chapter: '第三章：数据可视化',
          topics: [
            'Matplotlib基础',
            'Seaborn高级图表',
            '交互式可视化工具',
            '可视化最佳实践'
          ]
        },
        {
          chapter: '第四章：数据分析实战',
          topics: [
            '数据导入和导出',
            '探索性数据分析',
            '统计分析和建模',
            '案例研究和项目实践'
          ]
        }
      ]
    },
    {
      id: 8,
      title: '大数据分析技术',
      description: '了解大数据技术栈和分析方法，处理和分析海量业务数据',
      level: '高级',
      category: '大数据',
      cover_image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=big%20data%20analysis%20technology&image_size=square_hd',
      price: 0,
      is_premium: false,
      duration: 280,
      rating: 4.7,
      enroll_count: 380,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      outline: [
        {
          chapter: '第一章：大数据概述',
          topics: [
            '大数据的定义和特征',
            '大数据技术生态系统',
            '大数据应用场景',
            '大数据处理架构'
          ]
        },
        {
          chapter: '第二章：大数据存储技术',
          topics: [
            'HDFS分布式文件系统',
            'NoSQL数据库',
            '数据湖概念和实现',
            '数据存储方案选择'
          ]
        },
        {
          chapter: '第三章：大数据处理框架',
          topics: [
            'MapReduce原理',
            'Spark核心概念',
            'Spark SQL和DataFrame',
            '流处理技术'
          ]
        },
        {
          chapter: '第四章：大数据分析应用',
          topics: [
            '大规模数据处理',
            '实时数据分析',
            '机器学习在大数据中的应用',
            '大数据分析案例研究'
          ]
        }
      ]
    }
  ],
  currentCourse: null,
  lessons: [
    {
      id: 1,
      course_id: 1,
      title: '统计学基础',
      description: '掌握描述性统计和推断统计的基本概念和方法',
      content_type: 'video',
      content_url: 'https://example.com/video1',
      duration: 45,
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      course_id: 1,
      title: '业务理解能力',
      description: '学习如何深入理解行业业务流程和核心指标',
      content_type: 'video',
      content_url: 'https://example.com/video2',
      duration: 40,
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      course_id: 1,
      title: '数据与业务的结合',
      description: '如何将数据分析与业务目标紧密结合',
      content_type: 'video',
      content_url: 'https://example.com/video3',
      duration: 35,
      order_index: 3,
      created_at: new Date().toISOString()
    }
  ],
  progress: [],
  loading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      // 使用本地数据作为默认值，同时尝试从Supabase获取最新数据
      const { data, error } = await supabase.from('courses').select('*');
      if (error) {
        console.log('使用本地课程数据');
        // 保留本地数据
      } else if (data && data.length > 0) {
        set({ courses: data });
      }
    } catch (error: any) {
      console.log('使用本地课程数据:', error.message);
    } finally {
      set({ loading: false });
    }
  },
  
  fetchCourseDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      // 先尝试从Supabase获取
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
      if (error) {
        // 从本地数据中获取
        const localCourse = get().courses.find(course => course.id === id);
        if (localCourse) {
          set({ currentCourse: localCourse });
        } else {
          throw new Error('课程不存在');
        }
      } else {
        set({ currentCourse: data });
      }
    } catch (error: any) {
      // 从本地数据中获取
      const localCourse = get().courses.find(course => course.id === id);
      if (localCourse) {
        set({ currentCourse: localCourse });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },
  
  fetchLessons: async (courseId) => {
    set({ loading: true, error: null });
    try {
      // 先尝试从Supabase获取
      const { data, error } = await supabase.from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');
      if (error) {
        // 从本地数据中获取
        const localLessons = get().lessons.filter(lesson => lesson.course_id === courseId);
        if (localLessons.length > 0) {
          set({ lessons: localLessons });
        } else {
          // 为不同课程生成默认的课程内容
          let defaultLessons: Lesson[] = [];
          
          switch (courseId) {
            case 1:
              defaultLessons = [
                {
                  id: 1,
                  course_id: 1,
                  title: '统计学基础',
                  description: '掌握描述性统计和推断统计的基本概念和方法',
                  content_type: 'video',
                  content_url: 'https://example.com/video1',
                  duration: 45,
                  order_index: 1,
                  created_at: new Date().toISOString()
                },
                {
                  id: 2,
                  course_id: 1,
                  title: '业务理解能力',
                  description: '学习如何深入理解行业业务流程和核心指标',
                  content_type: 'video',
                  content_url: 'https://example.com/video2',
                  duration: 40,
                  order_index: 2,
                  created_at: new Date().toISOString()
                },
                {
                  id: 3,
                  course_id: 1,
                  title: '数据与业务的结合',
                  description: '如何将数据分析与业务目标紧密结合',
                  content_type: 'video',
                  content_url: 'https://example.com/video3',
                  duration: 35,
                  order_index: 3,
                  created_at: new Date().toISOString()
                }
              ];
              break;
            case 2:
              defaultLessons = [
                {
                  id: 4,
                  course_id: 2,
                  title: '数据采集技术',
                  description: '学习从内部系统和外部渠道采集数据的方法',
                  content_type: 'video',
                  content_url: 'https://example.com/video4',
                  duration: 50,
                  order_index: 1,
                  created_at: new Date().toISOString()
                },
                {
                  id: 5,
                  course_id: 2,
                  title: '数据清洗与转换',
                  description: '掌握数据清洗、转换与整合的技术',
                  content_type: 'video',
                  content_url: 'https://example.com/video5',
                  duration: 55,
                  order_index: 2,
                  created_at: new Date().toISOString()
                },
                {
                  id: 6,
                  course_id: 2,
                  title: '数据质量与标准化',
                  description: '确保数据质量和标准化的最佳实践',
                  content_type: 'video',
                  content_url: 'https://example.com/video6',
                  duration: 35,
                  order_index: 3,
                  created_at: new Date().toISOString()
                }
              ];
              break;
            default:
              defaultLessons = [
                {
                  id: 100 + courseId,
                  course_id: courseId,
                  title: '课程介绍',
                  description: '本课程的概述和学习目标',
                  content_type: 'video',
                  content_url: 'https://example.com/video-default',
                  duration: 30,
                  order_index: 1,
                  created_at: new Date().toISOString()
                },
                {
                  id: 101 + courseId,
                  course_id: courseId,
                  title: '核心概念',
                  description: '本课程的核心概念和理论基础',
                  content_type: 'video',
                  content_url: 'https://example.com/video-default2',
                  duration: 45,
                  order_index: 2,
                  created_at: new Date().toISOString()
                },
                {
                  id: 102 + courseId,
                  course_id: courseId,
                  title: '实践应用',
                  description: '本课程内容的实际应用案例',
                  content_type: 'video',
                  content_url: 'https://example.com/video-default3',
                  duration: 40,
                  order_index: 3,
                  created_at: new Date().toISOString()
                }
              ];
          }
          set({ lessons: defaultLessons });
        }
      } else {
        set({ lessons: data });
      }
    } catch (error: any) {
      // 从本地数据中获取或生成默认数据
      const localLessons = get().lessons.filter(lesson => lesson.course_id === courseId);
      if (localLessons.length > 0) {
        set({ lessons: localLessons });
      } else {
        // 生成默认课程内容
        const defaultLessons: Lesson[] = [
          {
            id: 100 + courseId,
            course_id: courseId,
            title: '课程介绍',
            description: '本课程的概述和学习目标',
            content_type: 'video',
            content_url: 'https://example.com/video-default',
            duration: 30,
            order_index: 1,
            created_at: new Date().toISOString()
          },
          {
            id: 101 + courseId,
            course_id: courseId,
            title: '核心概念',
            description: '本课程的核心概念和理论基础',
            content_type: 'video',
            content_url: 'https://example.com/video-default2',
            duration: 45,
            order_index: 2,
            created_at: new Date().toISOString()
          },
          {
            id: 102 + courseId,
            course_id: courseId,
            title: '实践应用',
            description: '本课程内容的实际应用案例',
            content_type: 'video',
            content_url: 'https://example.com/video-default3',
            duration: 40,
            order_index: 3,
            created_at: new Date().toISOString()
          }
        ];
        set({ lessons: defaultLessons });
      }
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
