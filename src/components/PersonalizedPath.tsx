import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';

interface Course {
  id: string;
  title: string;
  level: string;
  category: string;
  rating: number;
  enrollCount: number;
  coverImage: string;
  prerequisites?: string[];
  recommended?: boolean;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  totalDuration: string;
  level: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Python数据分析基础',
    level: '初级',
    category: '数据分析',
    rating: 4.8,
    enrollCount: 1200,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square'
  },
  {
    id: '2',
    title: 'SQL数据分析实战',
    level: '中级',
    category: '数据库',
    rating: 4.9,
    enrollCount: 850,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SQL%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square',
    prerequisites: ['1']
  },
  {
    id: '3',
    title: 'Python数据科学入门',
    level: '中级',
    category: '编程',
    rating: 4.7,
    enrollCount: 620,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20science%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square',
    prerequisites: ['1']
  },
  {
    id: '4',
    title: '商业智能与数据可视化',
    level: '高级',
    category: '数据可视化',
    rating: 4.6,
    enrollCount: 480,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20intelligence%20data%20visualization%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square',
    prerequisites: ['1', '2']
  },
  {
    id: '5',
    title: '机器学习入门',
    level: '高级',
    category: '机器学习',
    rating: 4.8,
    enrollCount: 750,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=machine%20learning%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square',
    prerequisites: ['1', '3']
  },
  {
    id: '6',
    title: '深度学习基础',
    level: '高级',
    category: '机器学习',
    rating: 4.7,
    enrollCount: 580,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deep%20learning%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square',
    prerequisites: ['5']
  }
];

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: '数据分析入门路径',
    description: '适合初学者的数据分析入门路径，从基础概念到实际应用',
    courses: [courses[0], courses[1], courses[3]],
    totalDuration: '12周',
    level: '初级到中级'
  },
  {
    id: '2',
    title: '数据科学路径',
    description: '深入学习数据科学，包括Python编程、机器学习等',
    courses: [courses[0], courses[2], courses[4], courses[5]],
    totalDuration: '16周',
    level: '中级到高级'
  },
  {
    id: '3',
    title: '商业智能路径',
    description: '专注于商业智能和数据可视化，提升业务决策能力',
    courses: [courses[0], courses[1], courses[3]],
    totalDuration: '10周',
    level: '中级'
  }
];

const PersonalizedPath: React.FC = () => {
  const [recommendedPath, setRecommendedPath] = useState<LearningPath | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const courseProgress = useProgressStore(state => state.getAllCourseProgress());

  useEffect(() => {
    // 基于学习进度推荐路径
    recommendPath();
    // 基于学习进度推荐课程
    recommendCourses();
  }, [courseProgress]);

  const recommendPath = () => {
    // 简单的推荐逻辑：根据已完成的课程和进度推荐路径
    const completedCourseIds = courseProgress
      .filter(course => course.progress >= 70)
      .map(course => course.courseId);

    if (completedCourseIds.length === 0) {
      // 没有完成的课程，推荐入门路径
      setRecommendedPath(learningPaths[0]);
    } else if (completedCourseIds.includes('1') && completedCourseIds.includes('2')) {
      // 完成了基础和SQL课程，推荐商业智能路径
      setRecommendedPath(learningPaths[2]);
    } else if (completedCourseIds.includes('1') && completedCourseIds.includes('3')) {
      // 完成了基础和Python课程，推荐数据科学路径
      setRecommendedPath(learningPaths[1]);
    } else if (completedCourseIds.includes('1')) {
      // 只完成了基础课程，推荐入门路径
      setRecommendedPath(learningPaths[0]);
    }
  };

  const recommendCourses = () => {
    // 推荐未完成且符合先决条件的课程
    const completedCourseIds = courseProgress
      .filter(course => course.progress >= 70)
      .map(course => course.courseId);

    const recommended = courses.filter(course => {
      // 检查是否已完成
      if (courseProgress.some(c => c.courseId === course.id && c.progress >= 70)) {
        return false;
      }
      // 检查先决条件
      if (course.prerequisites) {
        return course.prerequisites.every(prereq => completedCourseIds.includes(prereq));
      }
      return true;
    }).slice(0, 3);

    setRecommendedCourses(recommended);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>个性化学习路径</CardTitle>
        </CardHeader>
        <CardContent>
          {recommendedPath && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-medium text-blue-800 mb-2">{recommendedPath.title}</h3>
                <p className="text-gray-700 mb-4">{recommendedPath.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{recommendedPath.level}</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{recommendedPath.totalDuration}</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{recommendedPath.courses.length} 门课程</span>
                </div>
                <Link to="/courses">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    开始学习路径
                  </Button>
                </Link>
              </div>
              
              <h4 className="font-medium text-gray-900">路径包含课程</h4>
              <div className="space-y-3">
                {recommendedPath.courses.map((course, index) => (
                  <div key={course.id} className="flex items-center p-3 bg-white border border-gray-200 rounded-md">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div className="flex items-center flex-1">
                      <img src={course.coverImage} alt={course.title} className="w-12 h-12 object-cover rounded mr-3" />
                      <div>
                        <h5 className="font-medium text-gray-900">{course.title}</h5>
                        <p className="text-sm text-gray-500">{course.level} · {course.category}</p>
                      </div>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button className="ml-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                        查看
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>推荐课程</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.level}</span>
                      <span className="text-xs text-gray-500">{course.category}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-900">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{course.enrollCount} 人学习</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedPath;