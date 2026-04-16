import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, useParams } from 'react-router-dom';

export default function LessonDetail() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const courseId = parseInt(id || '1');
  const currentLessonId = parseInt(lessonId || '1');

  // 模拟课程和章节数据
  const course = {
    id: courseId,
    title: '商务数据分析基础',
    lessons: [
      { id: 1, title: '数据分析简介', description: '了解数据分析的基本概念、流程和应用场景', duration: 45, completed: true, content: '数据分析是指用适当的统计分析方法对收集来的大量数据进行分析，提取有用信息和形成结论而对数据加以详细研究和概括总结的过程。' },
      { id: 2, title: '数据收集与清洗', description: '学习如何收集和清洗数据，确保数据质量', duration: 60, completed: true, content: '数据收集是数据分析的第一步，包括从各种来源获取数据。数据清洗则是确保数据质量的关键步骤，包括处理缺失值、异常值和重复值等。' },
      { id: 3, title: '数据可视化基础', description: '使用 Excel 和 Google Sheets 创建基本的数据可视化', duration: 45, completed: false, content: '数据可视化是将数据转化为图形或图像的过程，有助于更直观地理解数据。常用的可视化工具包括 Excel、Google Sheets、Tableau 和 Power BI 等。' },
      { id: 4, title: '数据分析方法', description: '学习描述性分析、预测性分析和规范性分析方法', duration: 60, completed: false, content: '数据分析方法包括描述性分析（描述数据特征）、预测性分析（预测未来趋势）和规范性分析（提供最优决策建议）。' },
      { id: 5, title: '案例分析', description: '通过实际商业案例学习如何应用数据分析解决问题', duration: 45, completed: false, content: '通过分析实际商业案例，可以更好地理解如何将数据分析方法应用到实际业务场景中，解决真实问题。' },
      { id: 6, title: '实战练习', description: '完成一个完整的数据分析项目，从数据收集到结果展示', duration: 60, completed: false, content: '实战练习是巩固所学知识的重要方式，通过完成一个完整的数据分析项目，可以综合运用各种分析方法和工具。' }
    ]
  };

  const currentLesson = course.lessons.find(lesson => lesson.id === currentLessonId) || course.lessons[0];
  const nextLesson = course.lessons.find(lesson => lesson.id === currentLessonId + 1);
  const prevLesson = course.lessons.find(lesson => lesson.id === currentLessonId - 1);

  const [isCompleted, setIsCompleted] = useState(currentLesson.completed);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

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

      {/* 章节内容 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 面包屑导航 */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm">首页</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link to={`/courses`} className="text-gray-700 hover:text-blue-600 text-sm">课程</Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link to={`/courses/${courseId}`} className="text-gray-700 hover:text-blue-600 text-sm">{course.title}</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-500 text-sm">{currentLesson.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* 章节内容 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 左侧章节列表 */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h2 className="text-lg font-bold mb-4">课程章节</h2>
                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/courses/${courseId}/lessons/${lesson.id}`}
                      className={`flex items-center p-2 rounded-md ${lesson.id === currentLessonId ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      {lesson.completed ? (
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <span className="text-gray-500 text-xs">{lesson.id}</span>
                        </div>
                      )}
                      <span className="text-sm">{lesson.title}</span>
                      <span className="ml-auto text-xs text-gray-500">{lesson.duration} 分钟</span>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            {/* 右侧内容 */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
                <p className="text-gray-500 mb-6">{currentLesson.description}</p>

                {/* 视频播放器占位 */}
                <div className="mb-8">
                  <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">视频播放器</p>
                    </div>
                  </div>
                </div>

                {/* 章节内容 */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">章节内容</h2>
                  <p className="text-gray-700 mb-4">{currentLesson.content}</p>
                  <p className="text-gray-700 mb-4">数据分析是一个迭代过程，包括以下步骤：</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                    <li>定义问题和目标</li>
                    <li>收集相关数据</li>
                    <li>清洗和预处理数据</li>
                    <li>分析数据</li>
                    <li>可视化和解释结果</li>
                    <li>提出建议和实施方案</li>
                  </ul>
                </div>

                {/* 互动练习 */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">互动练习</h2>
                  <Card className="p-4 border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">问题：数据分析的主要步骤有哪些？</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <input type="radio" id="option1" name="question1" className="mr-2" />
                        <label htmlFor="option1">收集数据、分析数据、可视化结果</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="option2" name="question1" className="mr-2" />
                        <label htmlFor="option2">定义问题、收集数据、清洗数据、分析数据、可视化结果、提出建议</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="option3" name="question1" className="mr-2" />
                        <label htmlFor="option3">收集数据、清洗数据、分析数据</label>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      提交答案
                    </Button>
                  </Card>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between">
                  <div>
                    <Button
                      className={`${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                      onClick={handleComplete}
                    >
                      {isCompleted ? '已完成' : '标记为完成'}
                    </Button>
                  </div>
                  <div className="flex space-x-4">
                    {prevLesson && (
                      <Link to={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                          上一章
                        </Button>
                      </Link>
                    )}
                    {nextLesson && (
                      <Link to={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          下一章
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
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
