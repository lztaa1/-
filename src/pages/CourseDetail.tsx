import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');

  // 模拟课程数据
  const course = {
    id: courseId,
    title: '商务数据分析基础',
    description: '掌握数据分析的基本概念和方法，包括数据收集、清洗、分析和可视化。本课程适合数据分析初学者，通过实际案例和动手练习，帮助你快速入门数据分析领域。',
    level: '初级',
    category: '数据分析',
    rating: 4.8,
    enrollCount: 1200,
    duration: 360, // 分钟
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9',
    instructor: '张教授',
    instructorTitle: '数据科学专家',
    instructorBio: '拥有10年数据分析和教学经验，曾在多家知名企业担任数据分析师和顾问。',
    lessons: [
      { id: 1, title: '数据分析简介', description: '了解数据分析的基本概念、流程和应用场景', duration: 45, completed: true },
      { id: 2, title: '数据收集与清洗', description: '学习如何收集和清洗数据，确保数据质量', duration: 60, completed: true },
      { id: 3, title: '数据可视化基础', description: '使用 Excel 和 Google Sheets 创建基本的数据可视化', duration: 45, completed: false },
      { id: 4, title: '数据分析方法', description: '学习描述性分析、预测性分析和规范性分析方法', duration: 60, completed: false },
      { id: 5, title: '案例分析', description: '通过实际商业案例学习如何应用数据分析解决问题', duration: 45, completed: false },
      { id: 6, title: '实战练习', description: '完成一个完整的数据分析项目，从数据收集到结果展示', duration: 60, completed: false }
    ]
  };

  // 计算课程进度
  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const progress = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-800">DataLearn</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600">课程</Link>
              <Link to="/community" className="text-gray-700 hover:text-blue-600">社区</Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">个人中心</Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">登录</Link>
              <Link to="/register" className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">注册</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 课程详情 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 课程封面 */}
          <div className="mb-8">
            <img src={course.coverImage} alt={course.title} className="w-full h-64 object-cover rounded-lg" />
          </div>

          {/* 课程信息 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧课程详情 */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">{course.level}</span>
                <span className="text-xs text-gray-500">{course.category}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-900">{course.rating}</span>
                  <span className="ml-2 text-sm text-gray-500">({course.enrollCount} 人学习)</span>
                </div>
                <div className="text-sm text-gray-500">
                  总时长: {Math.floor(course.duration / 60)} 小时 {course.duration % 60} 分钟
                </div>
              </div>
              <p className="text-gray-700 mb-6">{course.description}</p>

              {/* 讲师信息 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">讲师信息</h2>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">{course.instructor.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{course.instructor}</h3>
                    <p className="text-sm text-gray-500">{course.instructorTitle}</p>
                    <p className="text-sm text-gray-600 mt-1">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧课程操作 */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-2">课程进度</h2>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500">已完成 {completedLessons} / {course.lessons.length} 章节</p>
                </div>
                <div className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    继续学习
                  </Button>
                  <Button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50">
                    收藏课程
                  </Button>
                  <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                    分享课程
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* 章节列表 */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">课程章节</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {lesson.completed ? (
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="text-gray-500 font-medium">{lesson.id}</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-500">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">{lesson.duration} 分钟</span>
                        <Link to={`/courses/${course.id}/lessons/${lesson.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            开始学习
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DataLearn</h3>
              <p className="text-gray-400">商务数据分析课程自主学习平台，为您提供专业的数据分析技能培训。</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">课程分类</h3>
              <ul className="space-y-2">
                <li><a href="/courses" className="text-gray-400 hover:text-white">数据分析</a></li>
                <li><a href="/courses" className="text-gray-400 hover:text-white">数据库</a></li>
                <li><a href="/courses" className="text-gray-400 hover:text-white">编程</a></li>
                <li><a href="/courses" className="text-gray-400 hover:text-white">数据可视化</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">首页</a></li>
                <li><a href="/courses" className="text-gray-400 hover:text-white">课程</a></li>
                <li><a href="/community" className="text-gray-400 hover:text-white">社区</a></li>
                <li><a href="/profile" className="text-gray-400 hover:text-white">个人中心</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">联系我们</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">邮箱: contact@datalearn.com</li>
                <li className="text-gray-400">电话: 400-123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2026 DataLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
