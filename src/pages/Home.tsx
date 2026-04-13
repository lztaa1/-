import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourseStore, useUserStore } from '../store';
import { BookOpen, BarChart3, Database, Code, PieChart, TrendingUp, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { courses, fetchCourses, loading } = useCourseStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // 课程分类
  const categories = [
    { id: 'all', name: '全部课程', icon: <BookOpen className="h-6 w-6" />, count: courses.length },
    { id: '数据分析', name: '数据分析', icon: <BarChart3 className="h-6 w-6" />, count: courses.filter(c => c.category === '数据分析').length },
    { id: '数据库', name: '数据库', icon: <Database className="h-6 w-6" />, count: courses.filter(c => c.category === '数据库').length },
    { id: '编程', name: '编程', icon: <Code className="h-6 w-6" />, count: courses.filter(c => c.category === '编程').length },
    { id: '数据可视化', name: '数据可视化', icon: <PieChart className="h-6 w-6" />, count: courses.filter(c => c.category === '数据可视化').length },
    { id: '大数据', name: '大数据', icon: <TrendingUp className="h-6 w-6" />, count: courses.filter(c => c.category === '大数据').length },
  ];

  // 推荐课程（前4个）
  const recommendedCourses = courses.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* 英雄区 */}
      <section className="relative bg-gradient-to-r from-[#1a365d] to-[#2b6cb0] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              掌握商务数据分析技能，<br />
              <span className="text-[#ed8936]">开启职业新篇章</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              从基础到高级，系统学习数据分析、SQL、Python等实用技能，
              成为数据驱动决策的职场精英。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/courses" className="px-8 py-3 bg-[#ed8936] rounded-md font-medium hover:bg-orange-600 transition-colors text-center">
                浏览课程
              </Link>
              {!user && (
                <Link to="/register" className="px-8 py-3 bg-white text-[#1a365d] rounded-md font-medium hover:bg-gray-100 transition-colors text-center">
                  立即注册
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* 装饰元素 */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* 课程分类导航 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">课程分类</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/courses?category=${category.id}`}
                className="flex-shrink-0 bg-white rounded-lg shadow-md p-4 min-w-[160px] flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} 课程</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 推荐课程 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">推荐课程</h2>
            <Link to="/courses" className="text-blue-600 hover:underline flex items-center">
              查看全部 <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // 加载状态
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              recommendedCourses.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-200">
                    {course.cover_image_url ? (
                      <img
                        src={course.cover_image_url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                    )}
                    {course.is_premium && (
                      <div className="absolute top-2 right-2 bg-[#ed8936] text-white text-xs px-2 py-1 rounded">
                        高级
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                        {course.level}
                      </span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-medium">★</span>
                        <span className="ml-1 text-sm">{course.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        ¥{course.price === 0 ? '免费' : course.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 学习进度概览 */}
      {user && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">学习进度</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-medium mb-1">总体学习进度</h3>
                  <p className="text-sm text-gray-500">已完成 12/48 课时</p>
                </div>
                <div className="w-24 h-24 relative">
                  {/* 环形进度条 */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3182ce"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset="170"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">25%</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">最近学习</h4>
                <div className="space-y-4">
                  {/* 最近学习的课程 */}
                  <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-medium">商务数据分析基础</h5>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">已完成 3/6 章节</p>
                    </div>
                    <Link to="/courses/1/lessons/4" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      继续学习
                    </Link>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mr-4">
                      <Database className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-medium">SQL 数据分析实战</h5>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">已完成 1/5 章节</p>
                    </div>
                    <Link to="/courses/2/lessons/2" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      继续学习
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 平台特色 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">分级课程体系</h3>
              <p className="text-gray-600">
                从入门到精通，根据不同技能水平提供适合的课程，满足不同学习者的需求。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">互动式学习</h3>
              <p className="text-gray-600">
                实时数据操作练习、案例分析任务和 quizzes，提升学习效果和实践能力。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">社区交流</h3>
              <p className="text-gray-600">
                与其他学习者交流心得，向专家提问，分享学习成果，构建学习社区。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
