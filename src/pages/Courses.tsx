import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
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
    },
    {
      id: 5,
      title: '大数据分析与处理',
      level: '高级',
      category: '大数据',
      rating: 4.5,
      enrollCount: 320,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=big%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    },
    {
      id: 6,
      title: 'Excel 高级数据分析',
      level: '初级',
      category: '数据分析',
      rating: 4.4,
      enrollCount: 950,
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Excel%20data%20analysis%20course%20cover%2C%20professional%20looking%2C%20blue%20theme&image_size=landscape_16_9'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('全部');

  const categories = ['全部', '数据分析', '数据库', '编程', '数据可视化', '大数据'];
  const levels = ['全部', '初级', '中级', '高级'];

  // 过滤课程
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === '全部' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

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
              <Link to="/courses" className="text-blue-600 font-medium">课程</Link>
              <Link to="/community" className="text-gray-700 hover:text-blue-600">社区</Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">个人中心</Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">登录</Link>
              <Link to="/register" className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">注册</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 课程列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center">课程列表</h1>

          {/* 搜索和筛选 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="搜索课程..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <div className="flex space-x-4">
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 课程网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
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

          {/* 无结果提示 */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">没有找到符合条件的课程</p>
            </div>
          )}
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
