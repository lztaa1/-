import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  // 模拟课程数据
  const courses = [
    {
      id: 1,
      title: '商务数据分析基础',
      level: '初级',
      category: '数据分析',
      rating: 4.8,
      enrollCount: 1200,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    },
    {
      id: 2,
      title: 'SQL 数据分析实战',
      level: '中级',
      category: '数据库',
      rating: 4.9,
      enrollCount: 850,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SQL%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    },
    {
      id: 3,
      title: 'Python 数据科学入门',
      level: '中级',
      category: '编程',
      rating: 4.7,
      enrollCount: 620,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20science%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    },
    {
      id: 4,
      title: '商业智能与数据可视化',
      level: '高级',
      category: '数据可视化',
      rating: 4.6,
      enrollCount: 480,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20intelligence%20data%20visualization%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    }
  ];

  // 课程分类
  const categories = [
    { id: 1, name: '数据分析', count: 12 },
    { id: 2, name: '数据库', count: 8 },
    { id: 3, name: '编程', count: 15 },
    { id: 4, name: '数据可视化', count: 6 },
    { id: 5, name: '大数据', count: 4 }
  ];

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

      {/* 英雄区 */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4">商务数据分析课程自主学习平台</h1>
            <p className="text-xl mb-8">掌握数据分析技能，提升职场竞争力</p>
            <div className="flex justify-center space-x-4">
              <Link to="/courses">
                <Button className="bg-white text-blue-800 hover:bg-gray-100 text-lg px-6 py-3">
                  浏览课程
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-6 py-3">
                  立即注册
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 课程分类导航 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">课程分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to="/courses" className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} 门课程</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 推荐课程 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">推荐课程</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
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
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 学习进度概览 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">学习进度</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h3 className="font-medium text-gray-900">总体学习进度</h3>
                <p className="text-sm text-gray-500">已完成 30% 的课程内容</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            <h4 className="font-medium text-gray-900 mb-3">最近学习的课程</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square" alt="商务数据分析基础" className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <h5 className="font-medium text-gray-900">商务数据分析基础</h5>
                    <p className="text-sm text-gray-500">已完成 60% - 第 3 章</p>
                  </div>
                </div>
                <Link to="/courses/1/lessons/3">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    继续学习
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SQL%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=square" alt="SQL 数据分析实战" className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <h5 className="font-medium text-gray-900">SQL 数据分析实战</h5>
                    <p className="text-sm text-gray-500">已完成 10% - 第 1 章</p>
                  </div>
                </div>
                <Link to="/courses/2/lessons/1">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    继续学习
                  </Button>
                </Link>
              </div>
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